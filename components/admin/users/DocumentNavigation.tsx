// components/DocumentNavigation.tsx

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface DocumentPage {
  id: string;
  url: string;
  title?: string;
  order?: number;
}

interface DocumentNavigationProps {
  pages: DocumentPage[];
  currentPath?: string;
  documentId: string;
}

export default function DocumentNavigation({
  pages,
  currentPath,
  documentId,
}: DocumentNavigationProps) {
  // Trier les pages par ordre
  const sortedPages = pages.sort((a, b) => (a.order || 0) - (b.order || 0));

  // Trouver l'index de la page actuelle
  const currentIndex = currentPath
    ? sortedPages.findIndex((page) => page.url === currentPath)
    : -1;

  // Déterminer les pages précédente et suivante
  const previousPage = currentIndex > 0 ? sortedPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < sortedPages.length - 1
      ? sortedPages[currentIndex + 1]
      : null;

  // Si nous sommes sur la page principale du document, la première page liée est "suivante"
  const isMainPage = currentIndex === -1;
  const firstLinkedPage = sortedPages.length > 0 ? sortedPages[0] : null;
  const lastLinkedPage =
    sortedPages.length > 0 ? sortedPages[sortedPages.length - 1] : null;

  return (
    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
      {/* Bouton Précédent */}
      <div className="flex-1">
        {isMainPage ? (
          // Sur la page principale, pas de bouton précédent
          <div></div>
        ) : currentIndex === 0 ? (
          // Première page liée, retour vers la page principale
          <Link
            href={`/user/documents/${documentId}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Document principal
          </Link>
        ) : previousPage ? (
          // Page liée avec une page précédente
          <Link
            href={`/user/documents/${documentId}/${previousPage.url}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {previousPage.title || "Page précédente"}
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Indicateur de position */}
      <div className="text-sm text-gray-500 px-4">
        {isMainPage
          ? "Document principal"
          : `${currentIndex + 1} sur ${sortedPages.length}`}
      </div>

      {/* Bouton Suivant */}
      <div className="flex-1 flex justify-end">
        {isMainPage && firstLinkedPage ? (
          // Sur la page principale, aller vers la première page liée
          <Link
            href={`/user/documents/${documentId}/${firstLinkedPage.url}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {firstLinkedPage.title || "Première page"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        ) : nextPage ? (
          // Page liée avec une page suivante
          <Link
            href={`/user/documents/${documentId}/${nextPage.url}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {nextPage.title || "Page suivante"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
