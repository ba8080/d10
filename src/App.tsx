/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  Check, 
  ShieldCheck, 
  Cpu, 
  Smartphone, 
  Search, 
  Menu, 
  X,
  ArrowRight,
  Activity,
  Globe,
  Zap,
  Clock,
  Award,
  RotateCcw,
  Mail,
  FileText,
  Scale,
  Cookie,
  ArrowUp,
  Accessibility,
  HelpCircle,
  Users,
  Battery,
  Wifi,
  Car,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'יכולות', href: '#features' },
    { name: 'איך זה עובד', href: '#how' },
    { name: 'חבילות', href: '#pricing' },
    { name: 'שאלות נפוצות', href: '#faq' },
  ];

  return (
    <>
    <nav className={cn(
      "fixed z-[100] transition-all duration-500 px-6 md:px-12 py-4",
      isScrolled 
        ? "top-3 left-4 right-4 glass border border-slate-200 shadow-lg rounded-2xl" 
        : "top-0 left-0 right-0 bg-transparent"
    )} dir="rtl">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState('', '', '/'); }}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="חזרה לעמוד הראשי"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className={cn("text-2xl font-bold tracking-tighter", isScrolled ? "text-slate-900" : "text-white")}>
            D10 <span className="font-light text-primary">AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={cn("text-xs font-semibold uppercase tracking-widest transition-colors", isScrolled ? "text-slate-600 hover:text-primary" : "text-white/80 hover:text-white")}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#pricing" 
            className="text-xs font-bold text-white border border-primary bg-primary px-6 py-2 rounded-md hover:bg-primary-dark transition-all duration-300"
          >
            הזמן עכשיו
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn("md:hidden p-2", isScrolled ? "text-slate-900" : "text-white")}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="פתח תפריט"
        >
          <Menu />
        </button>
      </div>

    </nav>

    {/* Mobile Menu - outside nav, above everything */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden fixed inset-0 z-[200] bg-white"
          dir="rtl"
        >
          {/* Header with logo + close */}
          <div className="flex justify-between items-center px-6 py-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); window.history.pushState('', '', '/'); }}
              className="flex items-center gap-2 cursor-pointer"
              aria-label="חזרה לעמוד הראשי"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900">
                D10 <span className="font-light text-primary">AI</span>
              </span>
            </a>
            <button 
              className="text-slate-900 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="סגור תפריט"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6 px-8 pt-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-medium text-slate-800 border-b border-slate-100 pb-4"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-primary text-white text-center py-4 rounded-md font-bold text-lg mt-4"
            >
              הזמן עכשיו
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden" dir="rtl">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-product.jpg"
          alt="D10 AI Smart Diagnostic Device"
          className="w-full h-full object-cover object-center"
        />
        {/* Top: dark for text readability. Center/bottom: lighter to reveal product */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/60 z-10" />

        {/* Animated Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse z-20" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse delay-1000 z-20" />
      </div>

      {/* Text content — positioned at top */}
      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center pt-28 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
            <Zap size={12} /> מוצר ישראלי · מבצע השקה
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            סוף ללחץ <span className="text-primary">לפני המוסך.</span>
          </h1>
          <p className="text-sm md:text-xl text-white/70 font-light tracking-wide mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            מתחברת לרכב שלך, קוראת את הנתונים בזמן אמת, <span className="text-white">ומסבירה לך בדיוק מה קורה</span> — לפני שאתה מוציא שקל אחד.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tesla btn-tesla-primary cta-glow w-full sm:w-auto text-center px-8 sm:px-12"
          >
            הזמן עכשיו — ₪299
          </a>
          <a href="mailto:support@d10.store" className="btn-tesla btn-tesla-secondary-dark w-full sm:w-auto text-center px-8 sm:px-12">
            לפרטים נוספים
          </a>
        </motion.div>
      </div>

      {/* Spacer — lets the product image in the photo breathe */}
      <div className="flex-grow" />

      {/* Trust badges — at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="container mx-auto px-6 relative z-10 flex flex-wrap justify-center gap-4 md:gap-8 pb-10 md:pb-14"
      >
        {[
          { icon: <Check size={14} />, text: "משלוח חינם" },
          { icon: <RotateCcw size={14} />, text: "30 יום החזרה" },
          { icon: <ShieldCheck size={14} />, text: "כל רכב מ-1996" },
          { icon: <Lock size={14} />, text: "הצפנת AES-256" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white/60 text-xs md:text-sm font-medium backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full">
            <span className="text-primary">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/30 z-10">
        <ChevronDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

const ProductShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="py-16 md:py-32 bg-white overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <motion.div 
          style={{ scale, opacity }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-blue-500/10 blur-[150px] rounded-full" />
          <img 
            src="/smart-diagnostic.jpg" 
            alt="D10 AI Smart Diagnostic Assistant" 
            className="relative z-10 w-full rounded-2xl shadow-2xl border border-slate-200"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 z-20 bg-white shadow-xl border border-slate-200 p-8 rounded-2xl max-w-xs hidden md:block">
            <h4 className="text-xl font-bold text-slate-900 mb-2">מערכת סגורה ייחודית</h4>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              המתאם והאפליקציה תוכננו יחד מהיסוד. אין מתאם גנרי, אין קודים גולמיים — רק דיוק לרכב שלך, רק D10 AI.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  const features = [
    {
      title: "AI שמכיר את הרכב שלך",
      desc: "המתאם קורא קודי תקלות ישירות מה-ECU. ה-AI מנתח לפי הדגם המדויק שלך — מה הבעיה, רמת חומרה, בטוח לנסוע, ועלות תיקון משוערת. לא קוד גנרי. ניתוח ספציפי.",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "מערכת אחת. שתי שניות.",
      desc: "חבר את מתאם D10 AI לפורט ה-OBD2 — הוא מוצא את האפליקציה דרך בלוטות' ייחודי אוטומטית. המתאם נשאר מחובר לתמיד. אין מה להגדיר.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    },
    {
      title: "100% עברית",
      desc: "ממשק, הסברי AI ואנציקלופדיית נורות הדאשבורד — הכל בעברית מלאה. פותח בישראל עבור נהגים ישראלים. בלי תרגומים, בלי ז'רגון.",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      title: "סוף לעקיצות",
      desc: "בדיקת מחשב במוסך עולה 80–200 ש\"ח לחיבור של 30 שניות. D10 AI עושה בדיוק את אותו הדבר — בחינם, כמה פעמים שתרצה. תגיע מוכן, לא תמים.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    }
  ];

  return (
    <section id="features" className="py-16 md:py-32 bg-slate-50" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={cn(
                "w-11 h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-6 transition-all duration-200 border group-hover:scale-110",
                f.color
              )}>
                {f.icon}
              </div>
              <h4 className="text-base md:text-xl font-bold text-slate-900 mb-2 md:mb-4 tracking-tight group-hover:text-primary transition-colors duration-200">{f.title}</h4>
              <p className="text-slate-500 font-light leading-relaxed text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CompareSection = () => {
  return (
    <section className="py-16 md:py-32 bg-white" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-500 text-[11px] font-bold uppercase tracking-widest mb-4">
            נורת המנוע נדלקה
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">שתי דרכים. בחר את שלך.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Without D10 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 md:p-8 rounded-2xl border border-red-200 bg-red-50 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">בלי D10</div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">לחץ ואי ודאות</h3>
            <div className="space-y-4">
              {[
                "נורה דולקת — אתה מנחש בלבד",
                "גרירה למוסך רק \"לבדיקת מחשב\" — 200 ש\"ח",
                "מוסכניק זורק קוד שאתה לא מבין",
                "תיקון של 3,500 ש\"ח שאולי שווה 350"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X size={16} className="text-red-400 shrink-0 mt-1" />
                  <span className={cn("text-slate-600 text-sm", i === 3 && "font-bold text-slate-900")}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With D10 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/[0.05] hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">עם D10 AI</div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">שליטה מלאה</h3>
            <div className="space-y-4">
              {[
                "קרא קוד תקלה בשניות ישירות מהאייפון",
                "AI מסביר: מה הבעיה, כמה דחוף, בטוח לנסוע?",
                "הערכת עלות תיקון לפני שנכנסים למוסך",
                "מגיע לטכנאי עם הדוח — לא עם תמימות"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-primary shrink-0 mt-1" />
                  <span className={cn("text-slate-600 text-sm", i === 3 && "font-bold text-slate-900")}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "חבר לרכב",
      desc: "חבר את המתאם לשקע מתחת להגה — לוקח 5 שניות. נשאר מחובר, לא צריך להוציא.",
      icon: <Cpu className="w-6 h-6" />
    },
    {
      num: "02",
      title: "פתח את האפליקציה",
      desc: "האפליקציה מזהה את המתאם אוטומטית ומציגה את פרטי הרכב שלך מיד.",
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      num: "03",
      title: "קבל תשובות",
      desc: "סריקה מלאה בלחיצה. תוצאות בעברית פשוטה — מה הבעיה, כמה דחוף, ומה לעשות.",
      icon: <Search className="w-6 h-6" />
    }
  ];

  return (
    <section id="how" className="py-16 md:py-24 bg-slate-50" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            איך זה עובד
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">פשוט. מהיר. בלי ידע טכני.</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">שלושה שלבים פשוטים ואתה יודע בדיוק מה קורה ברכב שלך.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>
              <div className="text-4xl font-black text-primary/15 mb-2 leading-none">{step.num}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Safety note + CTA */}
        <div className="text-center mt-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
            <ShieldCheck size={16} />
            לא מזיק לרכב — פלאג אנד פליי בטוח לחלוטין. רק קורא נתונים.
          </div>
          <div className="block">
            <a href="mailto:support@d10.store" className="text-primary text-sm font-bold hover:underline">
              יש שאלות? דברו איתנו לפני הרכישה →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "נורת המנוע נדלקה ונבהלתי. חיברתי את ה-D10 וזה אמר לי שזה חיישן חמצן — לא דחוף. חסכתי גרירה של 400 שקל.",
      name: "אבי כ.",
      car: "מאזדה 3, 2019",
      saved: "חסך ₪400"
    },
    {
      text: "הגעתי למוסך עם הדוח מהאפליקציה. המוסכניק הופתע שאני יודע בדיוק מה הבעיה. חסכתי לפחות 2,000 ש״ח על תיקונים מיותרים.",
      name: "דנה ר.",
      car: "יונדאי טוסון, 2021",
      saved: "חסכה ₪2,000"
    },
    {
      text: "כמכונאי חובב, זה הכלי הכי שימושי שקניתי. הכל בעברית, הכל ברור. ממליץ לכל מי שיש לו רכב.",
      name: "יוסי מ.",
      car: "טויוטה קורולה, 2020",
      saved: ""
    },
    {
      text: "האוטו שלי הראה נורה כתומה בדרך לעבודה. במקום להיכנס ללחץ, פתחתי את האפליקציה. ה-AI הסביר שזה בעיה לא דחופה ונתן לי הערכת מחיר. הגעתי למוסך מוכנה.",
      name: "מיכל ש.",
      car: "סקודה אוקטביה, 2022",
      saved: "חסכה ₪1,200"
    },
    {
      text: "יש לי 3 רכבים במשפחה. קניתי את חבילת המשפחה ועכשיו אני מנהל את כולם מאפליקציה אחת. שווה כל שקל.",
      name: "רון ד.",
      car: "3 רכבים משפחתיים",
      saved: ""
    },
    {
      text: "המוסכניק רצה לגבות 3,500 ש״ח על החלפת ממיר קטליטי. ה-D10 הראה שהבעיה היא חיישן O2 פשוט ב-350 ש״ח. חיסכון של 3,000+.",
      name: "עמית ל.",
      car: "פולקסווגן גולף, 2018",
      saved: "חסך ₪3,000+"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-32 bg-slate-50" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[11px] font-bold uppercase tracking-widest mb-4">
            ★★★★★ מה אומרים עלינו
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">נהגים חכמים כבר משתמשים.</h2>
          <p className="text-slate-500 font-light text-base">הצטרפו ל-1,240+ נהגים שכבר חוסכים אלפי שקלים ומגיעים למוסך עם ידע.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
            >
              <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900 font-bold text-sm">{review.name}</div>
                  <div className="text-slate-400 text-xs">{review.car}</div>
                </div>
                {review.saved && (
                  <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                    {review.saved}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a 
            href="https://www.instagram.com/d10_ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 text-sm hover:text-primary transition-colors"
          >
            עוד ביקורות ב-Instagram →
          </a>
        </div>
      </div>
    </section>
  );
};

const TechnicalSpecs = () => {
  const specs = [
    { category: "חומרה", icon: <Cpu className="w-4 h-4" />, items: [
      { label: "שבב", value: "ELM327 V2.1" },
      { label: "חיבור", value: "Bluetooth 5.0 BLE" },
      { label: "צריכה (שינה)", value: "< 1mA" },
      { label: "צריכה (פעיל)", value: "< 50mA" },
    ]},
    { category: "פרוטוקולים", icon: <Wifi className="w-4 h-4" />, items: [
      { label: "CAN", value: "ISO 15765-4" },
      { label: "K-Line", value: "ISO 9141-2" },
      { label: "KWP2000", value: "ISO 14230-4" },
      { label: "J1850", value: "SAE J1850" },
    ]},
    { category: "אבטחה ונתונים", icon: <Lock className="w-4 h-4" />, items: [
      { label: "הצפנה", value: "AES-256" },
      { label: "צימוד", value: "Secure BLE" },
      { label: "אחסון", value: "מקומי בלבד" },
      { label: "ייצוא", value: "CSV / PDF" },
    ]},
  ];

  return (
    <section className="py-16 md:py-32 bg-white" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <Cpu size={12} /> מפרט טכני
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">למי שרוצה לדעת יותר</h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto text-base">הפרטים הטכניים בשביל מי שמעוניין. לרוב הקונים — החיבור פשוט והתוצאות מדברות בעד עצמן.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {specs.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50 hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="text-primary">{group.icon}</div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{group.category}</h3>
              </div>
              <div className="space-y-4">
                {group.items.map((item, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">{item.label}</span>
                    <span className="text-slate-900 font-semibold text-sm font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CompatibilityChecker = () => {
  const brandsRow1 = [
    { name: "Toyota", slug: "toyota", color: "#EB0A1E" },
    { name: "Hyundai", slug: "hyundai", color: "#002C5F" },
    { name: "Kia", slug: "kia", color: "#05141F" },
    { name: "BMW", slug: "bmw", color: "#0066B1" },
    { name: "Mercedes-Benz", slug: "mercedesbenz", color: "242424" },
    { name: "Audi", slug: "audi", color: "#BB0A30" },
    { name: "Volkswagen", slug: "volkswagen", color: "#151F5D" },
    { name: "Mazda", slug: "mazda", color: "#101010" },
    { name: "Honda", slug: "honda", color: "#E40521" },
  ];

  const brandsRow2 = [
    { name: "Nissan", slug: "nissan", color: "#C3002F" },
    { name: "Subaru", slug: "subaru", color: "#013C74" },
    { name: "Škoda", slug: "skoda", color: "#4BA82E" },
    { name: "Mitsubishi", slug: "mitsubishi", color: "#E60012" },
    { name: "Peugeot", slug: "peugeot", color: "#000000" },
    { name: "Ford", slug: "ford", color: "#003478" },
    { name: "Chevrolet", slug: "chevrolet", color: "#CD9834" },
    { name: "Citroën", slug: "citroen", color: "#AC0000" },
    { name: "Seat", slug: "seat", color: "#33302E" },
  ];

  const LogoItem = ({ brand }: { brand: { name: string; slug: string; color: string } }) => (
    <div className="group flex flex-col items-center justify-center gap-3 min-w-[120px] md:min-w-[150px] px-6 py-5 mx-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      {brand.slug === "mercedesbenz" ? (
        <svg className="w-10 h-10 md:w-12 md:h-12 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.846c5.595 0 10.154 4.559 10.154 10.154S17.595 22.154 12 22.154 1.846 17.595 1.846 12 6.405 1.846 12 1.846zm0 .923A9.231 9.231 0 0 0 2.769 12 9.231 9.231 0 0 0 12 21.231 9.231 9.231 0 0 0 21.231 12 9.231 9.231 0 0 0 12 2.769zm0 1.48l3.552 6.95H8.448L12 4.25zm-4.17 7.873h8.34L12 19.36l-4.17-7.237zm-.785-.462L3.938 12.8a8.273 8.273 0 0 1 3.385-6.588l-.278 5.449zm9.91 0l-.278-5.449A8.273 8.273 0 0 1 20.062 12.8l-3.107-1.139zm-9.478.924l3.107 5.449a8.273 8.273 0 0 1-6.492-2.537l3.385-2.912zm9.046 0l3.385 2.912a8.273 8.273 0 0 1-6.492 2.537l3.107-5.449z"/>
        </svg>
      ) : (
        <img
          src={`https://cdn.simpleicons.org/${brand.slug}/${brand.color.replace('#', '')}`}
          alt={brand.name}
          className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />
      )}
      <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-700 transition-colors duration-200">{brand.name}</span>
    </div>
  );

  const MarqueeRow = ({ brands, speed = 35 }: { brands: typeof brandsRow1; speed?: number }) => {
    return (
      <div className="relative overflow-hidden py-2">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
        <div
          className="flex animate-marquee-rtl"
          style={{ animationDuration: `${speed}s` }}
        >
          {/* Duplicate the list 3x for seamless loop */}
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <LogoItem key={`${brand.slug}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-32 bg-slate-50 overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6 text-center mb-10 md:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-widest mb-4">
            <Car size={12} /> תאימות
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">תואם לרכב שלך?</h2>
          <p className="text-slate-500 font-light max-w-2xl mx-auto mb-4 text-base">
            לכל רכב יצרני יש שקע אבחון קטן מתחת להגה — <span className="text-slate-900 font-medium">D10 AI מתחבר אליו בשניות</span>, בלי כלים, בלי טכנאי.
          </p>
          <p className="text-slate-400 font-light max-w-2xl mx-auto text-sm">
            תואם לכמעט כל רכב משנת 1996 ומעלה. יותר מ-10,000 דגמים נתמכים.
          </p>
        </motion.div>
      </div>

      {/* Scrolling logo rows */}
      <div className="space-y-4 mb-12">
        <MarqueeRow brands={brandsRow1} speed={40} />
        <MarqueeRow brands={brandsRow2} speed={50} />
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm">
          <span className="text-slate-500 text-sm">לא בטוח אם הרכב שלך תואם?</span>
          <a href="mailto:support@d10.store" className="text-primary text-sm font-bold hover:underline cursor-pointer">שלח לנו את דגם הרכב ←</a>
        </div>
      </div>
    </section>
  );
};

const FullScreenImage = () => {
  return (
    <section className="relative h-[50vh] md:h-[80vh] bg-black overflow-hidden" dir="rtl">
      <img 
        src="/smart-driving.jpg" 
        alt="D10 AI Handheld Device" 
        className="w-full h-full object-cover opacity-60"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            חווית נהיגה חכמה יותר
          </h2>
          <p className="text-base md:text-xl text-white/70 font-light leading-relaxed px-2">
            D10 AI מעניק לך את הביטחון שאתה צריך על הכביש. דע בדיוק מה קורה מתחת למכסה המנוע בכל רגע נתון.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const SOLO_PAYMENT_URL = "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c";

  const bundles = [
    {
      name: "סולו",
      price: "299",
      perUnit: null as string | null,
      savings: null as string | null,
      subtitle: "מתאם D10 AI + אפליקציה",
      features: ["מתאם D10 AI מקורי", "אפליקציית D10 AI לאייפון", "ניתוח תקלות AI מלא", "דאשבורד חי בזמן אמת", "אחריות שנה", "תמיכה בדוא\"ל"],
      cta: "הזמן עכשיו",
      highlight: false,
      color: "border-white/10",
      paymentUrl: SOLO_PAYMENT_URL
    },
    {
      name: "משפחתי",
      price: "719",
      perUnit: "~₪240",
      savings: "חוסך 20%",
      subtitle: "3 מערכות D10 AI מלאות",
      features: ["3 מתאמי D10 AI מקוריים", "אפליקציית D10 AI לכל יחידה", "ניתוח תקלות AI מלא", "לוח בקרה משפחתי", "אחריות שנה", "תמיכה מועדפת"],
      cta: "הכי פופולרי",
      highlight: true,
      color: "border-primary bg-primary/5 shadow-2xl shadow-primary/10",
      paymentUrl: "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=717&Coin=1&FixTash=False&Info=D10_3_bunddle&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5B3x~D10_3_bunddle~3~239%5D&sendemail=True&tmp=1&signature=da705b380753b049004ea69ad5152e0f0ba447a1cc89eb71fae15c6aa0876c9f"
    },
    {
      name: "אולטימייט",
      price: "800",
      perUnit: "~₪200",
      savings: "חוסך 33%",
      subtitle: "4 מערכות D10 AI מלאות",
      features: ["4 מתאמי D10 AI מקוריים", "אפליקציית D10 AI לכל יחידה", "ניתוח תקלות AI מלא", "לוח בקרה מרכזי", "אחריות שנתיים", "תמיכה VIP"],
      cta: "הזמן עכשיו",
      highlight: false,
      color: "border-white/10",
      paymentUrl: "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=800&Coin=1&FixTash=False&Info=D10_4_bunddle&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&sendemail=True&tmp=1&signature=e4be36b9fd6a9f887aca12fbaae6d85770913acc40622940f310c070f3d0cd4f"
    }
  ];

  const soloPaymentUrl = SOLO_PAYMENT_URL;

  return (
    <section id="pricing" className="py-16 md:py-32 bg-white" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
            🔥 מחיר השקה — לזמן מוגבל
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">בחר את החבילה שלך</h2>
          <p className="text-slate-500 font-light text-base mb-2">תשלום חד-פעמי. ללא מנוי. משלוח חינם.</p>
          <p className="text-yellow-400 text-sm font-bold">★★★★★ 4.9/5 — 1,240+ נהגים מרוצים</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {bundles.map((b, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={cn(
                "p-6 sm:p-8 md:p-12 rounded-2xl border flex flex-col items-center text-center transition-all duration-200 relative cursor-pointer hover:-translate-y-2 hover:shadow-xl",
                b.color,
                b.highlight && "pricing-highlight",
                !b.highlight && "bg-slate-50 hover:border-primary/30"
              )}
            >
              {b.savings && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                  {b.savings}
                </div>
              )}
              <h4 className={cn(
                "text-sm font-bold uppercase tracking-widest mb-2",
                b.highlight ? "text-primary" : "opacity-60"
              )}>{b.name}</h4>
              <p className="text-slate-400 text-sm mb-4">{b.subtitle}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-bold text-slate-900">₪{b.price}</span>
              </div>
              {b.perUnit && (
                <p className="text-slate-400 text-sm mb-6 md:mb-8">{b.perUnit} ליחידה</p>
              )}
              {!b.perUnit && <div className="mb-6 md:mb-8" />}
              
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-grow">
                {b.features.map((f, j) => (
                  <li key={j} className="text-sm font-light text-slate-700 flex items-center gap-2 justify-center">
                    <Check size={14} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <a
                href={b.paymentUrl}
                target={b.paymentUrl.startsWith('http') ? '_blank' : undefined}
                rel={b.paymentUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={cn(
                  "w-full py-4 rounded-md font-bold text-sm uppercase tracking-widest transition-all duration-300 min-h-[48px] flex items-center justify-center",
                  b.highlight ? "bg-primary text-white hover:bg-primary-dark cta-glow shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30" : "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                {b.cta}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Trust Process Steps */}
        <div className="max-w-2xl mx-auto mt-12 md:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Lock size={20} />, title: "תשלום מאובטח", desc: "הצפנת SSL 256-bit" },
              { icon: <Clock size={20} />, title: "משלוח חינם", desc: "תוך 3 ימי עסקים" },
              { icon: <RotateCcw size={20} />, title: "30 יום החזרה", desc: "החזר כספי מלא" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-primary mb-2">{item.icon}</div>
                <div className="text-slate-900 font-bold text-sm">{item.title}</div>
                <div className="text-slate-400 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm mb-2">הצטרפו ל-1,240+ נהגים מרוצים</p>
            <a href="mailto:support@d10.store" className="text-primary text-sm font-bold hover:underline">
              צריך עזרה בבחירה? דברו איתנו →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('support@d10.store');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#0F172A] text-white py-12 md:py-20 border-t border-slate-800" dir="rtl" role="contentinfo">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="text-center md:text-right">
            <span className="text-2xl font-bold tracking-tighter text-white mb-4 block">
              D10 <span className="font-light text-white/60">AI</span>
            </span>
            <p className="text-white/40 text-sm font-light max-w-xs">
              העתיד של דיאגנוסטיקת הרכב כבר כאן. פותח בישראל עם אהבה לטכנולוגיה ורכבים.
            </p>
            <p className="text-white/30 text-xs mt-3">
              <a 
                href="mailto:support@d10.store" 
                onClick={handleCopyEmail}
                className="hover:text-white transition-colors"
              >
                {copied ? 'הועתק ללוח!' : 'support@d10.store'}
              </a>
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs font-bold uppercase tracking-widest text-white/40">
            <a href="#privacy" className="hover:text-white transition-colors py-2 px-1 min-h-[44px] flex items-center">מדיניות פרטיות</a>
            <a href="#terms" className="hover:text-white transition-colors py-2 px-1 min-h-[44px] flex items-center">תנאי שימוש</a>
            <a href="#accessibility" className="hover:text-white transition-colors py-2 px-1 min-h-[44px] flex items-center">נגישות</a>
            <a href="#returns" className="hover:text-white transition-colors py-2 px-1 min-h-[44px] flex items-center">ביטולים והחזרות</a>
          </div>

          <div className="flex gap-4">
            <a 
              href="mailto:support@d10.store" 
              onClick={handleCopyEmail}
              title={copied ? 'הועתק ללוח!' : 'שלח אימייל'}
              aria-label="שלח אימייל" 
              className="relative w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              {copied ? <Check size={18} /> : <Mail size={18} />}
            </a>
            <a 
              href="https://www.instagram.com/d10_ai/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a 
              href="https://www.facebook.com/d10ai" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a 
              href="https://www.tiktok.com/@d10_ai" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </div>
        </div>

        <div className="mt-10 md:mt-20 pt-8 border-t border-white/5 text-center space-y-2">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
            © 2026 D10 · כל הזכויות שמורות · פותח בישראל 🇮🇱
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Cookie Consent Banner ---

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('d10_cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('d10_cookie_consent', 'granted');
    if (typeof window.fbq === 'function') {
      window.fbq('consent', 'grant');
    }
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('d10_cookie_consent', 'denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6" dir="rtl">
      <div className="max-w-3xl mx-auto glass border border-slate-200 shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-700 font-light leading-relaxed">
            אתר זה משתמש בעוגיות (Cookies) ובכלי מעקב לצורך שיפור חוויית הגלישה וניתוח תנועה. 
            למידע נוסף, ראה את <a href="#privacy" className="text-primary underline">מדיניות הפרטיות</a> שלנו.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={handleAccept} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors">אשר</button>
          <button onClick={handleDecline} className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">דחה</button>
        </div>
      </div>
    </div>
  );
};

// --- Legal Page Layout ---

const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="min-h-screen bg-white pt-28 pb-20" dir="rtl">
    <div className="container mx-auto px-6 max-w-3xl">
      <a href="#" className="inline-flex items-center gap-2 text-primary text-sm mb-8 hover:underline">→ חזרה לעמוד הראשי</a>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 tracking-tight">{title}</h1>
      <div className="prose-legal space-y-6 text-slate-600 text-sm font-light leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

// --- Privacy Policy ---

const PrivacyPolicy = () => (
  <LegalPage title="מדיניות פרטיות">
    <p className="text-slate-400 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-slate-900">1. כללי</h2>
    <p>D10 ("החברה", "אנחנו") מפעילה את אתר www.d10.store ואת מוצרי D10 AI. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.</p>
    
    <h2 className="text-lg font-bold text-slate-900">2. מידע שאנו אוספים</h2>
    <p>אנו עשויים לאסוף את סוגי המידע הבאים:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>פרטי קשר: שם, כתובת דוא"ל, מספר טלפון (בעת יצירת קשר או הזמנה)</li>
      <li>מידע על הזמנות: פרטי רכישה, כתובת למשלוח, פרטי תשלום</li>
      <li>נתוני גלישה: כתובת IP, סוג דפדפן, דפים שנצפו, זמני גלישה</li>
      <li>עוגיות וכלי מעקב: Meta Pixel, Google Analytics (בכפוף להסכמתך)</li>
    </ul>
    
    <h2 className="text-lg font-bold text-slate-900">3. מטרות השימוש במידע</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>עיבוד הזמנות ומשלוחים</li>
      <li>מתן שירות לקוחות ותמיכה טכנית</li>
      <li>שיפור האתר והמוצרים שלנו</li>
      <li>שליחת עדכונים ותקשורת שיווקית (בכפוף להסכמתך בלבד)</li>
      <li>ניתוח סטטיסטי ומגמות שימוש</li>
    </ul>
    
    <h2 className="text-lg font-bold text-slate-900">4. שיתוף מידע עם צדדים שלישיים</h2>
    <p>אנו עשויים לשתף מידע עם ספקי שירות צד שלישי הנדרשים לתפעול העסק, כגון:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>Meta (Facebook) — לצורך פרסום ממוקד (Meta Pixel)</li>
      <li>שירותי שילוח ולוגיסטיקה</li>
      <li>מעבדי תשלומים</li>
    </ul>
    <p>אנו לא מוכרים את המידע האישי שלך לצדדים שלישיים.</p>
    
    <h2 className="text-lg font-bold text-slate-900">5. תקופת שמירת המידע</h2>
    <p>אנו שומרים מידע אישי כל עוד הוא נדרש למטרות שלשמן נאסף, או כנדרש על פי חוק. מידע הקשור לעסקאות יישמר לפחות 7 שנים לצורכי מס וחשבונאות.</p>
    
    <h2 className="text-lg font-bold text-slate-900">6. עוגיות (Cookies)</h2>
    <p>האתר משתמש בעוגיות חיוניות לתפעול האתר ובעוגיות אנליטיות/שיווקיות (בכפוף להסכמתך). ניתן לשלוט בעוגיות דרך הגדרות הדפדפן.</p>
    
    <h2 className="text-lg font-bold text-slate-900">7. זכויותיך</h2>
    <p>בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, עומדות לך הזכויות הבאות:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>עיון במידע האישי שלך</li>
      <li>תיקון מידע שגוי</li>
      <li>בקשה למחיקת מידע</li>
      <li>הסרה מרשימות תפוצה שיווקיות</li>
    </ul>
    
    <h2 className="text-lg font-bold text-slate-900">8. יצירת קשר</h2>
    <p>לשאלות בנושא פרטיות או למימוש זכויותיך, ניתן לפנות אלינו בדוא"ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

// --- Terms of Use ---

const TermsOfUse = () => (
  <LegalPage title="תנאי שימוש">
    <p className="text-slate-400 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-slate-900">1. כללי</h2>
    <p>ברוכים הבאים לאתר www.d10.store המופעל על ידי D10 ("החברה"). השימוש באתר ובמוצרים שלנו מהווה הסכמה לתנאים אלה.</p>
    
    <h2 className="text-lg font-bold text-slate-900">2. תיאור המוצר</h2>
    <p>D10 AI הוא מכשיר דיאגנוסטי לרכב המתחבר ליציאת OBD2 ומספק מידע על מצב הרכב באמצעות אפליקציה ייעודית.</p>
    <p className="text-yellow-400/80 font-medium">⚠️ חשוב: המוצר מספק מידע אינפורמטיבי בלבד ואינו מהווה תחליף לבדיקה מקצועית של רכב על ידי מוסכניק מוסמך. אין להסתמך על המוצר לצורך קבלת החלטות בטיחותיות.</p>
    
    <h2 className="text-lg font-bold text-slate-900">3. תאימות</h2>
    <p>המוצר תואם לרוב כלי הרכב המצוידים ביציאת OBD2 (1996 ומעלה). החברה אינה מתחייבת לתאימות מלאה עם כל דגם רכב. מומלץ לבדוק תאימות לפני הרכישה.</p>
    
    <h2 className="text-lg font-bold text-slate-900">4. רכישות ותשלומים</h2>
    <p>המחירים באתר כוללים מע"מ אלא אם צוין אחרת. החברה שומרת לעצמה את הזכות לעדכן מחירים. מחיר שאושר בעת ההזמנה הוא המחיר הקובע.</p>
    
    <h2 className="text-lg font-bold text-slate-900">5. הגבלת אחריות</h2>
    <p>החברה אינה אחראית לנזקים ישירים או עקיפים הנובעים משימוש במוצר, לרבות נזקים לרכב, אובדן נתונים, או הסתמכות על מידע שסופק על ידי המוצר. השימוש במוצר הוא על אחריות המשתמש.</p>
    
    <h2 className="text-lg font-bold text-slate-900">6. קניין רוחני</h2>
    <p>כל התכנים באתר, לרבות טקסטים, עיצובים, לוגואים ותוכנה, הם קניינה של D10 ואין להעתיקם ללא אישור.</p>
    
    <h2 className="text-lg font-bold text-slate-900">7. דין וסמכות שיפוט</h2>
    <p>תנאים אלה כפופים לחוקי מדינת ישראל. סמכות השיפוט הבלעדית תהא לבתי המשפט המוסמכים בישראל.</p>
    
    <h2 className="text-lg font-bold text-slate-900">8. יצירת קשר</h2>
    <p>לשאלות בנוגע לתנאי השימוש: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

// --- Accessibility Statement ---

const AccessibilityStatement = () => (
  <LegalPage title="הצהרת נגישות">
    <p className="text-slate-400 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-slate-900">מחויבות לנגישות</h2>
    <p>D10 מחויבת להנגשת האתר והשירותים שלה לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ותקנות הנגישות.</p>
    
    <h2 className="text-lg font-bold text-slate-900">מה עשינו</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>שימוש ב-HTML סמנטי עם היררכיית כותרות נכונה</li>
      <li>תמיכה בניווט מקלדת מלא</li>
      <li>תמיכה בקוראי מסך (ARIA labels)</li>
      <li>ניגודיות צבעים מספקת</li>
      <li>תמיכה מלאה בעברית (RTL)</li>
      <li>טפסים עם תוויות נגישות</li>
      <li>טקסט חלופי לתמונות</li>
    </ul>
    
    <h2 className="text-lg font-bold text-slate-900">מגבלות ידועות</h2>
    <p>ייתכן שחלק מהתכנים באתר אינם נגישים באופן מלא. אנו עובדים באופן שוטף לשיפור הנגישות.</p>
    
    <h2 className="text-lg font-bold text-slate-900">יצירת קשר בנושא נגישות</h2>
    <p>נתקלתם בבעיית נגישות? נשמח לשמוע ולטפל. פנו אלינו בדוא"ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

// --- Returns & Cancellation Policy ---

const ReturnsCancellationPolicy = () => (
  <LegalPage title="מדיניות ביטולים והחזרות">
    <p className="text-slate-400 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-slate-900">1. זכות ביטול</h2>
    <p>בהתאם לחוק הגנת הצרכן, התשמ"א-1981, הינך רשאי/ת לבטל עסקה תוך 14 ימים מיום קבלת המוצר או מיום קבלת מסמך הגילוי (המאוחר מביניהם), בתנאי שהמוצר לא נפגע ולא נעשה בו שימוש.</p>
    
    <h2 className="text-lg font-bold text-slate-900">2. תהליך ביטול</h2>
    <p>לביטול עסקה, יש לשלוח הודעה בדוא"ל ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a> עם פרטי ההזמנה. נאשר את קבלת הבקשה תוך 2 ימי עסקים.</p>
    
    <h2 className="text-lg font-bold text-slate-900">3. החזר כספי</h2>
    <p>ההחזר הכספי יבוצע תוך 14 ימים מקבלת בקשת הביטול, באמצעי התשלום המקורי. החברה רשאית לגבות דמי ביטול בשיעור של עד 5% ממחיר המוצר או 100 ש"ח, הנמוך מביניהם.</p>
    
    <h2 className="text-lg font-bold text-slate-900">4. החזרת המוצר</h2>
    <p>המוצר יוחזר באריזתו המקורית, תקין ושלם. עלויות משלוח ההחזרה יחולו על הלקוח, אלא אם המוצר התקבל פגום.</p>
    
    <h2 className="text-lg font-bold text-slate-900">5. מוצר פגום</h2>
    <p>קיבלת מוצר פגום? פנה/י אלינו מיידית ב: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a> ונטפל בהחלפה או החזר מלא כולל עלויות משלוח.</p>
    
    <h2 className="text-lg font-bold text-slate-900">6. אחריות</h2>
    <p>המוצר מגיע עם אחריות יצרן כמפורט בעמוד המוצר. האחריות מכסה תקלות ייצור ואינה מכסה נזק שנגרם משימוש לא תקין.</p>
  </LegalPage>
);

// --- Accessibility Widget ---

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    largeText: false,
    highContrast: false,
    readableFont: false,
    highlightLinks: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newVal = !prev[key];
      const bodyCls = document.body.classList;
      
      if (key === 'largeText') newVal ? bodyCls.add('a11y-large-text') : bodyCls.remove('a11y-large-text');
      if (key === 'highContrast') newVal ? bodyCls.add('a11y-high-contrast') : bodyCls.remove('a11y-high-contrast');
      if (key === 'readableFont') newVal ? bodyCls.add('a11y-readable-font') : bodyCls.remove('a11y-readable-font');
      if (key === 'highlightLinks') newVal ? bodyCls.add('a11y-highlight-links') : bodyCls.remove('a11y-highlight-links');
      
      localStorage.setItem(`a11y_${String(key)}`, String(newVal));
      return { ...prev, [key]: newVal };
    });
  };

  const resetSettings = () => {
    setSettings({
      largeText: false,
      highContrast: false,
      readableFont: false,
      highlightLinks: false,
    });
    document.body.classList.remove('a11y-large-text', 'a11y-high-contrast', 'a11y-readable-font', 'a11y-highlight-links');
    ['largeText', 'highContrast', 'readableFont', 'highlightLinks'].forEach(key => localStorage.removeItem(`a11y_${key}`));
  };

  useEffect(() => {
    // Restore settings from localStorage on mount
    const savedSettings = { ...settings };
    let hasSaved = false;
    
    (['largeText', 'highContrast', 'readableFont', 'highlightLinks'] as Array<keyof typeof settings>).forEach(key => {
      const stringKey = String(key);
      if (localStorage.getItem(`a11y_${stringKey}`) === 'true') {
        savedSettings[key] = true;
        document.body.classList.add(`a11y-${stringKey.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
        hasSaved = true;
      }
    });
    
    if (hasSaved) setSettings(savedSettings);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[999] bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform border-2 border-white/20"
        aria-label="תפריט נגישות"
      >
        <Accessibility size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[1000] w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            dir="rtl"
          >
            <div className="bg-primary p-4 flex justify-between items-center text-white">
              <h2 className="font-bold flex items-center gap-2">
                <Accessibility size={20} /> תפריט נגישות
              </h2>
              <button onClick={() => setIsOpen(false)} aria-label="סגור תפריט"><X size={20} /></button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <button 
                onClick={() => toggleSetting('largeText')}
                className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${settings.largeText ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="font-bold text-sm">הגדלת טקסט</span>
                <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${settings.largeText ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </button>
              
<button 
                onClick={() => toggleSetting('highContrast')}
                className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${settings.highContrast ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="font-bold text-sm">ניגודיות גבוהה</span>
                <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${settings.highContrast ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </button>

              <button 
                onClick={() => toggleSetting('readableFont')}
                className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${settings.readableFont ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="font-bold text-sm">גופן קריא קלאסי</span>
                <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${settings.readableFont ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </button>

              <button 
                onClick={() => toggleSetting('highlightLinks')}
                className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${settings.highlightLinks ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="font-bold text-sm">הדגשת קישורים</span>
                <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${settings.highlightLinks ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              <button 
                onClick={resetSettings}
                className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl transition-colors text-sm"
              >
                איפוס הגדרות נגישות
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MobileStickyBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-lg px-4 py-3 safe-area-pb" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-slate-900 font-bold text-sm">D10 AI</div>
          <div className="text-slate-500 text-xs">החל מ-₪299 · משלוח חינם</div>
        </div>
        <a
          href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark transition-all active:scale-95 whitespace-nowrap"
        >
          קנה עכשיו
        </a>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { question: "האם D10 AI עובד עם כל מתאם OBD2?", answer: "לא. D10 AI היא מערכת סגורה ומקורית — האפליקציה פועלת אך ורק עם מתאם D10 AI המקורי שנרכש יחד. לא ניתן להשתמש במתאמי ELM327 גנריים. הסגירות הזאת היא מה שמאפשרת לנו לספק דיוק, מהירות ועומק AI שאף מוצר גנרי לא יכול." },
    { question: "אילו רכבים תואמים למערכת?", answer: "D10 AI תואם לכל רכב עם יציאת OBD2 — כלומר כמעט כל רכב פרטי מ-1996 ומעלה, כולל Toyota, Hyundai, Kia, BMW, Mercedes, Nissan, Mazda, Volkswagen ועוד 10,000 דגמים. בנזין ודיזל כאחד." },
    { question: "האם הנתונים שלי נשמרים בענן?", answer: "הנתונים החיים (RPM, מהירות, טמפרטורה) מעובדים על המכשיר שלך בלבד. רק קודי תקלות נשלחים לשרת ה-AI לצורך ניתוח — מוצפנים AES-256 ולא משותפים עם צד שלישי. לא מוכרים מידע." },
    { question: "האם המתאם יגרום נזק לרכב?", answer: "בשום אופן. מתאם D10 AI קורא נתונים בלבד — לא כותב, לא מתקן, לא משנה דבר ברכב. צריכת החשמל בעמידה פחות מ-1mA — פחות מכרטיסיית חניה מחוברת לחשמל." },
    { question: "מה ההבדל מאפליקציות OBD2 גנריות כמו Torque?", answer: "אפליקציות גנריות דורשות מתאם נפרד, מספקות קודים גולמיים בלבד, ואין להן שכבת AI. D10 AI תוכנן כמערכת אחת — החומרה מותאמת לתוכנה, ה-AI מנתח לפי הרכב שלך ספציפית. ההבדל הוא כמו בין גוגל מפות לבין שאלת אנשים בדרך." },
    { question: "מה קורה אם אין תקלות ברכב שלי?", answer: "מעולה — זה סימן טוב. אבל D10 AI שימושי גם ברכב בריא: דאשבורד חי בזמן אמת, ניקוד בריאות הרכב, מעקב שירות, תזכורות טסט ואנציקלופדיית נורות דאשבורד. המערכת עובדת בשבילך גם כשהרכב מושלם." }
  ];

  return (
    <section id="faq" className="py-16 md:py-32 bg-slate-50" dir="rtl">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <HelpCircle size={12} /> שאלות נפוצות
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">שאלות ותשובות</h2>
          <p className="text-slate-500 font-light text-base">כל מה שצריך לדעת לפני הרכישה</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border border-slate-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-5 md:p-6 text-right hover:bg-slate-50 transition-colors"
              >
                <span className="text-slate-900 font-semibold text-base">{faq.question}</span>
                <ChevronDown size={20} className={cn("text-slate-400 transition-transform duration-300 shrink-0 mr-4", openIndex === i && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-slate-500 leading-relaxed text-base">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

declare global {
  interface Window { fbq: any; }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['privacy', 'terms', 'accessibility', 'returns'].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Activate Meta Pixel if previously consented
  useEffect(() => {
    const consent = localStorage.getItem('d10_cookie_consent');
    if (consent === 'granted' && typeof window.fbq === 'function') {
      window.fbq('consent', 'grant');
    }
  }, []);

  const renderLegalPage = () => {
    switch (currentPage) {
      case 'privacy': return <PrivacyPolicy />;
      case 'terms': return <TermsOfUse />;
      case 'accessibility': return <AccessibilityStatement />;
      case 'returns': return <ReturnsCancellationPolicy />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[300] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md">דלג לתוכן</a>
      <Navbar />
      
      {currentPage ? (
        <>
          {renderLegalPage()}
          <Footer />
        </>
      ) : (
        <>
          <main id="main-content" role="main">
            <Hero />
            <HowItWorks />
            <CompareSection />
            <Pricing />
            <CompatibilityChecker />

            {/* FAQ - Inline */}
            <section id="faq" className="py-16 md:py-24 bg-white" dir="rtl">
              <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-10 md:mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
                    <HelpCircle size={12} /> שאלות נפוצות
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">יש שאלות? יש תשובות.</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { q: "האם D10 יכול להזיק לרכב?", a: "ממש לא. D10 AI רק קורא נתונים מהמחשב של הרכב — בדיוק כמו שמוסך עושה. אין גישת כתיבה, אין סיכון. מאושר לכל רכב מ-1996." },
                    { q: "מה קורה אחרי שאני מזמין?", a: "תקבל את D10 AI תוך 3 ימי עסקים. תחבר את המתאם לשקע מתחת להגה (5 שניות), תוריד את האפליקציה, ותתחיל לסרוק. הכל אוטומטי." },
                    { q: "זה עובד על הרכב שלי?", a: "כמעט בוודאות. D10 AI תואם לכל רכב עם יציאת OBD2 — כמעט כל רכב פרטי מ-1996 ומעלה. טויוטה, יונדאי, קיא, BMW, מזדה, ועוד אלפי דגמים." },
                    { q: "אני צריך ידע טכני?", a: "בכלל לא. האפליקציה מסבירה הכל בעברית פשוטה — מה הבעיה, כמה זה דחוף, ומה לעשות. בנינו את זה למי שלא מבין במכוניות." },
                    { q: "מה ההבדל בין D10 לבדיקה במוסך?", a: "בדיקת מחשב במוסך עולה 80-200 ₪ לכל פעם. D10 AI נותן את אותה בדיקה בחינם, בלי הגבלה, ישר מהנייד — בכל מקום ובכל זמן." },
                    { q: "יש מנוי חודשי?", a: "לא. תשלום חד-פעמי בלבד. אין מנוי, אין עלויות נוספות. מחיר השקה — ₪299 עם משלוח חינם." },
                    { q: "מה אם אני לא מרוצה?", a: "30 יום להחזרה מלאה, בלי שאלות. אם לא חסכת כסף בביקור הראשון במוסך — נחזיר לך את הכסף." },
                  ].map((item, i) => (
                    <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                      <summary className="flex items-center justify-between p-5 cursor-pointer text-slate-900 font-bold text-sm hover:text-primary transition-colors">
                        {item.q}
                        <ChevronDown size={18} className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 mr-4" />
                      </summary>
                      <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">
                        {item.a}
                      </div>
                    </details>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <a href="mailto:support@d10.store" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                    <Mail size={16} /> עוד שאלות? דברו איתנו
                  </a>
                </div>
              </div>
            </section>

            <Testimonials />

            {/* Final CTA */}
            <section className="py-20 md:py-32 bg-primary text-white text-center relative overflow-hidden" dir="rtl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary opacity-90" />
              <div className="container mx-auto px-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tighter">
                    מוכן לחסוך אלפי שקלים?
                  </h2>
                  <p className="text-white/80 text-base sm:text-xl mb-8 max-w-xl mx-auto font-light">
                    הצטרף ל-1,240+ נהגים שכבר מגיעים למוסך עם ידע — לא עם תמימות.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-10 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl cta-glow"
                    >
                      הזמן עכשיו — ₪299
                    </a>
                    <a href="mailto:support@d10.store" className="text-white/70 font-medium text-sm hover:text-white transition-colors underline underline-offset-4">
                      לפרטים נוספים →
                    </a>
                  </div>
                  <div className="mt-8 flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/50">
                    <div className="flex items-center gap-2"><Check size={14} /> משלוח חינם</div>
                    <div className="flex items-center gap-2"><RotateCcw size={14} /> 30 יום החזרה מלאה</div>
                    <div className="flex items-center gap-2"><ShieldCheck size={14} /> תשלום מאובטח</div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-slate-50 py-6 px-6 text-center" dir="rtl">
              <p className="text-slate-300 text-xs max-w-2xl mx-auto leading-relaxed">
                * D10 AI הוא מכשיר דיאגנוסטי אינפורמטיבי ואינו מהווה תחליף לבדיקה מקצועית. יש להתייעץ עם מוסכניק מוסמך לפני ביצוע תיקונים. המחירים כוללים מע"מ. כל שמות המותגים והלוגואים הם סימנים מסחריים של בעליהם.
              </p>
            </div>
          </main>

          <Footer />
        </>
      )}

      <MobileStickyBar />
      <CookieConsentBanner />
      <AccessibilityWidget />
    </div>
  );
}
