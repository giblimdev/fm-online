"use client";
import { useEffect, useState } from "react";

const FILES = [
  "montext.txt",
  "inverstiture.txt",
  "planches.txt",
  "ouverture&fermeture.txt",
  "Obligations.txt",
  "exhortation-initiation.txt",
  "exhortation.txt",
  "Marque.txt",
  "archeConf.txt",
  "kt.txt",
];

const Home = () => {
  // Variables d'état
  const [selectedFile, setSelectedFile] = useState<string>(FILES[0]); // Fichier par défaut
  const [text, setText] = useState<string>("");
  const [selectedWords, setSelectedWords] = useState<Set<number>>(new Set());

  // Charger le texte du fichier sélectionné
  useEffect(() => {
    const fetchText = async () => {
      const res = await fetch(`/${selectedFile}`);
      const data = await res.text();
      setText(data);
      setSelectedWords(new Set()); // Réinitialiser les sélections quand on change de fichier
    };

    fetchText();
  }, [selectedFile]);

  // Fonction pour basculer l'état d'un mot
  const toggleWord = (index: number) => {
    setSelectedWords((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Diviser le texte en lignes et ensuite en mots tout en conservant la ponctuation et les espaces
  const lines = text.split("\n"); // Séparer le texte en lignes
  const wordRegex = /[\p{L}\d'-]+|[^\p{L}\d\s]+/gu;

  return (
    <div>
      <h1>Choisissez un fichier et cliquez sur un mot pour le masquer</h1>

      {/* Sélecteur de fichier */}
      <select
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        {FILES.map((file) => (
          <option key={file} value={file}>
            {file}
          </option>
        ))}
      </select>

      <div className="m-auto max-w-2xl border p-4 ">
        {lines.map((line, lineIndex) => {
          const words = line.match(wordRegex) || [];
          return (
            <p
              key={lineIndex}
              style={{ margin: 0, display: "flex", flexWrap: "wrap" }}
            >
              {words.map((word, wordIndex) => {
                const globalIndex =
                  words.slice(0, wordIndex).join("").length + lineIndex * 1000; // Identifiant unique

                // Si le mot est un espace, on ne le rend pas cliquable
                if (word.trim() === "") {
                  return <span key={globalIndex}>{word}</span>;
                }

                return (
                  <span
                    key={globalIndex}
                    onClick={() => toggleWord(globalIndex)}
                    style={{
                      cursor: "pointer",
                      padding: "1px 1px",
                      margin: "1px 1px",
                      borderRadius: "4px",
                      border: selectedWords.has(globalIndex)
                        ? "1px solid blue"
                        : "1px solid transparent",
                      color: selectedWords.has(globalIndex) ? "white" : "black",
                      backgroundColor: selectedWords.has(globalIndex)
                        ? "transparent"
                        : "transparent",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
              <br />
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
