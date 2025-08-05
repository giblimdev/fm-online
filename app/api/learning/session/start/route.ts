import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId, textId } = await req.json();
  if (!userId || !textId)
    return NextResponse.json({ error: "userId et textId requis" }, { status: 400 });

  // Optionnel: récupérer le score de départ
  const progress = await prisma.userProgress.findUnique({
    where: { userId_textId: { userId, textId } }
  });

  const session = await prisma.learningSession.create({
    data: {
      userId,
      textId,
      startTime: new Date(),
      scoreStart: progress?.scorePercentage ?? 0,
      // autres champs optionnels
    },
  });
  return NextResponse.json(session);
}
