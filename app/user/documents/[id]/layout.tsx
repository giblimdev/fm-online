// app/user/documents/[id]/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.push("/auth/login");
    }
  }, [session, sessionLoading, router]);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const { id } = await params;
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p>{error || "Document non trouvé"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="font-bold text-lg mb-4">{document.title}</h2>

          <div className="space-y-2">
            {/* Page principale */}
            <Link
              href={`/user/documents/${document.id}`}
              className="block p-3 rounded hover:bg-gray-100"
            >
              Document principal
            </Link>

            {/* Pages liées */}
            {document.liens.map((page, index) => (
              <Link
                key={page.id}
                href={page.url}
                className="block p-3 rounded hover:bg-gray-100"
              >
                {page.title || `Page ${index + 1}`}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
