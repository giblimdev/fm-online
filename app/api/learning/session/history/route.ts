// app/api/learning/session/history/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const textId = searchParams.get("textId"); // optionnel

  if (!userId) {
    return NextResponse.json({ error: "userId manquant" }, { status: 400 });
  }

  // Optionnel : filtrer par texte spécifique
  const where: any = { userId };
  if (textId) where.textId = textId;

  const sessions = await prisma.learningSession.findMany({
    where,
    orderBy: { startTime: "desc" },
    include: {
      text: { select: { title: true, id: true } },
    },
  });

  return NextResponse.json(sessions);
}
