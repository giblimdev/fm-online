// app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  console.log("🔍 GET /api/documents - Début de la requête");

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    console.log("📋 Paramètres reçus:", {
      userId,
      hasUserId: !!userId,
    });

    const whereClause = userId ? { userId: userId.trim() } : {};
    console.log("🔎 Clause WHERE:", whereClause);

    const documents = await prisma.documents.findMany({
      where: whereClause,
      include: {
        liens: {
          orderBy: { order: "asc" },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Library: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
      orderBy: [{ ordre: "desc" }, { createdAt: "desc" }],
    });

    console.log(`✅ ${documents.length} documents récupérés`);

    return NextResponse.json(documents);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des documents:", error);

    return NextResponse.json(
      {
        error: "Erreur interne du serveur",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log("📝 POST /api/documents - Début de la création");

  try {
    const requestBody = await request.json();
    console.log("📋 Corps de la requête reçu:", requestBody);

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
    } = requestBody;

    // ✅ VÉRIFICATION OBLIGATOIRE pour POST
    if (!title || !title.trim()) {
      console.warn("⚠️ Titre manquant ou vide");
      return NextResponse.json(
        { error: "Le titre est requis et ne peut pas être vide" },
        { status: 400 }
      );
    }

    if (!userId || !userId.trim()) {
      console.warn("⚠️ UserId manquant pour la création");
      return NextResponse.json(
        { error: "UserId est requis pour créer un document" },
        { status: 400 }
      );
    }

    // Validation du grade s'il est fourni
    const validGrades = [
      "APP",
      "CP",
      "M",
      "MMARQUE",
      "VM",
      "NAUTONIER",
      "CPARCHEDOM",
      "KT",
    ];
    if (grade && !validGrades.includes(grade)) {
      console.warn("⚠️ Grade invalide:", grade);
      return NextResponse.json(
        {
          error: `Grade invalide. Valeurs acceptées: ${validGrades.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // ✅ CORRECTION : Validation de l'ordre - autoriser null et undefined
    if (
      ordre !== null &&
      ordre !== undefined &&
      (typeof ordre !== "number" || ordre < 0)
    ) {
      console.warn("⚠️ Ordre invalide:", ordre);
      return NextResponse.json(
        { error: "L'ordre doit être un nombre positif ou null" },
        { status: 400 }
      );
    }

    console.log("✅ Validation ordre OK:", { ordre, type: typeof ordre });

    // ✅ VÉRIFICATION que l'utilisateur existe pour POST
    console.log("🔍 Vérification utilisateur:", userId.trim());
    const userExists = await prisma.user.findUnique({
      where: { id: userId.trim() },
      select: { id: true, name: true },
    });

    if (!userExists) {
      console.warn("⚠️ Utilisateur non trouvé:", userId);
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    console.log("✅ Utilisateur vérifié:", userExists.name);

    // Validation et préparation des liens
    const liensData = [];
    if (liens && Array.isArray(liens)) {
      for (const [index, link] of liens.entries()) {
        if (!link.url || !link.url.trim()) {
          console.warn("⚠️ URL de lien manquante à l'index:", index);
          return NextResponse.json(
            { error: `URL requise pour le lien à la position ${index + 1}` },
            { status: 400 }
          );
        }

        // Validation basique de l'URL
        try {
          new URL(link.url.trim());
        } catch (urlError) {
          console.warn("⚠️ URL invalide:", link.url);
          return NextResponse.json(
            { error: `URL invalide pour le lien à la position ${index + 1}` },
            { status: 400 }
          );
        }

        liensData.push({
          url: link.url.trim(),
          title: link.title?.trim() || null,
          description: link.description?.trim() || null,
          order: typeof link.order === "number" ? link.order : index,
        });
      }
    }

    console.log("🔗 Liens validés:", liensData.length);

    // Création du document
    console.log("🚀 Création du document...");
    const document = await prisma.documents.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        ordre: ordre || null, // ✅ CORRECTION : Permettre null
        content: content?.trim() || null,
        image: image?.trim() || null,
        grade: grade?.trim() || null,
        category: category?.trim() || null,
        userId: userId.trim(),
        liens: {
          create: liensData,
        },
      },
      include: {
        liens: {
          orderBy: { order: "asc" },
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

    console.log("✅ Document créé avec succès:", {
      id: document.id,
      title: document.title,
      ordre: document.ordre,
      liensCreated: document.liens?.length || 0,
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de la création du document:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue";

    // Gestion d'erreurs JSON
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Format JSON invalide dans la requête" },
        { status: 400 }
      );
    }

    // Gestion d'erreurs Prisma
    if (error && typeof error === "object" && "code" in error) {
      const prismaError = error as any;
      console.error("🔍 Code d'erreur Prisma:", prismaError.code);

      switch (prismaError.code) {
        case "P2002":
          return NextResponse.json(
            { error: "Un document avec ces informations existe déjà" },
            { status: 409 }
          );
        case "P2003":
          return NextResponse.json(
            { error: "Référence invalide (utilisateur inexistant)" },
            { status: 400 }
          );
        default:
          console.error("🔍 Erreur Prisma non gérée:", prismaError);
      }
    }

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
