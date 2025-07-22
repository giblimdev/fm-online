import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* En-tête de page */}
      <header className="py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-2">
          annex
        </h1>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          <section className="p-6">
            <div className="prose max-w-none text-gray-700">
              <div className="container mx-auto p-4">
                <h3>Dévoilement du crucifix</h3>
                <p className="com">
                  Sans presser
                  <br />
                  Adapté par R. Miller (1731-1807)
                </p>
                <br />

                <p>
                  Quand je vois l'étonnante Croix
                  <br />
                  Où le Roi de Gloire agonise.
                  <br />
                  Mon plus beau gain semble ironie
                  <br />
                  Et ma fierté de bas aloi.
                </p>
                <br />

                <h3>Hymne du Temple</h3>
                <p className="com">
                  "The English Hymnal" (TO U.P., London, 1996 : n°641)
                  <br />
                  Musique de Ralph Vaughan Williams (1872-1958)
                  <br />
                  "Sine Domine"
                </p>
                <br />

                <p>
                  Pour tous les Saints
                  <br />
                  dont les actes font foi,
                  <br />
                  Clamant au monde, leur confiance en Toi,
                  <br />
                  Ton nom, JESUS, à jamais, béni soit
                  <br />
                  Alléluia, Alléluia !
                </p>

                <p>
                  Après combats féroces
                  <br />
                  et longue guerre,
                  <br />
                  L'écho des chants victorieux engendre
                  <br />
                  Aux cœurs l'entrain ; aux bras, la force fière
                  <br />
                  Alléluia, Alléluia !
                </p>

                <p>
                  Que les soldats
                  <br />
                  fidèles, braves et fiers
                  <br />
                  Soient au combat tels les Saints de naguère,
                  <br />
                  Gagnant aussi les lauriers des vainqueurs,
                  <br />
                  Alléluia, Alléluia !
                </p>

                <p>
                  Voyez ! Se lève un
                  <br />
                  autre jour de gloire.
                  <br />
                  Tous les Saints viennent, en armure de victoire,
                  <br />
                  Autour du Roi de Gloire, Lui notre espoir
                  <br />
                  Alléluia, Alléluia !
                </p>

                <p>
                  Des confins connus,
                  <br />
                  des rives lointaines,
                  <br />
                  Par les ports nacrés, vient l'ost par centaines,
                  <br />
                  Glorifiant PÈRE, FILS et ESPRIT SAINT
                  <br />
                  Alléluia, Alléluia !
                </p>
                <br />

                <h3>
                  Disposition des divers éléments et décors sur l'Autel et le
                  Sépulcre
                </h3>
                <p className="com">
                  Content related to the diagram/disposition would go here.
                </p>
                <br />

                <h3>Mouvements et disposition de la Voûte d’acier (Entrée)</h3>
                <p className="com">
                  Content related to the diagram/movements would go here.
                </p>
                <br />

                <h3>Mouvements et disposition de la Voûte d’acier (Sortie)</h3>
                <p className="com">
                  Content related to the diagram/movements would go here.
                </p>
                <br />

                <h3>
                  Mouvement et disposition de la Garde du sépulcre (mise en
                  place)
                </h3>
                <p className="com">
                  Content related to the diagram/movements would go here.
                </p>
                <br />

                <h3>
                  Mouvement et disposition de la Garde du sépulcre (retou)
                </h3>
                <p className="com">
                  Content related to the diagram/movements would go here.
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
