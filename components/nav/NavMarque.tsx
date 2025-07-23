// @/components/Pagination.tsx
"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { listMarque } from "@/lib/nav/ListMarque";

const NavMarque: React.FC = () => {
  const currentPageUrl = usePathname();

  // Validation des données
  if (!Array.isArray(listMarque) || listMarque.length === 0) {
    console.error("NavMarque: listMarque doit être un tableau non vide");
    return null;
  }

  // Normalisation des URLs pour la comparaison
  const normalizeUrl = (url: string) => url.replace(/\/+$/, "");
  const currentNormalized = normalizeUrl(currentPageUrl);

  // Trouver l'index avec correspondance exacte
  const currentIndex = listMarque.findIndex(
    (page) => normalizeUrl(page.url) === currentNormalized
  );

  if (currentIndex === -1) {
    console.warn(`Aucune correspondance pour l'URL: ${currentPageUrl}`);
    return null;
  }

  // Configuration des classes CSS
  const buttonClasses = {
    enabled:
      "px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors",
    disabled: "px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed",
    indicator: "px-4 py-2 bg-blue-500 text-white rounded",
  };

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < listMarque.length - 1;

  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center items-center gap-4 my-8"
    >
      {/* Bouton Précédent */}
      {hasPrevious ? (
        <Link
          href={listMarque[currentIndex - 1].url}
          className={buttonClasses.enabled}
          aria-label="Page précédente"
        >
          Précédent
        </Link>
      ) : (
        <span className={buttonClasses.disabled} aria-hidden="true">
          Précédent
        </span>
      )}

      {/* Indicateur de page */}
      <span className={buttonClasses.indicator} aria-live="polite">
        {currentIndex + 1} / {listMarque.length}
      </span>

      {/* Bouton Suivant */}
      {hasNext ? (
        <Link
          href={listMarque[currentIndex + 1].url}
          className={buttonClasses.enabled}
          aria-label="Page suivante"
        >
          Suivant
        </Link>
      ) : (
        <span className={buttonClasses.disabled} aria-hidden="true">
          Suivant
        </span>
      )}
    </nav>
  );
};

export default NavMarque;
