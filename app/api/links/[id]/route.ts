// @/app/api/links/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Interface pour les paramètres selon Next.js 15
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    // Attendre la résolution des params (Next.js 15)
    const { id: linkId } = await context.params;

    const link = await prisma.links.findUnique({
      where: { id: linkId },
      include: {
        document: {
          select: {
            id: true,
            title: true,
            userId: true,
          },
        },
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Lien non trouvé" }, { status: 404 });
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error("Erreur lors de la récupération du lien:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteParams) {
  try {
    const { id: linkId } = await context.params;
    const { url, title, description, order } = await request.json();

    const existingLink = await prisma.links.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return NextResponse.json({ error: "Lien non trouvé" }, { status: 404 });
    }

    // Validation : seule l'URL est obligatoire selon le schéma
    if (!url) {
      return NextResponse.json({ error: "URL est requise" }, { status: 400 });
    }

    const link = await prisma.links.update({
      where: { id: linkId },
      data: {
        url,
        title, // Peut être null
        description,
        order, // Nouveau champ ajouté
      },
      include: {
        document: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du lien:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  try {
    // Attendre la résolution des params (Next.js 15)
    const { id: linkId } = await context.params;

    // Vérifier que le lien existe
    const existingLink = await prisma.links.findUnique({
      where: { id: linkId },
    });

    if (!existingLink) {
      return NextResponse.json({ error: "Lien non trouvé" }, { status: 404 });
    }

    await prisma.links.delete({
      where: { id: linkId },
    });

    return NextResponse.json({
      message: "Lien supprimé avec succès",
      deletedId: linkId,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du lien:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
