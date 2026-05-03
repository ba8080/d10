import React, { useState } from 'react';
import { Cpu, Gauge, Search, Battery, MapPin, FileText, Wrench, Lightbulb, Globe, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

const features = [
  { icon: <Cpu />, num: "01", title: "בדיקת תקלות חכמה", sub: "קודי תקלה בעברית",
    desc: "לא P0420. מה הבעיה, כמה חמור, בטוח לנסוע, עלות תיקון, ומה לעשות. מותאם לדגם.",
    points: ["הסבר בעברית פשוטה", "דירוג חומרה בצבעים", "בטוח לנסוע? כן/לא", "הערכת עלות תיקון", "מותאם לדגם שלך"] },
  { icon: <Gauge />, num: "02", title: "דאשבורד חי", sub: "נתונים בזמן אמת",
    desc: "RPM, מהירות, טמפרטורה, מצבר, מצערת — חי, באנימציה.",
    points: ["RPM + מהירות", "טמפרטורת קירור", "עומס מנוע", "מתח מצבר", "מיקום מצערת"] },
  { icon: <Search />, num: "03", title: "זיהוי הונאת ק\"מ", sub: "בדיקה שעולה ₪200-500 — חינם",
    desc: "קורא ק\"מ ממספר מודולים. אם הוזז — הנתונים לא יתאימו. תוצאות מיידיות.",
    points: ["רמת סיכון", "ציון ביטחון", "השוואה לפי VIN", "חינם ומיידי", "אף אפליקציה צרכנית לא עושה את זה"] },
  { icon: <Battery />, num: "04", title: "בריאות מצבר", sub: "התראה לפני שנתקעים",
    desc: "ניטור רציף של מתח ומערכת טעינה. מזהה חולשה ימים לפני כשל.",
    points: ["בריא / נחלש / החלף", "ניתוח מגמות", "זיהוי בעיות אלטרנטור", "התראה מוקדמת", "חיזוי לינארי"] },
  { icon: <MapPin />, num: "05", title: "מעקב נסיעות", sub: "ציון נהיגה + דלק",
    desc: "זיהוי אוטומטי. מרחק, דלק, עלות, ציון 0-100 לפי האצות ובלימות.",
    points: ["זיהוי אוטומטי", "חישוב מרחק + דלק", "ציון נהיגה 0-100", "עלות דלק", "תובנות חיסכון"] },
  { icon: <FileText />, num: "06", title: "חיפוש רכב", sub: "VIN או לוחית רישוי",
    desc: "יצרן, דגם, שנה, מנוע, טסט, זיהום — ממאגר ממשלתי רשמי.",
    points: ["יצרן + דגם + שנה", "סוג מנוע", "תוקף טסט", "קבוצת זיהום", "נתונים רשמיים"] },
  { icon: <Wrench />, num: "07", title: "מעקב טיפולים", sub: "היסטוריית שירות",
    desc: "שמן, צמיגים, בלמים, פילטרים. תאריך, ק\"מ, עלות. תזכורות.",
    points: ["כל סוגי הטיפולים", "תאריך + ק\"מ + עלות", "תזכורות טסט", "היסטוריה מלאה", "ייצוא נתונים"] },
  { icon: <Lightbulb />, num: "08", title: "מדריך נורות", sub: "עובד אופליין",
    desc: "כל נורת דאשבורד — חומרה, הסבר, מה לעשות. 11 בלילה בכביש? מכוסה.",
    points: ["Check Engine, ABS, שמן", "דירוג חומרה", "הסבר + פעולה", "אופליין לחלוטין", "כל הנורות"] },
  { icon: <Globe />, num: "09", title: "עברית + אנגלית", sub: "דו-לשוני מלא",
    desc: "כל מסך, כל תשובה — עברית או אנגלית. RTL מושלם.",
    points: ["ממשק מלא בשתי שפות", "תרגום חכם דו-לשוני", "זיהוי שפה אוטומטי", "RTL מושלם", "פותח בישראל"] },
  { icon: <Lock />, num: "10", title: "אימות מאובטח", sub: "Google · Apple · אנונימי",
    desc: "Firebase. AES-256. הנתונים שלך — רק שלך.",
    points: ["Google / Apple / אנונימי", "Firebase Auth", "הצפנת AES-256", "נתונים מקומיים", "פרטיות מוחלטת"] },
];

export const FeatureDeepDive = () => {
  const [idx, setIdx] = useState(0);
  const f = features[idx];
  return (
    <section id="features" className="py-20 md:py-28" style={{ background: 'rgba(12,12,10,0.35)' }} dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-3">10 יכולות</p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">הכל תחת שליטה.</h2>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-3 mb-10 md:flex-wrap md:overflow-visible">
          {features.map((ft, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0",
                i === idx ? "bg-primary text-white" : "bg-white/8 text-white/50 hover:text-white border border-white/10"
              )}>
              <span className="font-black">{ft.num}</span>
              <span className="hidden sm:inline">{ft.title}</span>
            </button>
          ))}
        </div>

        <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="card-dark p-6 md:p-10">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-8">
            <div>
              <div className="big-num">{f.num}</div>
              <h3 className="text-xl md:text-2xl font-black text-white -mt-6 mb-1 relative z-10">{f.title}</h3>
              <p className="text-primary text-xs font-semibold mb-4">{f.sub}</p>
              <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
            </div>
            <div className="space-y-2">
              {f.points.map((d, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/8">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-white/70">{d}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-3 mt-6">
          <button onClick={() => setIdx(i => (i - 1 + features.length) % features.length)} className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary transition-colors"><ChevronRight size={16} /></button>
          <span className="text-white/30 text-xs font-mono">{String(idx + 1).padStart(2, '0')}/{features.length}</span>
          <button onClick={() => setIdx(i => (i + 1) % features.length)} className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary transition-colors"><ChevronLeft size={16} /></button>
        </div>
      </div>
    </section>
  );
};
