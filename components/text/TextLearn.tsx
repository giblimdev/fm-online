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

  // Ref pour stocker l'id de la session d'apprentissage en cours
  const sessionIdRef = useRef<string | null>(null);

  // Chargement du texte + création session au montage et clôture au démontage
  useEffect(() => {
    if (!textId || !userId) {
      setError("Texte ou utilisateur manquant");
      setLoading(false);
      return;
    }

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

    // Start learning session
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
      } catch {
        // Gestion silent de l'erreur (optionnel)
      }
    }

    loadText();
    startSession();

    return () => {
      // End learning session au démontage en envoyant progression actuelle
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
  }, [textId, userId]);

  // Toggle le masquage d’un mot
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

      if (!res.ok) {
        throw new Error(`Erreur mise à jour mot, status ${res.status}`);
      }

      // Mise à jour locale
      const updatedWords = [...words];
      updatedWords[idx] = { ...word, isMasked: newMasked };
      setWords(updatedWords);

      // Reconstruire paragraphs
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

      // Mise à jour de la progression
      const maskedCount = updatedWords.filter((w) => w.isMasked).length;
      const scorePct = updatedWords.length > 0 ? (maskedCount / updatedWords.length) * 100 : 0;
      setProgress({ maskedWords: maskedCount, scorePercentage: scorePct });

      // Mise à jour progression sur serveur (optionnel)
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
      console.error(err);
      alert("Erreur lors de la mise à jour du mot");
    }
  }

  if (loading) return <div>Chargement du texte...</div>;
  if (error) return <div className="text-red-600 font-semibold">{error}</div>;

  return (
    <div className="max-w-full overflow-x-auto" style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
      <h3 className="mb-4 font-semibold">
        Progression : {progress.maskedWords} mots masqués ({progress.scorePercentage.toFixed(1)}%)
      </h3>

      {paragraphs.map((paraWords, paraIdx) => (
        <p key={paraIdx} className="text-lg leading-relaxed mb-4">
          {paraWords.map(({ wordContent, isMasked, wordPosition }) => (
            <span
              key={wordPosition}
              onClick={() => toggleWord(wordPosition)}
              title="Cliquez pour masquer/démasquer"
              className="cursor-pointer select-none mr-2 relative inline-block rounded px-1"
              style={{ userSelect: "none" }}
            >
              {isMasked ? (
                <>
                  <span className="invisible select-none">{wordContent}</span>
                  <span className="absolute inset-0 flex items-center justify-center border border-blue-500 rounded text-white select-none">
                    ___
                  </span>
                </>
              ) : (
                <span>{wordContent}</span>
              )}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
