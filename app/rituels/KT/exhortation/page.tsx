import NavKT from "@/components/nav/NavKt";
import React from "react";

function Page() {
  return (
    <div className="min-h-screen ">
      <div className="bg-white rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mx-auto prose max-w-none text-gray-700 p-3">
          <section className="p-6">
            <h2>
              Exhortation après l'Installation du nouvel Éminent Précepteur et
              investiture des Officiers de la Préceptorie
            </h2>
            <br />

            <p className="com">
              Bien que cette exhortation ne fasse pas strictement partie du
              rituel officiel, elle peut sans aucun doute ajouter à la dignité
              du cérémonial. Elle est en usage dans quelques Provinces
              occidentales d'Angleterre (Worcestershire, etc...) et a été
              préparée par le T. Em. Ch. Robert Edwin Whitlock, An. Pr. Prov.
              (Worcestershire). Si on l'utilise elle se donne après
              l'installation du Précepteur et l'investiture de ses Officiers, en
              présence de tous les Chevaliers.
            </p>

            <p>
              <b>P.Inst.</b> : Éminent Frère Chevalier .........
              <span className="com">(nom)</span>......... maintenant installé
              dans la Chaire de cette Préceptorie, nous vous en confions le
              gouvernement, assurés que vous réalisez pleinement les
              responsabilités qui vous incombent dans cet Office important et
              honorable, toujours confiants que vous démontrerez plus encore que
              jusqu'à là, dans l'exercice de l'importante fonction qui est
              maintenant vôtre.
            </p>

            <p>
              Nous sommes convaincus que vous exercerez l'autorité dont vous
              êtes investi avec discernement et sagesse.
            </p>

            <p>
              Les chevaliers sous votre commandement vous rendront loyale et
              fraternelle obédience, vous accorderont tous les services et vous
              prêteront l'assistance que vous solliciterez, selon leurs
              capacités.
            </p>

            <p>
              Travaillant sincèrement ainsi de concert, nous entretenons
              l'espoir que la paix, l'unité, et la prospérité seront toujours
              assurées à cette Préceptorie .........
              <span className="com">(nom et n°)</span>......... grâce à vos
              efforts communs.
            </p>

            <br />
          </section>
          {/* Section de navigation */}
          <section className="p-6 border-b border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <NavKT />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Page;
