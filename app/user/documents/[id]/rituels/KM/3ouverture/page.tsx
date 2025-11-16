import React from "react";

export default function page() {
  return (
    <div>
      {" "}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif">
        {/* En-tête */}
        <div className="text-center mb-8 border-b border-amber-200 pb-4">
          <h1 className="text-2xl font-bold title-font text-amber-900">
            Cérémonial d'ouverture
          </h1>
          <h2 className="text-lg font-semibold text-amber-800 mt-2">
            d'un Prieuré de l'Ordre
          </h2>
        </div>

        <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
          {/* Première instruction */}
          <div className="text-center mb-6">
            <p className="text-lg italic text-amber-700">
              Les Chevaliers sont assis.
            </p>
          </div>

          {/* Dialogue cérémoniel */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <div className="text-center mb-4">
              <p className="font-bold text-amber-900">
                Mar. — Chevaliers, mes Frères - DE — BOUT.
              </p>
            </div>
          </div>

          {/* Description de la procession */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="mb-4">
              L'Ém. P. entre dans la salle capitulaire escorté par les Officiers
              des tables pentagonale et octogonale et accompagné par le Chap. et
              les Grands officiers, dans l'ordre suivant :
            </p>

            {/* Schéma de la procession */}
            <div className="bg-white p-4 rounded border border-amber-200 max-w-md mx-auto">
              <div className="space-y-2 text-center">
                <div className="font-bold text-amber-900">Mar. Adj.</div>
                <div className="text-xs text-amber-600">
                  G.Off. (les plus gradés derrière) 2 x 2 Très.
                </div>
                <div className="font-bold text-amber-900">Chanc.</div>
                <div className="font-bold text-amber-900">Bailli</div>
                <div className="font-bold text-amber-900">Amiral</div>
                <div className="font-bold text-amber-900">Chap.</div>
                <div className="font-bold text-amber-900">1er Lt.</div>
                <div className="font-bold text-amber-900">
                  Lt.-G<sup>a</sup>
                </div>
                <div className="font-bold text-amber-900">
                  Cap.-G<sup>a</sup>
                </div>
                <div className="font-bold text-amber-900 text-lg border-t border-amber-300 pt-2">
                  Ém. P.
                </div>
                <div className="font-bold text-amber-900">Mar.</div>
              </div>
            </div>
          </div>

          {/* Instructions détaillées */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="mb-3">
              La procession remontant par le nord, fait halte et les deux
              colonnes se font face lorsque le Mar. Adj. arrive à mi-chemin
              entre les deux tables (voir p. 80).
            </p>
            <p className="mb-3">
              L'Em. P. remonte à l'intérieur des haies ainsi formées et gagne sa
              place, suivi par les officiers de la table pentagonale.
            </p>
            <p className="mb-3">
              Le Chap. va prendre place à l'est, suivi par les Grands officiers,
              en commençant par les plus gradés qui sont le plus à l'ouest,
              c'est-à-dire par ordre hiérarchique décroissant.
            </p>
            <p>
              Les officiers de la table octogonale gagnent leur placeaprès le
              passage du Chap., dans l'ordre hiérarchique (Mar., Hosp., Amir.,
              Cons. Bailli, Turc., Chan. et Très.) décroissant, alternativement
              au sud et au nord de la table.
            </p>
            Mar. —Chevaliers, mes Frères — PRENEZ — PLACE.Ém. P. —Digne
            Capitaine-Général, quel est le premier et le plus essentiel devoir
            d'un Chevalier de Malte?Cap.-Gal —De s'assurer que nos Frères
            d'armes sont bien protégés des adversaires de l'Évangile de Notre
            Seigneur, le S. de l'humanité pécheresse.Ém. P. —Digne
            Lieutenant-Général, faites votre devoir et assurez-vous que le
            Prieuré est bien gardé.Lt.-Galse lève, dégaine son épée, va à la
            porte et y frappe du pommeau — $\bullet$ $\bullet$ $\bullet$ —
            $\bullet$ $\bullet$Gard.répond — $\bullet$ $\bullet$ $\bullet$
            $\bullet$ $\bullet$ $\bullet$ $\bullet$ $\bullet$ $\bullet$
            $\bullet$Lt.-Galretourne à sa place, vient au «PRÉSENTEZ» et fait
            son rapport (sans faire aucun autre signe).Lt.-Gal —Éminent Prieur,
            tout est bien gardé.il rengaine son épée et s'assied.Ém. P. —Digne
            Capitaine-Général, quel est notre second devoir?Cap.-Gal —De veiller
            à ce que tous les gens de guerre présents prouvent qu'ils sont de
            vrais compagnons de notre Ordre.Ém. P. —Veuillez vous en
            assurer.Mar. —Chevaliers, mes Frères — DE — BOUT !Tous se lèvent et
            se tiennent au «PORTEZ» y compris les officiers des tables.
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif mb-8">
            <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
              {/* Premier paragraphe */}
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p>
                  Le nord, le second au sud. Chaque Général reçoit d'abord l'A.
                  de N. ou du r. au Chev, qu'il éprouve, (a) qu'il est la Mots
                  «R. d. R.» et le Chev, répond par les mots «S. d. S.». Les
                  Généreux regagnent ensuite leur place, rengainent leur épée et
                  font leur rapport.
                </p>
              </div>

              {/* Dialogue cérémoniel */}
              <div className="space-y-4">
                <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
                  <p className="font-bold text-amber-900 mb-2">
                    Lt.-G<sup>a</sup> fait le S.P. et dit au Cap.-G<sup>a</sup>{" "}
                    —
                  </p>
                  <p className="italic">
                    Les gens de guerre présents ont prouvé qu'ils étaient de
                    vrais compagnons de notre Ordre.
                  </p>
                </div>

                <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
                  <p className="font-bold text-amber-900 mb-2">
                    Cap.-G<sup>a</sup> fait le S.P. et dit —
                  </p>
                  <p className="italic">
                    Éminent Prieur, les gens de guerre présents ont prouvé
                    qu'ils étaient de vrais compagnons de notre Ordre.
                  </p>
                </div>

                <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
                  <p className="font-bold text-amber-900 mb-2">Ém. P. —</p>
                  <p className="italic">
                    Mes Frères, implorons la bénédiction divine sur cette
                    assemblée.
                  </p>
                </div>
              </div>

              {/* Prière */}
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="font-bold text-amber-900 mb-2">
                  Chap. —{" "}
                  <span className="italic">
                    débout à sa place, face à l'ouest -
                  </span>{" "}
                  Pu — ows.
                </p>
                <p className="mb-3">
                  Les Chev, prennent la Position de Prière, les officiers des
                  tables posant l'extrémité de la lame de leur épée sur la
                  table.
                </p>
                <div className="bg-white p-4 rounded border border-amber-200">
                  <p className="italic text-center">
                    Ô Dieu, dans Ton Infinie Bonté, abaisse sur ce Prieuré un
                    regard de tendre compassion et dans toutes nos actions,
                    soumets nos cœurs à Ta Sainte Volonté, nous T'en prions par
                    Jésus Christ Notre Seigneur. A — men.
                  </p>
                </div>
                <p className="mt-3">Les Chev, reviennent au «Portez».</p>
              </div>

              {/* Déclaration d'ouverture */}
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
                  <p className="font-bold text-amber-900 mb-2">Ém. P. —</p>
                  <p className="italic">
                    Au nom de la Très Sainte Trinité, je déclare dûment ouvert
                    et constitué ce Prieuré de Chevaliers de Malte.
                  </p>
                </div>
                <p className="mt-3">
                  Trente-trois coups sont frappés du pommeau de l'épée,
                  également espacés.
                </p>
                <p>
                  Les cinq officiers de la table pentagonale, par ordre
                  hiérarchique décroissant, frappent chacun cinq coups sur la
                  table avec le pommeau de leur épée. Puis
                </p>
              </div>
            </div>

            <div className="text-center mt-8 pt-4 border-t border-amber-200">
              <span className="text-xs text-amber-600">27</span>
            </div>
          </div>

          {/* Page 28 */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif">
            <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
              {/* Suite des coups */}
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="mb-4">
                  les officiers de la table octogonale, en commençant par le
                  Mar, frappent chacun un coup, en tournant dans le sens des
                  aiguilles d'une montre, ayant sûr de conserver le rythme
                  adopté par les précédents de sorte que les 33 coups soient
                  également espacés.
                </p>

                {/* Liste des officiers frappant les coups */}
                <div className="grid grid-cols-2 gap-2 text-xs mt-4">
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Ém. P. frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>
                      Cap.-G<sup>1</sup>, frappe
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>
                      Lt.-G<sup>2</sup>, frappe
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>
                      I<sup>er</sup> Li, frappe
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>
                      2<sup>d</sup> Li frappe
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Mar. frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Amiral frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Bailli frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>V.-Chanc., frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Très., frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Turc., frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Cons., frappe</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-4">-</span>
                    <span>Hosp., frappe</span>
                  </div>
                </div>
              </div>

              {/* Disposition des épées */}
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="mb-3">
                  Les cinq officiers de la table pentagonale placent ensuite
                  leur épée sur les lignes tracées sur la table. Les pointes des
                  épées se rejoignent en un endroit situé au peu au-dessus du
                  point d'intersection des branches de la croix, vers la gauche
                  (au sud) (cf. figure p. 19).
                </p>
                <p className="mb-3">
                  Les huit officiers de la table octogonale disposent à leur le
                  long des bords des branches de la croix octogonale, sur la
                  table.
                </p>
              </div>

              {/* Actions finales */}
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                <p className="mb-3">
                  Le Mar. Adj. s'avance et ouvre la Bible de la table
                  pentagonale à l'Évangile de Jean, puis il regagne sa place.
                </p>
                <div className="bg-amber-100 p-4 rounded-lg border border-amber-300 text-center">
                  <p className="font-bold text-amber-900">
                    Chevaliers, mes Frères - PRENEZ — PLACE.
                  </p>
                </div>
                <p className="mt-3">
                  Le Chancelier procède alors à l'appel du rôle des membres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
