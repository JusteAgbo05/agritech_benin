# Intégration du modèle entraîné — Agritech Bénin

Ce projet fait l'inférence **directement dans le navigateur** via TensorFlow.js
(`@tensorflow/tfjs`, déjà dans `package.json`) — pas de serveur Python à héberger.
`src/lib/predict.js` a déjà été mis à jour pour charger et utiliser votre modèle ;
il ne reste que la conversion et le dépôt des fichiers.

## 1. Convertir votre modèle en TensorFlow.js

Votre zip contient `config.json` + `metadata.json` + `model.weights.h5` : c'est
le contenu interne d'un fichier Keras 3 (`.keras`), qui est un zip renommé.

Sur la machine où vous avez ce zip (ou dans un notebook Colab) :

```bash
pip install tensorflowjs

python - <<'EOF'
import tensorflow as tf
model = tf.keras.models.load_model("model.keras")  # votre zip renommé en .keras
model.save("model_legacy.h5")                       # ré-export au format .h5 classique
EOF

tensorflowjs_converter --input_format=keras model_legacy.h5 model_tfjs
```

Si `tf.keras.models.load_model("model.keras")` échoue directement sur votre
zip, dézippez-le et rechargez-le en pointant vers le dossier obtenu plutôt
que vers un fichier unique — le chargeur Keras accepte les deux formes.

Vous obtenez dans `model_tfjs/` :
- `model.json`
- un ou plusieurs `group1-shard...of....bin`

## 2. Déposer les fichiers dans le projet

Copiez tout le contenu de `model_tfjs/` dans :

```
public/model/
  model.json
  group1-shard1of1.bin
  ... (les autres shards éventuels)
```

`public/` est servi tel quel par Vite : le fichier sera donc accessible à
l'URL `/model/model.json`, exactement ce que charge `predict.js`.

## 3. Vérifier deux réglages dans `src/lib/predict.js`

- **`IMG_SIZE`** : doit correspondre à la taille d'image utilisée à
  l'entraînement (souvent 224, parfois 150 ou 256 — regardez votre code Colab).
- **`PREPROCESS`** : `'0..1'` si vous avez normalisé vous-même en divisant par
  255 ; `'-1..1'` si vous avez utilisé `preprocess_input` de MobileNetV2 ou
  EfficientNet dans votre architecture. Une mauvaise valeur ici donne des
  prédictions cohérentes en apparence mais fausses — à tester en priorité.

## 4. Lancer et tester

```bash
npm install
npm run dev
```

Ouvrez l'appli, sélectionnez la bonne culture (Tomate / Maïs), envoyez une
photo dont vous connaissez déjà le diagnostic attendu, et vérifiez le résultat
et le pourcentage de confiance affichés.

## Changement important par rapport à la version précédente

`src/lib/diseases.js` a été mis à jour pour correspondre exactement aux 6
classes que votre modèle prédit :

- Maïs : sain, rouille commune, helminthosporiose, **cercosporiose** (nouvelle)
- Tomate : sain, mildiou — **le flétrissement bactérien a été retiré**, votre
  modèle actuel ne le reconnaît pas. Si vous voulez le récupérer, il faudra
  ré-entraîner en incluant des images de cette maladie.
