// app/api/learning/wordstate/toggle/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, textId, wordPosition, isMasked } = body;

    if (!userId || !textId || wordPosition === undefined) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    // Vérifie si l'état existe
    const existing = await prisma.wordState.findUnique({
      where: {
        userId_textId_wordPosition: { userId, textId, wordPosition },
      },
    }); 

    if (existing) {
      // Met à jour
      const updated = await prisma.wordState.update({
        where: { userId_textId_wordPosition: { userId, textId, wordPosition } },
        data: { isMasked, lastUpdated: new Date() },
      });
      return NextResponse.json(updated);
    } else {
      // Crée
      const created = await prisma.wordState.create({
        data: {
          userId,
          textId,
          wordPosition,
          isMasked,
          lastUpdated: new Date(),
          wordContent: "", // optionnel, si tu stockes le mot ici
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur toggle wordState" }, { status: 500 });
  }
}
