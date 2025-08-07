"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth/auth-client";
import TextLearn from "@/components/text/TextLearn";
import { getTextByUserId } from "@/utils/getText";
import LearningSessionHistory from "@/components/learning/LearningSessionHistory";

type Progress = {
  maskedWords: number;
  scorePercentage: number;
};

type TextWithProgress = {
  id: string;
  title: string;
  isActive: boolean;
  category?: string | null;
  grade?: string | null;
  myProgress?: Progress;
};

export default function TextDashboardPage() {
  const { data: session, isPending, error: sessionError } = useSession();

  const [texts, setTexts] = useState<TextWithProgress[]>([]);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // userId typé string | null
  const userId = session?.user?.id ?? null;

  useEffect(() => {
    async function loadTexts() {
      if (isPending) return;

      if (sessionError) {
        setError("Erreur lors de la récupération de la session.");
        return;
      }

      if (!session?.user?.id) {
        setError("Vous devez être connecté pour accéder aux textes.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const rawTexts = await getTextByUserId(session.user.id);

        // Normaliser myProgress pour éviter undefined
        const normalizedTexts: TextWithProgress[] = rawTexts.map((t: any) => ({
          ...t,
          myProgress:
            t.myProgress && typeof t.myProgress === "object"
              ? {
                  maskedWords: Number(t.myProgress.maskedWords) || 0,
                  scorePercentage: Number(t.myProgress.scorePercentage) || 0,
                }
              : { maskedWords: 0, scorePercentage: 0 },
        }));

        setTexts(normalizedTexts);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des textes.");
      } finally {
        setLoading(false);
      }
    }

    loadTexts();
  }, [session, isPending, sessionError]);

  if (isPending || loading) {
    return <div className="text-center mt-10 font-medium">Chargement des textes...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 font-semibold">{error}</div>;
  }

  if (texts.length === 0) {
    return <div className="text-center mt-10 text-gray-600">Aucun texte à apprendre pour le moment.</div>;
  }

  return (
    <div className=" max-w-3xl mx-auto mt-8 px-4">
      {/* Ne rendre LearningSessionHistory que si userId est défini */}
      {userId && <LearningSessionHistory userId={userId} />}

      <h1 className="text-2xl font-bold mb-6 text-center">Choisissez un texte à étudier</h1>

      {!selectedTextId && (
        <ul className="space-y-4">
          {texts.map((t) => (
            <li
              key={t.id}
              className="border rounded p-4 flex justify-between items-center bg-white shadow"
            >
              <div>
                <h2 className="text-lg font-semibold">{t.title}</h2>
                <p className="text-sm text-gray-600">
                  {t.category ?? ""} • {t.grade ?? ""} • {t.isActive ? "Actif" : "Inactif"}
                </p>
                <p className="text-sm mt-1">
                  Progression : {(t.myProgress?.maskedWords ?? 0)} mots masqués (
                  {(t.myProgress?.scorePercentage ?? 0).toFixed(1)}%)
                </p>
              </div>
              <button
                onClick={() => setSelectedTextId(t.id)}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                Étudier
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedTextId && userId && (
        <section className="mt-6 bg-gray-50 p-6 rounded shadow">
          <button
            onClick={() => setSelectedTextId(null)}
            className="mb-6 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            ← Retour à la liste
          </button>
          <TextLearn textId={selectedTextId} userId={userId} />
        </section>
      )}
    </div>
  );
}
