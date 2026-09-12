import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowUpLeft, CarFront, Check, ChevronDown, MessageCircle, Package, PlugZap, ShieldCheck, Smartphone, Truck } from 'lucide-react';
import { FAMILY_PAYMENT_URL, SOLO_PAYMENT_URL, ULTIMATE_PAYMENT_URL, trackCheckout } from '../utils';
import '../purchase.css';

const WHATSAPP_NUMBER = '972552674465';
const generalWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('היי, אשמח לקבל פרטים על D10')}`;

type CarDetails = { brand: string; model: string; year: string; platform: string };
const emptyCar: CarDetails = { brand: '', model: '', year: '', platform: '' };

export function CompatibilitySection() {
  const [car, setCar] = useState<CarDetails>(emptyCar);
  const [requestUrl, setRequestUrl] = useState('');
  const [error, setError] = useState('');
  const requestLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (requestUrl) requestLinkRef.current?.focus({ preventScroll: true });
  }, [requestUrl]);

  const updateCar = (key: keyof CarDetails, value: string) => {
    setCar((previous) => ({ ...previous, [key]: value }));
    setRequestUrl('');
    setError('');
  };

  const prepareRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!car.brand.trim() || !car.model.trim()) {
      setError('יש למלא יצרן ודגם כדי שהצוות יוכל לבדוק התאמה.');
      return;
    }
    const message = `היי צוות D10, אשמח לבדוק התאמה לפני הזמנה.\nיצרן: ${car.brand.trim()}\nדגם: ${car.model.trim()}\nשנת ייצור: ${car.year}\nטלפון: ${car.platform}\nהאם הרכב והטלפון נתמכים, ואילו יכולות זמינות לדגם שלי?`;
    setRequestUrl(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
    setError('');
  };

  return (
    <section id="compatibility" className="ps-compatibility" dir="rtl" aria-labelledby="ps-compatibility-title">
      <div className="shell ps-compatibility-layout">
        <div className="ps-compatibility-copy">
          <span className="eyebrow">מתחילים בהתאמה</span>
          <h2 id="ps-compatibility-title" className="section-title">הרכב שלך.<br />התשובה שלנו.</h2>
          <p>כל רכב קצת אחר. שולחים לנו את פרטי הרכב והטלפון, והצוות בודק אם D10 מתאים ואילו יכולות זמינות אצלך.</p>
          <div className="ps-compatibility-detail"><CarFront size={21} aria-hidden="true" /><span>התמיכה משתנה לפי הדגם, שנת הייצור ומערכות הרכב.</span></div>
          <div className="ps-compatibility-detail"><Smartphone size={21} aria-hidden="true" /><span>נבדוק גם את התאמת האפליקציה לטלפון שלך.</span></div>
        </div>

        <form className="ps-compatibility-form" onSubmit={prepareRequest}>
          <div className="ps-form-heading"><div className="ps-terminal-line" dir="ltr" aria-hidden="true"><span className="ps-terminal-lights" /><span>VEHICLE COMPATIBILITY / 01</span></div><h3>כמה פרטים, וממשיכים ב־WhatsApp</h3></div>
          <div className="ps-form-grid">
            <label htmlFor="ps-brand">יצרן הרכב
              <input id="ps-brand" name="brand" autoComplete="off" placeholder="למשל, טויוטה" maxLength={60} required value={car.brand} onChange={(event) => updateCar('brand', event.target.value)} />
            </label>
            <label htmlFor="ps-model">דגם
              <input id="ps-model" name="model" autoComplete="off" placeholder="למשל, קורולה" maxLength={80} required value={car.model} onChange={(event) => updateCar('model', event.target.value)} />
            </label>
            <label htmlFor="ps-year">שנת ייצור
              <input id="ps-year" name="year" type="number" inputMode="numeric" min="1900" max={new Date().getFullYear() + 1} placeholder="למשל, 2020" required value={car.year} onChange={(event) => updateCar('year', event.target.value)} />
            </label>
            <label htmlFor="ps-platform">הטלפון שלך
              <span className="ps-select-wrap"><select id="ps-platform" name="platform" required value={car.platform} onChange={(event) => updateCar('platform', event.target.value)}>
                <option value="" disabled>בחירת מערכת הפעלה</option>
                <option value="iPhone (iOS)">iPhone (iOS)</option>
                <option value="Android">Android</option>
                <option value="אחר / לא בטוח">אחר / לא בטוח</option>
              </select><ChevronDown size={16} aria-hidden="true" /></span>
            </label>
          </div>
          {!requestUrl && <button className="button ps-prepare-button" type="submit">הכנת בקשת התאמה<ArrowLeft size={18} aria-hidden="true" /></button>}
          <div className="ps-form-status" aria-live="polite" aria-atomic="true">
            {error && <p className="ps-form-error">{error}</p>}
            {requestUrl && <div className="ps-request-ready">
              <p><Check size={18} aria-hidden="true" /><strong>הפרטים מוכנים. עכשיו בודקים עם הצוות.</strong></p>
              <a ref={requestLinkRef} className="button ps-whatsapp-button" href={requestUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />פתיחת הבקשה ב־WhatsApp<ArrowUpLeft size={17} aria-hidden="true" /></a>
              <span>הבקשה עדיין לא נשלחה. השליחה מתבצעת על ידך ב־WhatsApp.</span>
            </div>}
          </div>
          {!requestUrl && <p className="ps-form-note">זו פנייה לצוות, ולא בדיקת התאמה אוטומטית. כל השדות נדרשים.</p>}
        </form>
      </div>
    </section>
  );
}

const packages = [
  { id: 'solo', title: 'לרכב שלך', quantity: 1, description: 'מתאם D10 אחד + אפליקציה', price: 299, perUnit: 299, saving: 0, url: SOLO_PAYMENT_URL },
  { id: 'family', title: 'לשלושה רכבים', quantity: 3, description: '3 מתאמי D10 + אפליקציה', price: 717, perUnit: 239, saving: 180, url: FAMILY_PAYMENT_URL },
  { id: 'four', title: 'לארבעה רכבים', quantity: 4, description: '4 מתאמי D10 + אפליקציה', price: 800, perUnit: 200, saving: 396, url: ULTIMATE_PAYMENT_URL },
];
const PACKAGE_STORAGE_KEY = 'd10_selected_package';

export function PurchaseSection() {
  const [packageId, setPackageId] = useState(() => {
    try {
      const saved = window.sessionStorage.getItem(PACKAGE_STORAGE_KEY);
      if (packages.some((item) => item.id === saved)) return saved!;
    } catch { /* Selection still works when browser storage is unavailable. */ }
    return 'solo';
  });
  const selected = packages.find((item) => item.id === packageId) ?? packages[0];

  const selectPackage = (id: string) => {
    setPackageId(id);
    try {
      window.sessionStorage.setItem(PACKAGE_STORAGE_KEY, id);
    } catch { /* Persistence is optional; the current selection is retained. */ }
  };

  return (
    <section id="pricing" className="ps-purchase" dir="rtl" aria-labelledby="ps-purchase-title">
      <div className="shell">
        <div className="ps-purchase-heading">
          <div><span className="eyebrow">הצעד הבא שלך</span><h2 id="ps-purchase-title" className="section-title">יותר להבין.<br />פחות לנחש.</h2></div>
          <p>בוחרים חבילה שמתאימה לך.<br /><strong>תשלום חד־פעמי. בלי מנוי.</strong></p>
        </div>
        <div className="ps-purchase-layout">
          <div className="ps-packages-wrap">
            <fieldset className="ps-packages">
              <legend>כמה מתאמים תרצו?</legend>
              {packages.map((item) => (
                <label key={item.id} className={`ps-package ${selected.id === item.id ? 'ps-package-selected' : ''}`}>
                  <input type="radio" name="d10-package" value={item.id} checked={selected.id === item.id} onChange={() => selectPackage(item.id)} />
                  <span className="ps-package-info"><span className="ps-package-code" dir="ltr" aria-hidden="true">{item.id === 'solo' ? 'SOLO' : item.id === 'family' ? 'FAMILY' : 'ULTIMATE'} / {String(item.quantity).padStart(2, '0')}</span><span className="ps-package-name">{item.title}</span><span className="ps-package-description">{item.description}</span>{item.saving > 0 && <span className="ps-package-saving">חיסכון של <bdi>₪{item.saving}</bdi> לעומת רכישת מתאמים בודדים</span>}</span>
                  <span className="ps-package-price"><strong><bdi>₪{item.price}</bdi></strong><span>{item.quantity === 1 ? 'מחיר החבילה' : <><bdi>₪{item.perUnit}</bdi> למתאם</>}</span></span>
                </label>
              ))}
            </fieldset>
            <div className="ps-package-help"><MessageCircle size={18} aria-hidden="true" /><p>רוצים לוודא לפני שמזמינים? <a href="#compatibility">בודקים התאמה עם הצוות<ArrowLeft size={14} aria-hidden="true" /></a></p></div>
          </div>

          <aside className="ps-order" aria-label="סיכום ההזמנה">
            <div className="ps-order-label" dir="ltr" aria-hidden="true"><span>YOUR D10</span><span>CONFIGURATION</span></div>
            <div className="ps-order-product"><span className="ps-product-symbol" aria-hidden="true"><PlugZap size={33} strokeWidth={1.5} /></span><div><span className="ps-product-wordmark" dir="ltr">D10<span>AI</span></span><p>המידע של הרכב, בשפה שלך.</p></div></div>
            <ul className="ps-order-benefits">
              <li><Package size={18} aria-hidden="true" /><span>מתאם D10 וגישה לאפליקציה</span></li>
              <li><Truck size={18} aria-hidden="true" /><span>משלוח חינם בתוך 3 ימי עסקים</span></li>
              <li><ShieldCheck size={18} aria-hidden="true" /><span>שנה אחריות על פגמי ייצור</span></li>
            </ul>
            <div className="ps-order-totals" aria-live="polite" aria-atomic="true">
              <div className="ps-order-line"><span>{selected.quantity === 1 ? 'מתאם אחד + אפליקציה' : `${selected.quantity} מתאמים + אפליקציה`}</span><span><bdi>₪{selected.price}</bdi></span></div>
              <div className="ps-order-line"><span>משלוח</span><span>ללא עלות</span></div>
              <div className="ps-order-total"><span>סה״כ לתשלום<small>כולל מע״מ</small></span><strong><bdi>₪{selected.price}</bdi></strong></div>
            </div>
            <a className="button button-primary ps-checkout-button" href={selected.url} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(selected.price)}>להזמנה — <bdi>₪{selected.price}</bdi><ArrowLeft size={19} aria-hidden="true" /></a>
            <p className="ps-checkout-note">מעבר לעמוד התשלום של HYP בחלון חדש</p>
            <a className="ps-returns-link" href="#returns">מדיניות ביטולים והחזרות</a>
          </aside>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { question: 'איך יודעים ש־D10 מתאים לרכב ולטלפון שלי?', answer: <>התאימות תלויה בדגם, בשנת הייצור, במערכות הרכב ובטלפון. לפני ההזמנה ממלאים את <a href="#compatibility">פרטי הרכב והטלפון</a>, וממשיכים לבדיקת התאמה עם הצוות ב־WhatsApp.</> },
  { question: 'איך מתחילים להשתמש?', answer: <>מחברים את המתאם לשקע האבחון OBD ברכב, מתקינים את האפליקציה ופועלים לפי הוראות החיבור. מיקום השקע ואופן ההתקנה משתנים בין דגמים. את ההתקנה ואת השימוש בטלפון מבצעים כשהרכב חונה, בהתאם להוראות.</> },
  { question: 'האם כל היכולות זמינות בכל רכב?', answer: <>לא. הנתונים והיכולות הזמינים תלויים במידע שמערכות הרכב חושפות ובתמיכה בדגם. קריאת קודי תקלות, נתונים בזמן אמת ובדיקות נוספות עשויות להשתנות בין רכבים. הצוות יוכל לבדוק את היכולות הרלוונטיות לדגם שלך לפני הרכישה.</> },
  { question: 'צריך לשלם מנוי חודשי?', answer: <>ההצעה הנוכחית כוללת את המתאם ואת האפליקציה בתשלום חד־פעמי, ללא מנוי חודשי. חבילת מתאם אחד עולה 299 ₪, והחבילות לשלושה ולארבעה מתאמים מוצגות למעלה. כל המחירים כוללים מע״מ.</> },
  { question: 'מתי ההזמנה מגיעה ומה לגבי אחריות והחזרות?', answer: <>המשלוח ללא עלות, בתוך 3 ימי עסקים. המתאם מגיע עם אחריות לשנה על פגמי ייצור. לתנאי ביטול עסקה והחזרת מוצר, ראו את <a href="#returns">מדיניות הביטולים וההחזרות</a>. לשאלה לגבי הזמנה אפשר לפנות לצוות.</> },
  { question: 'האם D10 מחליף בדיקה במוסך?', answer: <>D10 מספק מידע ממערכות הרכב ועוזר להבין אותו. הוא אינו תחליף לאבחון מקצועי, לבדיקה מכנית או לבדיקה לפני קנייה, ואינו קובע אם בטוח להמשיך בנסיעה. במקרה של תקלה או נורת אזהרה, פועלים לפי ספר הרכב ופונים לאיש מקצוע.</> },
];

export function FAQSection() {
  return (
    <section id="faq" className="ps-faq" dir="rtl" aria-labelledby="ps-faq-title">
      <div className="shell ps-faq-layout">
        <div className="ps-faq-heading"><span className="eyebrow">טוב לדעת</span><h2 id="ps-faq-title" className="section-title">לפני שיוצאים<br />לדרך.</h2><p>כל מה שרצית לדעת על D10.</p><a className="ps-faq-contact" href={generalWhatsApp} target="_blank" rel="noopener noreferrer">יש עוד שאלה? אנחנו כאן<ArrowUpLeft size={17} aria-hidden="true" /></a></div>
        <div className="ps-faq-list">
          {faqs.map((item, index) => <details className="ps-faq-item" key={item.question}><summary><span className="ps-faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{item.question}</span><ChevronDown size={19} aria-hidden="true" /></summary><div className="ps-faq-answer"><p>{item.answer}</p></div></details>)}
        </div>
      </div>
    </section>
  );
}
