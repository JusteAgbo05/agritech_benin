// Base de connaissances : classes de maladies par culture et recommandations
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
}

export const CULTURES = [
  { id: 'tomate', label: 'Tomate' },
  { id: 'mais', label: 'Maïs' },
]
