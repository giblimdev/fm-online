import React from "react";

export default function pages() {
  return (
    <div>
      Vous souhaitez développer un système d'apprentissage interactif pour
      mémoriser des textes, probablement dans le contexte des obligations
      maçonniques que nous venons de voir. Voici ce que j'ai compris :
      Fonctionnalités principales 1. Système CRUD pour les textes Create :
      Ajouter de nouveaux textes dans la base de données Read : Récupérer et
      afficher les textes stockés Update : Modifier les textes existants Delete
      : Supprimer des textes de la base de données 2. une page de affichant les
      textes disponibles et mon score. 2. Composant d'affichage dédié Un
      composant spécialisé qui permet : Afficher le texte complet par défaut
      Masquer/afficher des mots individuellement au clic Interface interactive
      pour révéler progressivement le contenu 3. Persistance de l'état
      Sauvegarde automatique de l'état de chaque mot (masqué/visible)
      Restauration de l'état précédent lors du rechargement Stockage
      probablement en base de données ou localStorage 4. Système de scoring
      Calcul automatique : (Nombre de mots masqués / Nombre total de mots) × 100
      Affichage en pourcentage du niveau de maîtrise Suivi des progrès dans
      l'apprentissage Cas d'usage typique L'utilisateur charge un texte (ex:
      obligation maçonnique) Il clique sur les mots qu'il maîtrise pour les
      masquer Le système sauvegarde automatiquement les mots masqués Un score
      s'affiche : "75% maîtrisé" par exemple À la prochaine session, l'état est
      restauré
      <div>
        Controllers/ <br />
        │ ├── TextController.js # CRUD des textes <br />
        │ ├──ProgressController.js # Gestion des états et scores <br />
        │ └──AuthController.js # Authentification utilisateur <br />
        │ ├── Models/ <br />
        │ ├──Text.js # Modèle des textes <br />
        │ ├── WordState.js # État des mots (masqué/visible) <br />
        │ ├── UserProgress.js # Progrès utilisateur <br />
        │ └──User.js # Utilisateurs <br />│ ├── Services/ │ ├── TextService.js #
        Logique métier textes │ ├── ScoreService.js # Calcul des scores │ └──
        WordStateService.js # Gestion états mots │ └── Routes/ ├── textRoutes.js
        ├── progressRoutes.js └── authRoutes.js
      </div>
    </div>
  );
}
