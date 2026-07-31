import React from 'react';
import { AlertTriangle, Search, DollarSign, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

export const PainPoints = () => {
  const pains = [
    { icon: <AlertTriangle className="w-5 h-5" />, title: "נורה דולקת — אפס מושג", desc: "50 תשובות סותרות בגוגל. מסוכן? אפשר לנסוע?" },
    { icon: <DollarSign className="w-5 h-5" />, title: "משלם יותר מדי במוסך?", desc: "המוסכניק אומר שזה דחוף ויקר. אין לך שום דרך לדעת אם הוא צודק — או סתם מנפח את החשבון." },
    { icon: <Search className="w-5 h-5" />, title: "קונה רכב יד שנייה? בלי לדעת מה עבר עליו", desc: "הק\"מ בשעון לא תמיד אמיתיים. אלפי אנשים בישראל קונים רכב עם מספרים מזויפים — ומגלים רק אחרי שמשלמים." },
    { icon: <BarChart3 className="w-5 h-5" />, title: "אלפי נתונים — אפס גישה", desc: "צריכת דלק, מצבר, נהיגה. הכל שם — מעולם לא הייתה לך גישה." },
  ];

  return (
    <section className="py-20 md:py-28" style={{ background: 'rgba(12,12,10,0.35)' }} dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <span className="inline-block bg-red-500/90 text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-3">הבעיה</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">כל נהג מכיר<br/>את הסיוט הזה.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {pains.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="card-dark group cursor-pointer p-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-danger/20 flex items-center justify-center text-danger shrink-0 mt-0.5 group-hover:bg-danger group-hover:text-white transition-colors">{p.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
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
  <section className="py-20 md:py-28" style={{ background: 'rgba(12,12,10,0.35)' }} dir="rtl">
    <div className="max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block bg-primary/90 text-white text-xs font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-4">הפתרון</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">צ'יפ אחד.<br/>אפליקציה אחת.<br/><span className="text-primary">שליטה מלאה.</span></h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">מתאם קטן שמתחבר לשקע ברכב + אפליקציה חכמה שמתרגמת את הנתונים לעברית פשוטה. כמו מוסכניק בכיס — לא ישן, לא משקר, לא גובה יותר מדי.</p>
          <div className="flex gap-6 text-white/40 text-xs font-medium">
            <div><span className="text-2xl font-black text-white block">10</span>יכולות</div>
            <div><span className="text-2xl font-black text-white block">1996+</span>רכבים</div>
            <div><span className="text-2xl font-black text-white block">₪299</span>חד-פעמי</div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <img src="/smart-diagnostic.jpg" alt="מתאם D10 AI מחובר לרכב" width="1024" height="682" loading="lazy" decoding="async" className="w-full rounded-xl border border-white/10" />
        </motion.div>
      </div>
    </div>
  </section>
);
