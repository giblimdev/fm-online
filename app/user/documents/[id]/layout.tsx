// app/user/documents/[id]/layout.tsx

"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import DocumentNavigation from "@/components/admin/users/DocumentNavigation";
import "@/app/globals.css";

interface Document {
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
  const [document, setDocument] = useState<Document | null>(null);
  const [documentId, setDocumentId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        setDocument(data);
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

  if (sessionLoading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !document) {
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
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-100 p-4 border-r">
          <h2 className="text-xl font-bold mb-4">{document.title}</h2>

          {/* Page principale */}
          <div className="mb-6">
            <Link
              href={`/user/documents/${documentId}`}
              className={`block p-2 rounded font-medium ${
                pathname === `/user/documents/${documentId}`
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-200"
              }`}
            >
              Document principal
            </Link>
          </div>

          {/* Pages liées */}
          {document.liens && document.liens.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase">
                Pages liées
              </h3>
              <nav className="space-y-1">
                {document.liens
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((page, index) => {
                    const isActive =
                      pathname === `/user/documents/${documentId}/${page.url}`;
                    return (
                      <Link
                        key={page.id}
                        href={`/user/documents/${documentId}/${page.url}`}
                        className={`block p-2 rounded text-sm ${
                          isActive
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <span className="flex justify-between items-center">
                          <span>{page.title || `Page ${index + 1}`}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({page.order || index + 1})
                          </span>
                        </span>
                      </Link>
                    );
                  })}
              </nav>
            </div>
          )}
        </div>

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto m-5">{children}</div>

          {/* Navigation en bas */}
          <DocumentNavigation
            pages={document.liens || []}
            currentPath={getCurrentPath()}
            documentId={documentId}
          />
        </div>
      </div>
    </div>
  );
}
