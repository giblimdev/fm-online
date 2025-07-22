// @/components/admin/links/LinkForm.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Save, Loader2, ExternalLink, Folder } from "lucide-react";
import type { Links, Documents } from "@/lib/generated/prisma";

// Type pour les liens avec document associé
type LinkWithDocument = Links & {
  document?: Pick<Documents, "id" | "title">;
};

interface LinkFormProps {
  link: LinkWithDocument | null;
  onSave: () => void;
  onCancel: () => void;
  userId: string;
}

export default function LinkForm({
  link,
  onSave,
  onCancel,
  userId,
}: LinkFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<Pick<Documents, "id" | "title">[]>(
    []
  );
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    order: null as number | null, // Nouveau champ ajouté
    documentId: "",
  });

  useEffect(() => {
    fetchDocuments();

    if (link) {
      setFormData({
        title: link.title || "", // title peut être null selon le schéma
        url: link.url,
        description: link.description || "",
        order: link.order || null, // Nouveau champ
        documentId: link.documentId,
      });
    } else {
      setFormData({
        title: "",
        url: "",
        description: "",
        order: null,
        documentId: "",
      });
    }
  }, [link]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        `/api/documents?userId=${userId}&select=id,title`
      );
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des documents:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = link ? `/api/links/${link.id}` : "/api/links";
      const method = link ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      onSave();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde du lien");
    } finally {
      setIsLoading(false);
    }
  };

  const isValidPath = (path: string) => {
    if (!path) return false;
    const pathPattern = /^app\\[\w\\]+$|^[\w\\\/]+$/;
    return pathPattern.test(path) && path.length > 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidInput = (input: string) => {
    return isValidUrl(input) || isValidPath(input);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {link ? "Modifier le lien" : "Nouveau lien"}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Document associé */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Document associé *
          </label>
          <select
            value={formData.documentId}
            onChange={(e) =>
              setFormData({ ...formData, documentId: e.target.value })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          >
            <option value="">Sélectionner un document</option>
            {documents.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.title}
              </option>
            ))}
          </select>
        </div>

        {/* URL ou Chemin */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            URL ou Chemin *
          </label>
          <div className="relative">
            {isValidUrl(formData.url) ? (
              <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            ) : (
              <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            )}
            <input
              type="text"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                formData.url && !isValidInput(formData.url)
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300"
              }`}
              placeholder="https://exemple.com ou app\rituels\Emulation\app\annex"
              required
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Saisissez une URL web ou un chemin de fichier local
          </p>
          {formData.url && !isValidInput(formData.url) && (
            <p className="mt-1 text-xs text-red-600">
              ⚠️ Format invalide. Utilisez une URL valide ou un chemin de
              fichier
            </p>
          )}
        </div>

        {/* Titre et Ordre côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Titre */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Titre du lien (optionnel)"
            />
            <p className="mt-1 text-xs text-slate-500">
              Si vide, l'URL sera utilisée comme titre
            </p>
          </div>

          {/* Ordre */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ordre
            </label>
            <input
              type="number"
              value={formData.order || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  order: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Position (optionnel)"
              min="0"
            />
            <p className="mt-1 text-xs text-slate-500">
              Ordre d'affichage du lien
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            rows={4}
            placeholder="Description optionnelle du lien..."
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-4 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={
              !formData.url ||
              !formData.documentId ||
              !isValidInput(formData.url) ||
              isLoading
            }
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{link ? "Mettre à jour" : "Créer"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
