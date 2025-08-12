// app/dashboard/page.tsx
"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FileText,
  ExternalLink,
  Calendar,
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  AlertCircle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Heart,
  HeartOff,
} from "lucide-react";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";

interface DocumentLink {
  id: string;
  url: string;
  title?: string;
  order?: number;
  description?: string;
  documentId: string;
}

interface Document {
  id: string;
  title: string;
  description?: string;
  ordre?: number;
  content?: string;
  image?: string;
  grade?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  liens: DocumentLink[];
}

interface LibraryItem {
  id: string;
  addedAt: string;
  isFavorite: boolean;
  notes?: string;
  userId: string;
  documentId: string;
  document: Document;
}

type SortField =
  | "title"
  | "createdAt"
  | "updatedAt"
  | "ordre"
  | "category"
  | "addedAt";
type SortOrder = "asc" | "desc";

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [documentsError, setDocumentsError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("ordre");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Fonction de tri des éléments de bibliothèque - VERSION SÉCURISÉE
  const sortLibraryItems = (
    items: LibraryItem[],
    field: SortField,
    order: SortOrder
  ) => {
    // Vérification de sécurité pour éviter l'erreur undefined
    if (!items || !Array.isArray(items) || items.length === 0) {
      return [];
    }

    return [...items].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (field) {
        case "title":
          aValue = (a.document?.title || "").toLowerCase();
          bValue = (b.document?.title || "").toLowerCase();
          break;
        case "createdAt":
          aValue = new Date(a.document?.createdAt || 0).getTime();
          bValue = new Date(b.document?.createdAt || 0).getTime();
          break;
        case "updatedAt":
          aValue = new Date(a.document?.updatedAt || 0).getTime();
          bValue = new Date(b.document?.updatedAt || 0).getTime();
          break;
        case "addedAt":
          aValue = new Date(a.addedAt || 0).getTime();
          bValue = new Date(b.addedAt || 0).getTime();
          break;
        case "ordre":
          // Mettre les documents sans ordre à la fin
          aValue = a.document?.ordre ?? 999999;
          bValue = b.document?.ordre ?? 999999;
          break;
        case "category":
          aValue = (a.document?.category || "zzz").toLowerCase();
          bValue = (b.document?.category || "zzz").toLowerCase();
          break;
        default:
          aValue = new Date(a.addedAt || 0).getTime();
          bValue = new Date(b.addedAt || 0).getTime();
      }

      if (order === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  // Changer le tri
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder(field === "ordre" ? "asc" : "desc");
    }
  };

  // Charger les documents de la bibliothèque de l'utilisateur - VERSION SÉCURISÉE
  const fetchUserLibrary = async (userId: string) => {
    try {
      setIsLoadingDocuments(true);
      setDocumentsError(null);
      const response = await fetch(`/api/library?userId=${userId}`);
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();

      // Vérification de sécurité pour s'assurer que data est un tableau
      if (Array.isArray(data)) {
        setLibraryItems(data);
      } else {
        console.warn("Les données reçues ne sont pas un tableau:", data);
        setLibraryItems([]);
      }
    } catch (error) {
      setDocumentsError("Impossible de charger votre bibliothèque");
      console.error("Erreur:", error);
      // En cas d'erreur, s'assurer que libraryItems reste un tableau vide
      setLibraryItems([]);
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  // Supprimer un document de la bibliothèque
  const removeFromLibrary = async (libraryId: string) => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir retirer ce document de votre bibliothèque ?"
      )
    )
      return;

    try {
      const response = await fetch(`/api/library/${libraryId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setLibraryItems((prevItems) =>
        prevItems.filter((item) => item.id !== libraryId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression du document");
    }
  };

  // Basculer le statut favori
  const toggleFavorite = async (libraryId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/library/${libraryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFavorite: !currentStatus,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      setLibraryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === libraryId ? { ...item, isFavorite: !currentStatus } : item
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour du favori");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getGradeColor = (grade?: string) => {
    switch (grade?.toUpperCase()) {
      case "APP":
        return "bg-green-100 text-green-800 border-green-200";
      case "CP":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "M":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "MMARQUE":
        return "bg-red-100 text-red-800 border-red-200";
      case "VM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "NAUTONIER":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "CPARCHEDOM":
        return "bg-pink-100 text-pink-800 border-pink-200";
      case "KT":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Date inconnue";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 text-gray-400" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3 w-3 text-blue-600" />
    ) : (
      <ArrowDown className="h-3 w-3 text-blue-600" />
    );
  };

  // Redirection si pas de session
  useEffect(() => {
    if (!session.isPending && !session.data?.user) {
      router.push("/auth/login");
    }
  }, [session.isPending, session.data?.user, router]);

  // Chargement des documents
  useEffect(() => {
    const userId = session.data?.user?.id;
    if (userId) {
      fetchUserLibrary(userId);
    }
  }, [session.data?.user?.id]);

  // Éléments de bibliothèque triés - VERSION SÉCURISÉE
  const sortedLibraryItems = sortLibraryItems(
    libraryItems || [],
    sortField,
    sortOrder
  );

  // Extraction des documents pour l'affichage
  const documents = libraryItems.map((item) => item.document);

  // Affichage pendant le chargement de la session
  if (session.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <div className="text-xl font-medium text-slate-600">
            Chargement...
          </div>
        </div>
      </div>
    );
  }

  if (!session.data?.user) {
    return null;
  }

  const user = session.data.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header moderne */}
      <nav className="bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-6">
              <span className="text-slate-700 font-medium">
                Bonjour, {user.name}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Bienvenue dans votre espace
          </h2>
          <p className="text-slate-600 text-lg">
            Gérez vos documents et accédez à vos outils
          </p>
        </div>

        {/* Cartes d'informations */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">
              Profil
            </h3>
            <div className="space-y-2">
              <p className="text-slate-600">
                <span className="font-medium">Nom:</span> {user.name}
              </p>
              <p className="text-slate-600">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-slate-600">
                <span className="font-medium">ID:</span> {user.id.slice(-8)}...
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">
              Statut
            </h3>
            <div className="space-y-2">
              <p className="text-green-600 font-medium flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Connecté
              </p>
              <p className="text-slate-600">Session active</p>
              <p className="text-slate-600">
                Email vérifié:{" "}
                {user.emailVerified ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-red-600">✗</span>
                )}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">
              Actions rapides
            </h3>
            <div className="space-y-3">
              <Link
                href="/public"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Découvrir les rituels</span>
              </Link>
              <Link
                href="/user/profile"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Avatar className="h-4 w-4" />
                <span>Gérer mon profil</span>
              </Link>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-colors font-medium">
                Paramètres
              </button>
            </div>
          </div>
        </div>

        {/* Section Documents */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900">
                  Ma Bibliothèque
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">
                  {libraryItems.length} document
                  {libraryItems.length !== 1 ? "s" : ""}
                </span>
                <Link
                  href="/public"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Découvrir</span>
                </Link>
              </div>
            </div>

            {/* Contrôles de tri */}
            {libraryItems.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-slate-700 mr-2">
                  Trier par:
                </span>
                <button
                  onClick={() => handleSort("ordre")}
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    sortField === "ordre"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>Ordre</span>
                  {getSortIcon("ordre")}
                </button>
                <button
                  onClick={() => handleSort("title")}
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    sortField === "title"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>Titre</span>
                  {getSortIcon("title")}
                </button>
                <button
                  onClick={() => handleSort("addedAt")}
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    sortField === "addedAt"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>Ajouté le</span>
                  {getSortIcon("addedAt")}
                </button>
                <button
                  onClick={() => handleSort("category")}
                  className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    sortField === "category"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <span>Catégorie</span>
                  {getSortIcon("category")}
                </button>
              </div>
            )}
          </div>

          <div className="p-6">
            {isLoadingDocuments ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <p className="text-slate-600">
                    Chargement de votre bibliothèque...
                  </p>
                </div>
              </div>
            ) : documentsError ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">{documentsError}</p>
                <button
                  onClick={() => fetchUserLibrary(user.id)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Réessayer
                </button>
              </div>
            ) : libraryItems.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-slate-900 mb-2">
                  Votre bibliothèque est vide
                </h4>
                <p className="text-slate-600 mb-6">
                  Découvrez et ajoutez des rituels à votre bibliothèque
                </p>
                <Link
                  href="/public"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span>Découvrir les rituels</span>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedLibraryItems.slice(0, 6).map((libraryItem) => {
                  const document = libraryItem.document;
                  return (
                    <div
                      key={libraryItem.id}
                      className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors border border-slate-200 relative"
                    >
                      {/* Badge d'ordre et favori */}
                      <div className="absolute top-2 left-2 flex items-center space-x-2">
                        {document.ordre && (
                          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            #{document.ordre}
                          </div>
                        )}
                      </div>

                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() =>
                            toggleFavorite(
                              libraryItem.id,
                              libraryItem.isFavorite
                            )
                          }
                          className={`p-1 rounded-full transition-colors ${
                            libraryItem.isFavorite
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          {libraryItem.isFavorite ? (
                            <Heart className="h-4 w-4 fill-current" />
                          ) : (
                            <HeartOff className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      {/* Image du document */}
                      {document.image && (
                        <div className="mb-3 mt-6">
                          <img
                            src={document.image}
                            alt={document.title}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3 mt-8">
                        <h5 className="font-semibold text-slate-900 line-clamp-2 flex-1 pr-2">
                          {document.title}
                        </h5>
                        {document.grade && (
                          <span
                            className={`ml-2 px-2 py-1 text-xs font-medium border rounded-lg flex-shrink-0 ${getGradeColor(
                              document.grade
                            )}`}
                          >
                            {document.grade}
                          </span>
                        )}
                      </div>

                      {document.category && (
                        <div className="mb-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {document.category}
                          </span>
                        </div>
                      )}

                      {document.description && (
                        <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                          {document.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>
                            Ajouté le {formatDate(libraryItem.addedAt)}
                          </span>
                        </div>
                        {document.liens && document.liens.length > 0 && (
                          <div className="flex items-center">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            <span>
                              {document.liens.length} lien
                              {document.liens.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/user/documents/${document.id}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium text-center flex items-center justify-center space-x-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Voir</span>
                        </Link>
                        <button
                          onClick={() => removeFromLibrary(libraryItem.id)}
                          className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg transition-colors text-sm"
                          title="Retirer de la bibliothèque"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {libraryItems.length > 6 && (
              <div className="mt-6 text-center">
                <Link
                  href="/user/library"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir toute la bibliothèque ({libraryItems.length})
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Zone de contenu principal */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-900">
            Informations de session
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-slate-600">
                <strong>Session ID:</strong> {session.data.session?.id}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                <strong>Compte créé le:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                <strong>Dernière mise à jour:</strong>{" "}
                {new Date(user.updatedAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <div>
              <p className="text-slate-600">
                <strong>Documents dans la bibliothèque:</strong>{" "}
                {libraryItems.length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
