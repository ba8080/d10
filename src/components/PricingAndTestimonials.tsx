import React from 'react';
import { Check, Lock, Clock, RotateCcw, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, trackCheckout, SOLO_PAYMENT_URL, FAMILY_PAYMENT_URL, ULTIMATE_PAYMENT_URL } from '../utils';

export const Pricing = () => {
  const bundles = [
    { name: "סולו", price: "299", per: null as string | null, badge: null as string | null, sub: "מתאם אחד + אפליקציה",
      features: ["מתאם D10 מקורי", "כל 10 היכולות באפליקציה", "דאשבורד חי בזמן אמת", "אחריות שנה מלאה", "משלוח חינם עד הבית"],
      hl: false, url: SOLO_PAYMENT_URL },
    { name: "משפחתי", price: "717", per: "יוצא ₪239 ליחידה", badge: "הכי פופולרי · חיסכון 20%", sub: "3 מתאמים + 3 אפליקציות",
      features: ["3 מתאמים D10 מקוריים", "כל 10 היכולות באפליקציה", "דאשבורד חי בזמן אמת", "אחריות שנה מלאה", "משלוח חינם עד הבית"],
      hl: true, url: FAMILY_PAYMENT_URL },
    { name: "אולטימייט", price: "800", per: "יוצא ₪200 ליחידה", badge: "חיסכון 33%", sub: "4 מתאמים + 4 אפליקציות",
      features: ["4 מתאמים D10 מקוריים", "כל 10 היכולות באפליקציה", "דאשבורד חי בזמן אמת", "אחריות שנה מלאה", "משלוח חינם עד הבית"],
      hl: false, url: ULTIMATE_PAYMENT_URL },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 section-dark" dir="rtl">
      <div className="orb orb-blue w-[480px] h-[480px] top-20 -right-40" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="mb-14">
          <span className="kicker mb-4">מחירים</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3 mb-3">תשלום אחד.<br />בלי מנויים. לתמיד.</h2>
          <p className="muted text-sm">משלוח חינם · כולל מע"מ · 30 יום החזרה מלאה</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {bundles.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
              className={cn("p-7 flex flex-col relative transition-transform hover:-translate-y-1.5 duration-300",
                b.hl ? "glow-border pricing-hl md:-my-3 md:py-10" : "glass"
              )}>
              {b.badge && (
                <div className={cn("absolute -top-3 right-6 px-3.5 py-1 text-[10px] font-black rounded-full tracking-wide",
                  b.hl ? "bg-gradient-to-l from-blue-500 to-cyan-400 text-white shadow-[0_4px_16px_-2px_rgba(37,99,235,0.6)]" : "bg-white/10 border border-white/15 text-white/70"
                )}>{b.badge}</div>
              )}
              <h4 className={cn("text-xs font-black uppercase tracking-[0.2em] mb-1.5", b.hl ? "text-blue-300" : "text-white/40")}>{b.name}</h4>
              <p className="muted-2 text-xs mb-5">{b.sub}</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black text-white">₪{b.price}</span>
              </div>
              {b.per ? <p className="text-cyan-300/80 text-xs font-semibold mb-6">{b.per}</p> : <div className="mb-6 h-4" />}
              <ul className="space-y-2.5 mb-8 flex-grow">
                {b.features.map((f, j) => (
                  <li key={j} className="text-[13px] text-white/75 flex items-center gap-2.5">
                    <span className={cn("w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0", b.hl ? "bg-blue-500/25 text-blue-300" : "bg-white/8 text-white/50")}>
                      <Check size={10} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href={b.url} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(Number(b.price))}
                className={cn("w-full text-center", b.hl ? "btn-primary" : "btn-ghost")}>הזמן עכשיו</a>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-white/45 text-xs font-medium">
          <div className="flex items-center gap-2"><Lock size={13} className="text-white/30" /> תשלום מאובטח SSL</div>
          <div className="flex items-center gap-2"><Clock size={13} className="text-white/30" /> משלוח תוך 3 ימי עסקים</div>
          <div className="flex items-center gap-2"><RotateCcw size={13} className="text-white/30" /> 30 יום החזרה מלאה</div>
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const reviews = [
    { text: "נורת מנוע נדלקה באמצע נסיעה. D10 אמר חיישן חמצן — לא דחוף. חסכתי גרירה של 400 ₪ ולילה של לחץ.", name: "אבי כ.", car: "מאזדה 3, 2019", saved: "חסך ₪400" },
    { text: "הגעתי למוסך עם הדוח ביד. המוסכניק הופתע שאני יודע בדיוק מה הבעיה. התיקון ירד מ-₪3,500 ל-₪1,500.", name: "דנה ר.", car: "טוסון, 2021", saved: "חסכה ₪2,000" },
    { text: "הכלי הכי שימושי שקניתי לרכב. הכל בעברית, הכל ברור, והבדיקת ק\"מ הצילה אותי מקנייה גרועה.", name: "יוסי מ.", car: "קורולה, 2020", saved: null as string | null },
    { text: "מוסכניק רצה ₪3,500 על 'תיקון מערכת'. D10 הראה שזה חיישן O2 ב-₪350. שילם על עצמו פי עשרה.", name: "עמית ל.", car: "גולף, 2018", saved: "חסך ₪3,000+" },
  ];

  return (
    <section className="py-24 md:py-32 section-raised" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <span className="kicker mb-4">ביקורות</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3">נהגים חכמים<br />כבר לא מנחשים.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover p-6 flex flex-col">
              <div className="flex gap-0.5 mb-4 text-amber-300">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={13} fill="currentColor" strokeWidth={0} />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5 flex-grow">"{r.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-white/8">
                <div className="text-xs"><span className="font-bold text-white">{r.name}</span> <span className="muted-2">· {r.car}</span></div>
                {r.saved && <span className="text-[11px] font-black text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-1">{r.saved}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
