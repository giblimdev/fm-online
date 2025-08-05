// components/text/TextLearn.tsx

"use client";

import React, { useEffect, useState, useRef } from "react";

type WordState = {
  wordPosition: number;
  wordContent: string;
  isMasked: boolean;
};

type Progress = {
  maskedWords: number;
  scorePercentage: number;
};

type TextLearnProps = {
  textId: string;
  userId: string;
};

export default function TextLearn({ textId, userId }: TextLearnProps) {
  const [paragraphs, setParagraphs] = useState<WordState[][]>([]);
  const [words, setWords] = useState<WordState[]>([]);
  const [progress, setProgress] = useState<Progress>({ maskedWords: 0, scorePercentage: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Nouveau : pour garder l'id de session courante
  const sessionIdRef = useRef<string | null>(null);

  // Au chargement, démarrer une session, et la finir au démontage
  useEffect(() => {
    if (!textId || !userId) {
      setError("Texte ou utilisateur manquant");
      setLoading(false);
      return;
    }
    // Crée la session au démarrage
    async function startSession() {
      try {
        const res = await fetch("/api/learning/session/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, textId }),
        });
        if (!res.ok) throw new Error("Erreur création session");
        const data = await res.json();
        sessionIdRef.current = data.id;
      } catch (err) {
        // Optionnel : gérer cette erreur
      }
    }
    startSession();

    // Nettoyage : à la sortie du composant, cloture la session
    return () => {
      if (sessionIdRef.current) {
        fetch("/api/learning/session/end", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            wordsMasked: progress.maskedWords,
            wordsRevealed: words.length - progress.maskedWords,
            scoreEnd: progress.scorePercentage,
          }),
        });
      }
    };
    // Ajoute progress et words pour être sûr qu'on envoie un état à jour (optionnel)
    // eslint-disable-next-line
  }, [textId, userId]);

  // Reste du composant (inchangé)
  useEffect(() => {
    async function loadText() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/learning/text/${textId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(`Erreur HTTP ${res.status}: ${msg}`);
        }
        const data = await res.json();
        setParagraphs(data.paragraphs ?? []);
        setProgress(data.progress ?? { maskedWords: 0, scorePercentage: 0 });
        setWords(data.paragraphs ? data.paragraphs.flat() : []);
      } catch (err: any) {
        setError("Erreur lors du chargement du texte");
      } finally {
        setLoading(false);
      }
    }
    if (textId && userId) loadText();
  }, [textId, userId]);

  async function toggleWord(position: number) {
    const idx = words.findIndex((w) => w.wordPosition === position);
    if (idx === -1) return;
    const word = words[idx];
    const newMasked = !word.isMasked;
    try {
      const res = await fetch(`/api/learning/wordstate/toggle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          textId,
          wordPosition: position,
          isMasked: newMasked,
        }),
      });
      if (!res.ok) throw new Error("Erreur mise à jour mot");
      // Update local state
      const updatedWords = [...words];
      updatedWords[idx] = { ...word, isMasked: newMasked };
      setWords(updatedWords);
      // Résynchro paragraphs
      const rebuiltParagraphs: WordState[][] = [];
      let cursor = 0;
      for (const para of paragraphs) {
        const newPara: WordState[] = [];
        for (let i = 0; i < para.length; i++) {
          newPara.push(updatedWords[cursor]);
          cursor++;
        }
        rebuiltParagraphs.push(newPara);
      }
      setParagraphs(rebuiltParagraphs);
      // Progression
      const maskedCount = updatedWords.filter((w) => w.isMasked).length;
      const scorePct = updatedWords.length > 0 ? (maskedCount / updatedWords.length) * 100 : 0;
      setProgress({ maskedWords: maskedCount, scorePercentage: scorePct });
      // Update côté serveur
      await fetch(`/api/learning/userprogress/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          textId,
          maskedWords: maskedCount,
          scorePercentage: scorePct,
        }),
      });
    } catch (err) {
      alert("Erreur lors de la mise à jour du mot");
    }
  }

  if (loading) return <>Chargement du texte...</>;
  if (error) return <>{error}</>;

  return (
    <div>
      <div>
        Progression : {progress.maskedWords} mots masqués (
        {progress.scorePercentage.toFixed(1)}%)
      </div>
      {paragraphs.map((paraWords, paraIdx) => (
        <div key={paraIdx}>
          {paraWords.map(({ wordContent, isMasked, wordPosition }) => (
            <span
              key={wordPosition}
              onClick={() => toggleWord(wordPosition)}
              title="Cliquez pour masquer/démasquer"
              className="cursor-pointer select-none mr-2 relative inline-block rounded px-1"
              style={{ userSelect: "none" }}
            >
              {isMasked ? <><span style={{ opacity: 0.5 }}>___</span></> : wordContent}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
