import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* En-tête de page */}
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
          armement 1
        </h1>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          <section className="p-6">
            <div className="prose max-w-none text-gray-700">
              <div className="container mx-auto p-4">
                <h2>Cérémonie d'armement</h2>
                <h3>INSTALLATION</h3>

                <h3>1ère Partie</h3>
                <p className="com">
                  Le Candidat (Cand.) qui sera présenté en costume civil sombre,
                  sans aucun décor maçonnique, sera préparé : vêtu en pèlerin
                  d'un manteau gris ou brun, une corde nouée autour de la
                  taille, avec un baluchon ou musette sur l'épaule droite, une
                  gourde sur l'épaule droite, coiffé d'un chapeau de feutre, un
                  bord rabattu portant une coquille Saint-Jacques, un bourdon à
                  la main droite, est amené à l'entrée de la salle par le Gard.,
                  qui frappe de son poing les coups de l'alarme (●●●●) à la
                  porte à l'extérieur.
                </p>

                <p>
                  <b>Cap.G.</b>{" "}
                  <span className="com">
                    se lève, l'épée en main et fait le S.d.C.
                  </span>{" "}
                  : Frère Second Connétable, l'alarme est donnée.
                </p>

                <p>
                  <b>2e Cble.</b> : Voyez quelle en est la cause.
                </p>

                <p>
                  <b>Le Cap.G.</b>{" "}
                  <span className="com">
                    ouvre la porte et, voyant le Cand., la referme, fait face à
                    l'Ém.P. et fait le S.d.C.
                  </span>{" "}
                  :
                </p>

                <p>
                  <b>Cap.G.</b> : Éminent Précepteur, un étranger tente d'entrer
                  dans notre Préceptorie.
                </p>

                <p>
                  <b>Ém.P.</b> : Soyez prudent et voyez qui est cet intrus.
                </p>

                <p>
                  <b>Cap.G.</b> <span className="com">ouvrant la porte</span> :
                  Qui va là ?
                </p>

                <p>
                  <b>Gard.</b> : Le Compagnon ...., un pèlerin en voyage, las et
                  fatigué, ayant entendu parler de cette Préceptorie de
                  Chevaliers du Temple, désire y trouver refuge et, si possible,
                  être admis aux privilèges de l'Ordre.
                </p>

                <p>
                  <b>Cap.G.</b> : De quelle recommandation est-il muni ?
                </p>

                <p>
                  <b>Gard.</b> : Du signe de Respect d'un Maçon de l'Arche
                  Royale.
                </p>

                <p>
                  <b>Cap.G.</b> <span className="com">(au Cand.)</span> : Faites
                  ce signe, <span className="com">(le Cand. le fait)</span>
                </p>

                <p>
                  <b>Cap.G.</b> : Attendez que je fasse mon rapport à l'Éminent
                  Précepteur.
                </p>

                <p>
                  <b>Cap.G.</b>{" "}
                  <span className="com">
                    ferme la porte, revient à sa place, fait face à l'Ém.P. et
                    fait le S.d.C.
                  </span>{" "}
                  : Éminent Précepteur, le Compagnon ... (nom)..., un pèlerin en
                  voyage, las et fatigué, ayant entendu parler de cette
                  Préceptorie de Chevaliers du Temple, désire y trouver refuge
                  et, si possible, être admis aux privilèges de l'Ordre.
                </p>

                <p>
                  <b>Ém.P.</b> : De quelle recommandation est-il muni ?
                </p>

                <p>
                  <b>Cap.G.</b> : Du signe de Respect d'un Maçon de l'Arche
                  Royale.
                </p>

                <p>
                  <b>Ém.P.</b> : Qu'il soit admis avec prudence.
                </p>

                <p className="com">
                  Le Mar. va à la table du Chanc., en reçoit la déclaration et
                  la porte à l'Ém.P. qui l'examine.
                </p>

                <p className="com">
                  Un document particulier, portant la déclaration sur la demande
                  originale de candidature, doit être signé en 2 exemplaires, un
                  pour le Chanc., l'autre remis au Candidat ultérieurement.
                </p>

                <p>
                  <b>Ém.P.</b> : La déclaration a été dûment signée.
                </p>

                <p className="com">
                  Le Mar. dépose la/les déclaration(s) sur la table du Chanc.,
                  puis il voile le Cruc. sur le Sép. et retourne à sa place à
                  l'Ouest, où il reste debout.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères. À - l'ORDRE !
                </p>

                <p className="com">
                  Tous les Chev. se lèvent, tirent l'épée et sont au "PORTEZ".
                  L'Ém.P. reste assis ainsi que les Gds Offic. siégeant à l'Est,
                  invités par l'Ém.P. Le Mar., l'épée au "PORTEZ", va à la porte
                  et y reçoit le Cand. (Pèlerin), qui vient d'être admis par le
                  Cap.G., le guide de la main gauche posée sur son épaule ou
                  coude droit et le conduit à un point situé à environ six pas à
                  l'Est du 2e Cble.
                </p>

                <p className="com">
                  Mar. et Pèl., face à l'Ouest, avancent alors ensemble vers le
                  2e Cble qui menace le Pèl. de son épée en la pointant
                  franchement sur sa poitrine.
                </p>

                <p className="com">Le Mar. ne tente pas de parer le coup.</p>

                <p>
                  <b>2e Cble</b> : Qui êtes-vous pour oser pénétrer ainsi dans
                  notre Préceptorie ?
                </p>

                <p>
                  <b>Mar.</b> : Le Compagnon ......, un pèlerin en voyage, las
                  et fatigué, ayant entendu parler de cette Préceptorie de
                  Chevaliers du Temple, désire y trouver refuge et, si possible,
                  être admis aux privilèges de l'Ordre.
                </p>

                <p>
                  <b>2e Cble</b> : De quelle recommandation est-il muni ?
                </p>

                <p>
                  <b>Mar.</b> : Du signe de Respect d'un Maçon de l'Arche
                  Royale.
                </p>

                <p>
                  <b>2e Cble</b> <span className="com">(au Cand.)</span> :
                  Faites ce signe,{" "}
                  <span className="com">(le Pèl. le fait)</span>
                </p>

                <p className="com">
                  Pour permettre au Pèl. de faire le Sig., le 2e Cble retire son
                  épée d'environ 30 cm., mais garde la pointe menaçante. Le
                  Pèlerin fait le Sig. Le 2e Cble revient alors au "PRÉSENTEZ",
                  puis au "PORTEZ".
                </p>

                <p>
                  <b>2e Cble</b> : Passez au nom de J.
                </p>

                <p className="com">
                  Le Mar. conduit directement le Pèlerin à six pas environ à
                  l'Est du 1er Cble. Le Mar. et le Pèl. avancent ensemble vers
                  le 1er Cble qui menace le Pèlerin pointant franchement l'épée
                  sur sa poitrine.
                </p>

                <p className="com">Le Mar. ne tente pas de parer le coup.</p>

                <p>
                  <b>1er Cble</b> : Qui êtes-vous pour oser pénétrer ainsi dans
                  notre Préceptorie ?
                </p>

                <p>
                  <b>Mar.</b> : Le Compagnon ... (nom)..., un pèlerin en voyage,
                  las et fatigué, ayant entendu parler de cette Préceptorie de
                  Chevaliers du Temple, désire y trouver refuge et, si possible,
                  être admis aux privilèges de l'Ordre.
                </p>

                <p>
                  <b>1er Cble</b> : De quelle recommandation est-il muni ?
                </p>

                <p>
                  <b>Mar.</b> : Du signe de Respect d'un Maçon de l'Arche
                  Royale.
                </p>

                <p>
                  <b>1er Cble</b> <span className="com">(au Cand.)</span> :
                  Faites ce signe,{" "}
                  <span className="com">(le Pèl. le fait)</span>
                </p>

                <p className="com">
                  Pour permettre au Pèl. de faire le Sig., le 1er Cble retire
                  son épée d'environ 30 cm., mais garde la pointe menaçante. Le
                  Pèlerin fait le Sig. Le 1er Cble revient au "PRÉSENTEZ", puis
                  au "PORTEZ".
                </p>

                <p>
                  <b>1er Cble</b> : Passez au nom de J.
                </p>

                <p className="com">
                  Le Mar. conduit le Pèl., face à l'Est, à mi-chemin entre les
                  Cbles et le Sép.
                </p>

                <p>
                  <b>Mar.</b> : Saluez l'Éminent Précepteur par le signe,{" "}
                  <span className="com">(le Pèl. le fait)</span>
                </p>

                <p>
                  <b>Ém.P.</b> : Bienvenue au nom de J. Reposez-vous et partagez
                  le pain, soutien de la vie, et l'eau, le seul rafraîchissement
                  que nous puissions maintenant vous offrir.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères. - PRENEZ - PLACE !
                </p>

                <p className="com">
                  Le Mar. coordonne de la voix la remise au fourreau. Org. peut
                  alors jouer la ritournelle appropriée scandant le mouvement.
                </p>

                <p className="com">
                  Le Mar.A. avance le siège du Mar. (et éventuellement d'autres
                  sièges selon le nombre de Cand.) de quelques pas.
                </p>

                <p className="com">
                  Le Mar. y conduit le Pèl.) et s'y fait asseoir.
                </p>

                <p className="com">
                  Le Mar.A. rapporte de la table à l'ouest, la patène portant le
                  pain et la coupe d'eau qu'il remet au Mar.
                </p>

                <p className="com">
                  Celui-ci présente la patène au Pèl., qui y prend un morceau de
                  pain qu'il mange ; puis il lui tend la coupe qu'il prend et à
                  laquelle il boit prenant son temps.
                </p>

                <p className="com">
                  Le Mar. reprend patène et coupe qu'il rend au Mar.A. qui les
                  replace sur la table à l'Ouest.
                </p>

                <p className="com">
                  Le Mar., ayant tiré son épée, invite le Pèl. à se lever et le
                  conduit au centre à l'Ouest. Il lui dictera les réponses (sauf
                  la première) à voix basse mais audible.
                </p>

                <p className="com">
                  Le Mar.A. remet le siège du Mar. (et les autres
                  éventuellement) à sa place.
                </p>

                <p>
                  <b>Ém.P.</b> : Pèlerin, vous avez cherché refuge dans notre
                  Préceptorie et souhaité être admis aux privilèges de notre
                  Ordre. Souffrez donc que je vous pose les questions suivantes
                  : À l'heure du danger, en qui placez-vous votre confiance ?
                </p>

                <p>
                  <b>Pèlerin</b>{" "}
                  <span className="com">(ne pas lui dicter la réponse)</span> :
                  En Dieu.
                </p>

                <p>
                  <b>Ém.P.</b> : Et en qui mettez-vous votre foi pour votre
                  salut éternel ?
                </p>

                <p>
                  <b>Pèlerin</b>{" "}
                  <span className="com">(dicté par le Mar.)</span> : En
                  Jésus-Christ, notre Sauveur béni.
                </p>

                <p>
                  <b>Ém.P.</b> : Pouvez-vous me donner un gage de votre
                  sincérité ?
                </p>

                <p>
                  <b>Pèlerin</b>{" "}
                  <span className="com">(dicté par le Mar.)</span> : Je suis
                  prêt à entreprendre toute tâche, même périlleuse, qui puisse
                  me permettre d'être admis sous votre bannière, comme Soldat de
                  la Croix.
                </p>

                <p>
                  <b>Ém.P.</b> : Comme gage de votre foi, je vous enjoins de
                  faire un pèlerinage de sept ans. Vous l'accomplirez de manière
                  symbolique, en faisant sept fois le tour de la Préceptorie.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères. À - l'ORDRE !
                </p>

                <p className="com">
                  Tous les Chev. se lèvent, tirent l'épée et viennent au
                  "PORTEZ". L'Ém.P. et le Chap. restent assis ainsi que les Gds
                  Offic. à l'Est.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers mes Frères, - GARDEZ LE SÉPULCRE !
                </p>

                <p className="com">Les Cbles restent à leur place.</p>

                <p>
                  <b>Mar.</b> : — MARCHE !
                </p>

                <p className="com">
                  Les Chev. prévus vont directement autour du Sép., toujours
                  l'épée au "PORTEZ", et font face à l'extérieur. Quatre Chev.
                  au moins sont nécessaires, un de chaque côté, mais d'autres
                  (jusqu'à huit) peuvent y prendre part, s'ils sont disponibles.
                  (cf. p. 105)
                </p>

                <p className="com">
                  Les Chev. doivent se tenir sur les côtés du Sép. et non aux
                  angles.
                </p>

                {/* Numbered steps for guarding Sépulcre - used ordered list */}
                <ol className="list-decimal pl-8 com">
                  <li>
                    Les Chev. prévus s'avancent ensemble de part et d'autre,
                    puis viennent le long du Sép., jusqu'au commandement " -
                    HALTE ! "
                  </li>
                  <li>
                    Les 2 colonnes s'arrêtent, chaque Chev. gagne la place qui
                    lui a été auparavant assignée par le Mar. Les Chev. aux
                    extrémités est et ouest font un ou deux pas glissés à droite
                    et à gauche.
                  </li>
                </ol>

                <p>
                  <b>Mar.</b> : DOS AU - SÉPULCRE !
                </p>
                <p>
                  3 - Tous les Chev. font face vers l'extérieur par un demi-tour
                  à droite.
                </p>

                <p className="com">
                  Le Mar., l'épée au "PORTEZ", précède le Pèl. qui fait le tour
                  du Sép. Le Mar. doit modifier son allure, d'abord pas rapide
                  (mais sans trop), pendant le premier tour, puis plus lent au
                  deuxième et encore plus lent, marquant l'épuisement, au
                  troisième tour.
                </p>

                <p className="com">
                  À la fin du troisième tour, lorsque le Mar. et le Pèl. ont
                  passé l'angle sud-ouest du Sép., ils sont arrêtés de vive voix
                  par le 2e Cble qui s'écrie :
                </p>

                <p>
                  <b>2e Cble</b> <span className="com">(au Mar.)</span> : HALTE
                  !
                </p>

                <p className="com">
                  Le Mar. et le Pèl. s'arrêtent sur place face au nord. (sans
                  faire ensuite face à l'est)
                </p>

                <p>
                  <b>2e Cble</b> <span className="com">fait le S.d.C.</span> :
                  Éminent Précepteur, le Pèlerin a (a) accompli trois années de
                  son pèlerinage, durant lesquelles il a fait preuve de beaucoup
                  de zèle et de fidélité. Je vous demande donc de bien vouloir
                  lui faire remise du reste de son pèlerinage.
                </p>

                <p>
                  <b>Ém.P.</b> : Frère Second Connétable, j'accède volontiers à
                  votre requête et lui remets le reste de son temps.
                </p>
              </div>

              <div className="container mx-auto p-4">
                <p className="com">
                  Le Mar. conduit le Pèl. au centre, à l'ouest, où ils font face
                  à l'est, le Mar. au sud (à la dr.) du Pèl.
                </p>

                <p>
                  <b>Mar.</b> : Chevaliers Gardes du Sépulcre. - À vos - PLACES
                  !
                </p>

                <p className="com">
                  Les Chev., l'épée au "PORTEZ", regagnent leurs places comme
                  ils en sont venus. (cf. p. 106)
                </p>

                <p className="com">L'Ém.P. et le Chap. se lèvent.</p>

                <p>
                  <b>Chap.</b>{" "}
                  <span className="com">
                    va à l'autel, fait face à l'est, retire sa coiffure et dit
                  </span>{" "}
                  : PRI - ONS.
                </p>

                <p className="com">
                  Tous les Chev. (sauf le Chap.) prennent la Pos. de Pr. Le
                  Pèl., instruit à voix basse par le Mar., place sa main droite
                  sur le cœur, (au signe de Foi) et retire son chapeau.
                </p>

                <h3>Prière</h3>

                <p>
                  <b>Chap.</b> : Ô Grand Emmanuel, notre Capitaine céleste,
                  abaisse Ton regard, nous T'en supplions, sur cette
                  Préceptorie, et accorde Ta sainte grâce à ce Candidat,
                  maintenant devant Toi, afin qu'il se conduise en bon et fidèle
                  soldat de la Croix et puisse, désormais, éviter toute occasion
                  de T'offenser, devenant ainsi à Tes yeux digne du salut que
                  Toi seul peux lui accorder.
                </p>
                <p>
                  <b>A - MEN.</b>
                </p>

                <p className="com">Tous les Chev. reviennent au "PORTEZ".</p>

                <p className="com">Le Chap. se recoiffe et regagne sa place.</p>

                <p>
                  <b>Ém.P.</b> : Que le Pèlerin s'approche maintenant du
                  Sépulcre, s'agenouille sur les deux genoux, les deux mains
                  reposant sur le Saint Évangile, et contracte son obligation
                  solennelle.
                </p>

                <p className="com">Le Mar. prévient tout mouvement du Pèl.</p>

                <p className="com">Le Mar.A. rengaine son épée.</p>

                <p className="com">
                  Le Mar. retire au Pèl. chapeau et bourdon, les remet au Mar.A.
                  qui va les placer à l'ouest, puis reprend son épée en main.
                </p>

                <p className="com">
                  Le Mar. fait avancer le Pèl. jusqu'à l'ouest du Sép., le fait
                  agenouiller sur les deux genoux et placer ses deux main sur le
                  Saint Évangile.
                </p>

                <p className="com">
                  Le Mar. fait signe aux Cbles qui s'avancent de chaque côté du
                  Sép., s'y arrêtent et se font face, à hauteur de la Bible. Ils
                  viennent au "PRÉSENTEZ", puis abaissent lentement leur épée.
                  Elles reposent alors sur les mains du Pèl., de telle sorte que
                  les lames soient horizontales, la garde reposant dans la main
                  droite ouverte.
                </p>

                <p className="com">
                  Tous les autres Chev. demeurent au "PORTEZ".
                </p>

                <p>
                  <b>Ém.P.</b> : Pèlerin, dites "Moi",{" "}
                  <span className="com">(le Pèl. le dit)</span> déclinez votre
                  nom de baptême, c'est-à-dire tous vos prénoms, puis votre nom,{" "}
                  <span className="com">(le Pèl. les donne)</span> et répétez
                  après moi{" "}
                  <span className="com">
                    (l'Ém.P. prendra soin de dicter des sections cohérentes,
                    attendant que le Pèl. ait répété avant de poursuivre. Des /
                    indiquent les césures suggérées)
                  </span>{" "}
                  :
                </p>
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
