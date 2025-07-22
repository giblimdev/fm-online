// @/app/api/documents/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    const { id: documentId } = await context.params;

    const document = await prisma.documents.findUnique({
      where: { id: documentId },
      include: {
        liens: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("Erreur lors de la récupération du document:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const { id: documentId } = await context.params;
    const {
      title,
      description,
      content,
      image,
      grade,
      category,
      ordre,
      liens,
    } = await request.json();

    // Vérifier que le document existe
    const existingDocument = await prisma.documents.findUnique({
      where: { id: documentId },
    });

    if (!existingDocument) {
      return NextResponse.json(
        { error: "Document non trouvé" },
        { status: 404 }
      );
    }

    // Mettre à jour le document et ses liens
    const document = await prisma.documents.update({
      where: { id: documentId },
      data: {
        title,
        description,
        content,
        image,
        grade,
        category,
        ordre,
        liens: {
          deleteMany: {}, // Supprimer tous les liens existants
          create:
            liens?.map((link: any) => ({
              url: link.url,
              title: link.title,
              description: link.description,
            })) || [],
        },
      },
      include: {
        liens: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    const { id: documentId } = await context.params;

    // Vérifier que le document existe
    const existingDocument = await prisma.documents.findUnique({
      where: { id: documentId },
    });

    if (!existingDocument) {
      return NextResponse.json(
        { error: "Document non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer le document (cascade delete pour les liens grâce au schema)
    await prisma.documents.delete({
      where: { id: documentId },
    });

    return NextResponse.json({ message: "Document supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
