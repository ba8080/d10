import React from 'react';
import { Check, Lock, Clock, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, trackCheckout, SOLO_PAYMENT_URL, FAMILY_PAYMENT_URL, ULTIMATE_PAYMENT_URL } from '../utils';

export const Pricing = () => {
  const bundles = [
    { name: "סולו", price: "299", per: null as string | null, save: null as string | null, sub: "מתאם אחד + אפליקציה",
      features: ["מתאם D10 מקורי", "אפליקציה עם כל 10 היכולות", "דאשבורד חי בזמן אמת", "אחריות שנה", "משלוח חינם"],
      cta: "הזמן עכשיו", hl: false, url: SOLO_PAYMENT_URL },
    { name: "משפחתי", price: "717", per: "~₪239/יח'", save: "הכי פופולרי · 20%–", sub: "3 מתאמים + 3 אפליקציות",
      features: ["3 מתאמים D10", "אפליקציה עם כל 10 היכולות", "דאשבורד חי בזמן אמת", "אחריות שנה", "משלוח חינם"],
      cta: "הזמן עכשיו", hl: true, url: FAMILY_PAYMENT_URL },
    { name: "אולטימייט", price: "800", per: "~₪200/יח'", save: "33%–", sub: "4 מתאמים + 4 אפליקציות",
      features: ["4 מתאמים D10", "אפליקציה עם כל 10 היכולות", "דאשבורד חי בזמן אמת", "אחריות שנה", "משלוח חינם"],
      cta: "הזמן עכשיו", hl: false, url: ULTIMATE_PAYMENT_URL },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-dark" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <span className="inline-block bg-amber-500/90 text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-3">מחירים</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">בחר חבילה.</h2>
          <p className="text-white/40 text-sm mt-2">חד-פעמי. ללא מנוי. משלוח חינם. כולל מע"מ.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bundles.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn("p-6 rounded-xl flex flex-col relative transition-all hover:-translate-y-1",
                b.hl ? "bg-primary/10 border border-primary/30 pricing-hl" : "card-dark"
              )}>
              {b.save && <div className="absolute -top-2.5 left-4 px-3 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">{b.save}</div>}
              <h4 className={cn("text-xs font-bold uppercase tracking-widest mb-1", b.hl ? "text-primary" : "text-white/30")}>{b.name}</h4>
              <p className="text-white/20 text-xs mb-3">{b.sub}</p>
              <div className="text-3xl font-black text-white mb-1">₪{b.price}</div>
              {b.per ? <p className="text-white/20 text-xs mb-5">{b.per}</p> : <div className="mb-5" />}
              <ul className="space-y-2 mb-6 flex-grow">
                {b.features.map((f, j) => (
                  <li key={j} className="text-xs text-white/70 flex items-center gap-2"><Check size={10} className="text-primary shrink-0" /> {f}</li>
                ))}
              </ul>
              <a href={b.url} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(Number(b.price))}
                className={cn("w-full py-3 rounded-lg font-bold text-xs uppercase tracking-widest text-center transition-all",
                  b.hl ? "bg-primary text-white hover:bg-primary-dark" : "bg-white/10 text-white hover:bg-white/15"
                )}>{b.cta}</a>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-6 text-white/40 text-xs font-medium">
          <div className="flex items-center gap-2"><Lock size={12} /> SSL 256-bit</div>
          <div className="flex items-center gap-2"><Clock size={12} /> 3 ימי עסקים</div>
          <div className="flex items-center gap-2"><RotateCcw size={12} /> 30 יום החזרה</div>
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const reviews = [
    { text: "נורת מנוע נדלקה. D10 אמר חיישן חמצן — לא דחוף. חסכתי גרירה של 400 ₪.", name: "אבי כ.", car: "מאזדה 3, 2019", saved: "₪400" },
    { text: "הגעתי למוסך עם הדוח. המוסכניק הופתע. חסכתי ₪2,000.", name: "דנה ר.", car: "טוסון, 2021", saved: "₪2,000" },
    { text: "הכלי הכי שימושי שקניתי. הכל בעברית, הכל ברור.", name: "יוסי מ.", car: "קורולה, 2020" },
    { text: "מוסכניק רצה ₪3,500. D10 הראה חיישן O2 ב-₪350.", name: "עמית ל.", car: "גולף, 2018", saved: "₪3,000+" },
  ];

  return (
    <section className="py-20 md:py-28 bg-warm" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <span className="inline-block bg-amber-500/90 text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-3">★★★★★ ביקורות</span>
          <h2 className="text-3xl md:text-5xl font-black text-surface-dark tracking-tight">נהגים חכמים<br/>כבר משתמשים.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-5 flex flex-col">
              <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">"{r.text}"</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-xs"><span className="font-bold text-surface-dark">{r.name}</span> <span className="text-gray-300">· {r.car}</span></div>
                {(r as any).saved && <span className="text-primary text-xs font-bold">{(r as any).saved}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
