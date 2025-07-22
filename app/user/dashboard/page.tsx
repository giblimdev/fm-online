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
} from "lucide-react";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";

interface Document {
  id: string;
  title: string;
  descrition?: string;
  grade?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  liens: DocumentLink[];
}

interface DocumentLink {
  id: string;
  url: string;
  title: string;
  description?: string;
  documentId: string;
}

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);
  const [documentsError, setDocumentsError] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Charger les documents de l'utilisateur
  const fetchUserDocuments = async (userId: string) => {
    try {
      setIsLoadingDocuments(true);
      setDocumentsError(null);
      const response = await fetch(`/api/documents?userId=${userId}`);
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      setDocumentsError("Impossible de charger vos documents");
      console.error("Erreur:", error);
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  // Supprimer un document
  const deleteDocument = async (documentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) return;

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setDocuments(documents.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression du document");
    }
  };

  const getGradeColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case "high":
      case "élevé":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
      case "moyen":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
      case "faible":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Accès correct aux données avec Better Auth
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
    router.push("/auth/login");
    return null;
  }

  const user = session.data.user;

  // Charger les documents quand l'utilisateur est disponible
  useEffect(() => {
    if (user?.id) {
      fetchUserDocuments(user.id);
    }
  }, [user?.id]);

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
                <span>Ajouter un rutiel</span>
              </Link>
              <Link
                href="/user/profile"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <Avatar className="h-4 w-4" />
                <span>Gérer mon profile</span>
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
                  Mes Rituels
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-600">
                  {documents.length} document{documents.length !== 1 ? "s" : ""}
                </span>
                <Link
                  href="/admin/documents"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Ajouter</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isLoadingDocuments ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <p className="text-slate-600">Chargement des documents...</p>
                </div>
              </div>
            ) : documentsError ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">{documentsError}</p>
                <button
                  onClick={() => fetchUserDocuments(user.id)}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Réessayer
                </button>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-slate-900 mb-2">
                  Aucun document
                </h4>
                <p className="text-slate-600 mb-6">
                  Ajouter un document pour commencer
                </p>
                <Link
                  href="/public"
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                >
                  <Plus className="h-5 w-5" />
                  <span>Ajouter un document</span>
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.slice(0, 6).map((document) => (
                  <div
                    key={document.id}
                    className="bg-slate-50 rounded-xl p-4 hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    {/* Image du document */}
                    {document.image && (
                      <div className="mb-3">
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

                    <div className="flex items-start justify-between mb-3">
                      <h5 className="font-semibold text-slate-900 line-clamp-2 flex-1">
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

                    {document.descrition && (
                      <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                        {document.descrition}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(document.createdAt)}</span>
                      </div>
                      {document.liens.length > 0 && (
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
                        href={`/public/documents/${document.id}`}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium text-center flex items-center justify-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Voir</span>
                      </Link>
                      <Link
                        href={`/admin/documents`}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Edit className="h-3 w-3" />
                      </Link>
                      <button
                        onClick={() => deleteDocument(document.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {documents.length > 6 && (
              <div className="mt-6 text-center">
                <Link
                  href="/admin/documents"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir tous les documents ({documents.length})
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
                <strong>Nombre de documents:</strong> {documents.length}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
