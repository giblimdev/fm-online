// @/app/api/documents/[id]/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  try {
    // Attendre la résolution des params (Next.js 15)
    const { id: documentId } = await context.params;
    const { order, newOrder } = await request.json();

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

    // Validation des données
    if (typeof order !== "number" && typeof newOrder !== "number") {
      return NextResponse.json(
        { error: "Un ordre (order ou newOrder) est requis" },
        { status: 400 }
      );
    }

    // Utiliser newOrder si fourni, sinon order
    const targetOrder = newOrder !== undefined ? newOrder : order;

    // Mettre à jour l'ordre du document
    const updatedDocument = await prisma.documents.update({
      where: { id: documentId },
      data: {
        ordre: targetOrder,
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

    return NextResponse.json({
      message: "Ordre du document mis à jour avec succès",
      document: updatedDocument,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'ordre:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
