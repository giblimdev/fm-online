"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth/auth-client";
import DisplayText, { TextItem } from "@/components/text/DisplayText";
import FormText, { FormData } from "@/components/text/FormText";

export default function TextManagerPage() {
  const { data: session, isPending } = useSession();
  const userId = session?.user?.id;

  const [texts, setTexts] = useState<TextItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TextItem | null>(null);

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
    console.log("createText - userId:", userId);
    console.log("createText - payload envoyé:", payload);

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
    console.log("updateText - userId:", userId);
    console.log("updateText - payload envoyé:", payload);

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

      console.log("handleSubmit - userId:", userId);
      console.log("handleSubmit - data reçu du formulaire:", form);

      if (editing && editing.id) {
        const updated = await updateText(editing.id, form);
        setTexts((texts) => texts.map((t) => (t.id === editing.id ? updated : t)));
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

  if (isPending) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Gestion des Textes</h1>
      <button onClick={handleAdd}>Ajouter un texte</button>

      {showForm && (
        <FormText
          initialData={editing ? mapTextToForm(editing) : {}}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <DisplayText
        texts={texts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMoveUp={(idx) => move(idx, idx - 1)}
        onMoveDown={(idx) => move(idx, idx + 1)}
      />
    </div>
  );
}
