import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowLeft, ArrowDown, ScanLine, Layers3, Pause, Play, Move3D, Check, Languages, CreditCard, Truck, ShieldCheck, Activity, Bluetooth } from 'lucide-react';

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
      const value = Math.min(100, Math.round((performance.now() - started) / 42));
      setProgress(value);
      if (value >= 100) setScanning(false);
    }, 80);
    return () => window.clearInterval(timer);
  }, [scanning]);
  const scan = () => { setProgress(0); setScanning(true); };
  return <>
    <section className={`tech-hero ${scanning ? 'is-scanning' : ''} ${paused ? 'motion-paused' : ''}`} aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" /><div className="hero-ambient ambient-violet" aria-hidden="true" /><div className="hero-ambient ambient-mint" aria-hidden="true" />
      <div className="hero-shell shell">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="hero-line"/><span dir="ltr">THE NEXT LEVEL OF CAR INTELLIGENCE</span></div>
          <h1 id="hero-title">הרכב שלך.<br/><span className="hero-word-gradient">עכשיו מחובר</span><br/>אליך.</h1>
          <p>פחות לנחש. יותר לדעת. מתאם <bdi>D10 AI</bdi> ואפליקציה בעברית שמחברים אותך למידע של הרכב, ומתרגמים קודי תקלות להבנה.</p>
          <div className="hero-actions"><a href="#pricing" className="button button-primary hero-buy">לשדרוג שלי <ArrowLeft size={20}/></a><div className="hero-price"><strong dir="ltr">₪299</strong><span>מתאם + אפליקציה. בלי מנוי.</span></div></div>
          <a className="hero-secondary" href="#features">לגלות מה אפשר לעשות <ArrowDown size={15}/></a>
          <div className="hero-tags"><span><Check size={13}/> משלוח חינם</span><span><Check size={13}/> שנה אחריות</span><span><Check size={13}/> עברית מלאה</span></div>
        </div>
        <div className={`hero-visual ${exploded?'is-exploded':''}`}>
          <span className="hero-watermark" aria-hidden="true" dir="ltr">D10</span>
          <div className="scene-topline"><span className="scene-mode" dir="ltr"><span/> {exploded?'INSIDE THE INTELLIGENCE':'D10 AI / INTERACTIVE 3D'}</span><button className="scene-motion" onClick={()=>setPaused(!paused)} aria-label={paused?'הפעלת תנועה אוטומטית':'עצירת תנועה אוטומטית'} aria-pressed={paused}>{paused?<Play size={14}/>:<Pause size={14}/>}</button></div>
          <div className="scene-mount">
            <Suspense fallback={<div className="scene-loading"><span className="scene-loading-orbit"/><span>טוענים את חוויית התלת־ממד</span></div>}><DeviceScene exploded={exploded} scanning={scanning} paused={paused} onReady={()=>setReady(true)}/></Suspense>
          </div>
          <div className="scene-data data-connection" aria-hidden="true"><span className="data-icon"><Bluetooth size={17}/></span><div><span dir="ltr">CONNECTED INTELLIGENCE</span><strong>הכול מתחבר.</strong></div><span className="data-pulse"/></div>
          <div className="scene-data data-diagnostics" aria-hidden="true"><div className="data-wave"><Activity size={22}/></div><div><span dir="ltr">YOUR CAR. DECODED.</span><strong>כל נתון. בשפה שלך.</strong></div></div>
          <div className="scene-bottom"><span><Move3D size={15}/>{ready?'גררו כדי לסובב ב־360°':'תצוגת מוצר אינטראקטיבית'}</span><span className="scene-illustration">{exploded?'מבנה פנימי להמחשה בלבד':'המחשה תלת־ממדית'}</span></div>
          <div className="scene-controls" aria-label="פעולות הדגמת המוצר">
            <button onClick={()=>setExploded(!exploded)} disabled={!ready} aria-pressed={exploded}><Layers3 size={16}/>{exploded?'לסגור את המכשיר':'להציץ פנימה'}<span dir="ltr">01</span></button>
            <button onClick={scan} disabled={scanning || !ready} className={scanning?'active':''}><ScanLine size={16}/>{scanning?`סורקים… ${progress}%`:'להפעיל סריקת דמו'}<span dir="ltr">02</span></button>
          </div>
          <div className="scan-feedback" aria-live="polite" aria-atomic="true">
            {progress===100?<span><Check size={13}/> ההדמיה הושלמה. <a href="#features">גלו את התשובות באפליקציה <ArrowLeft size={12}/></a></span>:<span>הדגמה בלבד · לא מתבצע חיבור לרכב</span>}
          </div>
          <div className="scan-progress" aria-hidden="true"><span style={{width:`${progress}%`}}/></div>
        </div>
      </div>
      <div className="hero-footer shell"><span dir="ltr">SMALL DEVICE. BIG INTELLIGENCE.</span><a href="#features" aria-label="המשך ליכולות המוצר"><ArrowDown size={17}/></a><span dir="ltr">ENGINEERED FOR CLARITY / 2026</span></div>
    </section>
    <div className="trust-strip shell">
      {[{Icon:Languages,title:'בשפה שלך',text:'ממשק והסברים בעברית'},{Icon:CreditCard,title:'קונים פעם אחת',text:'בלי דמי מנוי חודשיים'},{Icon:Truck,title:'משלוח חינם',text:'עד הבית, ברחבי ישראל'},{Icon:ShieldCheck,title:'שנה אחריות',text:'על פגמי ייצור'}].map(({Icon,title,text})=><div className="trust-item" key={title}><Icon size={22} strokeWidth={1.5}/><div><b>{title}</b><span>{text}</span></div></div>)}
    </div>
  </>;
}
