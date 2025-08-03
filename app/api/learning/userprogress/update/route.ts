// app/api/learning/userprogress/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, textId, maskedWords, scorePercentage } = body;

    if (!userId || !textId) {
      return NextResponse.json({ error: "userId et textId requis" }, { status: 400 });
    }

    const updatedProgress = await prisma.userProgress.upsert({
      where: { userId_textId: { userId, textId } },
      update: {
        maskedWords,
        scorePercentage,
        lastSession: new Date(),
      },
      create: {
        userId,
        textId,
        maskedWords,
        scorePercentage,
        totalWords: 0,
        lastSession: new Date(),
      },
    });

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur mise à jour progression" }, { status: 500 });
  }
}
