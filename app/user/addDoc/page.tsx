// app/user/addDoc/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import {
  BookOpen,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
  Eye,
  Tag,
  Hash,
  Calendar,
  User,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import SuccessModal from "@/components/ui/SuccessModal";

// Types basés sur votre schéma Prisma
interface Document {
  id: string;
  title: string;
  description?: string;
  content?: string;
  ordre?: number;
  image?: string;
  grade?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
  liens: Array<{
    id: string;
    url: string;
    title?: string;
    description?: string;
    order?: number;
  }>;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  grade: string[];
  createdAt: string;
  updatedAt: string;
  _count: {
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

const categoryOptions = [
  { value: "", label: "Toutes les catégories" },
  { value: "emulation", label: "Émulation" },
  { value: "domatique", label: "Domatique" },
  { value: "marque", label: "Marque" },
  { value: "nautonier", label: "Nautonier" },
  { value: "kt", label: "Chevalier du Temple" },
];

export default function AddDocumentToLibraryPage() {
  const [allDocuments, setAllDocuments] = useState<Document[]>([]);
  const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
  const [userDocuments, setUserDocuments] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // État pour la modale de succès
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    documentTitle: "",
  });

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  // Redirection si pas de session
  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.push("/auth/login");
    }
  }, [session, sessionLoading, router]);

  // Charger le profil utilisateur et tous les documents
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserProfile();
      fetchAllDocuments();
    }
  }, [session]);

  // Filtrer les documents disponibles
  useEffect(() => {
    if (!userProfile) return;

    let filtered = allDocuments.filter((doc) => {
      if (userDocuments.includes(doc.id)) return false;

      if (doc.grade && userProfile.grade) {
        if (!userProfile.grade.includes(doc.grade as any)) {
          return false;
        }
      }

      if (
        searchTerm &&
        !doc.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (selectedGrade && doc.grade !== selectedGrade) {
        return false;
      }

      if (selectedCategory && doc.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    setAvailableDocuments(filtered);
  }, [
    allDocuments,
    userDocuments,
    userProfile,
    searchTerm,
    selectedGrade,
    selectedCategory,
  ]);

  const fetchUserProfile = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch(
        `/api/auth/profile?userId=${session.user.id}`
      );
      if (!response.ok)
        throw new Error("Erreur lors du chargement du profil utilisateur");

      const profile = await response.json();
      setUserProfile(profile);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger votre profil");
    }
  };

  const fetchAllDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      if (!response.ok)
        throw new Error("Erreur lors du chargement des documents");

      const data = await response.json();
      setAllDocuments(data);

      if (session?.user?.id) {
        const userDocs = data
          .filter((doc: Document) => doc.user.id === session.user.id)
          .map((doc: Document) => doc.id);
        setUserDocuments(userDocs);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger les documents");
    } finally {
      setIsLoading(false);
    }
  };

  const addToLibrary = async (documentId: string) => {
    if (!session?.user?.id) {
      setError("Session utilisateur introuvable");
      return;
    }

    setIsAdding(documentId);
    setError(null);

    try {
      const response = await fetch("/api/documents/copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalDocumentId: documentId,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de l'ajout à la bibliothèque"
        );
      }

      const result = await response.json();

      // Mettre à jour la liste des documents de l'utilisateur
      setUserDocuments((prev) => [...prev, result.id]);

      // Trouver le document original pour le message personnalisé
      const originalDoc = allDocuments.find((doc) => doc.id === documentId);
      const docTitle = originalDoc?.title || "Document";

      // Ouvrir la modale de succès au lieu du message simple
      setSuccessModal({
        isOpen: true,
        title: "Document ajouté avec succès !",
        message: `"${docTitle}" a été ajouté à votre bibliothèque personnelle. Vous pouvez maintenant y accéder depuis votre espace personnel.`,
        documentTitle: docTitle,
      });
    } catch (error) {
      console.error("Erreur:", error);
      setError(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setIsAdding(null);
    }
  };

  // Fermer la modale et rediriger vers la bibliothèque
  const handleModalContinue = () => {
    setSuccessModal({
      isOpen: false,
      title: "",
      message: "",
      documentTitle: "",
    });
    router.push("/user/dashboar");
  };

  // Fermer la modale sans redirection
  const handleModalClose = () => {
    setSuccessModal({
      isOpen: false,
      title: "",
      message: "",
      documentTitle: "",
    });
  };

  // Obtenir les grades disponibles pour l'utilisateur
  const getAvailableGrades = () => {
    if (!userProfile?.grade) return [];
    return [
      { value: "", label: "Tous mes grades" },
      ...userProfile.grade.map((grade) => ({
        value: grade,
        label: gradeLabels[grade as keyof typeof gradeLabels] || grade,
      })),
    ];
  };

  // Affichage du loading pendant la vérification de session
  if (sessionLoading || isLoading || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Chargement des documents...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const availableGrades = getAvailableGrades();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Messages de notification */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center animate-in slide-in-from-top-2">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-red-800 font-medium">{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-3 text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          )}

          {/* En-tête avec info utilisateur */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Plus className="h-8 w-8 text-white mr-4" />
                  <div>
                    <h1 className="text-3xl font-bold text-white">
                      Ajouter à ma bibliothèque
                    </h1>
                    <p className="text-blue-100 mt-2">
                      Découvrez et ajoutez des documents à votre collection
                      personnelle
                    </p>
                  </div>
                </div>

                {/* Info utilisateur */}
                <div className="text-right text-white">
                  <p className="text-lg font-semibold">{userProfile.name}</p>
                  <div className="flex gap-1 mt-2 justify-end">
                    {userProfile.grade.map((grade) => (
                      <span
                        key={grade}
                        className="px-2 py-1 text-xs bg-white/20 rounded-full"
                      >
                        {gradeLabels[grade as keyof typeof gradeLabels]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Filtres */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Recherche */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Rechercher un document..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Filtre par grade */}
                <div>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {availableGrades.map((grade) => (
                      <option key={grade.value} value={grade.value}>
                        {grade.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtre par catégorie */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Compteur de résultats */}
              <div className="mt-4 text-sm text-slate-600">
                {availableDocuments.length} document(s) disponible(s) pour vos
                grades
                {userDocuments.length > 0 && (
                  <span className="ml-4 text-blue-600">
                    • {userDocuments.length} document(s) dans votre bibliothèque
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Liste des documents */}
          {availableDocuments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
              <BookOpen className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Aucun document disponible
              </h3>
              <p className="text-slate-600">
                {allDocuments.length === 0
                  ? "Il n'y a actuellement aucun document dans la base."
                  : "Tous les documents compatibles avec vos grades sont déjà dans votre bibliothèque."}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableDocuments.map((document) => (
                <div
                  key={document.id}
                  className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="aspect-video overflow-hidden relative">
                    {document.image ? (
                      <Image
                        src={document.image}
                        alt={document.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-slate-400" />
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {document.grade && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full border ${
                            gradeColors[
                              document.grade as keyof typeof gradeColors
                            ]
                          }`}
                        >
                          {
                            gradeLabels[
                              document.grade as keyof typeof gradeLabels
                            ]
                          }
                        </span>
                      )}
                      {document.category && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full border bg-slate-100 text-slate-800 border-slate-200">
                          <Tag className="h-3 w-3 mr-1 inline" />
                          {document.category}
                        </span>
                      )}
                      {document.ordre && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full border bg-indigo-100 text-indigo-800 border-indigo-200">
                          <Hash className="h-3 w-3 mr-1 inline" />
                          {document.ordre}
                        </span>
                      )}
                    </div>

                    {/* Titre */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      {document.title}
                    </h3>

                    {/* Description */}
                    {document.description && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                        {document.description}
                      </p>
                    )}

                    {/* Métadonnées */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {document.user.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(document.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </div>
                    </div>

                    {/* Liens */}
                    {document.liens && document.liens.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center text-xs text-slate-500">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {document.liens.length} lien(s) associé(s)
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => addToLibrary(document.id)}
                        disabled={isAdding === document.id}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        {isAdding === document.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                        <span>
                          {isAdding === document.id ? "Ajout..." : "Ajouter"}
                        </span>
                      </button>

                      <button
                        onClick={() => router.push(`/public/${document.id}`)}
                        className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modale de succès */}
      <SuccessModal
        isOpen={successModal.isOpen}
        title={successModal.title}
        message={successModal.message}
        buttonText="Aller à ma bibliothèque"
        onContinue={handleModalContinue}
        onClose={handleModalClose}
      />
    </>
  );
}
