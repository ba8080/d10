import { Activity, ArrowLeft, BatteryCharging, Check, CircleAlert, Gauge, HeartPulse, Wrench } from 'lucide-react';

/** Editorial feature cards: illustrative data, not connected to a real car. */
export function StudioOverview() {
  return (
    <section className="studio-overview" aria-labelledby="studio-overview-title">
      <div className="shell">
        <div className="studio-overview-heading">
          <div>
            <span className="studio-section-kicker">SMARTER DRIVING, SIMPLIFIED</span>
            <h2 id="studio-overview-title">יותר להבין.<br /><span>פחות לנחש.</span></h2>
          </div>
          <p>המידע שהיה שמור בתוך הרכב, עכשיו הופך לתשובות שקל להבין. שלוש יכולות שעושות הבדל ביומיום.</p>
        </div>
        <div className="studio-bento">
          <article className="studio-bento-card studio-bento-diagnostic">
            <div className="studio-card-heading">
              <span className="studio-card-icon"><CircleAlert size={22} aria-hidden="true" /></span>
              <span className="studio-card-number">01 / DIAGNOSTICS</span>
            </div>
            <h3>לא רק קוד תקלה.<br />גם הסיפור שמאחוריו.</h3>
            <p>מבינים בעברית את הקוד שהרכב מדווח, ומה כדאי לברר בבדיקה מקצועית.</p>
            <div className="studio-diagnostic-preview" aria-label="דוגמה להמחשת הסבר קוד תקלה">
              <div className="studio-preview-top"><span><CircleAlert size={15} aria-hidden="true" /> דוח אבחון לדוגמה</span><span dir="ltr">D10 AI</span></div>
              <div className="studio-preview-code"><span dir="ltr">P0420</span><small>קוד לדוגמה</small></div>
              <strong>יעילות מערכת הממיר</strong>
              <p>כדאי לבדוק את הגורם לתקלה עם איש מקצוע לפני שמחליפים חלקים.</p>
              <span className="studio-preview-note"><Check size={15} aria-hidden="true" /> הסבר פשוט, בלי מילון מכונאים</span>
            </div>
          </article>
          <article className="studio-bento-card studio-bento-live">
            <div className="studio-card-heading"><span className="studio-card-icon"><Activity size={22} aria-hidden="true" /></span><span className="studio-card-number">02 / LIVE DATA</span></div>
            <h3>הנתונים שלך.<br />במבט אחד.</h3>
            <p>נתוני מנוע ומצבר זמינים בתצוגה ברורה, בהתאם לתמיכת הרכב.</p>
            <div className="studio-data-preview" aria-label="דוגמה לנתוני רכב">
              <div className="studio-data-preview-top"><span><BatteryCharging size={16} aria-hidden="true" /> מתח מצבר · דוגמה</span><small>VOLTAGE</small></div>
              <div className="studio-data-value" dir="ltr">12.6 <small>V</small></div>
              <svg viewBox="0 0 350 72" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="studio-data-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0071e3" stopOpacity=".18"/><stop offset="100%" stopColor="#0071e3" stopOpacity="0"/></linearGradient></defs>
                <path fill="url(#studio-data-fill)" d="M0 60L26 54L52 57L78 42L104 46L130 32L156 35L182 24L208 30L234 18L260 26L286 16L312 22L350 8V72H0Z" />
                <path d="M0 60L26 54L52 57L78 42L104 46L130 32L156 35L182 24L208 30L234 18L260 26L286 16L312 22L350 8" fill="none" stroke="#0071e3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </article>
          <article className="studio-bento-card studio-bento-care">
            <div className="studio-card-heading"><span className="studio-card-icon"><Wrench size={22} aria-hidden="true" /></span><span className="studio-card-number">03 / CAR CARE</span></div>
            <h3>כל טיפול.<br />במקום הנכון.</h3>
            <p>מעקב אחר טיפולים ותזכורות, במקום אחד שקל לחזור אליו.</p>
            <div className="studio-care-preview" aria-label="דוגמה למעקב טיפולים">
              <div className="studio-care-row"><span className="studio-care-check"><Check size={15} aria-hidden="true" /></span><span><strong>החלפת שמן ומסנן</strong><small>טיפול שתועד · דוגמה</small></span></div>
              <div className="studio-care-row"><span className="studio-care-clock"><Gauge size={17} aria-hidden="true" /></span><span><strong>טיפול תקופתי</strong><small>התזכורת הבאה · דוגמה</small></span></div>
            </div>
          </article>
        </div>
        <div className="studio-overview-outro"><span>רוצים לראות את זה בפעולה?</span><a href="#features">לצפייה בחוויית האפליקציה <ArrowLeft size={17} aria-hidden="true" /></a></div>
      </div>
    </section>
  );
}
