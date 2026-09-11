# AgriDiag Bénin — Prototype frontend

Prototype web (React + Vite) développé pour le hackathon **Deep Learning IndabaX
Bénin 2026 × iSHEERO**. Permet à un agriculteur de photographier une feuille de
tomate ou de maïs et d'obtenir un diagnostic de maladie avec recommandation de
traitement.

## Lancer le projet en local

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## État actuel du prototype

Les prédictions affichées sont **actuellement simulées** (voir
`src/lib/predict.js`) pendant que l'équipe ML finalise l'entraînement du
modèle sur le jeu de données tomate + maïs. Toute la logique de prédiction
est isolée dans une seule fonction (`predict()`), avec les instructions
précises pour brancher le modèle TensorFlow.js entraîné dès qu'il est prêt —
aucune autre partie de l'application n'a besoin d'être modifiée.

## Structure

```
src/
  App.jsx                  point d'entrée applicatif, gère le flux upload → analyse → résultat
  components/
    CultureSwitch.jsx      sélecteur Tomate / Maïs
    UploadZone.jsx         upload fichier, glisser-déposer, caméra, extraction de frame vidéo
    DiagnosisResult.jsx    affichage du résultat, barre de confiance, garde-fou
  lib/
    diseases.js            base de connaissances : maladies + recommandations par culture
    predict.js             module de prédiction (simulateur → à remplacer par TF.js)
  index.css                design system (couleurs, typographie, composants)
```

## Limites connues

- Le modèle n'est pas encore intégré ; les résultats sont simulés à des fins
  de démonstration de l'interface.
- La base de connaissances des maladies (`diseases.js`) couvre volontairement
  un nombre restreint de classes pour rester réalisable en une journée de
  hackathon.
- L'extraction vidéo se limite à une seule frame ; il ne s'agit pas d'une
  analyse temporelle réelle.
