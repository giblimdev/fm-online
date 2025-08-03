// app/api/text/route.ts

import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const texts = await prisma.text.findMany({
      orderBy: { ordre: "asc" },
      select: {
        id: true,
        title: true,
        content: true,
        category: true,
        grade: true,
        isActive: true,
        isPublic: true,
        wordCount: true,
        createdAt: true,
        updatedAt: true,
      }
    })
    return NextResponse.json(texts)
  } catch (error) {
    console.error("GET /api/text error:", error)
    return NextResponse.json({ error: "Erreur récupération textes" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("POST /api/text received body:", body)

    const {
      title,
      content,
      category,
      grade,
      ordre = 20,
      isActive = true,
      isPublic = false,
      userId
    } = body

    if (!title || !content || !userId) {
      console.log("POST /api/text missing mandatory fields")
      return NextResponse.json({ error: "title, content et userId sont obligatoires" }, { status: 400 })
    }

    // Calculer le nombre de mots (basique)
    const wordCount = content.trim().split(/\s+/).length

    // Créer le texte et associer à l'utilisateur via la relation many-to-many
    const createdText = await prisma.text.create({
      data: {
        title,
        content,
        category: category ?? null,
        grade: grade ?? null,
        ordre,
        isActive,
        isPublic,
        wordCount,
        User: {
          connect: { id: userId }
        }
      }
    })

    console.log("POST /api/text created:", createdText)

    return NextResponse.json(createdText, { status: 201 })

  } catch (error) {
    console.error("POST /api/text exception:", error)
    return NextResponse.json({ error: "Erreur lors de la création du texte" }, { status: 500 })
  }
}
