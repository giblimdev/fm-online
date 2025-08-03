import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    console.log(`[API GET] Récupération du texte id=${id}`);

    const text = await prisma.text.findUnique({ where: { id } });

    if (!text) {
      console.log(`[API GET] Texte non trouvé id=${id}`);
      return NextResponse.json({ error: "Texte non trouvé" }, { status: 404 });
    }

    console.log(`[API GET] Texte récupéré avec succès id=${id}`);
    return NextResponse.json(text);
  } catch (error) {
    console.error(`[API GET] Erreur récupération texte id=${(await context.params).id}:`, error);
    return NextResponse.json({ error: "Erreur récupération texte" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    console.log(`[API PUT] Mise à jour du texte id=${id}`);

    const body = await req.json();
    const { title, content, category, grade, ordre, isActive, isPublic } = body;

    if (!title || !content) {
      console.log(`[API PUT] Champs obligatoires manquants pour id=${id}`);
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      );
    }

    const wordCount = content.trim().split(/\s+/).length;

    const updatedText = await prisma.text.update({
      where: { id },
      data: {
        title,
        content,
        category: category ?? null,
        grade: grade ?? null,
        ordre: ordre ?? 20,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
        isPublic: isPublic !== undefined ? Boolean(isPublic) : false,
        wordCount,
      },
    });

    console.log(`[API PUT] Texte mis à jour avec succès id=${id}`);
    return NextResponse.json(updatedText);
  } catch (error) {
    console.error(`[API PUT] Erreur mise à jour texte id=${(await context.params).id}:`, error);
    return NextResponse.json({ error: "Erreur mise à jour texte" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    console.log(`[API DELETE] Suppression du texte id=${id}`);

    await prisma.text.delete({ where: { id } });
    console.log(`[API DELETE] Texte supprimé avec succès id=${id}`);
    return NextResponse.json({ message: "Texte supprimé" });
  } catch (error) {
    console.error(`[API DELETE] Erreur suppression texte id=${(await context.params).id}:`, error);
    return NextResponse.json({ error: "Erreur suppression texte" }, { status: 500 });
  }
}
