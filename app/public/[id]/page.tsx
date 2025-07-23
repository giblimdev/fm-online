// app/public/documents/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth/auth-client";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Tag,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  Share2,
  Plus,
  User,
  BookOpen,
  Globe,
  Heart,
  Eye,
  FileText,
  FolderOpen,
  Hash,
  Lock,
  Info,
} from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  title: string;
  description?: string;
  content?: string;
  grade?: string;
  category?: string;
  ordre?: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  liens: DocumentLink[];
}

interface DocumentLink {
  id: string;
  url: string;
  title?: string;
  description?: string;
  order?: number;
  documentId: string;
}

export default function DocumentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLinkId, setCopiedLinkId] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [isAddedToLibrary, setIsAddedToLibrary] = useState(false);
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const documentId = params.id as string;

  useEffect(() => {
    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/documents/${documentId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Document non trouvé");
        }
        throw new Error("Erreur lors du chargement");
      }
      const data = await response.json();
      setDocument(data);
    } catch (error: any) {
      setError(error.message || "Impossible de charger le document");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToLibrary = async () => {
    if (!session?.user) {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 4000);
      return;
    }

    setIsAddingToLibrary(true);
    try {
      const response = await fetch("/api/user/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: document?.id,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        setIsAddedToLibrary(true);
        setShareMessage("Document ajouté à votre bibliothèque !");
        setTimeout(() => setShareMessage(null), 3000);
      } else {
        throw new Error("Erreur lors de l'ajout");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout à la bibliothèque:", error);
      setShareMessage("Erreur lors de l'ajout");
      setTimeout(() => setShareMessage(null), 3000);
    } finally {
      setIsAddingToLibrary(false);
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

  const getCategoryColor = (category?: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-purple-100 text-purple-800 border-purple-200",
      "bg-indigo-100 text-indigo-800 border-indigo-200",
      "bg-pink-100 text-pink-800 border-pink-200",
      "bg-teal-100 text-teal-800 border-teal-200",
    ];
    if (!category) return "bg-slate-100 text-slate-800 border-slate-200";
    const hash = category.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = async (text: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLinkId(linkId);
      setTimeout(() => setCopiedLinkId(null), 2000);
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
    }
  };

  const shareDocument = async () => {
    const url = window.location.href;
    const title = document?.title || "Document";
    const text = document?.description || "Consultez ce document";

    try {
      if (
        navigator.share &&
        /Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
      ) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("Lien copié dans le presse-papiers !");
        setTimeout(() => setShareMessage(null), 3000);
      }
    } catch (error) {
      console.error("Erreur lors du partage:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-slate-600 font-medium text-lg">
            Chargement du document...
          </p>
        </div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            {error === "Document non trouvé"
              ? "Document introuvable"
              : "Erreur"}
          </h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            {error === "Document non trouvé"
              ? "Le document demandé n'existe pas ou a été supprimé. Peut-être qu'il a été déplacé ou que le lien est incorrect."
              : error}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => router.back()}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour</span>
            </button>
            <Link
              href="/public/documents"
              className="block w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors font-medium text-center"
            >
              Voir tous les documents
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Messages flottants */}
      {shareMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5" />
            <span className="font-medium">{shareMessage}</span>
          </div>
        </div>
      )}

      {showLoginPrompt && (
        <div className="fixed top-4 right-4 bg-blue-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-pulse">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">Connexion requise</span>
            </div>
            <p className="text-sm text-blue-100">
              Connectez-vous pour ajouter ce document à votre bibliothèque
            </p>
            <div className="flex space-x-2 mt-2">
              <Link
                href="/auth/login"
                className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Se connecter
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-400 transition-colors"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/public/documents"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Retour aux documents</span>
            </Link>

            <div className="flex items-center space-x-4">
              <button
                onClick={addToLibrary}
                disabled={isAddingToLibrary || isAddedToLibrary}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isAddedToLibrary
                    ? "bg-green-100 text-green-800 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {isAddingToLibrary ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isAddedToLibrary ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Heart className="h-4 w-4" />
                )}
                <span>
                  {isAddingToLibrary
                    ? "Ajout..."
                    : isAddedToLibrary
                    ? "Dans ma bibliothèque"
                    : "Ajouter à ma bibliothèque"}
                </span>
              </button>

              <button
                onClick={shareDocument}
                className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors font-medium"
              >
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Image de couverture */}
          {document.image && (
            <div className="aspect-video md:aspect-[21/9] overflow-hidden">
              <img
                src={document.image}
                alt={document.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.parentElement!.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Header du document */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 min-w-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                    {document.title}
                  </h1>

                  {/* Tags informatifs */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {document.grade && (
                      <span
                        className={`px-4 py-2 text-sm font-bold border rounded-xl ${getGradeColor(
                          document.grade
                        )}`}
                      >
                        Priorité: {document.grade}
                      </span>
                    )}

                    {document.category && (
                      <span
                        className={`px-4 py-2 text-sm font-bold border rounded-xl ${getCategoryColor(
                          document.category
                        )}`}
                      >
                        <FolderOpen className="h-4 w-4 inline mr-1" />
                        {document.category}
                      </span>
                    )}

                    {document.ordre !== null &&
                      document.ordre !== undefined && (
                        <span className="px-4 py-2 text-sm font-bold border rounded-xl bg-indigo-100 text-indigo-800 border-indigo-200">
                          <Hash className="h-4 w-4 inline mr-1" />
                          Ordre: {document.ordre}
                        </span>
                      )}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Publié le {formatDate(document.createdAt)}</span>
                </div>
                {document.updatedAt !== document.createdAt && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Modifié le {formatDate(document.updatedAt)}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>
                    {document.liens.length} lien
                    {document.liens.length !== 1 ? "s" : ""} informatif
                    {document.liens.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Document public</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu du document */}
          <div className="px-8 py-12">
            <div className="max-w-4xl mx-auto">
              {/* Description */}
              {document.description && (
                <div className="prose prose-lg prose-slate max-w-none mb-16">
                  <div className="bg-slate-50 rounded-3xl p-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                      <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                      Description
                    </h2>
                    <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                      {document.description}
                    </div>
                  </div>
                </div>
              )}

              {/* Contenu principal */}
              {document.content && (
                <div className="prose prose-lg prose-slate max-w-none mb-16">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      Contenu
                    </h2>
                    <div className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                      {document.content}
                    </div>
                  </div>
                </div>
              )}

              {/* Liens informatifs (non cliquables) */}
              {document.liens.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-10 flex items-center">
                    <Globe className="h-8 w-8 text-blue-600 mr-3" />
                    Liens informatifs ({document.liens.length})
                  </h2>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <Lock className="h-6 w-6 text-yellow-600" />
                      <div>
                        <h3 className="font-bold text-yellow-800">
                          Information importante
                        </h3>
                        <p className="text-yellow-700 text-sm">
                          Les liens ci-dessous sont présentés à titre informatif
                          uniquement. Ils ne sont pas cliquables pour des
                          raisons de sécurité.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    {document.liens
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((link, index) => (
                        <div
                          key={link.id}
                          className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-3xl p-10 relative"
                        >
                          {/* Badge informatif */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full border border-orange-200">
                              INFORMATIF
                            </span>
                          </div>

                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                                <Info className="h-8 w-8 text-gray-600" />
                              </div>
                              <div>
                                <span className="text-sm font-medium text-slate-500 block mb-1">
                                  Lien #{index + 1}
                                  {link.order && ` - Ordre: ${link.order}`}
                                </span>
                                <h3 className="text-2xl font-bold text-slate-900">
                                  {link.title || `Lien #${index + 1}`}
                                </h3>
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <p className="text-sm font-medium text-slate-500 mb-3">
                              URL (non cliquable):
                            </p>
                            <div className="relative">
                              <p className="text-slate-600 break-all font-mono text-sm bg-white px-4 py-3 rounded-xl border border-dashed border-gray-300 opacity-75">
                                {link.url}
                              </p>
                              <div className="absolute inset-0 bg-gray-100/50 rounded-xl flex items-center justify-center">
                                <Lock className="h-6 w-6 text-gray-500" />
                              </div>
                            </div>
                          </div>

                          {link.description && (
                            <div className="mb-8">
                              <p className="text-sm font-medium text-slate-500 mb-3">
                                Description:
                              </p>
                              <p className="text-slate-700 leading-relaxed text-lg">
                                {link.description}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-center gap-4">
                            <button
                              onClick={() => copyToClipboard(link.url, link.id)}
                              className="flex items-center justify-center space-x-2 bg-slate-200 text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-300 transition-colors font-medium"
                            >
                              {copiedLinkId === link.id ? (
                                <>
                                  <Check className="h-5 w-5 text-green-600" />
                                  <span className="text-green-600">
                                    URL copiée !
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-5 w-5" />
                                  <span>Copier l'URL</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Actions de fin */}
              <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Ce document vous a été utile ?
                </h3>
                <p className="text-slate-600 mb-8 text-lg">
                  Ajoutez-le à votre bibliothèque personnelle pour le retrouver
                  facilement
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={addToLibrary}
                    disabled={isAddingToLibrary || isAddedToLibrary}
                    className={`flex items-center space-x-2 px-8 py-4 rounded-2xl font-medium transition-all text-lg ${
                      isAddedToLibrary
                        ? "bg-green-100 text-green-800 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    }`}
                  >
                    {isAddingToLibrary ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : isAddedToLibrary ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                    <span>
                      {isAddingToLibrary
                        ? "Ajout en cours..."
                        : isAddedToLibrary
                        ? "Ajouté à votre bibliothèque"
                        : "Ajouter à ma bibliothèque"}
                    </span>
                  </button>

                  <Link
                    href="/public"
                    className="flex items-center space-x-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-200 transition-colors font-medium text-lg"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Voir d'autres documents</span>
                  </Link>
                </div>
              </div>

              {/* Informations techniques */}
              <div className="mt-16 bg-slate-50 rounded-3xl p-10">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <Tag className="h-6 w-6 text-slate-600 mr-3" />
                  Informations techniques
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                  <div>
                    <span className="font-medium text-slate-700 block mb-2">
                      ID du document:
                    </span>
                    <p className="text-slate-600 font-mono break-all bg-white px-4 py-2 rounded-lg border">
                      {document.id}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 block mb-2">
                      ID utilisateur:
                    </span>
                    <p className="text-slate-600 font-mono break-all bg-white px-4 py-2 rounded-lg border">
                      {document.userId}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 block mb-2">
                      Date de création:
                    </span>
                    <p className="text-slate-600 bg-white px-4 py-2 rounded-lg border">
                      {formatDate(document.createdAt)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700 block mb-2">
                      Dernière modification:
                    </span>
                    <p className="text-slate-600 bg-white px-4 py-2 rounded-lg border">
                      {formatDate(document.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Navigation en bas */}
        <div className="mt-12 text-center">
          <Link
            href="/public"
            className="inline-flex items-center space-x-2 bg-white text-slate-700 px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors font-medium shadow-lg border border-slate-200 text-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à la bibliothèque</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
