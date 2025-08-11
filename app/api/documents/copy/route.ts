// app/api/documents/copy/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Récupération et validation des données
    const body = await request.json();
    const { originalDocumentId, userId } = body;

    // Validation des paramètres requis
    if (!originalDocumentId) {
      return NextResponse.json(
        { error: "originalDocumentId est requis" },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    // Récupérer le document original avec ses liens
    const originalDocument = await prisma.documents.findUnique({
      where: { id: originalDocumentId },
      include: {
        liens: {
          orderBy: { order: "asc" },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!originalDocument) {
      return NextResponse.json(
        { error: "Document original introuvable" },
        { status: 404 }
      );
    }

    // Vérifier si l'utilisateur a déjà ce document dans sa bibliothèque
    const existingCopy = await prisma.documents.findFirst({
      where: {
        userId: userId,
        title: originalDocument.title,
        content: originalDocument.content,
      },
    });

    if (existingCopy) {
      return NextResponse.json(
        { error: "Ce document existe déjà dans votre bibliothèque" },
        { status: 409 }
      );
    }

    // Créer la copie du document dans une transaction
    const result = await prisma.$transaction(async (tx) => {
      // Créer le document copié
      const copiedDocument = await tx.documents.create({
        data: {
          title: originalDocument.title,
          description: originalDocument.description,
          content: originalDocument.content,
          ordre: originalDocument.ordre,
          image: originalDocument.image,
          grade: originalDocument.grade,
          category: originalDocument.category,
          userId: userId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      // Copier les liens associés
      if (originalDocument.liens.length > 0) {
        const liensData = originalDocument.liens.map((lien) => ({
          url: lien.url,
          title: lien.title,
          description: lien.description,
          order: lien.order,
          documentId: copiedDocument.id,
        }));

        await tx.links.createMany({
          data: liensData,
        });
      }

      // Récupérer le document complet avec les liens
      const finalDocument = await tx.documents.findUnique({
        where: { id: copiedDocument.id },
        include: {
          liens: {
            orderBy: { order: "asc" },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return finalDocument;
    });

    return NextResponse.json(
      {
        success: true,
        id: result!.id,
        document: result,
        message: "Document copié avec succès dans votre bibliothèque",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Erreur lors de la copie du document:", error);

    // Type guard pour les erreurs Prisma
    const isPrismaError = (
      err: unknown
    ): err is { code: string; message: string } => {
      return typeof err === "object" && err !== null && "code" in err;
    };

    // Type guard pour les erreurs génériques
    const isErrorWithMessage = (err: unknown): err is { message: string } => {
      return (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as any).message === "string"
      );
    };

    // Gestion des erreurs Prisma spécifiques
    if (isPrismaError(error)) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Contrainte d'unicité violée lors de la copie" },
          { status: 409 }
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Document original introuvable" },
          { status: 404 }
        );
      }
    }

    // Gestion des autres erreurs
    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : "Erreur inconnue lors de la copie";

    return NextResponse.json(
      {
        error: "Erreur interne du serveur lors de la copie",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

// Méthode GET pour récupérer les copies d'un utilisateur (optionnel)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId est requis" }, { status: 400 });
    }

    // Récupérer tous les documents de l'utilisateur
    const userDocuments = await prisma.documents.findMany({
      where: { userId },
      include: {
        liens: {
          orderBy: { order: "asc" },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      documents: userDocuments,
      total: userDocuments.length,
    });
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des documents:", error);

    const isErrorWithMessage = (err: unknown): err is { message: string } => {
      return (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as any).message === "string"
      );
    };

    const errorMessage = isErrorWithMessage(error)
      ? error.message
      : "Erreur inconnue lors de la récupération";

    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}
