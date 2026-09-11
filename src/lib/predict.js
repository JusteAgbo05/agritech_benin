import * as tf from '@tensorflow/tfjs'
<<<<<<< HEAD
import { DISEASES } from './diseases'

// ---------------------------------------------------------------------
// PRÉDICTION RÉELLE — modèle TensorFlow.js chargé dans le navigateur
// ---------------------------------------------------------------------
// Prérequis avant que ce fichier fonctionne :
//   1. Convertir votre modèle Keras (model.keras) en modèle TensorFlow.js
//      — voir docs/INTEGRATION_IA.md à la racine du projet pour la commande
//      exacte de conversion.
//   2. Placer les fichiers générés (model.json + fichiers .bin) dans :
//        public/model/model.json
//        public/model/group1-shard*.bin
//   3. Vérifier IMG_SIZE ci-dessous (taille d'image utilisée à l'entraînement).
//   4. Vérifier PREPROCESS ci-dessous (normalisation des pixels utilisée à
//      l'entraînement — 0–1 par défaut ; passez à '-1..1' si votre modèle
//      utilise le preprocess_input de MobileNetV2/EfficientNet).
// ---------------------------------------------------------------------

// Ordre EXACT des classes utilisé à l'entraînement (image_dataset_from_directory
// trie les dossiers par ordre alphabétique — ne changez cet ordre que si vous
// changez aussi l'entraînement).
const MODEL_CLASS_NAMES = [
  'maize_cercospora',
  'maize_common_rust',
  'maize_healthy',
  'maize_northern_leaf_blight',
  'tomato_healthy',
  'tomato_late_blight',
]

// Doit correspondre à la taille d'entrée utilisée à l'entraînement.
const IMG_SIZE = 224

// '0..1'  -> pixels divisés par 255 (par défaut si vous avez normalisé vous-même)
// '-1..1' -> preprocess_input de MobileNetV2/EfficientNet (pixels/127.5 - 1)
const PREPROCESS = '0..1'

// Préfixe utilisé dans les noms de classes du modèle, par culture de l'interface.
const CULTURE_TO_PREFIX = {
  tomate: 'tomato',
  mais: 'maize',
}
=======
import { MODEL_CLASSES } from './diseases'

// ---------------------------------------------------------------------
// INFÉRENCE RÉELLE — MobileNetV2 + Transfer Learning
// ---------------------------------------------------------------------
// Modèle fourni par l'équipe ML : entrée 224×224×3, 6 classes, normalisation
// [-1, 1] (identique au prétraitement utilisé pendant l'entraînement).
// Accuracy validation 95,75 % / test 93,49 % sur 2599 images.
//
// ÉTAPE OBLIGATOIRE AVANT QUE CE FICHIER FONCTIONNE :
// `best_model.keras` doit être converti au format TensorFlow.js, puis placé
// dans /public/model/ :
//
//   pip install tensorflowjs
//   tensorflowjs_converter --input_format=keras \
//     best_model.keras \
//     public/model
//
// Cette commande génère public/model/model.json + un ou plusieurs fichiers
// .bin. Ne pas renommer ces fichiers ni changer leur emplacement, sinon
// loadLayersModel() ci-dessous ne les trouvera pas.
// ---------------------------------------------------------------------

const MODEL_URL = '/model/model.json'
const INPUT_SIZE = 224
>>>>>>> 8caf4bb2 (deuxieme commit)

export const CONFIDENCE_THRESHOLD = 0.65

let modelPromise = null

function loadModel() {
  if (!modelPromise) {
<<<<<<< HEAD
    modelPromise = tf.loadLayersModel('/model/model.json')
=======
    modelPromise = tf.loadGraphModel(MODEL_URL)
>>>>>>> 8caf4bb2 (deuxieme commit)
  }
  return modelPromise
}

<<<<<<< HEAD
function preprocessImage(imageElement) {
  return tf.tidy(() => {
    let tensor = tf.browser
      .fromPixels(imageElement)
      .resizeBilinear([IMG_SIZE, IMG_SIZE])
      .toFloat()

    tensor = PREPROCESS === '-1..1' ? tensor.div(127.5).sub(1) : tensor.div(255.0)

    return tensor.expandDims(0)
  })
}

/**
 * @param {HTMLImageElement | HTMLVideoElement | HTMLCanvasElement} imageElement
 * @param {'tomate' | 'mais'} cultureId
 * @returns {Promise<{ diseaseId: string, confidence: number }>}
 */
export async function predict(imageElement, cultureId) {
  const options = DISEASES[cultureId]
  if (!options) {
    throw new Error(`Culture inconnue : ${cultureId}`)
  }

  const prefix = CULTURE_TO_PREFIX[cultureId]
  const model = await loadModel()

  const inputTensor = preprocessImage(imageElement)
  let scores
  try {
    const output = model.predict(inputTensor)
    scores = await output.data()
    output.dispose()
  } finally {
    inputTensor.dispose()
  }

  // On ne considère que les classes correspondant à la culture sélectionnée
  // dans l'interface, pour rester cohérent avec le choix de l'utilisateur.
  let bestIndex = -1
  let bestScore = -Infinity
  MODEL_CLASS_NAMES.forEach((className, index) => {
    if (className.startsWith(prefix) && scores[index] > bestScore) {
      bestScore = scores[index]
      bestIndex = index
    }
  })

  if (bestIndex === -1) {
    throw new Error("Aucune classe du modèle ne correspond à cette culture.")
  }

  const diseaseId = MODEL_CLASS_NAMES[bestIndex]
  const matchesKnownDisease = options.some((d) => d.id === diseaseId)
  if (!matchesKnownDisease) {
    throw new Error("Classe prédite inconnue — vérifiez diseases.js.")
  }

  return {
    diseaseId,
    confidence: Math.round(bestScore * 100) / 100,
=======
/**
 * @param {HTMLImageElement | HTMLVideoElement | HTMLCanvasElement} imageElement
 * @param {'tomate' | 'mais'} cultureId culture sélectionnée par l'utilisateur
 *   (sert uniquement à détecter une éventuelle incohérence avec la classe
 *   prédite — le modèle, lui, classe toujours parmi les 6 classes)
 * @returns {Promise<{ diseaseId: string, confidence: number, predictedCulture: string, cultureMismatch: boolean }>}
 */
export async function predict(imageElement, cultureId) {
  const model = await loadModel()

  const logits = tf.tidy(() => {
    const tensor = tf.browser
      .fromPixels(imageElement)
      .resizeBilinear([INPUT_SIZE, INPUT_SIZE])
      .toFloat()
      .div(127.5)
      .sub(1) // normalisation [-1, 1], identique à l'entraînement
      .expandDims(0)

    return model.predict(tensor)
  })

  const scores = await logits.data()
  logits.dispose()

  let bestIndex = 0
  for (let i = 1; i < scores.length; i += 1) {
    if (scores[i] > scores[bestIndex]) bestIndex = i
  }

  const diseaseId = MODEL_CLASSES[bestIndex]
  const confidence = Math.round(scores[bestIndex] * 100) / 100
  const predictedCulture = diseaseId.startsWith('maize') ? 'mais' : 'tomate'

  return {
    diseaseId,
    confidence,
    predictedCulture,
    cultureMismatch: predictedCulture !== cultureId,
>>>>>>> 8caf4bb2 (deuxieme commit)
  }
}
