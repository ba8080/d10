import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Mail, Check, RotateCcw, ShieldCheck, X, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SOLO_PAYMENT_URL } from '../utils';

const WHATSAPP_URL = "https://wa.me/972547669122?text=" + encodeURIComponent("היי, אני מתעניין/ת ב-D10");

export const FAQ = () => {
  const faqs = [
    { q: "יכול להזיק לרכב?", a: "לא. רק קורא נתונים. אין כתיבה, אין סיכון. צריכת חשמל זניחה בעמידה." },
    { q: "מה אחרי ההזמנה?", a: "מגיע תוך 3 ימי עסקים. חבר, הורד אפליקציה, סרוק. הכל אוטומטי." },
    { q: "עובד על הרכב שלי?", a: "כמעט בוודאות. תואם לכמעט כל רכב מ-1996 ומעלה." },
    { q: "צריך ידע טכני?", a: "לא. הכל בעברית פשוטה — מה הבעיה, כמה דחוף, מה לעשות." },
    { q: "מה ההבדל מבדיקה במוסך?", a: "בדיקת מחשב: 80-200 ₪ בכל פעם. D10: אותה בדיקה, בחינם, מהנייד." },
    { q: "יש מנוי חודשי?", a: "לא. חד-פעמי. ₪299. בלי מנוי." },
    { q: "מה אם לא מרוצה?", a: "30 יום החזרה מלאה. לא חסכת? נחזיר את הכסף." },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-white" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <span className="inline-block bg-primary/90 text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-3">שאלות נפוצות</span>
          <h2 className="text-3xl md:text-5xl font-black text-surface-dark tracking-tight">שאלות? תשובות.</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((item, i) => (
            <details key={i} className="group border border-gray-200 rounded-lg overflow-hidden hover:border-primary/30 transition-colors">
              <summary className="flex items-center justify-between p-4 cursor-pointer text-surface-dark font-semibold text-sm hover:text-primary transition-colors">
                {item.q}
                <ChevronDown size={14} className="text-gray-300 group-open:rotate-180 transition-transform shrink-0 mr-3" />
              </summary>
              <div className="px-4 pb-4 text-gray-400 text-sm border-t border-gray-100 pt-3">{item.a}</div>
            </details>
          ))}
        </div>
        <div className="mt-6">
          <a href="mailto:support@d10.store" className="text-primary text-xs font-semibold hover:underline"><Mail size={12} className="inline mr-1" />עוד שאלות? דברו איתנו</a>
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = () => (
  <section className="py-20 md:py-28 bg-dark text-center" dir="rtl">
    <div className="max-w-3xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <span className="inline-block bg-primary/90 text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4">מתאם אחד. אפליקציה אחת. שליטה מלאה.</span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">תפסיק לנחש.<br/>תתחיל לדעת.</h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">נהג ממוצע מוציא ₪2,000–₪5,000 בשנה על תיקונים מיותרים. D10 משלם על עצמו בשימוש הראשון.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block text-center px-10">הזמן עכשיו — ₪299</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline border-white/20 text-white/70 hover:text-white hover:border-white/40 text-center px-10">צור קשר</a>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-medium text-white/40">
          <div className="flex items-center gap-1.5"><Check size={10} /> משלוח חינם</div>
          <div className="flex items-center gap-1.5"><RotateCcw size={10} /> 30 יום החזרה</div>
          <div className="flex items-center gap-1.5"><ShieldCheck size={10} /> תשלום מאובטח</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => { e.preventDefault(); navigator.clipboard.writeText('support@d10.store'); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <footer className="bg-dark py-8 border-t border-white/5" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-black text-white">D10</span>
            <a href="mailto:support@d10.store" onClick={copy} className="text-white/20 text-xs hover:text-white transition-colors">{copied ? '✓ הועתק' : 'support@d10.store'}</a>
          </div>
          <div className="flex gap-4 text-[10px] font-medium text-white/20">
            <a href="#privacy" className="hover:text-white transition-colors">פרטיות</a>
            <a href="#terms" className="hover:text-white transition-colors">תנאים</a>
            <a href="#accessibility" className="hover:text-white transition-colors">נגישות</a>
            <a href="#returns" className="hover:text-white transition-colors">ביטולים</a>
          </div>
          <div className="flex gap-2">
            <a href="https://www.instagram.com/d10_ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:bg-white hover:text-black transition-all text-xs">IG</a>
            <a href="https://www.facebook.com/d10ai" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-white/30 hover:bg-white hover:text-black transition-all text-xs">FB</a>
          </div>
        </div>
        <div className="mt-6 text-center"><p className="text-[9px] text-white/10">© 2026 D10 · פותח בישראל 🇮🇱</p></div>
      </div>
    </footer>
  );
};

export const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem('d10_cookie_consent')) setVisible(true); }, []);
  const accept = () => { localStorage.setItem('d10_cookie_consent', 'granted'); if (typeof window.fbq === 'function') window.fbq('consent', 'grant'); setVisible(false); };
  const decline = () => { localStorage.setItem('d10_cookie_consent', 'denied'); setVisible(false); };
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-3" dir="rtl">
      <div className="max-w-lg mx-auto bg-white border border-gray-200 shadow-lg rounded-lg p-3 flex items-center gap-3">
        <p className="flex-1 text-xs text-gray-500">אתר זה משתמש בעוגיות. <a href="#privacy" className="text-primary underline">פרטיות</a>.</p>
        <button onClick={accept} className="px-4 py-1.5 bg-primary text-white rounded text-xs font-bold">אשר</button>
        <button onClick={decline} className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded text-xs">דחה</button>
      </div>
    </div>
  );
};

export const MobileStickyBar = () => {
  const [v, setV] = useState(false);
  useEffect(() => { const h = () => setV(window.scrollY > 600); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  if (!v) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-2.5 safe-area-pb" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div><div className="text-surface-dark font-bold text-sm">D10</div><div className="text-gray-400 text-[11px]">₪299 · משלוח חינם</div></div>
        <div className="flex gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-100 text-surface-dark font-bold text-xs rounded-lg active:scale-95 hover:bg-gray-200 transition-colors">צור קשר</a>
          <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-primary text-white font-bold text-xs rounded-lg active:scale-95">הזמן</a>
        </div>
      </div>
    </div>
  );
};

export const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [s, setS] = useState({ largeText: false, highContrast: false, readableFont: false, highlightLinks: false });
  const toggle = (k: keyof typeof s) => {
    setS(prev => {
      const v = !prev[k]; const b = document.body.classList;
      const m: Record<string, string> = { largeText: 'a11y-large-text', highContrast: 'a11y-high-contrast', readableFont: 'a11y-readable-font', highlightLinks: 'a11y-highlight-links' };
      v ? b.add(m[k]) : b.remove(m[k]); localStorage.setItem(`a11y_${k}`, String(v));
      return { ...prev, [k]: v };
    });
  };
  const reset = () => {
    setS({ largeText: false, highContrast: false, readableFont: false, highlightLinks: false });
    document.body.classList.remove('a11y-large-text', 'a11y-high-contrast', 'a11y-readable-font', 'a11y-highlight-links');
    ['largeText', 'highContrast', 'readableFont', 'highlightLinks'].forEach(k => localStorage.removeItem(`a11y_${k}`));
  };
  useEffect(() => {
    const ns = { ...s }; let h = false;
    (['largeText', 'highContrast', 'readableFont', 'highlightLinks'] as Array<keyof typeof s>).forEach(k => {
      if (localStorage.getItem(`a11y_${k}`) === 'true') { ns[k] = true; document.body.classList.add(`a11y-${String(k).replace(/([A-Z])/g, '-$1').toLowerCase()}`); h = true; }
    }); if (h) setS(ns);
  }, []);
  useEffect(() => {
    const h = () => setScrolledPastHero(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const labels: Record<string, string> = { largeText: 'הגדלת טקסט', highContrast: 'ניגודיות', readableFont: 'גופן קריא', highlightLinks: 'הדגשת קישורים' };
  // On mobile when scrolled, move button up to avoid overlapping MobileStickyBar
  const btnBottom = scrolledPastHero ? 'bottom-20 md:bottom-5' : 'bottom-5';
  const panelBottom = scrolledPastHero ? 'bottom-[6.5rem] md:bottom-20' : 'bottom-20';
  return (
    <>
      <button onClick={() => setOpen(!open)} className={`fixed ${btnBottom} left-5 z-[250] bg-primary text-white w-11 h-11 rounded-lg shadow-lg flex items-center justify-center hover:bg-primary-dark transition-all`} aria-label="נגישות"><Accessibility size={20} /></button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.15 }} className={`fixed ${panelBottom} left-5 z-[1000] w-56 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200`} dir="rtl">
            <div className="bg-primary p-3 flex justify-between items-center text-white">
              <h2 className="font-bold text-xs"><Accessibility size={14} className="inline mr-1" />נגישות</h2>
              <button onClick={() => setOpen(false)}><X size={16} /></button>
            </div>
            <div className="p-2.5 flex flex-col gap-1.5">
              {(Object.keys(s) as Array<keyof typeof s>).map(k => (
                <button key={k} onClick={() => toggle(k)} className={`flex justify-between items-center p-2 rounded-lg border text-[11px] transition-colors ${s[k] ? 'bg-primary/8 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                  <span className="font-semibold">{labels[k]}</span>
                  <div className={`w-7 h-4 rounded-full flex items-center p-0.5 ${s[k] ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}><div className="w-3 h-3 bg-white rounded-full" /></div>
                </button>
              ))}
            </div>
            <div className="p-2.5 bg-gray-50 border-t border-gray-100">
              <button onClick={reset} className="w-full py-1.5 bg-gray-200 text-gray-600 font-semibold rounded-lg text-[11px]">איפוס</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const InlineCTA = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => (
  <div className={`py-10 text-center ${variant === 'dark' ? 'bg-dark' : 'bg-warm'}`} dir="rtl">
    <div className="max-w-3xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">הזמן עכשיו — ₪299</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`btn-outline text-center ${variant === 'dark' ? 'border-white/20 text-white/70 hover:text-white hover:border-white/40' : 'border-gray-300 text-gray-500 hover:text-surface-dark hover:border-gray-400'}`}>שאלות? דברו איתנו</a>
      </div>
    </div>
  </div>
);
