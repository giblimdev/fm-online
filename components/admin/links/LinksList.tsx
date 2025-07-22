// @/components/admin/links/LinksList.tsx
"use client";

import { useState, useEffect } from "react";
import { Edit, Trash2, ExternalLink, FileText, Folder } from "lucide-react";
import type { Links, Documents } from "@/lib/generated/prisma";

// Type pour les liens avec document associé
type LinkWithDocument = Links & {
  document: Pick<Documents, "id" | "title">;
};

interface LinksListProps {
  onEdit: (link: LinkWithDocument) => void;
  userId: string;
}

export default function LinksList({ onEdit, userId }: LinksListProps) {
  const [links, setLinks] = useState<LinkWithDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, [userId]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      // Récupérer d'abord les documents de l'utilisateur
      const documentsResponse = await fetch(`/api/documents?userId=${userId}`);
      if (!documentsResponse.ok)
        throw new Error("Erreur lors du chargement des documents");
      const documents = await documentsResponse.json();

      // Récupérer tous les liens pour ces documents
      const allLinks: LinkWithDocument[] = [];
      for (const doc of documents) {
        const linksResponse = await fetch(`/api/links?documentId=${doc.id}`);
        if (linksResponse.ok) {
          const docLinks = await linksResponse.json();
          allLinks.push(...docLinks);
        }
      }

      // Trier par ordre si défini, sinon par date de création
      allLinks.sort((a, b) => {
        if (a.order !== null && b.order !== null) {
          return a.order - b.order;
        }
        if (a.order !== null) return -1;
        if (b.order !== null) return 1;
        return (
          new Date(b.order || 0).getTime() - new Date(a.order || 0).getTime()
        );
      });

      setLinks(allLinks);
    } catch (error) {
      setError("Impossible de charger les liens");
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (linkId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce lien ?")) return;

    try {
      const response = await fetch(`/api/links/${linkId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression");

      setLinks(links.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression du lien");
    }
  };

  const formatPath = (path: string) => {
    return path.replace(/\\/g, " › ").replace(/\//g, " › ");
  };

  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
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
          onClick={fetchLinks}
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
          <ExternalLink className="h-5 w-5 mr-2 text-green-600" />
          Liens ({links.length})
        </h2>
      </div>

      <div className="p-6">
        {links.length === 0 ? (
          <div className="text-center py-8">
            <ExternalLink className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Aucun lien trouvé
            </h3>
            <p className="text-slate-600">
              Commencez par créer votre premier lien
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <div
                key={link.id}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {isUrl(link.url) ? (
                        <ExternalLink className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      ) : (
                        <Folder className="h-4 w-4 text-amber-600 flex-shrink-0" />
                      )}
                      <h3 className="font-semibold text-slate-900">
                        {link.title || "Lien sans titre"}
                      </h3>
                      {link.order !== null && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          Ordre: {link.order}
                        </span>
                      )}
                    </div>

                    {link.description && (
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                        {link.description}
                      </p>
                    )}

                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 font-mono bg-slate-50 px-2 py-1 rounded">
                        {isUrl(link.url) ? link.url : formatPath(link.url)}
                      </p>

                      <div className="flex items-center text-xs text-slate-500">
                        <FileText className="h-3 w-3 mr-1" />
                        <span>Document: {link.document.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 ml-4">
                    <button
                      onClick={() => onEdit(link)}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
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
