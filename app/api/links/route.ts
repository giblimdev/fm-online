// @/app/api/links/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const documentId = searchParams.get("documentId");

    const whereClause = documentId ? { documentId } : {};

    const links = await prisma.links.findMany({
      where: whereClause,
      include: {
        document: {
          select: {
            id: true,
            title: true,
            userId: true,
          },
        },
      },
      orderBy: { order: "asc" }, // Corrigé : ordre croissant plus logique
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error("Erreur lors de la récupération des liens:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, title, description, order, documentId } = await request.json();

    // Validation : seuls url et documentId sont obligatoires selon le schéma
    if (!url || !documentId) {
      return NextResponse.json(
        { error: "URL et documentId sont requis" },
        { status: 400 }
      );
    }

    // Vérifier que le document existe
    const document = await prisma.documents.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return NextResponse.json(
        { error: "Document non trouvé" },
        { status: 404 }
      );
    }

    const link = await prisma.links.create({
      data: {
        url,
        title, // Peut être null selon le schéma
        description,
        order, // Nouveau champ
        documentId,
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

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du lien:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
