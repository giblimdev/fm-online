// app/learning/textManager/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth/auth-client";
import DisplayText, { TextItem } from "@/components/text/DisplayText";
import FormText, { FormData } from "@/components/text/FormText";
import FilterTextBar from "@/components/text/FilterTextBar";
import { Grade } from "@/lib/generated/prisma/client";

import { Plus, X, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";

type Filters = {
  search: string;
  grade: string;
  category: string;
};

export default function TextManagerPage() {
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  const [texts, setTexts] = useState<TextItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TextItem | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    grade: "",
    category: "",
  });

  async function fetchTexts() {
    try {
      const res = await fetch("/api/text", { cache: "no-store" });
      if (!res.ok) throw new Error("Erreur chargement textes");
      const data = (await res.json()) as TextItem[];
      setTexts(data);
    } catch (error) {
      console.error("fetchTexts error:", error);
    }
  }

  useEffect(() => {
    fetchTexts();
  }, []);

  async function createText(data: FormData) {
    if (!userId) throw new Error("Utilisateur non connecté");

    const payload = { ...data, userId };
    const res = await fetch("/api/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur création texte");
    return await res.json();
  }

  async function updateText(id: string, data: FormData) {
    if (!userId) throw new Error("Utilisateur non connecté");

    const payload = { ...data, userId };
    const res = await fetch(`/api/text/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Erreur mise à jour texte");
    return await res.json();
  }

  async function deleteText(id: string) {
    const res = await fetch(`/api/text/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erreur suppression texte");
  }

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleEdit(text: TextItem) {
    setEditing(text);
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (confirm("Confirmer la suppression du texte ?")) {
      try {
        await deleteText(id);
        setTexts((texts) => texts.filter((t) => t.id !== id));
      } catch {
        alert("Erreur lors de la suppression du texte");
      }
    }
  }

  function move(idxFrom: number, idxTo: number) {
    if (idxTo < 0 || idxTo >= texts.length) return;
    const reordered = [...texts];
    const [moved] = reordered.splice(idxFrom, 1);
    reordered.splice(idxTo, 0, moved);
    setTexts(reordered);
  }

  async function handleSubmit(form: FormData) {
    try {
      if (!userId) {
        alert("Vous devez être connecté pour enregistrer un texte.");
        return;
      }

      if (editing && editing.id) {
        const updated = await updateText(editing.id, form);
        setTexts((texts) =>
          texts.map((t) => (t.id === editing.id ? updated : t))
        );
      } else {
        const created = await createText(form);
        setTexts((texts) => [...texts, created]);
      }

      setShowForm(false);
      setEditing(null);
    } catch {
      alert("Erreur lors de l'enregistrement du texte");
    }
  }

  function mapTextToForm(text: TextItem): Partial<FormData> {
    return {
      title: text.title,
      content: text.content,
      category: text.category ?? "",
      grade: (text.grade ?? "") as FormData["grade"],
      ordre: (text as any).ordre ?? 20,
      isActive: text.isActive,
      isPublic: (text as any).isPublic ?? false,
    };
  }

  // Générer listes filtrables, uniquement chaînes définies non vides
  const gradeList: string[] = Array.from(
    new Set(
      texts
        .map((t) => t.grade)
        .filter((g): g is string => typeof g === "string" && g.length > 0)
    )
  );
  const categoryList: string[] = Array.from(
    new Set(
      texts
        .map((t) => t.category)
        .filter((c): c is string => typeof c === "string" && c.length > 0)
    )
  );

  // Appliquer les filtres à la liste
  const filteredTexts = texts.filter((t) => {
    const matchTitle =
      filters.search === "" ||
      t.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchGrade = filters.grade === "" || t.grade === filters.grade;
    const matchCategory = filters.category === "" || t.category === filters.category;
    return matchTitle && matchGrade && matchCategory;
  });

  if (isPending)
    return <div className="mt-12 text-center text-lg">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-14 px-2 sm:px-0">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800 tracking-tight">
            Gestion des Textes
          </h1>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow transition-colors font-semibold"
          >
            <Plus size={20} />
            Ajouter un texte
          </button>
        </header>

        <FilterTextBar
          filters={filters}
          grades={gradeList}
          categories={categoryList}
          onChange={setFilters}
        />

        {showForm && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-2xl p-6 relative max-w-lg w-full">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-red-500"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
              <FormText
                initialData={editing ? mapTextToForm(editing) : {}}
                onSubmit={handleSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}




        <section>
          {filteredTexts.length === 0 ? (
            <div className="text-center mt-12 text-gray-400 italic">
              Aucun texte ne correspond à ce filtre.
            </div>
          ) : (
            <ul className="space-y-4">
              {filteredTexts.map((t, idx) => (
                <li
                  key={t.id}
                  className="group relative rounded-xl bg-white border border-gray-100 shadow hover:shadow-lg p-6 flex flex-col md:flex-row md:items-center md:gap-6 transition"
                >
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-blue-900 truncate">
                      {t.title}
                    </h2>
                    <div className="text-sm text-gray-500 mt-1 flex flex-wrap gap-2">
                      {t.category && (
                        <span className="px-2 py-0.5 bg-gray-100 rounded">
                          {t.category}
                        </span>
                      )}
                      {t.grade && (
                        <span className="px-2 py-0.5 bg-blue-100 rounded">
                          {t.grade}
                        </span>
                      )}
                      <span
                        className={
                          t.isActive
                            ? "inline-block rounded px-2 bg-green-100 text-green-700"
                            : "inline-block rounded px-2 bg-gray-200 text-gray-500"
                        }
                      >
                        {t.isActive ? "Actif" : "Inactif"}
                      </span>
                     
                    </div>
                    <div className="line-clamp-3 text-gray-600 text-[15px] mt-2">
                      {t.content.slice(0, 200)}
                      {t.content.length > 200 && "…"}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 mt-4 md:mt-0 md:flex-col md:items-center shrink-0 md:gap-0 md:space-y-2 ml-0 md:ml-2">
                    <button
                      onClick={() => handleEdit(t)}
                      className="p-2 rounded-full hover:bg-blue-100 text-blue-700 transition"
                      title="Modifier"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button
                      onClick={() => move(idx, idx - 1)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                      title="Remonter"
                      disabled={idx === 0}
                    >
                      <ArrowUp size={20} />
                    </button>
                    <button
                      onClick={() => move(idx, idx + 1)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
                      title="Descendre"
                      disabled={idx === texts.length - 1}
                    >
                      <ArrowDown size={20} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
