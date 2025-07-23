// app/api/auth/profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    // Récupérer l'ID utilisateur depuis les query params
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "ID utilisateur requis" },
        { status: 400 }
      );
    }

    // Récupérer le profil utilisateur avec les statistiques
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        grade: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Traiter les données du formulaire
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const gradeString = formData.get("grade") as string;
    const userId = formData.get("userId") as string;
    const imageFile = formData.get("image") as File | null;

    if (!userId) {
      return NextResponse.json(
        { error: "ID utilisateur requis" },
        { status: 400 }
      );
    }

    // Validation des données
    if (!name?.trim()) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json(
        { error: "L'email est requis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Parser les grades
    let grades: string[] = [];
    try {
      grades = JSON.parse(gradeString);
      if (!Array.isArray(grades)) {
        throw new Error("Les grades doivent être un tableau");
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Format des grades invalide" },
        { status: 400 }
      );
    }

    if (grades.length === 0) {
      return NextResponse.json(
        { error: "Au moins un grade doit être sélectionné" },
        { status: 400 }
      );
    }

    // Valider que les grades existent dans l'enum
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
    const invalidGrades = grades.filter(
      (grade) => !validGrades.includes(grade)
    );
    if (invalidGrades.length > 0) {
      return NextResponse.json(
        { error: `Grades invalides: ${invalidGrades.join(", ")}` },
        { status: 400 }
      );
    }

    // Vérifier que l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Vérifier que l'email n'est pas déjà utilisé par un autre utilisateur
    const emailInUse = await prisma.user.findFirst({
      where: {
        email: email.trim(),
        NOT: {
          id: userId,
        },
      },
    });

    if (emailInUse) {
      return NextResponse.json(
        { error: "Cette adresse email est déjà utilisée" },
        { status: 400 }
      );
    }

    // Préparer les données de mise à jour
    const updateData: any = {
      name: name.trim(),
      email: email.trim(),
      grade: grades,
    };

    // Traiter l'upload d'image si présente
    if (imageFile && imageFile.size > 0) {
      // Vérifier la taille (max 5MB)
      if (imageFile.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "L'image ne doit pas dépasser 5MB" },
          { status: 400 }
        );
      }

      // Vérifier le type de fichier
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Veuillez sélectionner une image valide" },
          { status: 400 }
        );
      }

      try {
        // Créer le dossier uploads s'il n'existe pas
        const uploadDir = join(process.cwd(), "public", "uploads");
        await mkdir(uploadDir, { recursive: true });

        // Générer un nom de fichier unique
        const fileExtension = imageFile.name.split(".").pop();
        const fileName = `profile-${userId}-${Date.now()}.${fileExtension}`;

        // Sauvegarder le fichier
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(join(uploadDir, fileName), buffer);

        updateData.image = `/uploads/${fileName}`;
      } catch (error) {
        console.error("Erreur lors de l'upload:", error);
        return NextResponse.json(
          { error: "Erreur lors de l'upload de l'image" },
          { status: 500 }
        );
      }
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        grade: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            documents: true,
          },
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
