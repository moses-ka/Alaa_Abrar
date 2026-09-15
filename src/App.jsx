import { useRef, useState } from 'react'

function App() {
  const videoRef = useRef(null)
  const detailsVideoRef = useRef(null)
  const [activeScene, setActiveScene] = useState(1)

  const showDetailsScene = () => {
    if (activeScene === 2) return

    const detailsVideo = detailsVideoRef.current
    if (detailsVideo) {
      detailsVideo.currentTime = 0
      detailsVideo.play().catch(() => {})
    }
    setActiveScene(2)
  }

  const handleTimeUpdate = (event) => {
    const video = event.currentTarget
    if (video.duration && video.currentTime >= video.duration - 0.65) {
      video.pause()
      showDetailsScene()
    }
  }

  return (
    <main className="invitation-site">
      <section className={`invitation-page ${activeScene === 2 ? 'invitation-page--leaving' : ''}`} aria-label="دعوة الخطوبة" aria-hidden={activeScene === 2}>
        <div className="opening-film">
          <video ref={videoRef} autoPlay muted playsInline preload="auto" poster="./media/floral-opening-poster.jpg" onTimeUpdate={handleTimeUpdate} onEnded={showDetailsScene}>
            <source src="./media/floral-opening.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="invitation-mark">
          <div className="intro-block">
            <p className="invitation-intro blur-reveal reveal-basmala">بسم الله الرحمن الرحيم</p>
            <p className="invitation-verse blur-reveal reveal-verse">ومن آياته أن خلق لكم من أنفسكم أزواجا لتسكنوا إليها وجعل بينكم مودة ورحمة</p>
          </div>

          <div className="host-position">
            <div className="host-copy blur-reveal reveal-host">
              <p className="invitation-lead">يتشرّف السيد</p>
              <h1 className="host-name">كاظم محسن</h1>
            </div>
          </div>

          <div className="invitation-body">
            <p className="blessing-line blur-reveal reveal-blessing">بحضوركم تكتمل أفراحنا وتشرق أنوارنا</p>
          </div>
        </div>
      </section>

      <section className={`details-page ${activeScene === 2 ? 'details-page--active' : ''}`} aria-label="تفاصيل حفل الخطوبة" aria-hidden={activeScene !== 2}>
        <video ref={detailsVideoRef} muted loop playsInline preload="auto" poster="./media/floral-details-poster.jpg">
          <source src="./media/floral-details.mp4" type="video/mp4" />
        </video>

        <div className="details-copy">
          <p className="details-invitation details-reveal">بدعوتكم لحضور حفل خطوبة</p>
          <div className="couple-lockup details-reveal details-couple">
            <div className="person"><span>نجله</span><strong className="principal-name">علاء</strong></div>
            <span className="couple-connector">و</span>
            <div className="person"><span>الآنسة</span><strong className="principal-name">أبرار</strong></div>
          </div>
          <div className="ceremony-meta details-reveal details-meta">
            <p className="ceremony-note">وذلك بمشيئة الله تعالى</p>
            <time className="ceremony-date" dateTime="2026-09-19">السبت ١٩ سبتمبر ٢٠٢٦</time>
          </div>
          <button className="location-button details-reveal details-button" type="button" disabled aria-label="سيتم إضافة موقع الحفل لاحقاً">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>
            <span>موقع الحفل</span>
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
