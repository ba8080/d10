import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Check, RotateCcw, ShieldCheck, X, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SOLO_PAYMENT_URL, trackCheckout } from '../utils';

const WHATSAPP_URL = "https://wa.me/972547669122?text=" + encodeURIComponent("היי, אני מתעניין/ת ב-D10");

export const FAQ = () => {
  const faqs = [
    { q: "יכול להזיק לרכב?", a: "לא. המתאם רק קורא נתונים — אין כתיבה, אין שינוי הגדרות, אין סיכון. צריכת החשמל זניחה גם בחניה." },
    { q: "מה קורה אחרי ההזמנה?", a: "המתאם מגיע עד הבית תוך 3 ימי עסקים. מחברים לשקע, מורידים את האפליקציה, סורקים. הכל אוטומטי." },
    { q: "עובד על הרכב שלי?", a: "כמעט בוודאות — תואם לכמעט כל רכב מ-1996 ומעלה עם שקע OBD2 (חובה בכל רכב שנמכר בישראל). לא בטוח? שלחו לנו את הדגם." },
    { q: "צריך ידע טכני?", a: "ממש לא. הכל בעברית פשוטה — מה הבעיה, כמה היא דחופה, ומה לעשות. בלי קודים ובלי מונחים." },
    { q: "מה ההבדל מבדיקה במוסך?", a: "בדיקת מחשב במוסך עולה 80–200 ₪ בכל פעם. עם D10 אותה בדיקה זמינה לך תמיד, בחינם, מהנייד." },
    { q: "יש מנוי חודשי?", a: "לא. תשלום אחד של ₪299 — וזהו. כל היכולות, לתמיד, בלי הפתעות." },
    { q: "ומה אם לא אהיה מרוצה?", a: "30 יום החזרה מלאה, בלי שאלות. לא חסכת כסף? נחזיר לך את הכסף." },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 section-dark" dir="rtl">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <span className="kicker mb-4">שאלות נפוצות</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3">שאלות? תשובות.</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <details key={i} className="group glass !rounded-xl overflow-hidden transition-colors open:border-blue-400/30">
              <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-bold text-sm hover:text-blue-200 transition-colors list-none">
                {item.q}
                <ChevronDown size={15} className="text-white/30 group-open:rotate-180 group-open:text-blue-300 transition-transform shrink-0 mr-3" />
              </summary>
              <div className="px-5 pb-5 muted text-sm leading-relaxed border-t border-white/8 pt-4">{item.a}</div>
            </details>
          ))}
        </div>
        <div className="mt-8">
          <a href="mailto:support@d10.store" className="inline-flex items-center gap-2 text-blue-300 text-xs font-semibold hover:text-blue-200 hover:underline"><Mail size={13} />עוד שאלות? דברו איתנו</a>
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = () => (
  <section className="py-28 md:py-36 section-dark text-center overflow-hidden" dir="rtl">
    <div className="orb orb-blue w-[560px] h-[560px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" aria-hidden="true" />
    <div className="max-w-3xl mx-auto px-6 relative">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/4 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 mb-7">
          מתאם אחד · אפליקציה אחת · שליטה מלאה
        </span>
        <h2 className="h-display text-4xl sm:text-6xl md:text-7xl text-white mb-6">תפסיק לנחש.<br /><span className="text-gradient">תתחיל לדעת.</span></h2>
        <p className="muted text-base mb-10 max-w-md mx-auto leading-relaxed">נהג ממוצע מוציא אלפי שקלים בשנה על תיקונים מיותרים. D10 משלם על עצמו כבר בשימוש הראשון.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(299)} className="btn-primary text-base px-12">הזמן עכשיו — ₪299</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost px-10">דברו איתנו ב-WhatsApp</a>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[11px] font-medium text-white/40">
          <div className="flex items-center gap-1.5"><Check size={11} className="text-emerald-300/70" /> משלוח חינם</div>
          <div className="flex items-center gap-1.5"><RotateCcw size={11} className="text-emerald-300/70" /> 30 יום החזרה</div>
          <div className="flex items-center gap-1.5"><ShieldCheck size={11} className="text-emerald-300/70" /> תשלום מאובטח</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const copy = (e: React.MouseEvent) => { e.preventDefault(); navigator.clipboard.writeText('support@d10.store'); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <footer className="section-dark py-10 border-t border-white/6" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-5">
            <span className="text-base font-black text-white">D10 <span className="text-gradient text-xs">AI</span></span>
            <a href="mailto:support@d10.store" onClick={copy} className="text-white/35 text-xs hover:text-white transition-colors">{copied ? '✓ הועתק' : 'support@d10.store'}</a>
          </div>
          <div className="flex gap-5 text-[11px] font-medium text-white/35">
            <a href="#privacy" className="hover:text-white transition-colors">פרטיות</a>
            <a href="#terms" className="hover:text-white transition-colors">תנאים</a>
            <a href="#accessibility" className="hover:text-white transition-colors">נגישות</a>
            <a href="#returns" className="hover:text-white transition-colors">ביטולים</a>
          </div>
          <div className="flex gap-2">
            <a href="https://www.instagram.com/d10_ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-white/45 hover:bg-white hover:text-black transition-all text-xs font-bold">IG</a>
            <a href="https://www.facebook.com/d10ai" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-xl border border-white/10 bg-white/4 flex items-center justify-center text-white/45 hover:bg-white hover:text-black transition-all text-xs font-bold">FB</a>
          </div>
        </div>
        <div className="mt-7 text-center"><p className="text-[10px] text-white/20">© 2026 D10 · פותח בישראל 🇮🇱</p></div>
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
      <div className="max-w-lg mx-auto bg-[#12151d]/95 backdrop-blur-xl border border-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.6)] rounded-2xl p-3.5 flex items-center gap-3">
        <p className="flex-1 text-xs text-white/60">אתר זה משתמש בעוגיות. <a href="#privacy" className="text-blue-300 underline">פרטיות</a>.</p>
        <button onClick={accept} className="px-4 py-2 bg-gradient-to-l from-blue-500 to-blue-600 text-white rounded-lg text-xs font-bold shadow-[0_4px_14px_-2px_rgba(37,99,235,0.5)]">אשר</button>
        <button onClick={decline} className="px-4 py-2 bg-white/8 border border-white/10 text-white/60 rounded-lg text-xs">דחה</button>
      </div>
    </div>
  );
};

export const MobileStickyBar = () => {
  const [v, setV] = useState(false);
  useEffect(() => { const h = () => setV(window.scrollY > 600); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  if (!v) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] md:hidden bg-[#0b0d12]/92 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-pb" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div><div className="text-white font-black text-sm">D10 <span className="text-gradient text-[10px]">AI</span></div><div className="text-white/45 text-[11px]">₪299 · משלוח חינם</div></div>
        <div className="flex gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 bg-white/8 border border-white/12 text-white/80 font-bold text-xs rounded-xl active:scale-95 transition-transform">צור קשר</a>
          <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(299)} className="px-6 py-2.5 bg-gradient-to-l from-blue-500 to-blue-600 text-white font-bold text-xs rounded-xl shadow-[0_4px_16px_-2px_rgba(37,99,235,0.6)] active:scale-95 transition-transform">הזמן</a>
        </div>
      </div>
    </div>
  );
};

type A11yKey = 'largeText' | 'highContrast' | 'readableFont' | 'highlightLinks';

export const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [s, setS] = useState<Record<A11yKey, boolean>>({ largeText: false, highContrast: false, readableFont: false, highlightLinks: false });
  const toggle = (k: A11yKey) => {
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
    (['largeText', 'highContrast', 'readableFont', 'highlightLinks'] as A11yKey[]).forEach(k => {
      if (localStorage.getItem(`a11y_${k}`) === 'true') { ns[k] = true; document.body.classList.add(`a11y-${String(k).replace(/([A-Z])/g, '-$1').toLowerCase()}`); h = true; }
    }); if (h) setS(ns);
  }, []);
  useEffect(() => {
    const h = () => setScrolledPastHero(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  const labels: Record<string, string> = { largeText: 'הגדלת טקסט', highContrast: 'ניגודיות', readableFont: 'גופן קריא', highlightLinks: 'הדגשת קישורים' };
  const btnBottom = scrolledPastHero ? 'bottom-20 md:bottom-5' : 'bottom-5';
  const panelBottom = scrolledPastHero ? 'bottom-[6.5rem] md:bottom-20' : 'bottom-20';
  return (
    <>
      <button onClick={() => setOpen(!open)} className={`fixed ${btnBottom} left-5 z-[250] bg-[#12151d] border border-white/15 text-white/85 w-11 h-11 rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center hover:border-blue-400/40 hover:text-white transition-all`} aria-label="נגישות"><Accessibility size={20} /></button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.15 }} className={`fixed ${panelBottom} left-5 z-[1000] w-56 bg-[#12151d] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.7)] overflow-hidden border border-white/12`} dir="rtl">
            <div className="bg-white/5 border-b border-white/8 p-3 flex justify-between items-center text-white">
              <h2 className="font-bold text-xs flex items-center gap-1.5"><Accessibility size={14} />נגישות</h2>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white"><X size={16} /></button>
            </div>
            <div className="p-2.5 flex flex-col gap-1.5">
              {(Object.keys(s) as A11yKey[]).map(k => (
                <button key={k} onClick={() => toggle(k)} className={`flex justify-between items-center p-2.5 rounded-xl border text-[11px] transition-colors ${s[k] ? 'bg-blue-500/12 border-blue-400/35 text-blue-200' : 'bg-white/4 border-white/8 text-white/55'}`}>
                  <span className="font-semibold">{labels[k]}</span>
                  <div className={`w-7 h-4 rounded-full flex items-center p-0.5 transition-colors ${s[k] ? 'bg-blue-500 justify-end' : 'bg-white/15 justify-start'}`}><div className="w-3 h-3 bg-white rounded-full" /></div>
                </button>
              ))}
            </div>
            <div className="p-2.5 border-t border-white/8">
              <button onClick={reset} className="w-full py-2 bg-white/6 border border-white/10 text-white/60 font-semibold rounded-xl text-[11px] hover:text-white transition-colors">איפוס</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const InlineCTA = ({ variant = 'dark' }: { variant?: 'dark' | 'light' }) => (
  <div className="py-12 text-center section-dark" dir="rtl">
    <div className="max-w-3xl mx-auto px-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(299)} className="btn-primary text-center px-10">הזמן עכשיו — ₪299</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost text-center">שאלות? דברו איתנו</a>
      </div>
    </div>
  </div>
);
