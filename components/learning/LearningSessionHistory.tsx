// components/learning/LearningSessionHistory.tsx

"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // si vous utilisez shadcn/ui
import { Input } from "@/components/ui/input"; // idem, adapte selon ton organisation
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Session = {
  id: string;
  startTime: string; // ISO date
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

  // Filtres
  const [interval, setInterval] = useState<"all" | "day" | "week">("all");
  const [search, setSearch] = useState("");

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

  // Filtres combinés
  const filteredHistory = useMemo(() => {
    let sessions = [...history];
    const now = new Date();
    if (interval !== "all") {
      sessions = sessions.filter((s) => {
        const date = new Date(s.startTime);
        if (interval === "day")
          return now.toDateString() === date.toDateString();
        if (interval === "week") {
          const diff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        }
        return true;
      });
    }
    if (search) {
      sessions = sessions.filter((s) =>
        s.text?.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return sessions;
  }, [history, interval, search]);

  // Données pour le graphique
  const chartData = filteredHistory.map((s) => ({
    date: new Date(s.startTime).toLocaleDateString(),
    score: Math.round(s.scoreEnd),
  }));

  if (!userId) return null;
  if (loading)
    return (
      <div className="text-gray-400 animate-pulse">
        Chargement de l'historique…
      </div>
    );
  if (error)
    return <div className="text-red-600 font-semibold">{error}</div>;

  return (
    <div className="bg-emerald-200 mt-6 p-4 rounded shadow">
      {/* Titre */}
      <h2 className="text-lg font-bold mb-3">Historique de mes sessions</h2>

      {/* Filtres */}
      <div className="flex gap-4 mb-4 flex-wrap items-center">
        {/* Interval Filter */}
        <Select value={interval} onValueChange={(v) => setInterval(v as any)}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            <SelectItem value="day">Aujourd’hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
          </SelectContent>
        </Select>

        {/* Recherche par texte */}
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filtrer par texte…"
          className="w-60 bg-white"
        />
      </div>

      {/* Graphique de progression */}
      <div className="bg-white mb-4 p-3 rounded shadow-sm">
        <h3 className="font-semibold mb-2">Progression</h3>
        {chartData.length === 0 ? (
          <div className="text-gray-400 text-sm">
            Aucune donnée pour afficher la progression.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                fill="#6ee7b7"
                dot
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Affichage des sessions */}
      {filteredHistory.length === 0 ? (
        <div className="text-gray-400">Aucune session enregistrée.</div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {filteredHistory.map((s) => (
            <li
              key={s.id}
              className="py-3 flex items-center gap-4 text-sm transition-colors hover:bg-emerald-100 rounded"
            >
              <div>
                <div className="font-medium text-blue-900">
                  {new Date(s.startTime).toLocaleString()} &rarr;{" "}
                  {s.endTime ? (
                    new Date(s.endTime).toLocaleTimeString()
                  ) : (
                    <span className="text-xs text-gray-400">(en cours)</span>
                  )}
                </div>
                <div className="text-gray-700">
                  Texte&nbsp;:{" "}
                  <span className="font-semibold">
                    {s.text?.title || "?"}
                  </span>
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
                  Score:{" "}
                  <b>
                    {Math.round(s.scoreStart)}% ➔ {Math.round(s.scoreEnd)}%
                  </b>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
