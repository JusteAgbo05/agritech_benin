// Base de connaissances : classes de maladies par culture et recommandations
// associées. À affiner avec un agronome partenaire si possible avant la
// démo finale — ces textes sont un point de départ, pas une validation
// scientifique définitive.

export const DISEASES = {
  tomate: [
    {
      id: 'tomate_saine',
      label: 'Plant sain',
      severity: 'sain',
      description: "Aucun signe visible de maladie sur la feuille analysée.",
      recommendation:
        "Continuez la surveillance régulière du champ, surtout après de fortes pluies.",
    },
    {
      id: 'tomate_mildiou',
      label: 'Mildiou (Phytophthora infestans)',
      severity: 'élevée',
      description:
        "Taches brun-vert huileuses sur les feuilles, se propageant vite par temps humide.",
      recommendation:
        "Retirez et détruisez les feuilles atteintes, espacez davantage les plants pour aérer, évitez l'arrosage par aspersion le soir. Un fongicide à base de cuivre (bouillie bordelaise) est une option accessible localement.",
    },
    {
      id: 'tomate_fletrissement',
      label: 'Flétrissement bactérien',
      severity: 'élevée',
      description:
        "Flétrissement soudain des feuilles sans jaunissement préalable, souvent en journée chaude.",
      recommendation:
        "Retirez immédiatement les plants atteints pour limiter la propagation (maladie difficile à traiter une fois installée). Pratiquez la rotation des cultures la saison suivante et évitez de replanter des solanacées sur la même parcelle.",
    },
  ],
  mais: [
    {
      id: 'mais_sain',
      label: 'Plant sain',
      severity: 'sain',
      description: "Aucun signe visible de maladie sur la feuille analysée.",
      recommendation:
        "Continuez la surveillance régulière du champ, surtout en début de saison des pluies.",
    },
    {
      id: 'mais_rouille',
      label: 'Rouille du maïs',
      severity: 'moyenne',
      description:
        "Petites pustules orangées à brunes sur les deux faces de la feuille.",
      recommendation:
        "Favorisez les variétés locales tolérantes si disponibles, espacez les plants pour réduire l'humidité au niveau du feuillage. Traitement fongicide rarement nécessaire sauf attaque sévère.",
    },
    {
      id: 'mais_helminthosporiose',
      label: 'Helminthosporiose (taches foliaires)',
      severity: 'moyenne',
      description:
        "Lésions allongées brun grisâtre le long des nervures des feuilles.",
      recommendation:
        "Éliminez les résidus de récolte infectés après la saison, pratiquez la rotation avec une culture non céréalière, privilégiez des semences certifiées la saison suivante.",
    },
  ],
}

export const CULTURES = [
  { id: 'tomate', label: 'Tomate' },
  { id: 'mais', label: 'Maïs' },
]
