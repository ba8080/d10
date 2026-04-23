import React from 'react';
import { Cpu, Smartphone, Search, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "חבר", desc: "מתאם לשקע מתחת להגה. 5 שניות. נשאר לתמיד.", icon: <Cpu className="w-5 h-5" /> },
    { num: "02", title: "פתח", desc: "האפליקציה מזהה את המתאם אוטומטית.", icon: <Smartphone className="w-5 h-5" /> },
    { num: "03", title: "קבל תשובות", desc: "סריקה בלחיצה. תוצאות בעברית — מה, כמה דחוף, מה לעשות.", icon: <Search className="w-5 h-5" /> },
  ];

  return (
    <section id="how" className="py-20 md:py-28 bg-white" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">איך זה עובד</p>
          <h2 className="text-3xl md:text-5xl font-black text-surface-dark tracking-tight">שלושה צעדים. בלי ידע טכני.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }} className="group">
              <div className="big-num mb-0">{s.num}</div>
              <div className="flex items-center gap-3 -mt-6 relative z-10 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">{s.icon}</div>
                <h3 className="text-lg font-bold text-surface-dark">{s.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-2 text-xs text-gray-400 font-medium">
          <ShieldCheck size={14} className="text-accent" />
          <span>לא מזיק לרכב — רק קורא נתונים. בטוח לחלוטין.</span>
        </div>
      </div>
    </section>
  );
};
