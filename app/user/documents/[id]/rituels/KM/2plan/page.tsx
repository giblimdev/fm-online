import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      {/* Première partie : Plan de mise en place */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif mb-8">
        {/* En-tête */}
        <div className="text-center mb-8 border-b border-amber-200 pb-4">
          <h1 className="text-2xl font-bold title-font text-amber-900">
            Plan de mise en place
          </h1>
          <p className="text-sm italic text-amber-700 mt-2">
            (La disposition indiquée ici est idéale. Elle doit bien sûr être
            aménagée en fonction des impératifs locaux pour s'en approcher, dans
            toute la mesure du possible.)
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Liste des officiers */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-amber-800 border-b border-amber-200 pb-2">
              Officiers et leurs positions
            </h2>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  1. Éminent Prieur
                </span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  2. Capitaine-Général
                </span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  3. Lieutenant-Général
                </span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  4. Premier Lieutenant
                </span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  5. Second Lieutenant
                </span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">6. Chapelain</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">7. Maréchal</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  8. Maréchal Adjoint
                </span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">9. Hospitalier</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">10. Amiral</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">11. Conservateur</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">12. Bailli</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">13. Turcopolier</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">14. Chancelier</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">15. Trésorier</span>
              </div>
              <div className="flex items-center py-1 px-3 bg-amber-50 rounded border border-amber-100">
                <span className="text-amber-900 text-sm">
                  16. Capitaine des avant-postes
                </span>
              </div>
            </div>

            {/* Symboles et éléments */}
            <div className="mt-6 p-4 bg-amber-100 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-2">
                Symboles et Éléments
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="w-6 text-center font-bold">x</span>
                  <span>Bible</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 text-center font-bold">N</span>
                  <span>V M R A bannières</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 text-center font-bold">c</span>
                  <span>agenouilloir</span>
                </div>
                <div className="flex items-center">
                  <span className="w-6 text-center font-bold">p ch r c m</span>
                  <span>Gardes des Bannières</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disposition schématique */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-amber-800 border-b border-amber-200 pb-2">
              Disposition Schématique
            </h2>

            {/* Cartouche circulaire */}
            <div className="text-center p-4 border-2 border-amber-300 rounded-lg bg-amber-50">
              <h3 className="font-bold text-amber-900 mb-2">
                CARTOUCHE CIRCULAIRE
              </h3>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold">p</div>
                  <div>nef antique</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">r</div>
                  <div>crâne, épée et lance</div>
                </div>
              </div>
            </div>

            {/* Légende des abréviations */}
            <div className="p-4 border border-amber-200 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-3 text-center">
                Légende des Abréviations
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center py-1 bg-amber-50 rounded">
                  Ém. P.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Cap.-Gén
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Lt.-Gén
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  1° Lt.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  2° Lt.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Chap.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">Mar.</div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Mar. Adj.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Hosp.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Amiral
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Cons.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Bailli
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Turc.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Chan.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  Trés.
                </div>
                <div className="text-center py-1 bg-amber-50 rounded">
                  C.A.P.
                </div>
              </div>
            </div>

            {/* Étendards */}
            <div className="flex justify-center space-x-8 mt-4">
              <div className="text-center">
                <div className="font-bold text-amber-900">M</div>
                <div className="text-sm">étendard de Malte</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-amber-900">J</div>
                <div className="text-sm">étendard de St Jean</div>
              </div>
            </div>
          </div>
        </div>

        {/* Note importante */}
        <div className="mt-8 p-4 bg-amber-100 border-l-4 border-amber-500 rounded">
          <p className="text-sm italic text-amber-800">
            <strong>Nota :</strong> Chaque garde de bannière; p. ch. r. c et m
            peut prendre place à 3 pas au sud de sa bannière, face au nord, si
            la largeur de la salle capitulaire le permet, sinon comme sur le
            schéma ci-contre. Les deux options a) et b) à la p. 45 correspondent
            à ces variantes.
          </p>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold text-amber-800">
            Salle capitulaire
          </h2>
        </div>

        {/* Numéro de page */}
        <div className="text-center mt-8 pt-4 border-t border-amber-200">
          <span className="text-xs text-amber-600">18</span>
        </div>
      </div>

      {/* Deuxième partie : Instructions Préliminaires */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 font-serif">
        {/* En-tête avec le titre de l'Ordre */}
        <div className="text-center mb-8 border-b border-amber-200 pb-6">
          <h1 className="text-xl font-bold title-font text-amber-900 tracking-wide">
            Ordre ancien et maçonnique de
          </h1>
          <h2 className="text-lg font-semibold text-amber-800 mt-2">
            l'Hôpital de Saint-Jean de Jérusalem,
          </h2>
          <h3 className="text-md text-amber-700 mt-1">
            de Palestine, Rhodes et Malte
          </h3>
        </div>

        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold title-font text-amber-900 border-b-2 border-amber-300 pb-2 inline-block">
            INSTRUCTIONS PRÉLIMINAIRES
          </h1>
        </div>

        {/* Contenu des instructions */}
        <div className="space-y-6 text-amber-800 leading-relaxed">
          {/* Premier paragraphe */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm">
              Nul ne peut être admis dans l'ordre maçonnique de Malte à moins
              d'avoir été préalablement armé chevalier de l'ordre maçonnique du
              Temple.
            </p>
          </div>

          {/* Deuxième paragraphe */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm">
              Il faut également avoir préalablement reçu le grade de chevalier
              de Saint-Paul et la Passe de Méditerranée.
            </p>
          </div>

          {/* Troisième paragraphe - Salles nécessaires */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm mb-3">
              Pour le bon déroulement de cette cérémonie, deux salles sont
              nécessaires, la plus grande représentant la salle capitulaire ou
              salle de conseil du Prieuré et l'autre, la salle des gardes. Si
              cela est possible, une petite pièce supplémentaire servira de
              salle d'attente et de préparation.
            </p>
          </div>

          {/* Quatrième paragraphe - Officiers */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm">
              Vingt-trois officiers sont nécessaires pour former un chapitre
              parfait où l'Ordre de Malte est conféré; mais un Prieur Installe
              et quatre autres chevaliers sont réglementairement suffisants pour
              constituer un chapitre de Prieuré pour l'expédition des autres
              affaires et l'Installation d'un Prieur. Les treize officiers des
              deux tables, le Chapelain et le Cap. des avant-postes, au moins,
              doivent impérativement porter la tenue de l'Ordre.
            </p>
          </div>

          {/* Cinquième paragraphe - Tenue */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm">
              Les chevaliers de Malte qui ne sont pas en possession de leurs
              décors de Malte peuvent porter la tenue complète de chevalier du
              Temple avec le bijou de Malte.
            </p>
          </div>

          {/* Note typographique */}
          <div className="mt-8 p-4 bg-amber-100 border border-amber-200 rounded-lg">
            <p className="text-xs italic text-amber-700 text-center">
              Contrairement à l'usage typographique, les points cardinaux ne
              sont pas pourvus de majuscules pour ne pas alourdir la lecture.
            </p>
          </div>
        </div>

        {/* Numéro de page */}
        <div className="text-center mt-8 pt-6 border-t border-amber-200">
          <span className="text-sm text-amber-600 font-semibold">21</span>
        </div>
        {/* Page 22 */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif mb-8">
          <div className="text-center mb-8 border-b border-amber-200 pb-4">
            <h1 className="text-2xl font-bold title-font text-amber-900">
              Disposition de la salle capitulaire
            </h1>
            <p className="text-sm italic text-amber-700 mt-2">
              (voir plan page 19)
            </p>
          </div>

          <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="mb-4">
                Les deux étendards de l'Ordre sont l'étendard de Saint-Jean et
                l'étendard de Malte. Ils sont disposés à l'est, de chaque côté
                de la salle capitulaire.
              </p>
              <p className="mb-4">
                L'étendard de Saint-Jean de Jérusalem, au nord, est rouge,
                dirigée en quatre parties par une croix blanche à branches
                égales. Au centre de la croix, l'Agnus Dei ou Agneau Mystique
                et, sur les quartiers, les lettres F. E. R. T., initiales de
                «Fortitude Ejus Rhodium Temin» (samedi 1 octobre).
              </p>
              <p className="mb-4">
                L'étendard de Malte, au sud, est noir avec une croix blanche à
                bains pour les autres.
              </p>
              <p>
                Dans la partie orientale de la salle capitulaire, est placée une
                table d'un chien qui se passe à travers le pont.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="font-semibold mb-3">
                Une fois le Prieuré ouvert, cinq officiers prennent place au
                centre des cinq pans de cette table :
              </p>
              <div className="grid grid-cols-1 gap-2 ml-4">
                <div className="flex items-center">
                  <span className="font-bold w-8">1.</span>
                  <span>L'Éminent Prieur, (Ém. P.) à l'est</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold w-8">2.</span>
                  <span>Le Capitaine-Général, (Cap.-G) à sa droite</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold w-8">3.</span>
                  <span>Le Lieutenant-Général, (Li.-G) à sa gauche</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold w-8">4.</span>
                  <span>
                    Le Premier Lieutenant, (Ier Li.) à la droite du Cap.-G
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold w-8">5.</span>
                  <span>
                    Le Second Lieutenant, (2° Li.) à la gauche du Li.-G
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
              <p className="text-xs italic text-amber-700">
                Le Cégèrent
                <br />
                Cet I il se tire décorant utiliser a Dans table où duquel
                pointes.
                <br />
                Improprié si un q) un ba t) un mi s) un Aux huit face à ch.
                <br />
                7<br />
                9<br />
                10
                <br />
                11
                <br />
                12
                <br />
                13
                <br />
                14
                <br />
                15
                <br />
                Il est s. Quand autre Che-Le Ma-assiste le N
              </p>
            </div>
          </div>

          <div className="text-center mt-8 pt-4 border-t border-amber-200">
            <span className="text-xs text-amber-600">22</span>
          </div>
        </div>

        {/* Page 23 */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif mb-8">
          <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p>
                Le Chapelain (Chap.) prend place au sud-est de la salle
                capitulaire, légèrement en arrière de l'Ém. P.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="mb-4">
                Cet ordre n'ayant pas d'autel, lorsque le Chapelain dit les
                prières, il se tient debout à sa place, face à l'ouest (et non à
                l'est), et ne se découvre pas. Il dispose d'un exemplaire du
                Nouveau Testament qu'il utilisera pour le grade de chevalier de
                Saint-Paul.
              </p>
              <p>
                Dans la partie occidentale de la salle capitulaire, est placée
                une table octogonale, recouverte d'un drap ou nappe rouge, au
                centre duquel est brodée ou peinte en blanc une croix de Malte à
                huit pointes. Au milieu de cette croix est un cartouche
                circulaire (très improprement appelé «orbe», depuis 1930 en
                Angleterre) lisible de l'est, divisé en quatre quartiers où sont
                représentés respectivement :
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold mb-2">Quartiers du cartouche :</p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="font-bold mr-2">p)</span>
                      <span>une nef antique,</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2">q)</span>
                      <span>
                        une échelle, dont les cinq barreaux portent les lettres
                        des cinq bannières, et un porte-voix,
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2">r)</span>
                      <span>
                        un crâne fendu, une lance et une grande épée à deux
                        mains mises en sautoir,
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2">s)</span>
                      <span>une main et une vipère.</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">
                    Aux huit coins de cette table :
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center py-1 bg-amber-100 rounded">
                      7. Le Maréchal
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      9. L'Hospitalier
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      10. L'Amiral
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      11. Le Conservateur
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      12. Le Bailli
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      13. Le Turcopolier
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      14. Le Chancelier
                    </div>
                    <div className="text-center py-1 bg-amber-100 rounded">
                      15. Le Trésorier
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="mb-4">
                Il est souhaitable que le Maréchal (Mar.) soit un Prieur
                installé.
              </p>
              <p>
                Quand le Mar. quitte son siège pour prendre en charge le Cand.,
                un autre Chev. peut être désigné pour le remplacer à la table
                octogonale.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p>
                Le Maréchal Adjoint (Mar. Adj.) est assis à l'ouest, face à
                l'est. Il assiste le Mar. lorsque nécessaire. Il peut prendre en
                charge le Cand.,
              </p>
            </div>
          </div>

          <div className="text-center mt-8 pt-4 border-t border-amber-200">
            <span className="text-xs text-amber-600">23</span>
          </div>
        </div>

        {/* Page 24 */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 font-serif">
          <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p>
                s'il n'y en a qu'un seul, et, dans ce cas, le Mar. dirigera la
                cérémonie comme indiqué dans le rituel.
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="mb-4">
                Le Capitaine des avant-postes (C.A.P.) est assis à l'ouest, près
                de la porte. Il dégaine son épée quand les Chev. sont appelés
                pour la première fois à l'ordre, à l'ouverture du Prieuré, et il
                la garde en main jusqu'au moment où les Chev. reugaiment leur
                épée, à la fermeture du Prieuré. Quand les Chev. sont appelés à
                l'ordre, il se tient debout au «PORTEZ». Quand les Chev. sont
                assis, il s'assied, au «RECO».
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="font-semibold mb-4">
                Le long du côté nord de la salle capitulaire et plutôt du côté
                occidental si la longueur de la salle le permet, sont alignées
                cinq homètres, dans l'ordre suivant, d'ouest en est :
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border border-amber-200">
                    <div className="font-bold">1 Blanche :</div>
                    <div>
                      PALESTINE
                      <br />
                      CHYPRE
                      <br />
                      RHODES
                      <br />
                      CANDIE
                      <br />
                      MALTE
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-amber-200">
                    <div className="font-bold">2 Rouge :</div>
                    <div>
                      CHYPRE
                      <br />
                      RHODES
                      <br />
                      CANDIE
                      <br />
                      MALTE
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-amber-200">
                    <div className="font-bold">3 Noire :</div>
                    <div>
                      CHYPRE
                      <br />
                      RHODES
                      <br />
                      CANDIE
                      <br />
                      MALTE
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border border-amber-200">
                    <div className="font-bold">4 Pourpre :</div>
                    <div>
                      CHYPRE
                      <br />
                      RHODES
                      <br />
                      CANDIE
                      <br />
                      MALTE
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-amber-200">
                    <div className="font-bold">5 Jaune d'Or :</div>
                    <div>
                      CHYPRE
                      <br />
                      RHODES
                      <br />
                      CANDIE
                      <br />
                      MALTE
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-amber-200 text-center">
                    <div className="font-bold">6</div>
                    <div>
                      N<br />V<br />M<br />R<br />A
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="mb-4">
                Pendant la cérémonie d'Installation (Armement) elles sont
                gardées par cinq Chevaliers, indiqués dans le texte par
                l'abréviation G.B. (Garde de la Bannière de...) suivie de
                l'initiale de la Bannière P. (Palestine), Ch. (Chypre), R.
                (Rhodes), C. (Candie) et M. (Malte). Les Grands officiers et les
                anciens Prieurs sont assis à l'est, respectivement au nord et au
                sud. Les autres Chev. sont assis sur les côtés nord et sud de la
                salle capitulaire.
              </p>
            </div>

            <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
              <h3 className="font-bold text-amber-900 mb-3">
                La salle des gardes
              </h3>
              <p className="text-sm">
                On doit y installer une table, recouverte d'un drap pour portant
                un grand crucifix (celui du sépulcre dans l'Ordre du Temple) et
                une Bible (ouverte au chap. XXVII des Actes des Apôtres) portant
                une épée, pour y conférer le grade de chevalier de Saint-Paul.
              </p>
            </div>
          </div>

          <div className="text-center mt-8 pt-4 border-t border-amber-200">
            <span className="text-xs text-amber-600">24</span>
          </div>
        </div>
      </div>
    </div>
  );
}
