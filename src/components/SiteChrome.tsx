import { useEffect, useRef, useState } from 'react';
import { Accessibility, ArrowLeft, Check, ChevronLeft, Facebook, Instagram, Mail, Menu, MessageCircle, RotateCcw, X } from 'lucide-react';
import { getStoredConsent, setAnalyticsConsent } from '../utils';
import '../chrome.css';

const navigation = [
  ['#features', 'למה D10'],
  ['#how', 'איך זה עובד'],
  ['#compatibility', 'בדיקת תאימות'],
  ['#pricing', 'החבילות שלנו'],
  ['#faq', 'שאלות נפוצות'],
] as const;

function Wordmark() {
  return <span className="sc-wordmark" dir="ltr">D10<span className="sc-wordmark-ai">AI</span></span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnNavigation = () => setOpen(false);
    const closeOnResize = () => { if (window.innerWidth > 1000) setOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('hashchange', closeOnNavigation);
    window.addEventListener('resize', closeOnResize);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('hashchange', closeOnNavigation);
      window.removeEventListener('resize', closeOnResize);
    };
  }, [open]);

  return <>
    <a className="sc-skip-link" href="#main-content" onClick={event => {
      event.preventDefault();
      setOpen(false);
      const main = document.getElementById('main-content');
      main?.focus({ preventScroll: true });
      main?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }}>דילוג לתוכן הראשי</a>
    <div className="sc-announcement" dir="rtl">משלוח חינם עד הבית <span aria-hidden="true">·</span> תשלום אחד, בלי מנוי</div>
    <header className="sc-header" dir="rtl">
      <div className="shell sc-header-inner">
        <a href="#home" className="sc-brand-link" aria-label="D10 — לעמוד הבית" onClick={() => setOpen(false)}><Wordmark /></a>
        <nav className="sc-desktop-nav" aria-label="ניווט ראשי">
          {navigation.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="sc-header-actions">
          <a className="sc-purchase-link" href="#pricing" onClick={() => setOpen(false)}>לרכישת D10 <ArrowLeft size={16} aria-hidden="true" /></a>
          <button ref={toggleRef} className="sc-menu-toggle" aria-label={open ? 'סגירת תפריט הניווט' : 'פתיחת תפריט הניווט'} aria-expanded={open} aria-controls="sc-mobile-navigation" onClick={() => setOpen(value => !value)}>
            {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="sc-mobile-navigation" className="sc-mobile-nav" aria-label="ניווט במובייל" hidden={!open}>
        {navigation.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ChevronLeft size={18} aria-hidden="true" /></a>)}
      </nav>
    </header>
  </>;
}

export function Footer() {
  return <footer className="sc-footer" dir="rtl">
    <div className="shell">
      <div className="sc-footer-main">
        <div className="sc-footer-brand">
          <a href="#home" className="sc-brand-link" aria-label="D10 — לעמוד הבית"><Wordmark /></a>
          <p>המידע של הרכב.<br />עכשיו בעברית פשוטה.</p>
          <div className="sc-social-links">
            <a href="https://www.instagram.com/d10_ai/" target="_blank" rel="noopener noreferrer" aria-label="D10 באינסטגרם — נפתח בחלון חדש"><Instagram size={18} aria-hidden="true" /></a>
            <a href="https://www.facebook.com/d10ai" target="_blank" rel="noopener noreferrer" aria-label="D10 בפייסבוק — נפתח בחלון חדש"><Facebook size={18} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="sc-footer-column">
          <h2>להכיר את D10</h2>
          <a href="#features">מה מקבלים</a>
          <a href="#compatibility">בדיקת תאימות לרכב</a>
          <a href="#pricing">בחירת חבילה</a>
          <a href="#faq">שאלות נפוצות</a>
        </div>
        <div className="sc-footer-column">
          <h2>כאן בשבילכם</h2>
          <a href="https://wa.me/972552674465" target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden="true" /> דברו איתנו בוואטסאפ</a>
          <a href="mailto:support@d10.store"><Mail size={16} aria-hidden="true" /><span dir="ltr">support@d10.store</span></a>
          <p>מתלבטים אם זה מתאים לרכב שלכם?<br />נשמח לעזור לפני ההזמנה.</p>
        </div>
      </div>
      <div className="sc-footer-bottom">
        <small>© {new Date().getFullYear()} D10. כל הזכויות שמורות.</small>
        <nav className="sc-legal-links" aria-label="מידע משפטי ופרטיות">
          <a href="#privacy">מדיניות פרטיות</a>
          <a href="#terms">תנאי שימוש</a>
          <a href="#returns">ביטולים והחזרות</a>
          <a href="#accessibility">נגישות</a>
          <button onClick={() => window.dispatchEvent(new CustomEvent('d10:privacy-settings'))}>העדפות עוגיות</button>
        </nav>
      </div>
    </div>
  </footer>;
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(() => getStoredConsent() === null);
  const bannerRef = useRef<HTMLElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const reopenTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reopen = () => {
      reopenTriggerRef.current = document.activeElement as HTMLElement | null;
      setVisible(true);
      window.requestAnimationFrame(() => firstButtonRef.current?.focus());
    };
    window.addEventListener('d10:privacy-settings', reopen);
    return () => window.removeEventListener('d10:privacy-settings', reopen);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sc-consent-visible', visible);
    if (!visible || !bannerRef.current) {
      document.documentElement.style.setProperty('--sc-consent-height', '0px');
      return;
    }
    const updateHeight = () => document.documentElement.style.setProperty('--sc-consent-height', `${bannerRef.current?.offsetHeight || 0}px`);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bannerRef.current);
    return () => {
      observer.disconnect();
      document.body.classList.remove('sc-consent-visible');
      document.documentElement.style.removeProperty('--sc-consent-height');
    };
  }, [visible]);

  const choose = (granted: boolean) => {
    setAnalyticsConsent(granted);
    setVisible(false);
    reopenTriggerRef.current?.focus();
    reopenTriggerRef.current = null;
  };

  if (!visible) return null;
  return <section ref={bannerRef} className="sc-consent" aria-labelledby="sc-consent-title" dir="rtl">
    <h2 id="sc-consent-title">הפרטיות שלכם, הבחירה שלכם.</h2>
    <p>באישורכם, נשתמש בעוגיות למדידה ולפרסום. אפשר לסרב ולעדכן את הבחירה בכל עת בתחתית האתר. <a href="#privacy">מדיניות הפרטיות</a></p>
    <div className="sc-consent-actions">
      <button ref={firstButtonRef} onClick={() => choose(true)}>אישור עוגיות</button>
      <button onClick={() => choose(false)}>ללא עוגיות פרסום</button>
    </div>
  </section>;
}

export function MobilePurchaseBar({ hidden = false }: { hidden?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const visible = scrolled && !hidden;
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 650);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('sc-purchase-visible', visible);
    return () => document.body.classList.remove('sc-purchase-visible');
  }, [visible]);
  if (!visible) return null;
  return <aside className="sc-mobile-purchase" aria-label="בחירת חבילה" dir="rtl">
    <div className="sc-mobile-price"><strong dir="ltr">₪299</strong><span>מתאם בודד · משלוח חינם</span></div>
    <a className="sc-purchase-link" href="#pricing">לבחירת החבילה <ArrowLeft size={16} aria-hidden="true" /></a>
  </aside>;
}

const accessibilityOptions = [
  ['largeText', 'הגדלת טקסט', 'sc-a11y-large-text'],
  ['highContrast', 'ניגודיות גבוהה', 'sc-a11y-high-contrast'],
  ['readableFont', 'גופן קריא', 'sc-a11y-readable-font'],
  ['highlightLinks', 'הדגשת קישורים', 'sc-a11y-highlight-links'],
  ['reducedMotion', 'הפחתת אנימציות', 'sc-a11y-reduced-motion'],
] as const;
type AccessibilityKey = typeof accessibilityOptions[number][0];
type AccessibilityPreferences = Record<AccessibilityKey, boolean>;
const defaultPreferences: AccessibilityPreferences = { largeText: false, highContrast: false, readableFont: false, highlightLinks: false, reducedMotion: false };

function readAccessibilityPreferences(): AccessibilityPreferences {
  const preferences = { ...defaultPreferences };
  for (const [key] of accessibilityOptions) {
    try { preferences[key] = localStorage.getItem(`a11y_${key}`) === 'true'; } catch { /* Preferences remain available for this visit. */ }
  }
  return preferences;
}

export function AccessibilityControls() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState(readAccessibilityPreferences);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = () => { setOpen(false); triggerRef.current?.focus(); };

  useEffect(() => {
    for (const [key, , className] of accessibilityOptions) {
      document.body.classList.toggle(className, preferences[key]);
      // Root rem units and scroll behavior must change along with body preferences.
      if (key === 'largeText' || key === 'reducedMotion') document.documentElement.classList.toggle(className, preferences[key]);
      try { localStorage.setItem(`a11y_${key}`, String(preferences[key])); } catch { /* Apply choices even when storage is unavailable. */ }
    }
  }, [preferences]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const onKeydown = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [open]);

  return <div className="sc-accessibility" dir="rtl">
    <button ref={triggerRef} className="sc-accessibility-trigger" aria-label="אפשרויות נגישות" aria-expanded={open} aria-controls="sc-accessibility-panel" onClick={() => setOpen(value => !value)}><Accessibility size={21} aria-hidden="true" /></button>
    {open && <div ref={panelRef} id="sc-accessibility-panel" className="sc-accessibility-panel" role="region" aria-labelledby="sc-accessibility-title">
      <div className="sc-accessibility-heading"><h2 id="sc-accessibility-title">אפשרויות נגישות</h2><button onClick={close} aria-label="סגירת אפשרויות הנגישות"><X size={18} aria-hidden="true" /></button></div>
      <div className="sc-accessibility-options">
        {accessibilityOptions.map(([key, label]) => <button key={key} aria-pressed={preferences[key]} onClick={() => setPreferences(previous => ({ ...previous, [key]: !previous[key] }))}><span>{label}</span><span className="sc-accessibility-check" aria-hidden="true">{preferences[key] && <Check size={14} />}</span></button>)}
      </div>
      <button className="sc-accessibility-reset" onClick={() => setPreferences({ ...defaultPreferences })}><RotateCcw size={15} aria-hidden="true" />איפוס ההעדפות</button>
      <a href="#accessibility" className="sc-accessibility-statement" onClick={() => setOpen(false)}>להצהרת הנגישות</a>
    </div>}
  </div>;
}
