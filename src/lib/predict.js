import { DISEASES } from './diseases'

// ---------------------------------------------------------------------
// SIMULATEUR DE PRÉDICTION — À REMPLACER PAR LE VRAI MODÈLE TF.js
// ---------------------------------------------------------------------
// Ce fichier isole toute la logique de prédiction dans une seule fonction
// asynchrone : `predict(imageElement, cultureId)`. Tant que le modèle
// entraîné (tomate + maïs, export TensorFlow.js) n'est pas prêt, cette
// fonction simule un résultat réaliste avec un léger délai, pour que
// toute l'interface (upload, affichage, garde-fou de confiance) soit
// développée et testée indépendamment de l'équipe ML.
//
// QUAND LE MODÈLE SERA PRÊT :
// 1. `npm install @tensorflow/tfjs` (déjà dans package.json)
// 2. Placer les fichiers du modèle exporté dans /public/model/
//    (model.json + fichiers .bin générés par tensorflowjs_converter)
// 3. Charger le modèle une fois au démarrage :
//      import * as tf from '@tensorflow/tfjs'
//      const model = await tf.loadLayersModel('/model/model.json')
// 4. Remplacer le corps de `predict()` ci-dessous par :
//      const tensor = tf.browser.fromPixels(imageElement)
//        .resizeNearestNeighbor([224, 224])
//        .expandDims(0)
//        .div(255.0)
//      const output = model.predict(tensor)
//      const scores = await output.data()
//      // puis mapper l'index de score le plus élevé vers DISEASES[cultureId][i]
// ---------------------------------------------------------------------

const SIMULATED_LATENCY_MS = 1400

/**
 * @param {HTMLImageElement | HTMLVideoElement | HTMLCanvasElement} _imageElement
 * @param {'tomate' | 'mais'} cultureId
 * @returns {Promise<{ diseaseId: string, confidence: number }>}
 */
export async function predict(_imageElement, cultureId) {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS))

  const options = DISEASES[cultureId]
  if (!options) {
    throw new Error(`Culture inconnue : ${cultureId}`)
  }

  // Simulation : on favorise légèrement les classes "maladie" pour que la
  // démo montre le comportement complet de l'interface (recommandation +
  // garde-fou), mais le résultat reste aléatoire à chaque analyse.
  const weighted = options.filter((d) => d.severity !== 'sain')
  const pickDisease =
    Math.random() < 0.75
      ? weighted[Math.floor(Math.random() * weighted.length)]
      : options.find((d) => d.severity === 'sain')

  // Confiance simulée entre 0.45 et 0.97 pour exercer aussi le cas
  // "résultat incertain" du garde-fou de confiance.
  const confidence = 0.45 + Math.random() * 0.52

  return {
    diseaseId: pickDisease.id,
    confidence: Math.round(confidence * 100) / 100,
  }
}

export const CONFIDENCE_THRESHOLD = 0.65
