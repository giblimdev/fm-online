// app/api/text/getTextById/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "userId query parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Requête Prisma avec logs
    const texts = await prisma.text.findMany({
      where: {
        OR: [
          { User: { some: { id: userId } } }, // textes liés à user
          { isPublic: true },                 // textes publics
        ],
      },
      orderBy: { ordre: "asc" },
      select: {
        id: true,
        title: true,
        category: true,
        grade: true,
        isActive: true,
        wordCount: true,
        isPublic: true,
        // Récupérer aussi la progression associée
        userProgress: {
          where: { userId },
          select: { maskedWords: true, scorePercentage: true },
        },
      },
    });

    console.log(`[getTextById] Found ${texts.length} texts for user ${userId}`);

    // Préparer la structure côté front : flatten userProgress
    const results = texts.map(t => ({
      ...t,
      myProgress: t.userProgress?.[0]
        ? {
            maskedWords: t.userProgress[0].maskedWords,
            scorePercentage: t.userProgress[0].scorePercentage,
          }
        : {
            maskedWords: 0,
            scorePercentage: 0,
          },
    }));


    return NextResponse.json(results);
  } catch (error) {
    console.error("[getTextById] Prisma error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
