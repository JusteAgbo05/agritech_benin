// Base de connaissances : classes de maladies par culture et recommandations
<<<<<<< HEAD
// associées. Ces classes correspondent exactement aux 6 sorties du modèle
// entraîné (voir src/lib/predict.js et public/model/class_names.json).
//
// ⚠️ Par rapport à la version précédente : le modèle ne prédit pas de
// "flétrissement bactérien" sur tomate — cette classe a été retirée. Il
// prédit en revanche la cercosporiose sur maïs, absente avant. À affiner
// avec un agronome partenaire si possible avant la démo finale.

export const DISEASES = {
  tomate: [
    {
      id: 'tomato_healthy',
      label: 'Plant sain',
      severity: 'sain',
      description: "Aucun signe visible de maladie sur la feuille analysée.",
      recommendation:
        "Continuez la surveillance régulière du champ, surtout après de fortes pluies.",
    },
    {
      id: 'tomato_late_blight',
      label: 'Mildiou (Phytophthora infestans)',
      severity: 'élevée',
      description:
        "Taches brun-vert huileuses sur les feuilles, se propageant vite par temps humide.",
      recommendation:
        "Retirez et détruisez les feuilles atteintes, espacez davantage les plants pour aérer, évitez l'arrosage par aspersion le soir. Un fongicide à base de cuivre (bouillie bordelaise) est une option accessible localement.",
    },
  ],
  mais: [
    {
      id: 'maize_healthy',
      label: 'Plant sain',
      severity: 'sain',
      description: "Aucun signe visible de maladie sur la feuille analysée.",
      recommendation:
        "Continuez la surveillance régulière du champ, surtout en début de saison des pluies.",
    },
    {
      id: 'maize_common_rust',
      label: 'Rouille commune du maïs',
      severity: 'moyenne',
      description:
        "Petites pustules orangées à brunes sur les deux faces de la feuille.",
      recommendation:
        "Favorisez les variétés locales tolérantes si disponibles, espacez les plants pour réduire l'humidité au niveau du feuillage. Traitement fongicide rarement nécessaire sauf attaque sévère.",
    },
    {
      id: 'maize_northern_leaf_blight',
      label: 'Helminthosporiose (taches foliaires)',
      severity: 'moyenne',
      description:
        "Lésions allongées brun grisâtre le long des nervures des feuilles.",
      recommendation:
        "Éliminez les résidus de récolte infectés après la saison, pratiquez la rotation avec une culture non céréalière, privilégiez des semences certifiées la saison suivante.",
    },
    {
      id: 'maize_cercospora',
      label: 'Cercosporiose du maïs',
      severity: 'moyenne',
      description:
        "Petites taches rectangulaires gris-brun bien délimitées, souvent groupées, entre les nervures.",
      recommendation:
        "Alternez les cultures d'une saison à l'autre, éliminez les résidus de culture infectés et privilégiez des variétés résistantes si disponibles localement.",
    },
  ],
=======
// associées. À affiner avec un agronome partenaire si possible avant la
// démo finale — ces textes sont un point de départ, pas une validation
// scientifique définitive.

// Base de connaissances : classes de maladies et recommandations associées.
// À affiner avec un agronome partenaire si possible avant la démo finale —
// ces textes sont un point de départ, pas une validation scientifique
// définitive.
//
// IMPORTANT : les clés de MODEL_CLASSES doivent correspondre EXACTEMENT,
// dans le MÊME ORDRE, à class_names.txt fourni par l'équipe ML. C'est cet
// ordre qui permet de faire correspondre l'index de sortie du modèle
// (0 à 5) au bon nom de classe.

export const MODEL_CLASSES = [
  'maize_cercospora',
  'maize_common_rust',
  'maize_healthy',
  'maize_northern_leaf_blight',
  'tomato_healthy',
  'tomato_late_blight',
]

export const DISEASE_INFO = {
  maize_cercospora: {
    id: 'maize_cercospora',
    label: 'Cercosporiose du maïs (taches grises)',
    severity: 'moyenne',
    description:
      "Taches rectangulaires gris-brun allongées le long des nervures des feuilles, pouvant fusionner en cas de forte attaque.",
    recommendation:
      "Éliminez les résidus de récolte infectés après la saison, pratiquez la rotation avec une culture non céréalière, et espacez davantage les plants pour améliorer l'aération du feuillage.",
  },
  maize_common_rust: {
    id: 'maize_common_rust',
    label: 'Rouille commune du maïs',
    severity: 'moyenne',
    description:
      "Petites pustules brun-rouille sur les deux faces de la feuille, visibles dès qu'on frotte la surface.",
    recommendation:
      "Favorisez les variétés locales tolérantes si disponibles. Un traitement fongicide est rarement nécessaire sauf attaque sévère en début de cycle.",
  },
  maize_healthy: {
    id: 'maize_healthy',
    label: 'Plant de maïs sain',
    severity: 'sain',
    description: "Aucun signe visible de maladie sur la feuille analysée.",
    recommendation:
      "Continuez la surveillance régulière du champ, surtout en début de saison des pluies.",
  },
  maize_northern_leaf_blight: {
    id: 'maize_northern_leaf_blight',
    label: 'Helminthosporiose du maïs',
    severity: 'élevée',
    description:
      "Grandes lésions elliptiques gris-brun le long des nervures, pouvant couvrir une large surface de la feuille en cas de forte humidité.",
    recommendation:
      "Retirez les feuilles très atteintes, privilégiez des semences certifiées la saison suivante, et pratiquez la rotation des cultures. Une attaque précoce et sévère peut justifier un fongicide adapté.",
  },
  tomato_healthy: {
    id: 'tomato_healthy',
    label: 'Plant de tomate sain',
    severity: 'sain',
    description: "Aucun signe visible de maladie sur la feuille analysée.",
    recommendation:
      "Continuez la surveillance régulière du champ, surtout après de fortes pluies.",
  },
  tomato_late_blight: {
    id: 'tomato_late_blight',
    label: 'Mildiou de la tomate (Phytophthora infestans)',
    severity: 'élevée',
    description:
      "Taches brun-vert huileuses sur les feuilles, se propageant très vite par temps humide et pouvant détruire une parcelle entière en quelques jours.",
    recommendation:
      "Retirez et détruisez les feuilles atteintes, espacez davantage les plants pour aérer, évitez l'arrosage par aspersion le soir. Un fongicide à base de cuivre (bouillie bordelaise) est une option accessible localement.",
  },
}

// Regroupement par culture pour l'affichage dans l'interface (sélecteur
// Tomate / Maïs). Reconstruit à partir de MODEL_CLASSES pour rester
// toujours cohérent avec le modèle.
export const DISEASES = {
  mais: MODEL_CLASSES.filter((c) => c.startsWith('maize')).map((c) => DISEASE_INFO[c]),
  tomate: MODEL_CLASSES.filter((c) => c.startsWith('tomato')).map((c) => DISEASE_INFO[c]),
>>>>>>> 8caf4bb2 (deuxieme commit)
}

export const CULTURES = [
  { id: 'tomate', label: 'Tomate' },
  { id: 'mais', label: 'Maïs' },
]
