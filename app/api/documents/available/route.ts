// app/api/documents/available/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const gradesParam = searchParams.get("grades");
    const search = searchParams.get("search");
    const grade = searchParams.get("grade");
    const category = searchParams.get("category");

    console.log("🔍 API /documents/available appelée avec:", {
      userId,
      grades: gradesParam,
      search,
      grade,
      category,
    });

    if (!userId || !gradesParam) {
      return NextResponse.json(
        { error: "userId et grades sont requis" },
        { status: 400 }
      );
    }

    const userGrades = gradesParam.split(",").filter(Boolean);

    // ✅ SOLUTION : Récupérer d'abord les IDs des documents déjà dans la bibliothèque
    const documentsInLibrary = await prisma.library.findMany({
      where: { userId },
      select: { documentId: true },
    });

    const documentIdsInLibrary = documentsInLibrary.map(
      (item) => item.documentId
    );

    console.log(
      "📚 Documents déjà dans la bibliothèque:",
      documentIdsInLibrary
    );

    // Construire les conditions de filtrage
    const whereConditions: any = {
      // ✅ EXCLUSION EXPLICITE des documents déjà dans la bibliothèque
      id: {
        notIn: documentIdsInLibrary, // Exclure explicitement ces IDs
      },
      // Filtrer par grades accessibles à l'utilisateur
      OR: [
        { grade: null }, // Documents sans grade spécifique
        { grade: { in: userGrades } }, // Documents correspondant aux grades
      ],
    };

    // Ajouter les autres filtres...
    if (search && search.trim()) {
      const searchConditions = {
        OR: [
          { title: { contains: search.trim(), mode: "insensitive" } },
          { description: { contains: search.trim(), mode: "insensitive" } },
          { content: { contains: search.trim(), mode: "insensitive" } },
        ],
      };

      whereConditions.AND = whereConditions.AND || [];
      whereConditions.AND.push(searchConditions);
    }

    if (grade && grade.trim()) {
      whereConditions.grade = grade.trim();
    }

    if (category && category.trim()) {
      whereConditions.category = {
        contains: category.trim(),
        mode: "insensitive",
      };
    }

    console.log(
      "🔎 Conditions finales:",
      JSON.stringify(whereConditions, null, 2)
    );

    const availableDocuments = await prisma.documents.findMany({
      where: whereConditions,
      include: {
        user: {
          select: { id: true, name: true },
        },
        liens: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: [{ ordre: "asc" }, { createdAt: "desc" }],
    });

    console.log(
      `✅ ${availableDocuments.length} documents disponibles (après exclusion)`
    );

    // Double vérification pour le debug
    const stillInLibrary = availableDocuments.filter((doc) =>
      documentIdsInLibrary.includes(doc.id)
    );

    if (stillInLibrary.length > 0) {
      console.error(
        "❌ ERREUR: Documents encore présents dans les résultats:",
        stillInLibrary.map((d) => ({ id: d.id, title: d.title }))
      );
    }

    return NextResponse.json(availableDocuments || []);
  } catch (error) {
    console.error("❌ Erreur API documents/available:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
