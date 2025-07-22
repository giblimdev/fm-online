// @/components/Pagination.tsx
"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { listNar } from "@/lib/ListNar";

const NavNar: React.FC = () => {
  const currentPageUrl = usePathname();

  // Validation des données
  if (!Array.isArray(listNar) || listNar.length === 0) {
    console.error("Pagination: listNar doit être un tableau non vide");
    return null;
  }

  // Normalisation des URLs pour correspondance plus flexible
  const normalizeUrl = (url: string) => url?.replace(/\/+$/, "") || "";
  const currentNormalized = normalizeUrl(currentPageUrl);

  const currentIndex = listNar.findIndex(
    (page) => normalizeUrl(page.url) === currentNormalized
  );

  if (currentIndex === -1) {
    console.warn(`Pagination: URL actuelle non trouvée (${currentPageUrl})`);
    return null;
  }

  // Configuration des styles
  const buttonStyle = "px-4 py-2 rounded transition-colors duration-200";
  const enabledStyle = "bg-gray-200 text-gray-700 hover:bg-gray-300";
  const disabledStyle = "bg-gray-100 text-gray-400 cursor-not-allowed";
  const indicatorStyle = "bg-blue-500 text-white";

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < listNar.length - 1;

  return (
    <nav
      aria-label="Navigation entre pages"
      className="flex justify-center items-center gap-4 my-8"
    >
      {/* Bouton Précédent */}
      {hasPrevious ? (
        <Link
          href={listNar[currentIndex - 1].url}
          className={`${buttonStyle} ${enabledStyle}`}
          aria-label="Page précédente"
        >
          Précédent
        </Link>
      ) : (
        <span className={`${buttonStyle} ${disabledStyle}`} aria-hidden="true">
          Précédent
        </span>
      )}

      {/* Indicateur de page */}
      <span className={`${buttonStyle} ${indicatorStyle}`} aria-live="polite">
        {currentIndex + 1} / {listNar.length}
      </span>

      {/* Bouton Suivant */}
      {hasNext ? (
        <Link
          href={listNar[currentIndex + 1].url}
          className={`${buttonStyle} ${enabledStyle}`}
          aria-label="Page suivante"
        >
          Suivant
        </Link>
      ) : (
        <span className={`${buttonStyle} ${disabledStyle}`} aria-hidden="true">
          Suivant
        </span>
      )}
    </nav>
  );
};

export default NavNar;
