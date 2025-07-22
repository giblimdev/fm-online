// @/components/admin/docs/DocList.tsx
"use client";

import { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  ExternalLink,
  FileText,
} from "lucide-react";
import type { Documents, Links } from "@/lib/generated/prisma";

// Type pour les documents avec relations
type DocumentWithRelations = Documents & {
  liens: Links[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

interface DocListProps {
  onEdit: (document: DocumentWithRelations) => void;
  userId: string;
}

export default function DocList({ onEdit, userId }: DocListProps) {
  const [documents, setDocuments] = useState<DocumentWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les documents
  useEffect(() => {
    fetchDocuments();
  }, [userId]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/documents?userId=${userId}`);
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

  const handleMoveUp = async (
    document: DocumentWithRelations,
    index: number
  ) => {
    if (index === 0) return;
    const newDocuments = [...documents];
    [newDocuments[index], newDocuments[index - 1]] = [
      newDocuments[index - 1],
      newDocuments[index],
    ];
    setDocuments(newDocuments);
    // Mettre à jour l'ordre en base de données
    await updateDocumentOrder(document.id, index - 1);
  };

  const handleMoveDown = async (
    document: DocumentWithRelations,
    index: number
  ) => {
    if (index === documents.length - 1) return;
    const newDocuments = [...documents];
    [newDocuments[index], newDocuments[index + 1]] = [
      newDocuments[index + 1],
      newDocuments[index],
    ];
    setDocuments(newDocuments);
    // Mettre à jour l'ordre en base de données
    await updateDocumentOrder(document.id, index + 1);
  };

  const handleDelete = async (documentId: string) => {
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

  const updateDocumentOrder = async (documentId: string, newOrder: number) => {
    try {
      await fetch(`/api/documents/${documentId}/order`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'ordre:", error);
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

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchDocuments}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-bold text-slate-900 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-blue-600" />
          Documents ({documents.length})
        </h2>
      </div>

      <div className="p-6">
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Aucun document trouvé
            </h3>
            <p className="text-slate-600">
              Commencez par créer votre premier document
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((document, index) => (
              <div
                key={document.id}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {document.title}
                      </h3>
                      {document.grade && (
                        <span
                          className={`px-2 py-1 text-xs font-medium border rounded ${getGradeColor(
                            document.grade
                          )}`}
                        >
                          {document.grade}
                        </span>
                      )}
                      {document.category && (
                        <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 rounded">
                          {document.category}
                        </span>
                      )}
                    </div>

                    {document.description && (
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                        {document.description}
                      </p>
                    )}

                    {/* Liens associés */}
                    {document.liens && document.liens.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-slate-500 mb-1">
                          Liens ({document.liens.length})
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {document.liens.slice(0, 3).map((link) => (
                            <span
                              key={link.id}
                              className="inline-flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {link.title}
                            </span>
                          ))}
                          {document.liens.length > 3 && (
                            <span className="text-xs text-slate-500">
                              +{document.liens.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-500">
                      Créé le{" "}
                      {new Date(document.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 ml-4">
                    <button
                      onClick={() => handleMoveUp(document, index)}
                      disabled={index === 0}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Déplacer vers le haut"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(document, index)}
                      disabled={index === documents.length - 1}
                      className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Déplacer vers le bas"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(document)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(document.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
