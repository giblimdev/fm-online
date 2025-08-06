//@/app/api/learning/session/end
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  const { sessionId, wordsRevealed, wordsMasked, scoreEnd } = await req.json();
  if (!sessionId)
    return NextResponse.json({ error: "sessionId requis" }, { status: 400 });

  const session = await prisma.learningSession.update({
    where: { id: sessionId },
    data: {
      endTime: new Date(),
      wordsMasked: wordsMasked ?? 0,
      wordsRevealed: wordsRevealed ?? 0,
      scoreEnd: scoreEnd ?? 0,
    },
  });
  return NextResponse.json(session);
} 
