// app/api/learning/progress/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    // On récupère les textes publics OU textes possédant UserProgress de cet utilisateur
    // Prisma ne supporte pas le OR sur include, on fait donc deux requêtes ou une requête brute

    // Récupérer les textes publics + les textes avec progression utilisateur
    // On récupère d’abord les progressions de l’utilisateur
    const userProgresses = await prisma.userProgress.findMany({
      where: { userId },
      select: { textId: true, maskedWords: true, scorePercentage: true },
    });

    const textIdsWithProgress = userProgresses.map((up) => up.textId);

    // Récupérer les textes publics + textes avec progression utilisateur
    const texts = await prisma.text.findMany({
      where: {
        OR: [
          { isPublic: true },
          { id: { in: textIdsWithProgress } },
        ],
      },
      orderBy: { ordre: "asc" },
    });

    // Mapper la progression par textId pour récupérer facilement
    const progressMap = new Map(
      userProgresses.map((up) => [
        up.textId,
        { maskedWords: up.maskedWords, scorePercentage: up.scorePercentage },
      ])
    );

    // Construire la réponse enrichie avec progression ou valeur par défaut
    const result = texts.map((text) => ({
      id: text.id,
      title: text.title,
      content: text.content,
      category: text.category ?? null,
      grade: text.grade ?? null,
      wordCount: text.wordCount,
      isActive: text.isActive,
      myProgress: progressMap.get(text.id) || {
        maskedWords: 0,
        scorePercentage: 0,
      },
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur récupération progression:", error);
    return NextResponse.json([], { status: 500 });
  }
}
