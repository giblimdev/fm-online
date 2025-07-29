// app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const whereClause = userId ? { userId } : {};

    const documents = await prisma.documents.findMany({
      where: whereClause,
      include: {
        liens: {
          orderBy: { order: "asc" }, // ← Ajout du tri pour les liens
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { ordre: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      description,
      content,
      image,
      grade,
      category,
      ordre,
      userId,
      liens,
    } = await request.json();

    // Validation des champs obligatoires
    if (!title || !userId) {
      return NextResponse.json(
        { error: "Titre et userId sont requis" },
        { status: 400 }
      );
    }

    // Vérification que l'utilisateur existe
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Création du document
    const document = await prisma.documents.create({
      data: {
        title,
        description,
        ordre,
        content,
        image,
        grade,
        category,
        userId,
        liens: {
          create:
            liens?.map((link: any, index: number) => ({
              url: link.url,
              title: link.title,
              description: link.description,
              order: link.order || index, // ← Ajout de l'ordre lors de la création
            })) || [],
        },
      },
      include: {
        liens: {
          orderBy: { order: "asc" }, // ← Tri des liens dans la réponse
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du document:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
