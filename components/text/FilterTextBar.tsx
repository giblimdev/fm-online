// components/text/FilterTextBar.tsx

import React from "react";
import { Grade } from "@/lib/generated/prisma/client";

type FilterState = {
  search: string;
  grade: string;
  category: string;
};

type FilterTextBarProps = {
  filters: FilterState;
  grades: string[];
  categories: string[];
  onChange: (filters: FilterState) => void;
};

export default function FilterTextBar({
  filters,
  grades,
  categories,
  onChange,
}: FilterTextBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 items-end bg-white/90 p-4 rounded-xl shadow-sm border border-gray-100">
      {/* Filtre par nom */}
      <div className="flex-1">
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Rechercher par nom
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full rounded border-gray-200 px-3 py-2 bg-white focus:ring-blue-400 focus:border-blue-400 transition"
          placeholder="Nom du texte..."
        />
      </div>
      {/* Filtre par grade */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Grade
        </label>
        <select
          value={filters.grade}
          onChange={(e) => onChange({ ...filters, grade: e.target.value })}
          className="rounded border-gray-200 px-3 py-2 bg-white w-36 focus:ring-blue-400 focus:border-blue-400 transition"
        >
          <option value="">Tous les grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
      {/* Filtre catégorie */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Catégorie
        </label>
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
          className="rounded border-gray-200 px-3 py-2 bg-white w-36 focus:ring-blue-400 focus:border-blue-400 transition"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) =>
            cat ? (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ) : null
          )}
        </select>
      </div>
    </div>
  );
}
