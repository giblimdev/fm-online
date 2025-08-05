// components/learning/LearningSessionHistory.tsx

"use client";
import React, { useEffect, useState } from "react";

type Session = {
  id: string;
  startTime: string;   // ISO date
  endTime: string | null;
  wordsRevealed: number;
  wordsMasked: number;
  scoreStart: number;
  scoreEnd: number;
  text: { id: string; title: string };
};

type Props = {
  userId: string;
  textId?: string;
};

export default function LearningSessionHistory({ userId, textId }: Props) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSessions() {
      setLoading(true);
      setError(null);
      try {
        const query = textId
          ? `/api/learning/session/history?userId=${userId}&textId=${textId}`
          : `/api/learning/session/history?userId=${userId}`;
        const res = await fetch(query);
        if (!res.ok) throw new Error("Erreur chargement historique");
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        setError("Erreur lors du chargement de l'historique");
      } finally {
        setLoading(false); 
      }
    }
    if (userId) fetchSessions();
  }, [userId, textId]);

  if (!userId) return null;
  if (loading) return <div>Chargement de l'historique…</div>;
  if (error) return <div className="text-red-600 font-semibold">{error}</div>;
  if (history.length === 0) return <div className="text-gray-400">Aucune session enregistrée.</div>;

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-3">Historique de mes sessions</h2>
      <ul className="divide-y divide-gray-100">
        {history.map((s) => (
          <li key={s.id} className="py-3 flex items-center gap-4 text-sm">
            <div>
              <div className="font-medium text-blue-900">
                {new Date(s.startTime).toLocaleString()} &rarr;{" "}
                {s.endTime
                  ? new Date(s.endTime).toLocaleTimeString()
                  : <span className="text-xs text-gray-400">(en cours)</span>}
              </div>
              <div className="text-gray-700">
                Texte&nbsp;:{' '}
                <span className="font-semibold">{s.text?.title || "?"}</span>
              </div>
            </div>
            <div className="flex-1 text-blue-800 font-mono text-xs sm:text-sm flex flex-wrap gap-4 ml-8">
              <span>
                Masqués: <b>{s.wordsMasked}</b>
              </span>
              <span>
                Révélés: <b>{s.wordsRevealed}</b>
              </span>
              <span>
                Score: <b>{Math.round(s.scoreStart)}% ➔ {Math.round(s.scoreEnd)}%</b>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
