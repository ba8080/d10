import { lazy, Suspense, useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowDown, Check, CircleCheck, Layers3, Move3D,
  Pause, Play, ScanLine, ShieldCheck, Truck, Languages, CreditCard
} from 'lucide-react';

const DeviceScene = lazy(() => import('./DeviceScene'));

export function Hero() {
  const [exploded, setExploded] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!scanning) return;
    const started = performance.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, Math.round((performance.now() - started) / 40));
      setProgress(next);
      if (next === 100) setScanning(false);
    }, 80);
    return () => window.clearInterval(timer);
  }, [scanning]);

  return (
    <>
      <section className="studio-hero" aria-labelledby="hero-title">
        <div className="shell studio-hero-layout">
          <div className="studio-hero-copy">
            <span className="studio-eyebrow"><span className="studio-eyebrow-dot" /> הטכנולוגיה שנותנת לרכב שלך קול</span>
            <h1 id="hero-title">הרכב שלך.<br /><span>הרבה יותר ברור.</span></h1>
            <p className="studio-hero-lead">
              הכירו את D10 AI. מתאם קטן ואפליקציה בעברית שעוזרים להבין קודי תקלות,
              לראות נתוני רכב ולנהל טיפולים — בלי ללכת לאיבוד במונחים טכניים.
            </p>
            <div className="studio-hero-buttons">
              <a className="studio-button studio-button-primary" href="#pricing">לגלות את D10 שלי <ArrowLeft size={18} aria-hidden="true" /></a>
              <a className="studio-button studio-button-secondary" href="#features">איך זה עובד <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
            <div className="studio-hero-offer">
              <strong dir="ltr">₪299</strong>
              <span>מתאם + אפליקציה<br /><b>תשלום חד־פעמי. בלי מנוי.</b></span>
            </div>
          </div>

          <div className="studio-device-card">
            <div className="studio-device-top">
              <div className="studio-device-brand" dir="ltr"><strong>D10</strong><span>AI</span></div>
              <span className="studio-device-edition">YOUR CAR, DECODED.</span>
            </div>
            <div className="studio-device-viewer">
              <Suspense fallback={<div className="studio-device-loading" role="status"><span />טוענים את הדגם התלת־ממדי…</div>}>
                <DeviceScene exploded={exploded} scanning={scanning} paused={paused} onReady={() => setReady(true)} />
              </Suspense>
            </div>
            <div className="studio-device-bottom">
              <div className="studio-device-hint"><Move3D size={16} aria-hidden="true" /><span>{ready ? 'גררו את המתאם לסיבוב 360°' : 'המחשת מוצר אינטראקטיבית'}</span></div>
              <button type="button" className="studio-motion-button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'הפעלת תנועת המודל' : 'עצירת תנועת המודל'} aria-pressed={paused}>
                {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
              </button>
            </div>
            <div className="studio-device-controls" aria-label="התנסות בדגם המוצר">
              <button type="button" disabled={!ready} aria-pressed={exploded} onClick={() => setExploded(value => !value)}>
                <Layers3 size={17} aria-hidden="true" /> {exploded ? 'סגירת המכשיר' : 'לגלות מה בפנים'}
              </button>
              <button type="button" disabled={!ready || scanning} onClick={() => { setProgress(0); setScanning(true); }}>
                {progress === 100 && !scanning ? <CircleCheck size={17} aria-hidden="true" /> : <ScanLine size={17} aria-hidden="true" />}
                {scanning ? 'סריקה לדוגמה ' + progress + '%' : progress === 100 ? 'סריקה הושלמה · נסו שוב' : 'הדגמת סריקה'}
              </button>
            </div>
            <div className="studio-demo-caption" aria-live="polite">
              <span>{exploded ? 'המבנה הפנימי הוא להמחשה בלבד.' : 'המחשה תלת־ממדית של המוצר. הסריקה היא הדגמה בלבד.'}</span>
              <span className="studio-demo-progress" aria-hidden="true"><span style={{ width: progress + '%' }} /></span>
            </div>
          </div>
        </div>
        <div className="shell studio-trust">
          <div><Check size={16} aria-hidden="true" /><span>בלי מנוי חודשי</span></div>
          <div><Check size={16} aria-hidden="true" /><span>אפליקציה בעברית</span></div>
          <div><Check size={16} aria-hidden="true" /><span>משלוח חינם</span></div>
          <div><Check size={16} aria-hidden="true" /><span>שנה אחריות</span></div>
        </div>
      </section>
      <section className="studio-benefits" aria-label="היתרונות של D10">
        <div className="shell studio-benefits-grid">
          {[
            { Icon: Languages, name: 'פשוט להבין', detail: 'מונחים ברורים בעברית' },
            { Icon: CreditCard, name: 'שלך לתמיד', detail: 'רכישה אחת, בלי מנוי' },
            { Icon: Truck, name: 'עד הדלת', detail: 'משלוח חינם בישראל' },
            { Icon: ShieldCheck, name: 'קונים בביטחון', detail: 'שנה אחריות על פגמי ייצור' }
          ].map(({ Icon, name, detail }) => (
            <div className="studio-benefit" key={name}>
              <span className="studio-benefit-icon"><Icon size={22} strokeWidth={1.65} aria-hidden="true" /></span>
              <span><strong>{name}</strong><small>{detail}</small></span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
