import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* En-tête de page */}
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
          banquet
        </h1>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          <section className="p-6">
            <div className="prose max-w-none text-gray-700">
              <div className="container mx-auto p-4">
                <h2>Protocole des Banquets</h2>

                <p>
                  On se souviendra toujours que l'Ordre du Temple ignore
                  totalement les maillets et les coups rituels.
                </p>

                <p>
                  Personne ne frappe donc jamais de quelque objet que ce soit,
                  sur quoique ce soit
                </p>

                <p>
                  Les Chev. non munis d'une "épée de table" (minitaine), feront
                  le salut de la main seule, poing fermé doigts repliés, comme
                  s'ils tendent une épée.
                </p>

                <p>
                  L'Ém.P. préside le Banquet et a donc la prérogative d'en
                  ordonnancer le déroulement. Néanmoins, le Mar. lui apportera
                  toute son aide et ses avis.
                </p>

                <p>
                  En particulier, il aura grand soin de prévenir AVANT le
                  Banquet, chacun des Ch. (Dignitaires ou visiteurs) que l'Ém.P.
                  souhaite voir répondre aux diverses Santés qui seront
                  proposées.
                </p>

                <p>
                  Le Banquet est ouvert par les Grâces dites par le Chap. et
                  clôture par les Grâces. Les Santés ne sont proposées QU'APRÈS
                  les Grâces de fin de Banquet.
                </p>

                <p className="com">
                  Dès que TOUS les Ch. sont réunis autour de la table, DEBOUT
                  derrière leur siège :
                </p>

                <h3>Grâces avant le Banquet</h3>

                <p>
                  <b>Le Mar.</b>{" "}
                  <span className="com">
                    se rend derrière le siège du Chap. et dit d'une voix forte
                  </span>{" "}
                  : Chevaliers, mes Frères !
                </p>

                <p className="com">
                  puis, dès que le silence s'est fait, ajoute :
                </p>

                <p>
                  <b>Mar.</b> : Veuillez prêter attention au Chapelain !
                </p>

                <p>
                  <b>Chap.</b> : BENEDICTUS BENEDICAT, PER JESUM CHRISTUM
                  DOMINUM NOSTRUM
                </p>

                <p>
                  <b>TOUS</b> : A – MEN.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place !
                </p>

                <h3>— Grâces de fin de Banquet</h3>

                <p>
                  <b>Le Mar</b>{" "}
                  <span className="com">
                    , se rend derrière le siège du Chap, et dit d’une voix forte
                  </span>{" "}
                  : Debout Chevaliers, mes Frères !
                </p>

                <p className="com">
                  puis, dès que le silence s’est fait, ajoute :
                </p>

                <p>
                  <b>Mar.</b> : Veuillez prêter attention au Chapelain !
                </p>

                <p>
                  <b>Chap.</b> : BENEDICTO BENEDICATUR, PER JESUM CHRISTUM
                  DOMINUM NOSTRUM
                </p>

                <p>
                  <b>TOUS.</b> — A — MEN.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place !
                </p>

                <h3>
                  — Les Santés sont seulement proposées après les Grâces de fin
                  de Banquet
                </h3>

                <p className="com">
                  AVANT CHAQUE SANTÉ le Mar, se lève seul et annonce, d’une voix
                  forte, pour couvrir les conversations :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez prêter attention
                  à notre Éminent Précepteur !{" "}
                  <span className="com">
                    (OU le Ch, prévu pour proposer la Santé)
                  </span>
                </p>

                <p className="com">
                  Il se rend derrière le siège de l’Ém.P. (ou autre proposant)
                  et, dès que le silence se fait, le Mar, dit :
                </p>

                <p>
                  <b>Mar.</b> : Debout ! Chevaliers, mes Frères.
                </p>
                <p className="com">TOUS les Ch, se lèvent.</p>

                <p className="com">
                  APRÈS CHAQUE SANTÉ{" "}
                  <span className="com">(SAUF la 1ère, bien sûr)</span> le Mar,
                  s’assure que les épées miniatures (ou main fermée) sont
                  reposées sur la table sans les y jeter bruyamment !
                </p>

                <p className="com">
                  Puis le Mar, se rend derrière celui qui a été prévu (et
                  prévenu) pour répondre à la Santé proposée, dont il aide à
                  reculer le siège, derrière lequel il reste jusqu’à la fin de
                  l’intervention.
                </p>

                <p className="com">
                  Il aide ensuite à approcher le siège quand l’intervenant
                  s’assoit, puis regagne sa place.
                </p>

                <h4>
                  1er Santé : Le président de la République Puis les souverains
                  & chefs d’états…
                </h4>

                <p className="com">
                  Avant la santé le Mar, se lève seul et annonce, d’une voix
                  forte, pour couvrir les conversations :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez prêter attention
                  à notre Éminent Précepteur !{" "}
                  <span className="com">
                    (OU le Ch. prévu pour proposer la Santé)
                  </span>
                </p>

                <p className="com">
                  Il se rend derrière le siège de l’Ém.P. (ou autre proposant)
                  et, dès que le silence se fait, le Mar. dit :
                </p>

                <p>
                  <b>Mar.</b> : Debout ! Chevaliers, mes Frères.
                </p>

                <p className="com">TOUS les Ch. se lèvent.</p>

                <p className="com">
                  les Ch. étant debout et dès que les bruits de chaises ont
                  cessé{" "}
                  <span className="com">
                    (Le Mar. recule les sièges de l’Ém.P. et du dignitaire à sa
                    droite.)
                  </span>
                </p>

                <p>
                  <b>Ém.P.</b> : Chevaliers mes Frères, je vous propose la santé
                  du président de la République française.
                </p>

                <p className="com">
                  TOUS les Ch., sans aucun commentaire, boivent à la santé
                  proposée.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez rester debout et
                  prêter attention à notre Éminent Précepteur !
                </p>

                <p>
                  <b>Ém.P.</b> : Chevaliers mes Frères, je vous propose la santé
                  des souverains et chefs d’états qui protègent la
                  Franc-maçonnerie et nos Ordres Unis.
                </p>

                <p className="com">
                  L’Ém.P., averti de la présence de Ch. étrangers pourra, s’il
                  le juge à propos, faire mention de leur pays en ajoutant :
                  "... et en particulier celle de Sa Majesté le roi d..., (ou)
                  celle de Son Excellence le président de..."
                </p>

                <p className="com">
                  Tous les Ch., sans aucun commentaire, boivent à la santé
                  proposée.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place ! -
                </p>

                <h4>
                  4° Santé : LE PRIEUR PROVINCIAL{" "}
                  <span className="com">
                    (* lorsque la Préceptorie est attachée à un Prieuré
                    provincial)
                  </span>
                </h4>

                <p className="com">
                  AVANT LA SANTÉ le Mar. se lève seul et annonce, d'une voix
                  forte, pour couvrir les conversations :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez prêter attention
                  à notre Éminent Précepteur!{" "}
                  <span className="com">
                    (OU le Ch. prévu pour proposer la Santé)
                  </span>
                </p>

                <p className="com">
                  Il se rend derrière le siège de l'Ém.P. (ou autre proposant)
                  et, dès que le silence se fait, le Mar. dit:
                </p>

                <p>
                  <b>Mar.</b> : Debout! Chevaliers, mes Frères.
                </p>
                <p className="com">TOUS les Ch. se lèvent.</p>

                <p className="com">
                  TOUS les Ch., étant debout et dès que les bruits de chaises
                  ont cessé{" "}
                  <span className="com">
                    (le Mar. recule les sièges de l'Ém.P. et du dignitaire à sa
                    droite [sauf si c'est le G.M., le G.Sén. ou le Pr.Pr.]).
                  </span>
                </p>

                <p>
                  <b>Ém.P.</b> : Chevaliers mes Frères, je vous propose la santé
                  du Très Digne et Éminent Prieur Provincial, le Très Digne et
                  Éminent Chevalier…{" "}
                  <span className="com">(prénoms et nom)</span>……{" "}
                  <span className="com">(titre, si GCT ou CCT)</span>….
                </p>

                <p className="com">
                  Tous les Ch., sans commentaire, boivent à la santé proposée,
                  puis le Mar. annonce d'une voix forte:
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, par SEPT! - Avec moi!
                </p>

                <p className="com">
                  TOUS les Ch. avec l'épée miniature (ou main fermée) donnent le
                  salut par 7 (2 x 3 + 1) "AU BAUCENT".
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place!
                </p>

                <p className="com">
                  Si le T.Ém.Prieur Prov. est présent, il répondra MAINTENANT à
                  la santé qui vient de lui être portée.{" "}
                  <span className="com">
                    (S'il n'est pas présent, personne ne peut répondre à sa
                    place; c'est alors une santé "formelle").
                  </span>
                </p>

                <h4>
                  5e Santé : Le Sous-Prieur Prov. et le Prieur Prov.{" "}
                  <span className="com">
                    ( lorsque la Préceptorie est attachée à un Prieuré
                    provincial).
                  </span>
                </h4>

                <p className="com">
                  AVANT LA SANTÉ le Mar. se lève seul et annonce, d'une voix
                  forte pour couvrir les conversations :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez prêter attention
                  à notre Éminent Précepteur !{" "}
                  <span className="com">
                    (OU le Ch. prévu pour proposer la Santé)
                  </span>
                </p>

                <p className="com">
                  Il se rend derrière le siège de l'Ém.P. (ou autre proposant)
                  et, dès que le silence se fait, le Mar. dit :
                </p>

                <p>
                  <b>Mar.</b> : Debout ! Chevaliers, mes Frères.
                </p>
                <p className="com">TOUS les Ch. se lèvent.</p>

                <p className="com">
                  TOUS les Ch. étant debout et dès que les bruits de chaises ont
                  cessé.{" "}
                  <span className="com">
                    (Le Mar. recule les sièges de l'Ém.P. et du dignitaire à sa
                    droite [sauf si G.M., G.Sén., Prieur Pr. ou Sous-Prieur
                    Prov.]).
                  </span>
                </p>

                <p>
                  <b>Ém.P.</b> : Chevaliers mes Frères, je vous propose la santé
                  du Bien Éminent Sous-Prieur Provincial, le Bien Éminent…
                  <span className="com">(ou autre titre)</span>… Chevalier…{" "}
                  <span className="com">(prénoms et nom)</span>…
                  <span className="com">(titre national éventuel)</span>…
                </p>

                <p className="com">
                  Tous les Ch., sans commentaire, boivent à la santé proposée,
                  puis le Mar. annonce d'une voix forte :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, par CINQ{" "}
                  <span className="com">
                    (ou autre nombre, selon rang personnel)
                  </span>{" "}
                  ! — Avec moi !
                </p>
                <p className="com">
                  TOUS les Ch. avec leur épée miniature (ou main fermée) font le
                  salut par 5(3+2){" "}
                  <span className="com">[ou autre, selon rang]</span>
                  "AU BAUCENT".
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place !
                </p>

                <p className="com">
                  Si le Sous-Prieur Prov. est présent, il répondra MAINTENANT à
                  la santé qui vient de lui être portée. S'il n'est pas présent,
                  un autre Officier Prov. ACTIF présent (présent à l'avance)
                  répondra à cette santé.
                </p>

                <p className="com">
                  Si la Préceptorie n'est pas attachée à une Province, un
                  Officier d'Honneur (O.H.T.) (présent à l'avance) répondra à la
                  santé.
                </p>

                <h4>
                  6e Santé : L'ÉMINENT PRÉCEPTEUR{" "}
                  <span className="com">
                    (le jour de son Installation seulement)
                  </span>
                  , OU LE<span className="com">(S)</span> CHEVALIER
                  <span className="com">(S)</span> NOUVELLEMENT ARMÉ
                  <span className="com">(S)</span>
                </h4>

                <p className="com">
                  AVANT LA SANTÉ le Mar, se lève seul et annonce, d'une voix
                  forte, pour couvrir les conversations :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez prêter attention
                  à notre Éminent Précepteur !{" "}
                  <span className="com">
                    (OU le Ch. prévu pour proposer la Santé)
                  </span>
                </p>

                <p className="com">
                  Il se rend derrière le siège de l'Ém.P. (ou autre proposant)
                  et, dès que le silence se fait, le Mar. dit :
                </p>

                <p>
                  <b>Mar.</b> : Debout ! Chevaliers, mes Frères.
                </p>
                <p className="com">TOUS les Ch. se lèvent.</p>

                <p className="com">
                  TOUS les Ch. étant debout et dès que les bruits de chaises ont
                  cessé Le Mar. va derrière l'Installateur proposant la santé OU
                  l'Ém.P. après un armement, dont il recule le siège.
                </p>

                <p className="com">
                  Il est d'usage, en cette circonstance que le proposant fasse
                  une intervention personnelle, conclue par :
                </p>

                <p>
                  <b>Propos.</b> : Chevaliers mes Frères, je vous propose la
                  santé de votre Éminent Précepteur, l'Éminent…{" "}
                  <span className="com">(ou autre titre)</span>… Chevalier…{" "}
                  <span className="com">(prénoms et nom)</span>…{" "}
                  <span className="com">(titre national éventuel)</span>…
                </p>
                <p>OU.</p>
                <p>
                  <b>Ém.P.</b> : Chevaliers mes Frères, je vous propose la santé
                  de notre / nos nouveaux<span className="com">(X)</span>{" "}
                  Chevalier<span className="com">(s)</span>, notre / nos Frère
                  <span className="com">(s)</span> …{" "}
                  <span className="com">(prénoms et nom)</span>…
                </p>

                <p className="com">
                  Tous les Ch., sans commentaire, boivent à la santé proposée,
                  puis le Mar. annonce d'une voix forte :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, par TROIS{" "}
                  <span className="com">
                    (ou autre nombre, selon rang personnel)
                  </span>{" "}
                  ! — Avec moi !
                </p>
                <p className="com">
                  TOUS les Ch. avec leur épée miniature (ou main fermée) font le
                  salut par 3{" "}
                  <span className="com">
                    [ou autre, selon son rang personnel]
                  </span>{" "}
                  "AU BACCENT".
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place !
                </p>

                <p className="com">
                  L'Ém.P. OU le nouveau Ch. répond à la santé qui vient d'être
                  portée.
                </p>

                <h4>7e Santé : LES CHEVALIERS VISITEURS</h4>

                <p className="com">
                  AVANT LA SANTÉ le Mar, se lève seul et annonce, d'une voix
                  forte, pour couvrir les conversations :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, veuillez prêter attention
                  à notre Éminent Précepteur !{" "}
                  <span className="com">
                    (OU le Ch. prévu pour proposer la santé)
                  </span>
                </p>

                <p className="com">
                  Il se rend derrière le siège de l’Ém.P. (ou autre proposant)
                  et, dès que le silence se fait, le Mar. dit :
                </p>

                <p>
                  <b>Mar.</b> : Debout ! Chevaliers, mes Frères.
                </p>
                <p className="com">
                  TOUS les Ch. se lèvent sauf bien sûr les visiteurs.
                </p>

                <p className="com">
                  TOUS les Ch. étant debout et dès que les bruits de chaises ont
                  cessé Le Mar, va derrière le 2d Cble, à qui il revient
                  normalement de proposer cette santé, dont il recule le siège.
                </p>

                <p className="com">
                  Il est d’usage, en cette circonstance que le proposant fasse
                  une intervention personnelle, conclue par :
                </p>

                <p>
                  <b>2d Cble</b> : Chevaliers mes Frères, je vous propose la
                  santé de nos Bien-aimés Frères Chevaliers en visite, dont
                  celle de l’Éminent…{" "}
                  <span className="com">(ou autre titre)</span>…Chevalier…{" "}
                  <span className="com">(prénoms et nom)</span>……{" "}
                  <span className="com">(titre national éventuel)</span>……
                </p>

                <p className="com">
                  Tous les Ch., sans commentaire, boivent à la santé proposée,
                  puis le Mar. annonce d’une voix forte :
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, par TROIS{" "}
                  <span className="com">
                    (ou autre nombre, selon rang personnel)
                  </span>{" "}
                  ! — Avec moi !
                </p>
                <p className="com">
                  TOUS les Ch. avec leur épée miniature (ou main fermée) font le
                  salut par 3{" "}
                  <span className="com">
                    [ou autre, selon son rang personnel]
                  </span>{" "}
                  "AU BAUCENT".
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers, mes Frères, prenez place !
                </p>

                <p className="com">
                  Le<span className="com">(s)</span> Ch. visiteur
                  <span className="com">(s)</span> prévu
                  <span className="com">(s)</span> ET prévenu
                  <span className="com">(s)</span>, répond
                  <span className="com">(ent)</span> à la santé qui vient d’être
                  honorée.
                </p>

                <p className="com">
                  Le Mar. se rend successivement derrière le siège de chaque
                  "répondant", dans l’ordre prévu, et annonce l’intervenant par
                  ses nom et titres et les nom et n° de la Préceptorie qu'il
                  représente.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, prêtez attention à
                  l'Éminent... <span className="com">(ou autre titre)</span>...
                  Chevalier... <span className="com">(prénoms et nom)</span>...
                  ... <span className="com">(titre national éventuel)</span>...
                </p>
                <p>OU</p>
                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, prêtez attention notre
                  Frère Chevalier...{" "}
                  <span className="com">(prénoms et nom)</span>... ... de la
                  Préceptorie... <span className="com">(nom et n°)</span> ...
                  à...
                  <span className="com">(ville)</span>... ...
                </p>

                <p className="com">
                  Le Banquet est TOUJOURS conclu par le toast du Tuileur inspiré
                  du rituel Émulation, dit par le Gardien,
                </p>

                <p>
                  <b>Gardien</b> : "À tous les Maçons pauvres et dans la
                  détresse, où qu'ils soient dispersés, à la surface de la terre
                  et des eaux, leur souhaitant un rapide soulagement de leurs
                  souffrances et un prompt retour dans leur pays natal, si tel
                  est leur désir".
                </p>

                <p className="com">
                  et suivi d'un Peu "bleu" silencieux, bien sûr sans l'épée
                  miniature, donné par TOUS de la main droite seule.
                </p>

                <p className="com">
                  Donné silencieusement, il se fait de la main droite, doigts
                  fermés, index tendu, par sept fois trois temps (soit 21) ainsi
                  :
                </p>

                {/* Peu 'bleu' silencieux steps - using ordered list */}
                <ol className="list-decimal pl-8 com">
                  <li>
                    index en avant, à gauche, puis à droite, mouvement répété
                    trois fois ; <span className="com">(soit 9)</span>
                  </li>
                  <li>
                    index à gauche et à droite, puis du plat de la main droite
                    un léger coup sur l'avant-bras gauche{" "}
                    <span className="com">(soit 3)</span>
                  </li>
                  <li>
                    du plat de la main gauche, trois coups légers sur
                    l'avant-bras droit, <span className="com">(soit 3)</span>
                  </li>
                  <li>
                    du plat de la main droite, trois coups légers sur
                    l'avant-bras gauche, <span className="com">(soit 3)</span>
                  </li>
                  <li>
                    du plat de la main gauche, trois coups légers sur
                    l'avant-bras droit, <span className="com">(soit 3)</span>
                  </li>
                </ol>
              </div>
            </div>
          </section>
          {/* Section de navigation */}
          <section className="p-6 border-b border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <NavKT />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Page;
