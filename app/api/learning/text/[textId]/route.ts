// app/api/learning/text/[textId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ textId: string }> } | { params: { textId: string } }
) {
  try {
    // ⚠️ utiliser le bon nom de param, qui dépend du nom du dossier [textId]
    const params = await context.params;
    const { textId } = params;
    console.log(`[API PUT] Début traitement PUT texte id=${textId}`);

    const body = await req.json();
    console.log(`[API PUT] Corps reçu :`, body);

    const { userId } = body;

    if (!userId) {
      console.log(`[API PUT] userId manquant dans le corps`);
      return NextResponse.json({ error: "userId manquant" }, { status: 400 });
    }

    // Récupère le texte
    const text = await prisma.text.findUnique({
      where: { id: textId },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        grade: true,
        isActive: true,
        isPublic: true,
        ordre: true,
      },
    });

    if (!text) {
      console.log(`[API PUT] Texte non trouvé id=${textId}`);
      return NextResponse.json({ error: "Texte non trouvé" }, { status: 404 });
    }

    // Découpage du texte en paragraphes et mots
    const paragraphs = text.content.split("\n").map((para, paraIndex) =>
      para
        .split(" ")
        .filter(w => w.length > 0)
        .map((word, wordIndex) => ({
          wordPosition: paraIndex * 10000 + wordIndex,
          wordContent: word,
          isMasked: false
        }))
    );

    // Récupère les états de mot masqué pour cet userId/textId
    const wordStates = await prisma.wordState.findMany({
      where: { userId, textId },
    });
    console.log(`[API PUT] ${wordStates.length} états récupérés pour user=${userId}`);

    // Met à jour l'état masqué en fonction de wordStates
    for (const para of paragraphs) {
      for (const wordObj of para) {
        const state = wordStates.find(ws => ws.wordPosition === wordObj.wordPosition);
        if (state) {
          wordObj.isMasked = state.isMasked;
        }
      }
    }

    const flatWords = paragraphs.flat();
    const totalWords = flatWords.length;
    const maskedWords = flatWords.filter(w => w.isMasked).length;
    const progress = {
      maskedWords,
      scorePercentage: totalWords > 0 ? (maskedWords / totalWords) * 100 : 0,
    };

    console.log(`[API PUT] Progression calculée: ${maskedWords} / ${totalWords} (${progress.scorePercentage.toFixed(1)}%)`);

    return NextResponse.json({ ...text, paragraphs, progress });
  } catch (error) {
    console.error(`[API PUT] Erreur serveur:`, error);
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 });
  }
}
