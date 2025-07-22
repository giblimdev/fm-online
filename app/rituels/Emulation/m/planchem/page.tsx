import React from "react";
import Image from "next/image";
import NavEmul from "@/components/nav/NavEmul";
function page() {
  return (
    <div>
      <h1>PLANCHE TRACEE DU 3ème GRADE</h1>
      <br />
      <Image
        className="planche m-auto"
        src="/tableau-3eme.jpg"
        alt="plache du premier grade"
        width={500}
        height={300}
      />
<br />
      <p className="com">
        Le PMI. donne le Cr. au VM. et tient la pl. tr., de telle manière que le
        VM. puisse avec le Cr. montrer au Cand. les différents symboles tandis
        qu'il donne l'explication en restant assis à sa chaire.
      </p>
      <p>
        Il fut ordonné que notre Maître serait enterré de nouveau, aussi près du
        Saint des saint que la loi des Israélites l'autorisait ; là, dans un
        tombeau ayant à partir du Centre, trois pieds à l'Est et trois pieds à
        l'Ouest, trois pieds du Nord au Sud et cinq pieds ou plus de profondeur.
        Il ne fut pas inhumé dans le Saint des Saints, car rien de grossier ni
        d'impur ne devait y pénétrer, pas même le Grand Prêtre, sauf une fois
        par an, et cela seulement après maintes ablutions et purifications, en
        vue du grand jour de l'expiation des péchés, car, d'après la loi
        israélite, toute chair était présumée impure. <br />
        Les dits quinze fidèles Compagnons reçurent l'ordre d'assister aux
        funérailles, vêtus de tabliers et de gants blancs, comme emblèmes de
        leur innocence. Vous avez déjà appris que les outils avec lesquels notre
        Maître avait été assassiné, étaient la Règle à fil à plomb, le Niveau et
        le Maillet Pesant. <br />
        Les ornements d'une Loge de Maître Maçon sont le Portique, la Lucarne et
        le Pavé Mosaïque. Le Portique était l'entrée du Saint des Saints, la
        Lucarne, l'ouverture qui l'éclairait, et le Pavé Mosaïque était destiné
        à être foulé par le Grand Prêtre. <br />
        La fonction du grand prêtre était de brûler de l'encens en l'honneur et
        à la gloire du Très Haut et de prier avec ferveur le tout puissant, afin
        que dans sa bonté et Sa sagesse infinie, il daignât répandre les
        bienfaits de la paix et de la sécurité sur la nation israélite pendant
        l'année à venir. <br />
        Le Cercueil, la tête de mort et les os en sautoir, étant les emblèmes de
        la mort, font allusion au trépas prématuré de notre Maître H. A. Il fut
        assassiné trois mille ans après la création du monde.
      </p>

      <p className="com">
        Le VM. rend le Cr. au PMI. qui le range, ainsi que la pl. tr.
      </p>
      <div><NavEmul /></div>
    </div>
  );
}

export default page;
