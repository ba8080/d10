import { Activity, ArrowLeft, ArrowUpRight, BatteryCharging, Check, CircleAlert, Gauge, MapPin, Wrench, SearchCheck, Wallet } from 'lucide-react';

/** Editorial feature cards: illustrative data, not connected to a real car. */
export function StudioOverview() {
  return (
    <section className="studio-overview" aria-labelledby="studio-overview-title">
      <div className="shell">
        <div className="studio-overview-heading">
          <div>
            <span className="studio-section-kicker">FROM ERROR CODE TO ACTION</span>
            <h2 id="studio-overview-title">לא רק מה התקלקל.<br /><span>גם מה עושים עכשיו.</span></h2>
          </div>
          <p>הסבר חכם, גורמים אפשריים, הצעות לתיקון, טווחי עלויות וחיפוש מוסכים — במקום אחד. ככה נראית דיאגנוסטיקה שמדברת בשפה שלך.</p>
        </div>
        <div className="studio-bento">
          <article className="studio-bento-card studio-bento-diagnostic">
            <div className="studio-diagnostic-intro">
              <div className="studio-card-heading">
                <span className="studio-card-icon"><CircleAlert size={22} aria-hidden="true" /></span>
                <span className="studio-card-number">01 / AI DIAGNOSTICS</span>
              </div>
              <h3>התקלה היא רק ההתחלה.<br /><span>אנחנו נותנים את התמונה המלאה.</span></h3>
              <p>לא עוד קוד מסתורי וחיפוש בגוגל. D10 AI עוזר לך להבין מה המשמעות, מה יכול היה לגרום לתקלה, מה עושים עכשיו וכמה התיקון עשוי לעלות.</p>
              <div className="studio-diagnostic-promises">
                <span><Check size={17} aria-hidden="true" /> הסבר ברור על התקלה</span>
                <span><Check size={17} aria-hidden="true" /> גורמים אפשריים ודרכי תיקון</span>
                <span><Check size={17} aria-hidden="true" /> טווחי מחירים משוערים</span>
                <span><Check size={17} aria-hidden="true" /> חיפוש מוסכים באזור שלך</span>
              </div>
            </div>
            <div className="studio-diagnostic-preview" aria-label="הדגמה מפורטת של ניתוח קוד תקלה באפליקציה">
              <div className="studio-preview-top">
                <span><SearchCheck size={16} aria-hidden="true" /> ניתוח תקלה לדוגמה</span>
                <span dir="ltr">D10 AI</span>
              </div>
              <div className="studio-diagnostic-result">
                <div className="studio-preview-code"><span dir="ltr">P0420</span><small>מומלץ לאבחן במוסך</small></div>
                <strong>יעילות הממיר הקטליטי נמוכה מהמצופה</strong>
                <p>הרכב מזהה שמערכת הפחתת הפליטות לא פועלת ביעילות המצופה. זה לא בהכרח אומר שצריך להחליף ממיר.</p>
              </div>
              <div className="studio-diagnostic-details">
                <section>
                  <h4><CircleAlert size={16} aria-hidden="true" /> למה זה יכול לקרות?</h4>
                  <ul><li>דליפה במערכת הפליטה</li><li>חיישן חמצן לא תקין</li><li>ממיר קטליטי שהתבלה או בעיה בפעולת המנוע</li></ul>
                </section>
                <section>
                  <h4><Wrench size={16} aria-hidden="true" /> איך מתקדמים לתיקון?</h4>
                  <p>קודם בודקים קודי תקלה נוספים, נזילות וקריאות חיישני חמצן. מחליפים רכיב רק אחרי שאובחן הגורם האמיתי.</p>
                </section>
              </div>
              <div className="studio-diagnostic-costs">
                <h4><Wallet size={17} aria-hidden="true" /> כמה זה עשוי לעלות בישראל?</h4>
                <div><span>אבחון במוסך</span><strong dir="ltr">₪250–600</strong></div>
                <div><span>החלפת חיישן חמצן</span><strong dir="ltr">₪600–1,400</strong></div>
                <div><span>ממיר קטליטי — מחיר החלק</span><strong dir="ltr">₪1,500–7,000+</strong></div>
                <small>טווחים להמחשה בלבד; העלות תלויה ברכב, בסוג החלק, בעבודה ובמע״מ. אין כאן אבחון אישי או הצעת מחיר.</small>
              </div>
              <a className="studio-diagnostic-garages" href="https://www.google.com/maps/search/?api=1&query=%D7%9E%D7%95%D7%A1%D7%9A%20%D7%93%D7%99%D7%90%D7%92%D7%A0%D7%95%D7%A1%D7%98%D7%99%D7%A7%D7%94%20%D7%A8%D7%9B%D7%91" target="_blank" rel="noopener noreferrer">
                <MapPin size={18} aria-hidden="true" /> חיפוש מוסכי דיאגנוסטיקה קרובים <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <p className="studio-diagnostic-disclaimer">המחשה של יכולות האפליקציה, לא סריקה אמיתית. כפתור המוסכים פותח חיפוש ב־Google Maps.</p>
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
