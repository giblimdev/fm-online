// @/app/admin/documents/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";
import { Loader2, FileText, Plus, ExternalLink } from "lucide-react";
import DocList from "@/components/admin/docs/DocList";
import DocForm from "@/components/admin/docs/DocForm";
import LinksList from "@/components/admin/links/LinksList";
import LinkForm from "@/components/admin/links/LinkForm";
// Import des types générés par Prisma
import type { Documents, Links, User } from "@/lib/generated/prisma";

// Types étendus avec les relations pour l'interface
export interface DocumentWithRelations extends Documents {
  liens: Links[];
  user?: Pick<User, "id" | "name" | "email">;
}

export interface LinkWithDocument extends Links {
  document?: Pick<Documents, "id" | "title">;
}

export default function DocumentsAdminPage() {
  const { data: session, isPending } = useSession();
  const [activeTab, setActiveTab] = useState<"documents" | "links">(
    "documents"
  );
  const [showDocForm, setShowDocForm] = useState(false);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [editingDocument, setEditingDocument] =
    useState<DocumentWithRelations | null>(null);
  const [editingLink, setEditingLink] = useState<LinkWithDocument | null>(null);

  // Gestion de l'authentification
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-600 font-medium">
            Vérification de l'authentification...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth/login");
  }

  // Handlers pour les documents
  const handleAddDocument = () => {
    setEditingDocument(null);
    setShowDocForm(true);
  };

  const handleEditDocument = (document: DocumentWithRelations) => {
    setEditingDocument(document);
    setShowDocForm(true);
  };

  const handleCloseDocForm = () => {
    setShowDocForm(false);
    setEditingDocument(null);
  };

  const handleSaveDocument = () => {
    setShowDocForm(false);
    setEditingDocument(null);
  };

  // Handlers pour les liens
  const handleAddLink = () => {
    setEditingLink(null);
    setShowLinkForm(true);
  };

  const handleEditLink = (link: LinkWithDocument) => {
    setEditingLink(link);
    setShowLinkForm(true);
  };

  const handleCloseLinkForm = () => {
    setShowLinkForm(false);
    setEditingLink(null);
  };

  const handleSaveLink = () => {
    setShowLinkForm(false);
    setEditingLink(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Administration
                </h1>
                <p className="text-slate-600 mt-1">
                  Gérez vos documents et leurs liens associés
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="mb-8">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("documents")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "documents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Documents</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("links")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "links"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Liens</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === "documents" ? (
          <>
            {/* Header Documents */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Gestion des documents
              </h2>
              <button
                onClick={handleAddDocument}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Nouveau document</span>
              </button>
            </div>

            {/* Contenu Documents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DocList onEdit={handleEditDocument} userId={session.user.id} />
              </div>
              <div className="lg:col-span-1">
                {showDocForm && (
                  <div className="sticky top-8">
                    <DocForm
                      document={editingDocument}
                      onSave={handleSaveDocument}
                      onCancel={handleCloseDocForm}
                      userId={session.user.id}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Header Liens */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Gestion des liens
              </h2>
              <button
                onClick={handleAddLink}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Nouveau lien</span>
              </button>
            </div>

            {/* Contenu Liens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <LinksList onEdit={handleEditLink} userId={session.user.id} />
              </div>
              <div className="lg:col-span-1">
                {showLinkForm && (
                  <div className="sticky top-8">
                    <LinkForm
                      link={editingLink}
                      onSave={handleSaveLink}
                      onCancel={handleCloseLinkForm}
                      userId={session.user.id}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
