// app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Image as ImageIcon,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";

// Types basés sur votre schéma Prisma
interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  grade: string[];
  createdAt: string;
  updatedAt: string;
  _count?: {
    documents: number;
  };
}

const gradeLabels = {
  APP: "Apprenti",
  CP: "Compagnon",
  M: "Maître",
  MMARQUE: "Maître de Marque",
  VM: "Vénérable Maître",
  NAUTONIER: "Nautonier",
  CPARCHEDOM: "Compagnon Arche Royale",
  KT: "Chevalier du Temple",
};

const gradeColors = {
  APP: "bg-blue-100 text-blue-800 border-blue-200",
  CP: "bg-green-100 text-green-800 border-green-200",
  M: "bg-purple-100 text-purple-800 border-purple-200",
  MMARQUE: "bg-indigo-100 text-indigo-800 border-indigo-200",
  VM: "bg-red-100 text-red-800 border-red-200",
  NAUTONIER: "bg-cyan-100 text-cyan-800 border-cyan-200",
  CPARCHEDOM: "bg-amber-100 text-amber-800 border-amber-200",
  KT: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // États pour l'édition
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editGrades, setEditGrades] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  // Utilisation de useSession de Better Auth
  const { data: session, isPending: sessionLoading } = useSession();

  useEffect(() => {
    // Vérifier l'authentification avant de charger le profil
    if (!sessionLoading) {
      if (!session?.user) {
        router.push("/auth/login");
        return;
      }
      fetchUserProfile();
    }
  }, [session, sessionLoading, router]);

  const fetchUserProfile = async () => {
    if (!session?.user?.id) {
      setError("Session utilisateur introuvable");
      setIsLoading(false);
      return;
    }

    try {
      // Passer l'userId dans les query params comme attendu par la route
      const response = await fetch(
        `/api/auth/profile?userId=${session.user.id}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/login");
          return;
        }
        throw new Error("Erreur lors de la récupération du profil");
      }

      const userData = await response.json();
      setUser(userData);
      setEditName(userData.name);
      setEditEmail(userData.email);
      setEditGrades(userData.grade);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger le profil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("L'image ne doit pas dépasser 5MB");
        return;
      }

      // Vérifier le type
      if (!file.type.startsWith("image/")) {
        setError("Veuillez sélectionner une image valide");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGradeToggle = (grade: string) => {
    setEditGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade]
    );
  };

  const handleSave = async () => {
    if (!session?.user?.id) {
      setError("Session utilisateur introuvable");
      return;
    }

    if (!editName.trim()) {
      setError("Le nom est requis");
      return;
    }

    if (!editEmail.trim()) {
      setError("L'email est requis");
      return;
    }

    if (editGrades.length === 0) {
      setError("Au moins un grade doit être sélectionné");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", editName.trim());
      formData.append("email", editEmail.trim());
      formData.append("grade", JSON.stringify(editGrades));
      // Passer l'userId dans le FormData comme attendu par la route PUT
      formData.append("userId", session.user.id);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la mise à jour");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setImageFile(null);
      setImagePreview(null);
      setSuccess("Profil mis à jour avec succès");

      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Erreur:", error);
      setError(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(user?.name || "");
    setEditEmail(user?.email || "");
    setEditGrades(user?.grade || []);
    setImageFile(null);
    setImagePreview(null);
    setError(null);
  };

  // Affichage du loading pendant la vérification de session
  if (sessionLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600">Impossible de charger le profil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Messages de notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
            <span className="text-red-800">{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <span className="text-green-800">{success}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* En-tête du profil */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-12">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Photo de profil */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
                  {imagePreview || user.image ? (
                    <Image
                      src={imagePreview || user.image!}
                      alt={user.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <User className="h-16 w-16 text-slate-400" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-colors">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Informations principales */}
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.name}
                </h1>
                <div className="flex items-center justify-center sm:justify-start text-blue-100 mb-4">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                  {user.emailVerified && (
                    <CheckCircle className="h-4 w-4 ml-2 text-green-300" />
                  )}
                </div>
                <div className="flex items-center justify-center sm:justify-start text-blue-100 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    Membre depuis{" "}
                    {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>

              {/* Bouton d'édition */}
              <div className="flex items-center">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Modifier le profil</span>
                  </button>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>
                        {isSaving ? "Enregistrement..." : "Enregistrer"}
                      </span>
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                    >
                      <X className="h-4 w-4" />
                      <span>Annuler</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contenu du profil */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Informations personnelles */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-blue-600" />
                  Informations personnelles
                </h2>

                <div className="space-y-6">
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nom complet
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre nom complet"
                      />
                    ) : (
                      <div className="px-4 py-3 border border-slate-200 rounded-xl bg-slate-50">
                        {user.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Adresse email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    ) : (
                      <div className="px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 flex items-center justify-between">
                        <span>{user.email}</span>
                        {user.emailVerified ? (
                          <span className="flex items-center text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Vérifié
                          </span>
                        ) : (
                          <span className="text-amber-600 text-sm">
                            Non vérifié
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Grades maçonniques */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-blue-600" />
                  Grades maçonniques
                </h2>

                {isEditing ? (
                  <div className="space-y-3">
                    {Object.entries(gradeLabels).map(([key, label]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editGrades.includes(key)}
                          onChange={() => handleGradeToggle(key)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                        />
                        <span className="ml-3 text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.grade.map((grade) => (
                      <span
                        key={grade}
                        className={`px-3 py-1 text-sm font-medium rounded-full border ${
                          gradeColors[grade as keyof typeof gradeColors]
                        }`}
                      >
                        {gradeLabels[grade as keyof typeof gradeLabels]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Statistiques */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Statistiques
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="text-3xl font-bold text-blue-800 mb-2">
                    {user._count?.documents || 0}
                  </div>
                  <div className="text-blue-600 font-medium">
                    Documents créés
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <div className="text-3xl font-bold text-green-800 mb-2">
                    {user.grade.length}
                  </div>
                  <div className="text-green-600 font-medium">
                    Grades obtenus
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <div className="text-3xl font-bold text-purple-800 mb-2">
                    {Math.floor(
                      (Date.now() - new Date(user.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </div>
                  <div className="text-purple-600 font-medium">
                    Jours d'ancienneté
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
