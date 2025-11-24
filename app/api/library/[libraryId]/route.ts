/*

// app/api/library/[libraryId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ libraryId: string }> }
) {
  try {
    const { libraryId } = await params;
    const { isFavorite, notes } = await request.json();

    console.log("🔄 Mise à jour bibliothèque:", {
      libraryId,
      isFavorite,
      notes,
    });

    // Vérifier que l'élément existe
    const existingItem = await prisma.library.findUnique({
      where: { id: libraryId },
      include: {
        document: {
          select: { id: true, title: true },
        },
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Élément de bibliothèque non trouvé" },
        { status: 404 }
      );
    }

    // Préparer les données à mettre à jour
    const updateData: any = {};

    if (typeof isFavorite === "boolean") {
      updateData.isFavorite = isFavorite;
    }

    if (notes !== undefined) {
      updateData.notes = notes;
    }

    // Mettre à jour l'élément
    const updatedItem = await prisma.library.update({
      where: { id: libraryId },
      data: updateData,
      include: {
        document: {
          include: {
            user: {
              select: { id: true, name: true },
            },
            liens: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    console.log("✅ Élément bibliothèque mis à jour:", updatedItem.id);

    return NextResponse.json({
      libraryId: updatedItem.id,
      addedAt: updatedItem.addedAt,
      isFavorite: updatedItem.isFavorite,
      notes: updatedItem.notes,
      document: updatedItem.document,
    });
  } catch (error) {
    console.error("❌ Erreur mise à jour bibliothèque:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la mise à jour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ libraryId: string }> }
) {
  try {
    const { libraryId } = await params;

    console.log("🗑️ Suppression de la bibliothèque:", libraryId);

    // Vérifier que l'élément existe
    const existingItem = await prisma.library.findUnique({
      where: { id: libraryId },
    });

    if (!existingItem) {
      return NextResponse.json(
        { error: "Élément de bibliothèque non trouvé" },
        { status: 404 }
      );
    }

    // Supprimer l'élément
    await prisma.library.delete({
      where: { id: libraryId },
    });

    console.log("✅ Élément supprimé de la bibliothèque");

    return NextResponse.json({ message: "Document retiré de la bibliothèque" });
  } catch (error) {
    console.error("❌ Erreur suppression bibliothèque:", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la suppression" },
      { status: 500 }
    );
  }
}
 */
