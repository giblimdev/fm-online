import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          <section className="p-6">
            <div className="prose max-w-none text-gray-700">
              <div className="container mx-auto p-4">
                <h2>Annonces à la porte</h2>
                <p>
                  Les annonces à la porte (autres que celle d'un Cand.) sont
                  faites de la manière suivante :
                </p>

                <p>
                  <b>Gard</b>&nbsp;:{" "}
                  <span className="com">
                    frappe ●●●●● -.●● marquant la pause après le 5ᵉ coup.
                  </span>
                </p>

                <p>
                  <b>Cap.G</b>&nbsp;: Frère Second Connetable, on a frappé.
                </p>

                <p>
                  <b>2ᵉ Cble.</b> : Frère Capitaine des Gardes, voyez qui
                  demande à être admis.
                </p>

                <p>
                  <b>Cap.G.</b>{" "}
                  <span className="com">va à la porte, l'ouvre</span> : Qui va
                  là ?
                </p>

                <p>
                  <b>Gard.</b> : Le Chevalier
                </p>

                <p>
                  <b>Cap.G.</b>{" "}
                  <span className="com">
                    referme la porte, revient devant son siège, fait le S.d.C.
                    et rend compte
                  </span>{" "}
                  : Eminent Précepteur, Le Chevalier …. Demande à être admis.
                </p>

                <p>
                  <b>Em.P.</b> : Admettez le, Frère Capitaine des Gardes.
                </p>

                <p className="com">
                  Le Chev. Est admis, s’avance seul au pied du Sép., tire son
                  épée, salue l’Em.P avec le S.D.C., rengaine son épée et va
                  prendre sa place.
                </p>
              </div>

              <div className="container mx-auto p-4">
                <h2>Garde du Sépulcre</h2>
                <p>
                  Le nombre minimum de Chev. pour la garde du Sép. est de quatre
                  (un sur chaque côté); mais huit Chev. assureraient une garde
                  plus digne (trois au nord, trois au sud et un aux extrémités
                  est et ouest). Si la Préceptorie ne dispose pas d'une Garde du
                  Corps à qui il revient d'assurer la voûte d'acier ET la garde
                  du sépulcre, il est souhaitable que le Mar. désigne des Chev.
                  chaque fois, avant l'ouverture de la Préceptorie, et répète
                  les mouvements de mise en place avec eux.
                </p>
                <p>
                  Lorsque les Chev. de la voûte d'acier garderont ensuite le
                  Sép., la manœuvre est détaillée dans les Instructions diverses
                  aux pages 48 et 105.
                </p>

                <h2>Collecte des Aumônes</h2>
                <p>
                  Immédiatement avant la collecte des aumônes, le Mar. fait
                  lever les Chev. disant "Chevaliers, mes frères, De-bout"...
                  Ils ne tirent pas leur épée et l'hymne du Temple (cf. p. 109)
                  est chanté pendant la collecte, généralement assurée par
                  l'Aumônier (Aum.) (voir détails p. 57).
                </p>

                <h2>Affaires diverses</h2>
                <p>
                  Les affaires diverses doivent être traitées et les autres
                  propositions délibérées lors de l'unique Lever de l'Ém. P.,
                  avant le début de la fermeture formelle de la Préceptorie.
                </p>
                <p>
                  Il est inutile de prévoir un point d'ordre du jour sur la
                  convocation à cet effet. Elles sont traitées comme en Loge
                  bleue, mais lors d'un unique Lever: Grand Prieuré, Prieuré
                  provincial (s'il y a lieu) puis Préceptorie (proposition de
                  candidatures, salutations, etc.). Les excuses ont été reçues
                  lors de l'appel du rôle à l'ouverture.
                </p>
                <br />
              </div>
              <div className="container mx-auto p-4">
                <h2>INVESTITURE D’UN OFFICIER</h2>
                <p>
                  L’investiture d’un Officier, se déroule ainsi :<br />À l’appel
                  de son nom, le Chev. nommé se lève, dégaine et vient au
                  “POR—TEZ”. Le Mar. se rend devant lui, tous deux se saluent en
                  venant au “PRÉSENTEZ” puis reviennent au “PORTEZ”. Il le
                  conduit alors devant l’Ém.Précepteur face auquel il s’arrête,
                  et :
                </p>

                {/* Officer Investiture Steps - using ordered list */}
                <ol className="list-decimal pl-8 com">
                  <li>
                    Il effectue une rotation de son épée vers la gauche jusqu’à
                    ce que la lame soit horizontale.
                  </li>
                  <li>
                    Il saisit la lame, en son centre, avec la main gauche.
                  </li>
                  <li>
                    Il déplace sa main droite de la poignée vers la lame qu’il
                    saisit au-dessous de la main gauche et continue le mouvement
                    de rotation de l’épée jusqu’à ce qu’elle soit à nouveau
                    horizontale, la poignée vers la gauche.
                  </li>
                  <li>
                    Il présente l’épée à l’Ém. Précepteur, la poignée vers
                    l’avant, la lame reposant, à la hauteur de la garde, sur son
                    avant-bras gauche.
                  </li>
                </ol>

                <p>
                  L’Ém. Précepteur prend l’épée par la poignée, de la main
                  droite, l’amène au “POR—TEZ”, puis, saisit de la main gauche
                  la lame de l’épée juste au-dessus de la garde, à pleine main.
                  Il adresse les quelques mots prévus au Chev, nommé, lui serre
                  la main puis présente la poignée au chevalier qui :
                </p>

                <ul className="list-decimal pl-8 com">
                  {/* Continuing the list numbering */}
                  <li>
                    5. Saisit l’épée de la main droite par la poignée et l’amène
                    au “PRÉSENTEZ”.
                  </li>
                  <li>Puis salue l’Ém. Précepteur par le S.d.C.</li>
                  <li>
                    Le Mar. ou le Mar.A. le raccompagne à sa place. L’Officier
                    rengaine son épée et s’assoit.
                  </li>
                </ul>

                <p className="com">
                  Le Cap.G. garde toujours son épée dégainée.
                </p>
                <br />

                <h2>Saluts & honneurs de l’Ordre</h2>
                <br />

                <h3>SIGNE DU CROISÉ</h3>

                {/* Signe du Croisé Steps - using ordered list */}
                <ol className="list-decimal pl-8 com">
                  <li>
                    Amener l’épée du “POR—TEZ” au “PRÉSEN—TEZ”, c’est-à-dire la
                    lame verticale, le dos de la main face en avant, le quillon
                    de la garde à hauteur de la bouche et 3 cm. en avant environ
                    ;
                  </li>
                  <li>L’é. l., m. dans cette position,...</li>
                  <li>
                    Marquer une courte pause sans revenir au centre du visage,
                    puis revenir au “POR—TEZ”.
                  </li>
                </ol>
                <br />

                <h3>GÉNERALEMENT</h3>
                <p>
                  Un Chev. entrant ou quittant la Préceptorie, ou s’adressant à
                  l’Ém.P., tire son épée et salue l’Ém.P. par le S.d.C.
                </p>
                <p>
                  Ce salut peut être fait de la main seule, lorsque l’épée n’est
                  pas dégainée.
                </p>
                <br />

                <h3>SALUT OU HONNEUR DE L’ORDRE “AU BAUCENT”</h3>
                <p>
                  Amener l’épée du “POR—TEZ” au “PRÉSEN—TEZ”, puis par trois
                  mouvements distincts du poignet en oblique à droite vers le
                  haut, élever l’épée, tenue dans le prolongement du bras droit,
                  criant “Au Baucent” à chaque mouvement. Après le dernier
                  salut, revenir au “PRÉSEN—TEZ”, puis au “POR—TEZ”.
                </p>
                <p>
                  Les Saluts sont donnés par séries de trois, l’épée étant
                  élevée un peu plus haut à chacune des trois détentes pour, à
                  la troisième avoir le bras étendu au maximum.
                </p>
                <p>
                  Le nombre de saluts à donner est indiqué par le Mar. lorsqu’il
                  appelle les Chev. à l’ordre pour donner les Honneurs.
                </p>
                <br />

                <h3>NOMBRE DE SALUTS D’HONNEUR À DONNER</h3>
                <ul className="list-none pl-4">
                  <li>
                    Le Grand Maître et les Anciens et Passés Grands Maîtres : 11
                  </li>
                  <li>Le Grand Sénéchal et les anciens Gds Sénéch. : 9</li>
                  <li>Les Très Dignes et Ém. Chevaliers : 7</li>
                  <li>Les Très Ém. Chevaliers : 5</li>
                  <li>
                    Les Bien Ém. Chevaliers et autres Précept. Installés : 3
                  </li>
                  <li>
                    Les Chev. nouvellement installés, le jour et à l’issue de
                    leur installation seulement : 3
                  </li>
                </ul>
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
