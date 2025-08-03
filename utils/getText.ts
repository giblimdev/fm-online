// utils/getText.ts
/**
 * Fonction utilitaire côté frontend pour récupérer la liste des textes associés à un user
 */
export async function getTextByUserId(userId: string) {
  const res = await fetch(`/api/text/getTextByUserId?userId=${encodeURIComponent(userId)}`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Erreur récupération textes");
  return res.json();
}
