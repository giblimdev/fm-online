// @/app/public/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  ExternalLink,
  Calendar,
  Loader2,
  AlertCircle,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

// Interface mise à jour selon votre schéma Prisma
interface Document {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  grade?: string;
  category?: string;
  ordre?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  liens: DocumentLink[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

interface DocumentLink {
  id: string;
  url: string;
  title: string;
  description?: string;
  documentId: string;
}

export default function PublicDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/documents");
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      setError("Impossible de charger les documents");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="text-slate-600 font-medium text-lg">
            Chargement des documents...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Erreur de chargement
          </h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={fetchDocuments}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Collection des Rituels
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Découvrez la collection de rituels organisés par grades et
            catégories
          </p>
        </div>

        {/* Documents Cards */}
        {documents.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Aucun document disponible
            </h3>
            <p className="text-slate-600">
              Les documents seront bientôt disponibles dans cette collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((document) => (
              <Link
                key={document.id}
                href={`/public/${document.id}`}
                className="block"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group h-full">
                  {/* Image avec placeholder */}
                  <div className="aspect-video overflow-hidden">
                    {document.image ? (
                      <img
                        src={document.image}
                        alt={document.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Si l'image ne charge pas, afficher le placeholder
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const placeholder =
                            target.nextElementSibling as HTMLElement;
                          if (placeholder) placeholder.style.display = "flex";
                        }}
                      />
                    ) : null}
                    {/* Placeholder qui s'affiche quand il n'y a pas d'image ou si l'image ne charge pas */}
                    <div
                      className={`w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center ${
                        document.image ? "hidden" : "flex"
                      }`}
                      style={{ display: document.image ? "none" : "flex" }}
                    >
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-500 text-sm font-medium">
                          Image non disponible
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col h-full">
                    {/* Title and Badges */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                          {document.title}
                        </h3>
                      </div>

                      {/* Badges pour Grade et Category */}
                      <div className="flex flex-wrap gap-2">
                        {document.grade && (
                          <span
                            className={`px-2 py-1 text-xs font-medium border rounded-lg ${getGradeColor(
                              document.grade
                            )}`}
                          >
                            {document.grade}
                          </span>
                        )}
                        {document.category && (
                          <span
                            className={`px-2 py-1 text-xs font-medium border rounded-lg flex items-center ${getCategoryColor(
                              document.category
                            )}`}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {document.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {document.description && (
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                        {document.description}
                      </p>
                    )}

                    {/* Ordre si défini */}
                    {document.ordre && (
                      <div className="mb-4">
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          Ordre: {document.ordre}
                        </span>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between text-slate-500 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(document.createdAt)}</span>
                        </div>
                        {document.liens.length > 0 && (
                          <div className="flex items-center">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            <span>
                              {document.liens.length} lien
                              {document.liens.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Auteur si disponible */}
                      {document.user && (
                        <div className="mt-2 text-xs text-slate-500">
                          Par {document.user.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
