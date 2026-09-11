import { CONFIDENCE_THRESHOLD } from '../lib/predict'

<<<<<<< HEAD
export default function DiagnosisResult({ imageSrc, disease, confidence }) {
  const isLowConfidence = confidence < CONFIDENCE_THRESHOLD
  const isHealthy = disease.severity === 'sain'
  const confidencePct = Math.round(confidence * 100)
=======
const CULTURE_LABEL = { tomate: 'tomate', mais: 'maïs' }

export default function DiagnosisResult({ imageSrc, disease, confidence, cultureMismatch }) {
  const isLowConfidence = confidence < CONFIDENCE_THRESHOLD
  const isHealthy = disease.severity === 'sain'
  const confidencePct = Math.round(confidence * 100)
  const predictedCulture = disease.id.startsWith('maize') ? 'mais' : 'tomate'
>>>>>>> 8caf4bb2 (deuxieme commit)

  return (
    <section className="result" aria-live="polite">
      <div className="result__media">
        <img src={imageSrc} alt="Feuille analysée" />
      </div>

      <div className="result__body">
        <span className={`result__badge result__badge--${disease.severity}`}>
          {isHealthy ? 'Sain' : `Sévérité ${disease.severity}`}
        </span>

<<<<<<< HEAD
=======
        <p className="result__eyebrow">Identification assistée — maladie probable</p>
>>>>>>> 8caf4bb2 (deuxieme commit)
        <h3 className="result__title">{disease.label}</h3>
        <p className="result__description">{disease.description}</p>

        <div className="result__confidence">
          <div className="result__confidence-row">
            <span>Confiance du modèle</span>
            <span>{confidencePct}%</span>
          </div>
          <div className="result__confidence-bar">
            <div
              className="result__confidence-fill"
              style={{ width: `${confidencePct}%` }}
            />
          </div>
        </div>

<<<<<<< HEAD
=======
        {cultureMismatch && (
          <div className="result__warning" role="alert">
            <strong>Culture différente détectée.</strong> Vous aviez sélectionné une autre
            culture, mais le modèle identifie plutôt un plant de {CULTURE_LABEL[predictedCulture]}.
            Vérifiez la photo, ou changez la culture sélectionnée en haut de page avant de
            vous fier au résultat.
          </div>
        )}

>>>>>>> 8caf4bb2 (deuxieme commit)
        {isLowConfidence && (
          <div className="result__warning" role="alert">
            <strong>Résultat incertain.</strong> La confiance est en dessous du seuil
            recommandé. Reprenez la photo avec un meilleur éclairage et un cadrage net
<<<<<<< HEAD
            sur la feuille, ou faites confirmer le diagnostic par un agent CARDER/ATDA
=======
            sur la feuille, ou faites confirmer l'identification par un agent CARDER/ATDA
>>>>>>> 8caf4bb2 (deuxieme commit)
            avant tout traitement.
          </div>
        )}

        <div className="result__recommendation">
          <h4>Recommandation</h4>
          <p>{disease.recommendation}</p>
        </div>

        <p className="result__disclaimer">
<<<<<<< HEAD
          Ce diagnostic est une aide à la décision basée sur un modèle d'IA entraîné sur
          un jeu de données limité. Il ne remplace pas l'avis d'un agronome pour les cas
          sévères ou incertains.
=======
          Ceci est une identification assistée par IA — une maladie probable, pas un
          diagnostic définitif. Le modèle a été entraîné sur un jeu de données limité
          (2599 images, 93,5 % de précision sur le jeu de test). Il ne remplace pas
          l'avis d'un agronome, en particulier pour les cas sévères ou incertains.
>>>>>>> 8caf4bb2 (deuxieme commit)
        </p>
      </div>
    </section>
  )
}
