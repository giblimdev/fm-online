"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Grade } from "@/lib/generated/prisma/client";

export type FormData = {
  title: string;
  content: string;
  category?: string;
  grade?: Grade; // uniquement Grade ou undefined, jamais ""
  ordre?: number;
  isActive: boolean;
  isPublic: boolean;
};

type FormTextProps = {
  initialData?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
};

export default function FormText({
  initialData = {},
  onSubmit,
  onCancel,
}: FormTextProps) {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    category: undefined,
    grade: undefined,
    ordre: 20,
    isActive: true,
    isPublic: false,
    ...initialData,
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    let val: any = value;

    if (type === "checkbox" && "checked" in e.target) {
      val = (e.target as HTMLInputElement).checked;
    } else if (name === "grade") {
      val = value === "" ? undefined : (value as Grade);
    } else if (name === "ordre") {
      val = value === "" ? undefined : Number(value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const preparedData: FormData = {
      ...form,
      ordre: typeof form.ordre === "string" ? Number(form.ordre) || 20 : form.ordre,
      category: form.category === "" ? undefined : form.category,
      grade: form.grade,
    };

    onSubmit(preparedData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {initialData && Object.keys(initialData).length > 0
          ? "Modifier le texte"
          : "Ajouter un texte"}
      </h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-gray-700 font-medium mb-1"
        >
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Entrez le titre"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-gray-700 font-medium mb-1"
        >
          Contenu <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Entrez le contenu du texte"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-medium mb-1"
        >
          Catégorie (optionnel)
        </label>
        <input
          id="category"
          type="text"
          name="category"
          value={form.category ?? ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Entrez la catégorie"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="grade"
          className="block text-gray-700 font-medium mb-1"
        >
          Niveau (optionnel)
        </label>
        <select
          id="grade"
          name="grade"
          value={form.grade ?? ""}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionnez un niveau (facultatif)</option>
          {Object.values(Grade).map((gradeValue) => (
            <option key={gradeValue} value={gradeValue}>
              {gradeValue}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="ordre"
          className="block text-gray-700 font-medium mb-1"
        >
          Ordre (optionnel)
        </label>
        <input
          id="ordre"
          type="number"
          name="ordre"
          value={form.ordre ?? 20}
          min={0}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Entrez l'ordre"
        />
      </div>

      <div className="flex items-center mb-4 space-x-6">
        <label className="inline-flex items-center text-gray-700 font-medium">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 select-none">Actif</span>
        </label>

        <label className="inline-flex items-center text-gray-700 font-medium">
          <input
            type="checkbox"
            name="isPublic"
            checked={form.isPublic}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 select-none">Texte public</span>
        </label>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Enregistrer
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
