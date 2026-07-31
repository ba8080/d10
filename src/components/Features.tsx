import React from 'react';
import { Cpu, Gauge, Search, Battery, MapPin, FileText, Wrench, Lightbulb, Globe, Lock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const featured = [
  {
    icon: <Cpu className="w-6 h-6" />, tag: "01 · הדגל שלנו", title: "בדיקת תקלות בעברית פשוטה",
    desc: "לא עוד P0420. המערכת מסבירה מה הבעיה, כמה היא חמורה, אם בטוח לנסוע, וכמה אמור לעלות התיקון — מותאם לדגם הרכב שלך.",
    points: ["הסבר בעברית פשוטה", "דירוג חומרה בצבעים", "בטוח לנסוע? כן / לא", "הערכת עלות תיקון"],
    visual: "dtc" as const,
  },
  {
    icon: <Search className="w-6 h-6" />, tag: "03 · בלעדי", title: "זיהוי הונאת קילומטראז'",
    desc: "בדיקה שעולה ₪200–500 אצל מכון — כלולה חינם. המערכת קוראת ק\"מ ממספר מודולים ברכב; אם השעון הוזז, המספרים לא יתאימו.",
    points: ["רמת סיכון + ציון ביטחון", "השוואה מול נתוני VIN", "תוצאה תוך שניות", "אף אפליקציה צרכנית לא עושה את זה"],
    visual: "km" as const,
  },
];

const rest = [
  { icon: <Gauge />, title: "דאשבורד חי", desc: "RPM, מהירות, טמפרטורה, מצבר — בזמן אמת, באנימציה." },
  { icon: <Battery />, title: "בריאות מצבר", desc: "מזהה חולשה ימים לפני שנתקעים. בריא / נחלש / החלף." },
  { icon: <MapPin />, title: "מעקב נסיעות", desc: "מרחק, דלק, עלות וציון נהיגה 0–100 — אוטומטית." },
  { icon: <FileText />, title: "חיפוש רכב", desc: "VIN או לוחית → יצרן, דגם, טסט, זיהום. ממאגר ממשלתי." },
  { icon: <Wrench />, title: "מעקב טיפולים", desc: "שמן, צמיגים, בלמים — היסטוריה מלאה + תזכורות." },
  { icon: <Lightbulb />, title: "מדריך נורות", desc: "כל נורת אזהרה — חומרה והסבר. עובד גם אופליין." },
  { icon: <Globe />, title: "עברית + אנגלית", desc: "ממשק דו-לשוני מלא, RTL מושלם. פותח בישראל." },
  { icon: <Lock />, title: "פרטיות מלאה", desc: "Google / Apple, הצפנת AES-256. הנתונים שלך — שלך." },
];

const DtcVisual = () => (
  <div className="glass !rounded-xl p-4 space-y-2.5 select-none" aria-hidden="true">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-white/40 tracking-widest">סריקת תקלות</span>
      <span className="text-[10px] font-mono text-emerald-300">הושלמה ✓</span>
    </div>
    <div className="rounded-lg bg-amber-400/10 border border-amber-400/25 p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-white">חיישן חמצן — בנק 1</span>
        <span className="text-[9px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">בינונית</span>
      </div>
      <p className="text-[11px] text-white/60 leading-snug">לא דחוף. בטוח לנסוע. מומלץ לטפל בחודש הקרוב. עלות משוערת: ₪350–500.</p>
    </div>
    <div className="rounded-lg bg-white/4 border border-white/8 p-3 flex items-center justify-between">
      <span className="text-xs text-white/70">מערכות נוספות</span>
      <span className="text-[10px] font-mono text-emerald-300">תקינות ✓</span>
    </div>
  </div>
);

const KmVisual = () => (
  <div className="glass !rounded-xl p-4 select-none" aria-hidden="true">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[10px] font-bold text-white/40 tracking-widest">בדיקת ק"מ</span>
      <span className="text-[10px] font-mono text-emerald-300">3 מקורות</span>
    </div>
    <div className="space-y-2">
      {[
        { l: "לוח מחוונים", v: "142,300", ok: true },
        { l: "מודול מנוע", v: "142,280", ok: true },
        { l: "נתוני יבואן", v: "141,900", ok: true },
      ].map((r, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg bg-white/4 border border-white/8 px-3 py-2">
          <span className="text-[11px] text-white/60">{r.l}</span>
          <span className="text-xs font-mono text-white">{r.v}</span>
        </div>
      ))}
    </div>
    <div className="mt-3 rounded-lg bg-emerald-400/10 border border-emerald-400/25 px-3 py-2 flex items-center gap-2">
      <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
      <span className="text-[11px] font-bold text-emerald-200">הנתונים תואמים — סיכון נמוך להונאה</span>
    </div>
  </div>
);

export const FeatureDeepDive = () => (
  <section id="features" className="py-24 md:py-32" style={{ background: 'rgba(6,7,10,0.45)', backdropFilter: 'blur(2px)' }} dir="rtl">
    <div className="max-w-6xl mx-auto px-6">
      <div className="mb-14">
        <span className="kicker mb-4">10 יכולות</span>
        <h2 className="h-display text-4xl md:text-6xl text-white mt-3">הכל תחת שליטה.</h2>
      </div>

      {/* Two featured cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {featured.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
            className="glass glass-hover p-7 md:p-8 flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-blue-500/12 border border-blue-400/25 flex items-center justify-center text-blue-300">{f.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{f.tag}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3">{f.title}</h3>
              <p className="muted text-sm leading-relaxed mb-4">{f.desc}</p>
              <div className="flex flex-wrap gap-2">
                {f.points.map((p, j) => (
                  <span key={j} className="text-[11px] font-medium text-white/65 bg-white/5 border border-white/10 rounded-full px-3 py-1">{p}</span>
                ))}
              </div>
            </div>
            <div className="mt-auto">{f.visual === 'dtc' ? <DtcVisual /> : <KmVisual />}</div>
          </motion.div>
        ))}
      </div>

      {/* Compact grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {rest.map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}
            className="glass glass-hover p-5 md:p-6">
            <div className="w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-cyan-300 mb-4 [&>svg]:w-5 [&>svg]:h-5">{f.icon}</div>
            <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
            <p className="muted text-xs leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
