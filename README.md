# POMODORO Timer par Cadiou Baptiste et Gaudre Soren

Une application simple de **minuterie Pomodoro** créée avec **HTML**, **CSS**, et **JavaScript** pour aider à organiser les sessions de travail et de pause.

## Table des matières
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Technologies](#technologies)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Fonctionnalités

- **Sessions de Travail et de Pause** : Passe automatiquement du travail à la pause après un intervalle défini.
- **Contrôle de la minuterie** : Possibilité de démarrer, mettre en pause et réinitialiser le minuteur.
- **Personnalisation des temps** : Ajustez la durée des sessions de travail et des pauses via un menu de paramètres.
- **Progression visuelle** : Un cercle de progression montre visuellement l'avancement du temps.
- **Sauvegarde locale** : Les paramètres sont enregistrés dans le `localStorage` pour être conservés après actualisation de la page.

## Installation

1. Clonez le dépôt sur votre machine locale en utilisant la commande suivante :

    ```bash
    https://github.com/SorenGAUDRE/pomodoro.git
    ```

2. Ouvrez le fichier `index.html` dans votre navigateur pour commencer à utiliser la minuterie.

## Utilisation

1. **Démarrer la minuterie** : Cliquez sur le bouton `Start` pour lancer la session de travail.
2. **Pause / Reprise** : Utilisez le bouton `Pause` pour interrompre la session et `Start` pour la reprendre.
3. **Réinitialiser** : Cliquez sur `Reset` pour réinitialiser la session en cours.
4. **Personnaliser les durées** :
   - Cliquez sur l'icône d'engrenage `⚙` pour ouvrir les paramètres.
   - Ajustez la durée des sessions de travail et de pause, puis cliquez sur le bouton de validation pour sauvegarder.
5. **Progression** : Observez le cercle autour de la minuterie pour voir l'avancement de la session.

## Technologies

- **HTML5** : Structure de la page et éléments ARIA pour une accessibilité renforcée.
- **CSS3** : Styles personnalisés pour l'interface utilisateur.
- **JavaScript (ES6)** : Gestion de la logique du minuteur, des interactions utilisateurs, et de la sauvegarde des paramètres dans le `localStorage`.

## Structure du projet

```bash
.
├── index.html       # Fichier HTML principal
├── style.css        # Fichier CSS pour le style de la minuterie
├── script.js        # Fichier JavaScript pour la logique du minuteur
└── README.md        # Documentation du projet
