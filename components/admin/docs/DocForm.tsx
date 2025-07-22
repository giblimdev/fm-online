// @/components/admin/docs/DocForm.tsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
  Plus,
  ExternalLink,
  Trash2,
  Save,
  Loader2,
  Image as ImageIcon,
  Folder,
} from "lucide-react";
import type { Documents, Links } from "@/lib/generated/prisma";

// Type pour les documents avec relations
type DocumentWithLinks = Documents & {
  liens: Links[];
};

interface DocFormProps {
  document: DocumentWithLinks | null;
  onSave: () => void;
  onCancel: () => void;
  userId: string;
}

export default function DocForm({
  document,
  onSave,
  onCancel,
  userId,
}: DocFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    grade: "",
    category: "",
    ordre: null as number | null,
    image: "",
  });
  const [links, setLinks] = useState<Omit<Links, "documentId">[]>([]);
  const [newLink, setNewLink] = useState({
    url: "",
    title: "",
    description: "",
  });

  // Options pour les grades maçonniques
  const gradeOptions = [
    { value: "Apprenti", label: "Apprenti" },
    { value: "Compagnon", label: "Compagnon" },
    { value: "Maitre", label: "Maître" },
    { value: "Maitre de Marque", label: "Maître de Marque" },
    { value: "Vénérable Maitre", label: "Vénérable Maître" },
    { value: "Nautonier", label: "Nautonier" },
    {
      value: "Compagnon de l'arche Royal Domatique",
      label: "Compagnon de l'Arche Royal Domatique",
    },
    { value: "Chevalier du temple", label: "Chevalier du Temple" },
  ];

  // Options pour les catégories
  const categoryOptions = [
    { value: "Emulation", label: "Emulation" },
    { value: "Domatique", label: "Domatique" },
    { value: "Marque", label: "Marque" },
    { value: "Nautonier", label: "Nautonier" },
    { value: "KT", label: "KT (Chevalier du Temple)" },
  ];

  useEffect(() => {
    if (document) {
      setFormData({
        title: document.title,
        description: document.description || "",
        content: document.content || "",
        grade: document.grade || "",
        category: document.category || "",
        ordre: document.ordre || null,
        image: document.image || "",
      });
      setLinks(document.liens || []);
    } else {
      setFormData({
        title: "",
        description: "",
        content: "",
        grade: "",
        category: "",
        ordre: null,
        image: "",
      });
      setLinks([]);
    }
  }, [document]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = document ? `/api/documents/${document.id}` : "/api/documents";
      const method = document ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId,
          liens: links,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la sauvegarde");

      onSave();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la sauvegarde du document");
    } finally {
      setIsLoading(false);
    }
  };

  const addLink = () => {
    if (!newLink.url || !newLink.title) return;

    setLinks([
      ...links,
      {
        id: crypto.randomUUID(),
        ...newLink,
      },
    ]);

    setNewLink({
      url: "",
      title: "",
      description: "",
    });
  };

  const removeLink = (linkId: string) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

  // Validation pour les chemins locaux au lieu d'URLs
  const isValidPath = (path: string) => {
    if (!path) return false;
    // Valide les chemins de type app\rituels\Emulation\app\annex
    const pathPattern = /^app\\[\w\\]+$|^[\w\\\/]+$/;
    return pathPattern.test(path) && path.length > 0;
  };

  // Normalise le chemin pour l'affichage
  const formatPath = (path: string) => {
    return path.replace(/\\/g, " › ").replace(/\//g, " › ");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">
          {document ? "Modifier le document" : "Nouveau document"}
        </h3>
        <button
          onClick={onCancel}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Titre du document"
            required
          />
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
            placeholder="Description courte du document..."
          />
        </div>

        {/* Contenu */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Contenu
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
            rows={8}
            placeholder="Contenu détaillé du document..."
          />
          <p className="mt-1 text-xs text-slate-500">
            Contenu principal du document (texte complet, analyse, etc.)
          </p>
        </div>

        {/* Grade et Catégorie côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Grade Maçonnique */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Grade Maçonnique
            </label>
            <select
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Sélectionner un grade</option>
              {gradeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Sélectionner une catégorie</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ordre */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Ordre/Position
          </label>
          <input
            type="number"
            value={formData.ordre || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                ordre: e.target.value ? parseInt(e.target.value) : null,
              })
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Position du document (optionnel)"
          />
          <p className="mt-1 text-xs text-slate-500">
            Numéro d'ordre pour classer les documents
          </p>
        </div>

        {/* Image - Simple champ texte */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Image (optionnelle)
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="URL de l'image ou nom de fichier"
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Saisissez l'URL de l'image ou le nom du fichier image
          </p>

          {/* Prévisualisation simple si URL valide */}
          {formData.image && (
            <div className="mt-3">
              <img
                src={formData.image}
                alt="Aperçu"
                className="h-20 w-auto rounded-lg border border-slate-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Liens existants */}
        {links.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Chemins associés ({links.length})
            </label>
            <div className="space-y-3">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl"
                >
                  <Folder className="h-4 w-4 text-slate-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {link.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate font-mono">
                      {formatPath(link.url)}
                    </p>
                    {link.description && (
                      <p className="text-xs text-slate-600 mt-1">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ajouter un chemin */}
        <div className="border-t border-slate-200 pt-6">
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Ajouter un chemin de fichier
          </label>
          <div className="space-y-3">
            <div>
              <div className="relative">
                <Folder className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink({ ...newLink, url: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono ${
                    newLink.url && !isValidPath(newLink.url)
                      ? "border-red-300 bg-red-50"
                      : ""
                  }`}
                  placeholder="app\rituels\Emulation\app\annex"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Exemple : app\rituels\Emulation\app\annex ou
                app/rituels/Domatique/ceremony
              </p>
              {newLink.url && !isValidPath(newLink.url) && (
                <p className="mt-1 text-xs text-red-600">
                  ⚠️ Format de chemin invalide
                </p>
              )}
            </div>

            <input
              type="text"
              value={newLink.title}
              onChange={(e) =>
                setNewLink({ ...newLink, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Nom du fichier ou titre descriptif"
            />

            <input
              type="text"
              value={newLink.description}
              onChange={(e) =>
                setNewLink({ ...newLink, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Description (optionnelle)"
            />

            <button
              type="button"
              onClick={addLink}
              disabled={
                !newLink.url || !newLink.title || !isValidPath(newLink.url)
              }
              className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter le chemin</span>
            </button>
          </div>
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
            disabled={!formData.title || isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{document ? "Mettre à jour" : "Créer"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
