import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
          <section className="p-6">
            <div className="prose max-w-none text-gray-700">
              <h3>Remise du diplôme de Chevalier du Temple</h3>
              <p className="com">
                La remise des diplômes se fait au "levé", précédant la fermeture
                quand l'Ém.P. invitera le Chap. à faire part des communications
                reçues du Gd Prieuré. Si un Gd Officier est présent il est alors
                courtois de lui proposer de le remettre.
                <b>Le Mar.</b>{" "}
                <span className="com">
                  conduit le Chev. récipiendaire, épée au fourreau, à la table
                  du Chanc.
                </span>
              </p>
              <p>
                <b>Ém.P.</b> : Frère Chevalier, j'ai grand plaisir à vous
                remettre votre certificat d'armement ou diplôme du Grand
                Prieuré. Il contient quelques éléments sur lesquels je dois
                attirer votre attention et, tout d'abord son titre, où vous
                remarquerez les mots Unis, Religieux et Militaires :
              </p>
              <p>
                <b>Unis</b> parce que deux Ordres les composent : l'Ordre
                maçonnique du Temple et du Sépulcre et l'Ordre maçonnique de
                l'Hôpital ou de Malte. Bien que chacun ait ses propres
                règlements, rituels et insignes, un droit et une cotisation
                uniques sont perçus.
              </p>
              <p>
                <b>Religieux</b> puisque, lors de votre armement, vous avez dû
                attester de votre foi chrétienne trinitaire, et <b>Militaire</b>{" "}
                car, l'Ordre ayant été fondé pour la protection des pèlerins
                visitant la Terre Sainte, nos rites et cérémonies ont un
                caractère assez militaire. Ainsi, on ne tient jamais un frère
                par la main dans cet Ordre: pour guider un candidat autour de la
                salle lors de sa réception, on le conduit par le coude ou
                l'épaule gauche; et surtout, on ne s'assied jamais jambes
                croisées. Je vous invite à étudier avec attention les dernières
                pages du rituel qui vous est remis concernant le maniement de
                l'épée. Une bonne pratique de son maniement assure la solennité
                de nos cérémonies et laisse aux Candidats une impression
                durable.
              </p>
              <p>
                Ce diplôme, certifiant votre armement régulier dans l'Ordre, est
                signé par l'Éminentissime et Suprême Grand Maître et par le
                Grand Vice-Chancelier qui en atteste, comme de votre
                immatriculation sur les registres du Grand Prieuré pour la
                France, dont il porte le sceau. Celui-ci représente deux
                chevaliers sur un même cheval, entourés d'une inscription latine
                que l'on peut traduire par « Pauvres Chevaliers du Christ et du
                Temple de Salomon », premier nom de l'Ordre à sa fondation en
                l'an onze cent dix-neuf.
              </p>
              <p>
                Comme tout certificat maçonnique, il serait incomplet sans votre
                signature ne varietur que vous voudrez bien aller maintenant y
                apposer à la table du Chancelier. Auparavant, je vous souhaite
                une longue et heureuse carrière dans ce bel ordre chrétien
                maçonnique.
              </p>
              <p className="com">
                Avant d'être conduit à la table du Chancelier, le Chev. salue
                l'Ém. P. avec le S. d. C. de la main seule.&nbsp;
              </p>{" "}
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
