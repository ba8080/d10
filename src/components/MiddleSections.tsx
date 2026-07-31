import React from 'react';
import { Cable, Smartphone, MessageCircleQuestion, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "חבר", desc: "מתאם לשקע ה-OBD2 מתחת להגה. 5 שניות, בלי כלים, נשאר שם לתמיד.", icon: <Cable className="w-5 h-5" /> },
    { num: "02", title: "פתח", desc: "האפליקציה מזהה את המתאם והרכב אוטומטית. בלי הגדרות.", icon: <Smartphone className="w-5 h-5" /> },
    { num: "03", title: "קבל תשובות", desc: "סריקה בלחיצה אחת. מה הבעיה, כמה דחוף, מה עושים — בעברית.", icon: <MessageCircleQuestion className="w-5 h-5" /> },
  ];

  return (
    <section id="how" className="py-24 md:py-32 section-raised" dir="rtl">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="kicker mb-4">איך זה עובד</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3">שלושה צעדים.<br />אפס ידע טכני.</h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-7 right-[16%] left-[16%] h-px bg-gradient-to-l from-blue-500/40 via-white/15 to-blue-500/40" aria-hidden="true" />
          {steps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.15 }} className="relative">
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#0b0d12] border border-blue-400/35 shadow-[0_0_28px_-6px_rgba(59,130,246,0.5)] flex items-center justify-center text-blue-300 mb-6">{s.icon}</div>
              <div className="text-[11px] font-black text-white/25 tracking-[0.3em] mb-2">{s.num}</div>
              <h3 className="text-xl font-black text-white mb-2.5">{s.title}</h3>
              <p className="muted text-sm leading-relaxed max-w-xs">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-14 inline-flex items-center gap-2.5 glass !rounded-full px-5 py-2.5 text-xs text-white/70 font-medium">
          <ShieldCheck size={15} className="text-emerald-300" />
          <span>לא מזיק לרכב — קורא נתונים בלבד. בטוח לחלוטין.</span>
        </div>
      </div>
    </section>
  );
};
