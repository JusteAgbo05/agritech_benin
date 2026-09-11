import { useState } from 'react'
import CultureSwitch from './components/CultureSwitch'
import UploadZone from './components/UploadZone'
import DiagnosisResult from './components/DiagnosisResult'
<<<<<<< HEAD
import { DISEASES } from './lib/diseases'
=======
import { DISEASE_INFO } from './lib/diseases'
>>>>>>> 8caf4bb2 (deuxieme commit)
import { predict } from './lib/predict'

export default function App() {
  const [culture, setCulture] = useState('tomate')
  const [status, setStatus] = useState('idle') // idle | analyzing | done | error
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleCultureChange = (nextCulture) => {
    setCulture(nextCulture)
    setStatus('idle')
    setImage(null)
    setResult(null)
  }

  const handleImageReady = async (dataUrl, meta) => {
    setImage(dataUrl)
    setStatus('analyzing')
    setErrorMessage(null)

    try {
      const imgElement = await loadImageElement(dataUrl)
      const prediction = await predict(imgElement, culture)
<<<<<<< HEAD
      const disease = DISEASES[culture].find((d) => d.id === prediction.diseaseId)
      setResult({ disease, confidence: prediction.confidence, meta })
=======
      const disease = DISEASE_INFO[prediction.diseaseId]
      setResult({
        disease,
        confidence: prediction.confidence,
        cultureMismatch: prediction.cultureMismatch,
        meta,
      })
>>>>>>> 8caf4bb2 (deuxieme commit)
      setStatus('done')
    } catch (err) {
      setErrorMessage(err.message || "L'analyse a échoué. Réessayez avec une autre photo.")
      setStatus('error')
    }
  }

  const reset = () => {
    setStatus('idle')
    setImage(null)
    setResult(null)
    setErrorMessage(null)
  }

  return (
    <div className="app">
<<<<<<< HEAD
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark" aria-hidden="true" />
          <span className="app__brand-name">Agritech Bénin</span>
=======
      <div className="app__partner-banner">
        <img
          src="/logo-indabax.png"
          alt="Deep Learning IndabaX Bénin Republic × iSHEERO — Deep Learning, Intelligence Artificielle, Afrique"
          className="app__partner-logo"
        />
      </div>

      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark" aria-hidden="true" />
          <span className="app__brand-name">AgriTech Bénin</span>
>>>>>>> 8caf4bb2 (deuxieme commit)
        </div>
        <CultureSwitch value={culture} onChange={handleCultureChange} />
      </header>

      <main className="app__main">
        <section className="hero">
          <h1 className="hero__title">
<<<<<<< HEAD
            Diagnostiquez votre plant de {culture === 'tomate' ? 'tomate' : 'maïs'} en une photo
          </h1>
          <p className="hero__subtitle">
            Prenez ou importez une photo de la feuille malade. Le diagnostic s'affiche en
            quelques secondes, avec une recommandation de traitement accessible localement.
=======
            Identifiez la maladie probable de votre plant de{' '}
            {culture === 'tomate' ? 'tomate' : 'maïs'} en une photo
          </h1>
          <p className="hero__subtitle">
            Prenez ou importez une photo de la feuille. L'identification assistée par IA
            s'affiche en quelques secondes, avec une recommandation de traitement
            accessible localement. Elle complète l'avis d'un agronome, sans le remplacer.
>>>>>>> 8caf4bb2 (deuxieme commit)
          </p>
        </section>

        {status !== 'done' && (
          <UploadZone onImageReady={handleImageReady} disabled={status === 'analyzing'} />
        )}

        {status === 'analyzing' && (
          <div className="analyzing" role="status">
            <span className="analyzing__spinner" aria-hidden="true" />
            <span>Analyse de l'image en cours…</span>
          </div>
        )}

        {status === 'error' && (
          <div className="upload-zone__error" role="alert">
            {errorMessage}
          </div>
        )}

        {status === 'done' && result && (
          <>
            <DiagnosisResult
              imageSrc={image}
              disease={result.disease}
              confidence={result.confidence}
<<<<<<< HEAD
=======
              cultureMismatch={result.cultureMismatch}
>>>>>>> 8caf4bb2 (deuxieme commit)
            />
            <button type="button" className="btn btn--ghost result__reset" onClick={reset}>
              Analyser une nouvelle photo
            </button>
          </>
        )}
      </main>

      <footer className="app__footer">
        <p>
          Prototype développé pour le hackathon Deep Learning IndabaX Bénin 2026 × iSHEERO.
<<<<<<< HEAD
          Diagnostic assuré par un modèle entraîné localement, exécuté directement dans
          votre navigateur — voir <code>src/lib/predict.js</code>.
=======
          Modèle : MobileNetV2 (transfer learning), 6 classes, 93,5 % de précision sur le
          jeu de test — voir <code>src/lib/predict.js</code>.
>>>>>>> 8caf4bb2 (deuxieme commit)
        </p>
      </footer>
    </div>
  )
}

function loadImageElement(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Image illisible."))
    img.src = dataUrl
  })
}
