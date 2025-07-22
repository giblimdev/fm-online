// @/components/nav/NavEmul.tsx
"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { listEmul } from "@/lib/nav/ListEmul";

interface Page {
  url: string;
}

const NavEmul: React.FC = () => {
  const currentPageUrl = usePathname();

  // Validation des données
  if (!Array.isArray(listEmul)) {
    console.error("NavEmul: listEmul doit être un tableau");
    return null;
  }

  if (listEmul.length === 0) {
    console.warn("NavEmul: listEmul est vide");
    return null;
  }

  // Normalisation des URLs
  const normalizeUrl = (url: string) => url.replace(/\/+$/, "");
  const currentNormalized = normalizeUrl(currentPageUrl);

  // Recherche de la page actuelle
  const currentIndex = listEmul.findIndex((page: Page) => {
    const pageNormalized = normalizeUrl(page.url);
    return (
      currentNormalized === pageNormalized ||
      currentNormalized.startsWith(`${pageNormalized}/`)
    );
  });

  if (currentIndex === -1) {
    console.warn(`Aucune correspondance pour l'URL: ${currentPageUrl}`);
    return null;
  }

  // Classes CSS
  const classNames = {
    enabled:
      "px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors",
    disabled: "px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed",
    indicator: "px-4 py-2 bg-blue-500 text-white rounded",
  };

  // Navigation
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < listEmul.length - 1;

  return (
    <nav
      aria-label="Navigation entre les pages"
      className="flex justify-center items-center gap-4 my-8"
    >
      {/* Bouton Précédent */}
      {hasPrevious ? (
        <Link
          href={listEmul[currentIndex - 1].url}
          className={classNames.enabled}
          aria-label="Page précédente"
        >
          Précédent
        </Link>
      ) : (
        <span className={classNames.disabled} aria-hidden="true">
          Précédent
        </span>
      )}

      {/* Indicateur de page */}
      <div className={classNames.indicator} aria-live="polite">
        {currentIndex + 1} / {listEmul.length}
      </div>

      {/* Bouton Suivant */}
      {hasNext ? (
        <Link
          href={listEmul[currentIndex + 1].url}
          className={classNames.enabled}
          aria-label="Page suivante"
        >
          Suivant
        </Link>
      ) : (
        <span className={classNames.disabled} aria-hidden="true">
          Suivant
        </span>
      )}
    </nav>
  );
};

export default NavEmul;
