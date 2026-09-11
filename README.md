# AgriTech Bénin — Prototype frontend

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

<<<<<<< HEAD
Les prédictions affichées sont **actuellement simulées** (voir
`src/lib/predict.js`) pendant que l'équipe ML finalise l'entraînement du
modèle sur le jeu de données tomate + maïs. Toute la logique de prédiction
est isolée dans une seule fonction (`predict()`), avec les instructions
précises pour brancher le modèle TensorFlow.js entraîné dès qu'il est prêt —
aucune autre partie de l'application n'a besoin d'être modifiée.
=======
Le modèle est entraîné (MobileNetV2, transfer learning, 6 classes, 93,5 % de
précision sur le jeu de test) et `src/lib/predict.js` contient déjà le code
d'inférence réelle en TensorFlow.js. Il reste une seule étape avant que
l'app fonctionne avec le vrai modèle :

```bash
pip install tensorflowjs
tensorflowjs_converter --input_format=keras \
  chemin/vers/best_model.keras \
  public/model
```

Cette commande génère `public/model/model.json` + des fichiers `.bin`.
Ne rien renommer ni déplacer. Une fois ces fichiers en place, `npm run dev`
suffit — aucune autre partie de l'application n'a besoin d'être modifiée.

**Ordre des classes** (doit rester synchronisé avec `class_names.txt` fourni
par l'équipe ML) : voir `MODEL_CLASSES` dans `src/lib/diseases.js`.
>>>>>>> 8caf4bb2 (deuxieme commit)

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

<<<<<<< HEAD
- Le modèle n'est pas encore intégré ; les résultats sont simulés à des fins
  de démonstration de l'interface.
=======
- Le modèle a été entraîné sur un jeu de données limité (2599 images, 6
  classes) ; les résultats sont présentés comme une **identification
  assistée / maladie probable**, pas comme un diagnostic médical définitif.
>>>>>>> 8caf4bb2 (deuxieme commit)
- La base de connaissances des maladies (`diseases.js`) couvre volontairement
  un nombre restreint de classes pour rester réalisable en une journée de
  hackathon.
- L'extraction vidéo se limite à une seule frame ; il ne s'agit pas d'une
  analyse temporelle réelle.
<<<<<<< HEAD
=======
- Le modèle n'a pas été testé sur des photos prises dans des conditions
  d'éclairage ou de fond très différentes du jeu d'entraînement.
>>>>>>> 8caf4bb2 (deuxieme commit)
