// app/public/[id]/page.tsx
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatDate } from "@/utils/formatDate";
import {
  ArrowLeft,
  BookOpen,
  Users,
  Calendar,
  Tag,
  Hash,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

async function getDocument(id: string) {
  try {
    const document = await prisma.documents.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    return document;
  } catch (error) {
    console.error("Erreur lors de la récupération du document:", error);
    return null;
  }
}

// Fonction utilitaire pour valider une URL d'image
function isValidImageUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === "") return false;

  // Accepter les chemins locaux qui commencent par /
  if (url.startsWith("/")) return true;

  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function PublicDocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // Nouvelle gestion des params pour Next.js 15
}) {
  const { id } = await params; // Await des params selon Next.js 15
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  const getGradeColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case "apprenti":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "compagnon":
        return "bg-green-100 text-green-800 border-green-200";
      case "maitre":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "vénérable maitre":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case "emulation":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "domatique":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "marque":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "nautonier":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "kt":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/public"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour aux documents
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Connexion
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Document Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          {/* Image Header - Utilisation du composant Image de Next.js */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            {document.image && isValidImageUrl(document.image) ? (
              <Image
                src={document.image}
                alt={document.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Rituel traditionnel</p>
                  <p className="text-sm">
                    {document.image
                      ? "Image non disponible"
                      : "Aucune image disponible"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Document Content */}
          <div className="p-8">
            {/* Document Meta Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {document.grade && (
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full border ${getGradeColor(
                    document.grade
                  )}`}
                >
                  {document.grade}
                </span>
              )}
              {document.category && (
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full flex items-center border ${getCategoryColor(
                    document.category
                  )}`}
                >
                  <Tag className="h-4 w-4 mr-1" />
                  {document.category}
                </span>
              )}
              {document.ordre !== null && document.ordre !== undefined && (
                <span className="px-3 py-1 text-sm font-medium rounded-full flex items-center border bg-indigo-100 text-indigo-800 border-indigo-200">
                  <Hash className="h-4 w-4 mr-1" />
                  Ordre: {document.ordre}
                </span>
              )}
            </div>

            {/* Document Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {document.title}
            </h1>

            {/* Document Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-8 text-sm">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Créé par {document.user?.name || "Auteur inconnu"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Publié le {formatDate(document.createdAt)}</span>
              </div>
              {document.updatedAt !== document.createdAt && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Modifié le {formatDate(document.updatedAt)}</span>
                </div>
              )}
            </div>

            {/* Document Description */}
            {document.description && (
              <div className="mb-8">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Description
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {document.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Document Content */}
            {document.content && (
              <div className="mb-12">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Contenu
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {document.content}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center border border-blue-100">
              <div className="max-w-2xl mx-auto">
                <BookOpen className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Vous souhaitez créer vos propres documents ?
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Rejoignez notre communauté et partagez vos connaissances avec
                  d'autres Frères.
                </p>
                <Link
                  href="/user/addDoc"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  Ajouter ce rituel à votre bibliotèque
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500">
          <p>© {new Date().getFullYear()} FM-Online. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
