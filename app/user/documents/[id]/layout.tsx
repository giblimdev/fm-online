// app/user/documents/[id]/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, Menu, X } from "lucide-react";
import DocumentNavigation from "@/components/admin/users/DocumentNavigation";
import "@/app/globals.css";

interface DocumentData {
  id: string;
  title: string;
  liens: DocumentPage[];
}

interface DocumentPage {
  id: string;
  url: string;
  title?: string;
  order?: number;
}

export default function DocumentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending: sessionLoading } = useSession();

  // Extraire le chemin actuel pour la navigation
  const getCurrentPath = () => {
    if (!documentId) return undefined;
    const basePath = `/user/documents/${documentId}`;
    if (pathname === basePath) return undefined; // Page principale
    return pathname.replace(`${basePath}/`, "");
  };

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.push("/auth/login");
      return;
    }
  }, [session, sessionLoading, router]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const { id } = await params;
        setDocumentId(id);
        const response = await fetch(`/api/documents/${id}`);
        if (!response.ok) {
          throw new Error("Document non trouvé");
        }
        const data = await response.json();
        setDocumentData(data);
      } catch (error) {
        console.error("Erreur:", error);
        setError(error instanceof Error ? error.message : "Erreur inconnue");
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchDocument();
    }
  }, [params, session]);

  // Obtenir le nom de la page actuelle pour l'affichage mobile
  const getCurrentPageName = () => {
    if (!documentData) return "Chargement...";

    if (pathname === `/user/documents/${documentId}`) {
      return "Document principal";
    }

    const currentUrl = pathname.replace(`/user/documents/${documentId}/`, "");
    const currentPage = documentData.liens?.find(
      (page) => page.url === currentUrl
    );
    return currentPage?.title || "Page";
  };

  if (sessionLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !documentData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <p className="mt-2 text-lg font-semibold">
            {error || "Document non trouvé"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header mobile avec menu dropdown */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {documentData.title}
            </h1>
            <p className="text-sm text-gray-500 truncate">
              {getCurrentPageName()}
            </p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="ml-4 inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Menu déroulant mobile */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu dropdown */}
            <div className="absolute left-4 right-4 mt-2 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50 max-h-96 overflow-y-auto">
              <div className="py-2">
                {/* Page principale */}
                <Link
                  href={`/user/documents/${documentId}`}
                  className={`block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    pathname === `/user/documents/${documentId}`
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Document principal
                </Link>

                {/* Séparateur */}
                {documentData.liens && documentData.liens.length > 0 && (
                  <div className="border-t border-gray-100 my-1"></div>
                )}

                {/* Pages liées */}
                {documentData.liens &&
                  documentData.liens
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((page, index) => {
                      const isActive =
                        pathname ===
                        `/user/documents/${documentId}/${page.url}`;
                      return (
                        <Link
                          key={page.id}
                          href={`/user/documents/${documentId}/${page.url}`}
                          className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                            isActive
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{page.title || `Page ${index + 1}`}</span>
                            <span className="text-xs text-gray-400 ml-2">
                              #{page.order || index + 1}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              {documentData.title}
            </h2>

            {/* Page principale */}
            <div className="mb-6">
              <Link
                href={`/user/documents/${documentId}`}
                className={`block p-3 rounded-lg font-medium transition-colors duration-200 ${
                  pathname === `/user/documents/${documentId}`
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-white hover:shadow-sm"
                }`}
              >
                Document principal
              </Link>
            </div>

            {/* Pages liées */}
            {documentData.liens && documentData.liens.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                  Pages liées
                </h3>
                <nav className="space-y-1">
                  {documentData.liens
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((page, index) => {
                      const isActive =
                        pathname ===
                        `/user/documents/${documentId}/${page.url}`;
                      return (
                        <Link
                          key={page.id}
                          href={`/user/documents/${documentId}/${page.url}`}
                          className={`block p-3 rounded-lg text-sm transition-colors duration-200 ${
                            isActive
                              ? "bg-blue-100 text-blue-700 shadow-sm"
                              : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="truncate">
                              {page.title || `Page ${index + 1}`}
                            </span>
                            <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                              #{page.order || index + 1}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Zone de contenu avec scroll */}
          <div className="flex-1 overflow-auto">
            <div className="p-4 lg:p-6">{children}</div>
          </div>

          {/* Navigation en bas - cachée sur mobile */}
          <div className="hidden lg:block border-t border-gray-200 bg-white">
            <DocumentNavigation
              pages={documentData.liens || []}
              currentPath={getCurrentPath()}
              documentId={documentId}
            />
          </div>
        </div>
      </div>

      {/* Navigation mobile en bas */}
      <div className="lg:hidden border-t border-gray-200 bg-white">
        <DocumentNavigation
          pages={documentData.liens || []}
          currentPath={getCurrentPath()}
          documentId={documentId}
        />
      </div>
    </div>
  );
}
