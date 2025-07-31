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
                <h3>Obligation</h3>

                <p>Au nom de la Très Sainte, Bénie et Glorieuse Trinité […]</p>
                <p>et en présence des Chevaliers ici assemblés, […]</p>
                <p>par ceci et sur ceci, […]</p>
                <p>je promets et jure très solennellement […]</p>
                <p>
                  de ne jamais révéler les secrets d'un Chevalier du Temple […]
                </p>
                <p>à quiconque n'aurait pas reçu ce grade, […]</p>
                <p>sauf à un Candidat à celui-ci, […]</p>
                <p>
                  au sein d'une Préceptorie légitime de Chevaliers du Temple,
                  […]
                </p>
                <p>et seulement lorsque j'y remplirai[…]</p>
                <p>les fonctions de Précepteur régulièrement installé. […]</p>
                <p>Je promets en outre solennellement […]</p>
                <p>de maintenir et défendre fidèlement […]</p>
                <p>la sainte foi chrétienne […]</p>
                <p>
                  contre toutes les attaques arbitraires de ses ennemis ; […]
                </p>
                <p>de ne pas, même en colère, […]</p>
                <p>faire couler le sang d'un Chevalier du Temple, […]</p>
                <p>à moins que ce ne soit pour une juste guerre</p>
                <p>entre pays ou princes souverains ; […]</p>
                <p>mais au contraire, de le défendre, […]</p>
                <p>même au péril de ma vie, […]</p>
                <p>partout et chaque fois […]</p>
                <p>que sa vie ou son honneur […]</p>
                <p>pourraient être en danger ; […]</p>
                <p>de protéger, dans toute la mesure de mes moyens, […]</p>
                <p>
                  les parents et amis les plus proches et les plus chers […]
                </p>
                <p>de tout Chevalier du Temple, […]</p>
                <p>et leur éviter, si possible, […]</p>
                <p>tout préjudice, péril ou violence […]</p>
                <p>auxquels ils pourraient se trouver exposés. […]</p>
                <p>Enfin, je promets très sincèrement […]</p>
                <p>
                  d'obéir aux plus hautes autorités du pays où je réside […]
                </p>
                <p>ou pourrais résider ; […]</p>
                <p>d'observer strictement et de maintenir […]</p>
                <p>les Anciens Règlements et Lois de l'Ordre […]</p>
                <p>
                  ainsi que les Statuts du Grand Prieuré pour la France, […]
                </p>
                <p>de répondre et obéir, […]</p>
                <p>autant que &nbsp; je le pourrai, […]</p>
                <p>
                  et aux convocations dûment marquées qui me seront envoyées.
                  […]
                </p>
                <p>Tous ces points, […]</p>
                <p>je jure de les respecter fidèlement, […]</p>
                <p>
                  sans hésitation, restriction mentale, ni faux fuyant d'aucune
                  sorte […]
                </p>
                <p>sous la moindre des peines de perdre la vie, […]</p>
                <p>en ayant la tête tranchée. […]</p>
                <p>
                  et placé au sommet de la flèche d'un clocheton ou pinacle […]
                </p>
                <p>le crâne. Scié en deux. […]</p>
                <p>
                  &nbsp;et le cerveau exposé aux rayon brulant
                  <br />
                  du soleil, […]
                </p>
                <p>
                  &nbsp;comme mise en garde pour tous les
                  <br />
                  infidèles et les traîtres. […]
                </p>

                <p>Que le Christ m'aide […]</p>
                <p>et m'arme de fermeté […]</p>
                <p>pour tenir cette obligation solennelle.</p>
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
