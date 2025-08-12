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
  console.log("🔄 DocumentNavigation - Props reçues:", {
    documentId,
    currentPath,
    pagesCount: pages.length,
    pages: pages.map((p) => ({
      id: p.id,
      url: p.url,
      title: p.title,
      order: p.order,
    })),
  });

  // ✅ CORRECTION : Normaliser les URLs des pages
  const normalizedPages = pages.map((page) => ({
    ...page,
    url: page.url.startsWith("/") ? page.url.substring(1) : page.url,
  }));

  // Trier les pages normalisées par ordre
  const sortedPages = normalizedPages.sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  console.log("📋 DocumentNavigation - Pages normalisées:", {
    sortedCount: sortedPages.length,
    sortedPages: sortedPages.map((p) => ({
      url: p.url,
      title: p.title,
      order: p.order,
    })),
  });

  // Trouver l'index de la page actuelle avec URLs normalisées
  const currentIndex = currentPath
    ? sortedPages.findIndex((page) => page.url === currentPath)
    : -1;

  console.log("🎯 DocumentNavigation - Index actuel:", {
    currentPath,
    currentIndex,
    foundPage: currentIndex >= 0 ? sortedPages[currentIndex] : null,
  });

  // Déterminer les pages précédente et suivante
  const previousPage = currentIndex > 0 ? sortedPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < sortedPages.length - 1
      ? sortedPages[currentIndex + 1]
      : null;

  console.log("🔀 DocumentNavigation - Navigation:", {
    previousPage: previousPage
      ? {
          url: previousPage.url,
          title: previousPage.title,
        }
      : null,
    nextPage: nextPage
      ? {
          url: nextPage.url,
          title: nextPage.title,
        }
      : null,
  });

  // Si nous sommes sur la page principale du document, la première page liée est "suivante"
  const isMainPage = currentIndex === -1;
  const firstLinkedPage = sortedPages.length > 0 ? sortedPages[0] : null;
  const lastLinkedPage =
    sortedPages.length > 0 ? sortedPages[sortedPages.length - 1] : null;

  console.log("📖 DocumentNavigation - État pages:", {
    isMainPage,
    firstLinkedPage: firstLinkedPage
      ? {
          url: firstLinkedPage.url,
          title: firstLinkedPage.title,
        }
      : null,
    lastLinkedPage: lastLinkedPage
      ? {
          url: lastLinkedPage.url,
          title: lastLinkedPage.title,
        }
      : null,
  });

  // Gestion des cas de navigation
  const renderPreviousButton = () => {
    if (isMainPage) {
      console.log(
        "⬅️ DocumentNavigation - Page principale: pas de bouton précédent"
      );
      return <div></div>;
    }

    if (currentIndex === 0) {
      console.log(
        "⬅️ DocumentNavigation - Première page liée: retour vers page principale"
      );
      const href = `/user/documents/${documentId}`;
      return (
        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log("⬅️ Clic précédent vers:", href)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Document principal
        </Link>
      );
    }

    if (previousPage) {
      console.log(
        "⬅️ DocumentNavigation - Page précédente trouvée:",
        previousPage.title
      );
      const href = `/user/documents/${documentId}/${previousPage.url}`;
      return (
        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log("⬅️ Clic précédent vers:", href)}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {previousPage.title || "Page précédente"}
        </Link>
      );
    }

    console.log("⬅️ DocumentNavigation - Aucune page précédente");
    return <div></div>;
  };

  const renderNextButton = () => {
    if (isMainPage && firstLinkedPage) {
      console.log(
        "➡️ DocumentNavigation - Page principale: vers première page liée"
      );
      const href = `/user/documents/${documentId}/${firstLinkedPage.url}`;
      return (
        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log("➡️ Clic suivant vers:", href)}
        >
          {firstLinkedPage.title || "Première page"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      );
    }

    if (nextPage) {
      console.log(
        "➡️ DocumentNavigation - Page suivante trouvée:",
        nextPage.title
      );
      const href = `/user/documents/${documentId}/${nextPage.url}`;
      return (
        <Link
          href={href}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => console.log("➡️ Clic suivant vers:", href)}
        >
          {nextPage.title || "Page suivante"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      );
    }

    console.log("➡️ DocumentNavigation - Aucune page suivante");
    return <div></div>;
  };

  const getPositionIndicator = () => {
    if (isMainPage) {
      return "Document principal";
    }
    return `${currentIndex + 1} sur ${sortedPages.length}`;
  };

  console.log("🎨 DocumentNavigation - Rendu final:", {
    isMainPage,
    currentIndex,
    totalPages: sortedPages.length,
    positionIndicator: getPositionIndicator(),
  });

  return (
    <div className="flex justify-between items-center p-4 border-t bg-gray-50">
      {/* Bouton Précédent */}
      <div className="flex-1">{renderPreviousButton()}</div>

      {/* Indicateur de position */}
      <div className="text-sm text-gray-500 px-4">{getPositionIndicator()}</div>

      {/* Bouton Suivant */}
      <div className="flex-1 flex justify-end">{renderNextButton()}</div>
    </div>
  );
}
