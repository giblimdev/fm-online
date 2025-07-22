// @/components/nav/NavKt.tsx
"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { listArche } from "@/lib/ListArche";

const NavArche: React.FC = () => {
  const currentPageUrl = usePathname();

  // Debug: Affiche l'URL actuelle et la liste des pages
  console.log("Current URL:", currentPageUrl);
  console.log("Page list:", listArche);
  // Protection contre les données manquantes
  if (!listArche || listArche.length === 0) {
    console.error("La liste des pages est vide ou non chargée");
    return null;
  }

  // Trouve l'index de la page actuelle
  const currentIndex = listArche.findIndex(
    (page) => currentPageUrl.startsWith(page.url) // Utilisation de startsWith pour plus de flexibilité
  );

  // Debug: Affiche l'index trouvé
  console.log("Current index:", currentIndex);

  // Si la page actuelle n'est pas dans la liste
  if (currentIndex === -1) {
    console.warn("Page actuelle non trouvée dans la liste");
    return null;
  }

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < listArche.length - 1;

  return (
    <div className="flex justify-center items-center space-x-4 my-8">
      {/* Bouton Précédent */}
      {hasPrevious ? (
        <Link
          href={listArche[currentIndex - 1].url}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Précédent
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
          Précédent
        </span>
      )}

      {/* Indicateur de page */}
      <span className="px-4 py-2 bg-blue-500 text-white rounded">
        Page {currentIndex + 1} / {listArche.length}
      </span>

      {/* Bouton Suivant */}
      {hasNext ? (
        <Link
          href={listArche[currentIndex + 1].url}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          Suivant
        </Link>
      ) : (
        <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
          Suivant
        </span>
      )}
    </div>
  );
};

export default NavArche;
