// app/api/library/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const libraryItems = await prisma.library.findMany({
      where: {
        userId: userId,
      },
      include: {
        document: {
          include: {
            liens: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
      orderBy: {
        addedAt: "desc",
      },
    });

    // S'assurer de toujours retourner un tableau, même vide
    return NextResponse.json(libraryItems || []);
  } catch (error) {
    console.error("Erreur lors de la récupération de la bibliothèque:", error);

    // En cas d'erreur, retourner un tableau vide au lieu d'undefined
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      documentId,
      isFavorite = false,
      notes,
    } = await request.json();

    if (!userId || !documentId) {
      return NextResponse.json(
        { error: "userId et documentId sont requis" },
        { status: 400 }
      );
    }

    // Vérifier si le document existe déjà dans la bibliothèque
    const existingItem = await prisma.library.findUnique({
      where: {
        userId_documentId: {
          userId,
          documentId,
        },
      },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: "Ce document est déjà dans votre bibliothèque" },
        { status: 409 }
      );
    }

    // Ajouter le document à la bibliothèque
    const libraryItem = await prisma.library.create({
      data: {
        userId,
        documentId,
        isFavorite,
        notes,
      },
      include: {
        document: {
          include: {
            liens: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    return NextResponse.json(libraryItem, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'ajout à la bibliothèque:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'ajout" },
      { status: 500 }
    );
  }
}
