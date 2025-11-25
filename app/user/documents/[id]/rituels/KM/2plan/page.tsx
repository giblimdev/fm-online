import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Première partie : Plan de mise en place */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 font-serif mb-8">
        {/* En-tête */}
        <div className="text-center mb-8 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-amber-900">
            Plan de mise en place
          </h1>
          <p className="mt-2 text-sm italic text-amber-700">
            (La disposition indiquée ici est idéale. Elle doit bien sûr être
            aménagée en fonction des impératifs locaux pour s&apos;en approcher,
            dans toute la mesure du possible.)
          </p>
        </div>
        <section>
          <h2 className="text-lg font-semibold text-amber-800">
            Officiers et leurs positions
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-8 text-sm text-amber-900">
            {/* Colonne : intitulés complets */}
            <div className="space-y-1">
              <p>1. Éminent Prieur</p>
              <p>2. Capitaine-Général</p>
              <p>3. Lieutenant-Général</p>
              <p>4. Premier Lieutenant</p>
              <p>5. Second Lieutenant</p>
              <p>6. Chapelain</p>
              <p>7. Maréchal</p>
              <p>8. Maréchal Adjoint</p>
              <p>9. Hospitalier</p>
              <p>10. Amiral</p>
              <p>11. Conservateur</p>
              <p>12. Bailli</p>
              <p>13. Turcopolier</p>
              <p>14. Chancelier</p>
              <p>15. Trésorier</p>
              <p>16. Capitaine des avant-postes</p>
              <br />
              <p>X Bible</p>
              <p>J étendard de St Jean</p>
              <p>M étendard de Malte</p>
            </div>

            {/* Colonne : abréviations */}
            <div className="space-y-1">
              <p>Ém. P.</p>
              <p>Cap.-Gén</p>
              <p>Lt.-Gén</p>
              <p>1° Lt.</p>
              <p>2° Lt.</p>
              <p>Chap.</p>
              <p>Mar.</p>
              <p>Mar. Adj.</p>
              <p>Hosp.</p>
              <p>Amiral</p>
              <p>Cons.</p>
              <p>Bailli</p>
              <p>Turc.</p>
              <p>Chan.</p>
              <p>Trés.</p>
              <p>C.A.P.</p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-amber-800">
            Les bannières et leurs Gardes
          </h2>
          <div className="flex">
            <div>
              <h3>Bannières</h3>
              <p>N</p>
              <p>V</p>
              <p>M</p>
              <p>R</p>
              <p>A</p>
            </div>
            <div>
              <h3>Gardes bannières</h3>
              <p>p</p>
              <p>ch</p>
              <p>r</p>
              <p>c</p>
              <p>m</p>
            </div>
          </div>
        </section>

        {/* Cartouche circulaire */}
        <h3 className="font-bold text-amber-900 mb-3 tracking-wide">
          CARTOUCHE CIRCULAIRE
        </h3>
        <div className=" text-sm text-amber-900">
          <p>p : nerf antique</p>
          <p>q : échelle et port-voix</p>
          <p>r : crâne, épée et lance</p>
          <p>s : main et vipère</p>
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
          <div>
            <br /> <br /> <br /> <br /> <br />
          </div>{" "}
        </div>

        {/* En-tête avec le titre de l'Ordre */}
        <div className="text-center mb-8 pb-6">
          <h1 className="text-xl font-bold title-font text-amber-900 tracking-wide">
            Ordre ancien et maçonnique de l&apos;Hôpital de Saint-Jean de
            Jérusalem, de Palestine, Rhodes et Malte
          </h1>
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
              Nul ne peut être admis dans l&apos;ordre maçonnique de Malte à
              moins d&apos;avoir été préalablement armé chevalier de
              l&apos;ordre maçonnique du Temple.
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
              salle de conseil du Prieuré et l&apos;autre, la salle des gardes.
              Si cela est possible, une petite pièce supplémentaire servira de
              salle d&apos;attente et de préparation.
            </p>
          </div>

          {/* Quatrième paragraphe - Officiers */}
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="text-sm">
              Vingt-trois officiers sont nécessaires pour former un chapitre
              parfait où l&apos;Ordre de Malte est conféré; mais un Prieur
              Installé et quatre autres chevaliers sont réglementairement
              suffisants pour constituer un chapitre de Prieuré pour
              l&apos;expédition des autres affaires et l&apos;Installation
              d&apos;un Prieur. Les treize officiers des deux tables, le
              Chapelain et le Cap. des avant-postes, au moins, doivent
              impérativement porter la tenue de l&apos;Ordre.
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
              Contrairement à l&apos;usage typographique, les points cardinaux
              ne sont pas pourvus de majuscules pour ne pas alourdir la lecture.
            </p>
          </div>
        </div>
        <br />
        <div className="text-center mb-8 pb-4">
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
              Les deux étendards de l&apos;Ordre sont l&apos;étendard de
              Saint-Jean et l&apos;étendard de Malte. Ils sont disposés à
              l&apos;est, de chaque côté de la salle capitulaire.
            </p>
            <p className="mb-4">
              L&apos;étendard de Saint-Jean de Jérusalem, au nord, est rouge,
              dirigée en quatre parties par une croix blanche à branches égales.
              Au centre de la croix, l&apos;Agnus Dei ou Agneau Mystique et, sur
              les quartiers, les lettres F. E. R. T., initiales de «Fortitude
              Ejus Rhodium Temin» (samedi 1 octobre).
            </p>
            <p className="mb-4">
              L&apos;étendard de Malte, au sud, est noir avec une croix blanche
              à bains pour les autres.
            </p>
            <p>
              Dans la partie orientale de la salle capitulaire, est placée une
              table d&apos;un chien qui se passe à travers le pont.
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
                <span>L&apos;Éminent Prieur, (Ém. P.) à l&apos;est</span>
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
                <span>Le Second Lieutenant, (2° Li.) à la gauche du Li.-G</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p>
              Le Chapelain (Chap.) prend place au sud-est de la salle
              capitulaire, légèrement en arrière de l&apos;Ém. P.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="mb-4">
              Cet ordre n&apos;ayant pas d&apos;autel, lorsque le Chapelain dit
              les prières, il se tient debout à sa place, face à l&apos;ouest
              (et non à l&apos;est), et ne se découvre pas. Il dispose d&apos;un
              exemplaire du Nouveau Testament qu&apos;il utilisera pour le grade
              de chevalier de Saint-Paul.
            </p>
            <p>
              Dans la partie occidentale de la salle capitulaire, est placée une
              table octogonale, recouverte d&apos;un drap ou nappe rouge, au
              centre duquel est brodée ou peinte en blanc une croix de Malte à
              huit pointes. Au milieu de cette croix est un cartouche circulaire
              (très improprement appelé «orbe», depuis 1930 en Angleterre)
              lisible de l&apos;est, divisé en quatre quartiers où sont
              représentés respectivement :
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                      un crâne fendu, une lance et une grande épée à deux mains
                      mises en sautoir,
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
                    9. L&apos;Hospitalier
                  </div>
                  <div className="text-center py-1 bg-amber-100 rounded">
                    10. L&apos;Amiral
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
              Il est souhaitable que le Maréchal (Mar.) soit un Prieur installé.
            </p>
            <p>
              Quand le Mar. quitte son siège pour prendre en charge le Cand., un
              autre Chev. peut être désigné pour le remplacer à la table
              octogonale.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p>
              Le Maréchal Adjoint (Mar. Adj.) est assis à l&apos;ouest, face à
              l&apos;est. Il assiste le Mar. lorsque nécessaire. Il peut prendre
              en charge le Cand.,
            </p>
          </div>
        </div>

        {/* Page 24 */}
        <div className="space-y-6 text-amber-800 leading-relaxed text-sm">
          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p>
              s&apos;il n&apos;y en a qu&apos;un seul, et, dans ce cas, le Mar.
              dirigera la cérémonie comme indiqué dans le rituel.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="mb-4">
              Le Capitaine des avant-postes (C.A.P.) est assis à l&apos;ouest,
              près de la porte. Il dégaine son épée quand les Chev. sont appelés
              pour la première fois à l&apos;ordre, à l&apos;ouverture du
              Prieuré, et il la garde en main jusqu&apos;au moment où les Chev.
              rengainent leur épée, à la fermeture du Prieuré. Quand les Chev.
              sont appelés à l&apos;ordre, il se tient debout au «PORTEZ». Quand
              les Chev. sont assis, il s&apos;assied, au «RECO».
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className=" mb-4">
              Le long du côté nord de la salle capitulaire et plutôt du côté
              occidental si la longueur de la salle le permet, sont alignées
              cinq bannières, dans l&apos;ordre suivant, d&apos;ouest en est :
            </p>

            <section className="mt-4 text-sm text-amber-900">
              <div className="grid grid-cols-4 gap-6">
                {/* Colonne 1 : couleurs */}
                <div className="space-y-1">
                  <p>1 Blanche :</p>
                  <p>2 Rouge :</p>
                  <p>3 Noire :</p>
                  <p>4 Pourpre :</p>
                  <p>5 Jaune d&apos;Or :</p>
                </div>

                {/* Colonne 2 : lieux */}
                <div className="space-y-1">
                  <p>PALESTINE</p>
                  <p>CHYPRE</p>
                  <p>RHODES</p>
                  <p>CANDIE</p>
                  <p>MALTE</p>
                </div>

                {/* Colonne 3 : dates */}
                <div className="space-y-1">
                  <p>1099</p>
                  <p>1291</p>
                  <p>1310</p>
                  <p>1346</p>
                  <p>1530</p>
                </div>

                {/* Colonne 4 : lettres */}
                <div className="space-y-1">
                  <p>N</p>
                  <p>V</p>
                  <p>M</p>
                  <p>R</p>
                  <p>A</p>
                </div>
              </div>
            </section>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="mb-4">
              Pendant la cérémonie d&apos;Installation (Armement) elles sont
              gardées par cinq Chevaliers, indiqués dans le texte par
              l&apos;abréviation G.B. (Garde de la Bannière de...) suivie de
              l&apos;initiale de la Bannière P. (Palestine), Ch. (Chypre), R.
              (Rhodes), C. (Candie) et M. (Malte). Les Grands officiers et les
              anciens Prieurs sont assis à l&apos;est, respectivement au nord et
              au sud. Les autres Chev. sont assis sur les côtés nord et sud de
              la salle capitulaire.
            </p>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg border border-amber-300">
            <h3 className="font-bold text-amber-900 mb-3">
              La salle des gardes
            </h3>
            <p className="text-sm">
              On doit y installer une table, recouverte d&apos;un drap portant
              un grand crucifix (celui du sépulcre dans l&apos;Ordre du Temple)
              et une Bible (ouverte au chap. XXVII des Actes des Apôtres)
              portant une épée, pour y conférer le grade de chevalier de
              Saint-Paul.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
