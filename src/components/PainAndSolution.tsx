import React from 'react';
import { AlertTriangle, Search, DollarSign, BarChart3, Cpu, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const PainPoints = () => {
  const pains = [
    { icon: <AlertTriangle className="w-5 h-5" />, title: "נורה דולקת — אפס מושג", desc: "50 תשובות סותרות בגוגל. מסוכן? אפשר לנסוע? אף אחד לא באמת יודע." },
    { icon: <DollarSign className="w-5 h-5" />, title: "משלם יותר מדי במוסך?", desc: "המוסכניק אומר שזה דחוף ויקר. אין לך שום דרך לדעת אם הוא צודק — או סתם מנפח את החשבון." },
    { icon: <Search className="w-5 h-5" />, title: "קונה יד שנייה על עיוור", desc: "הק\"מ בשעון לא תמיד אמיתי. אלפי ישראלים קונים רכב עם מספרים מזויפים — ומגלים אחרי ששילמו." },
    { icon: <BarChart3 className="w-5 h-5" />, title: "אלפי נתונים — אפס גישה", desc: "צריכת דלק, מצבר, סגנון נהיגה. הרכב יודע הכל — לך מעולם לא הייתה גישה." },
  ];

  return (
    <section className="py-24 md:py-32" style={{ background: 'rgba(6,7,10,0.45)', backdropFilter: 'blur(2px)' }} dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <span className="kicker !text-red-400 mb-4">הבעיה</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3">כל נהג מכיר<br />את הסיוט הזה.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {pains.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass glass-hover p-6 md:p-7">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-red-500/12 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">{p.icon}</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{p.title}</h3>
                  <p className="muted text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SolutionOverview = () => (
  <section className="py-24 md:py-32" style={{ background: 'rgba(6,7,10,0.45)', backdropFilter: 'blur(2px)' }} dir="rtl">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="kicker mb-4">הפתרון</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3 mb-7">
            צ'יפ אחד.<br />אפליקציה אחת.<br /><span className="text-gradient">שליטה מלאה.</span>
          </h2>
          <p className="muted text-base leading-relaxed mb-9 max-w-md">
            מתאם קטן שמתחבר לשקע ברכב + אפליקציה שמתרגמת הכל לעברית פשוטה.
            כמו מוסכניק בכיס — רק שהוא לא ישן, לא מנחש, ולא גובה לפי שעה.
          </p>
          <div className="flex gap-10">
            {[
              { n: "10", l: "יכולות" },
              { n: "+1996", l: "כל הרכבים" },
              { n: "₪299", l: "חד-פעמי" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.n}</div>
                <div className="muted-2 text-xs font-medium tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="orb orb-blue w-72 h-72 -top-10 -left-10" />
          <img src="/smart-diagnostic.jpg" alt="מתאם D10 AI מחובר לרכב" width="1024" height="682" loading="lazy" decoding="async"
            className="relative w-full rounded-2xl border border-white/12 shadow-[0_24px_80px_-16px_rgba(0,0,0,0.8)]" />
          {/* Floating chips */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="absolute -bottom-4 right-6 glass px-4 py-3 flex items-center gap-3 !rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-400/15 border border-emerald-400/25 flex items-center justify-center text-emerald-300"><Sparkles size={15} /></div>
            <div>
              <div className="text-white text-xs font-bold">ניתוח AI בזמן אמת</div>
              <div className="muted-2 text-[10px]">מותאם לדגם הרכב שלך</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="absolute -top-4 left-6 glass px-4 py-3 flex items-center gap-3 !rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-400/15 border border-blue-400/25 flex items-center justify-center text-blue-300"><Smartphone size={15} /></div>
            <div>
              <div className="text-white text-xs font-bold">הכל בעברית</div>
              <div className="muted-2 text-[10px]">בלי קודים, בלי ניחושים</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);
