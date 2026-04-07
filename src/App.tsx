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
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4",
      isScrolled ? "glass border-b border-white/10" : "bg-transparent"
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
          <span className="text-2xl font-bold tracking-tighter text-white">
            D10 <span className="font-light text-primary">AI</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-semibold text-white/80 uppercase tracking-widest transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#pricing" 
            className="text-xs font-bold text-white/90 border border-white/20 px-6 py-2 rounded-md hover:bg-white hover:text-black transition-all duration-300"
          >
            הזמן עכשיו
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
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
          className="md:hidden fixed inset-0 z-[200] bg-black"
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
              <span className="text-2xl font-bold tracking-tighter text-white">
                D10 <span className="font-light text-primary">AI</span>
              </span>
            </a>
            <button 
              className="text-white p-2"
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
                className="text-2xl font-medium text-white/90 border-b border-white/10 pb-4"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#pricing" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-white text-black text-center py-4 rounded-md font-bold text-lg mt-4"
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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden" dir="rtl">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse z-20" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse delay-1000 z-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
            <Zap size={12} /> מוצר ישראלי · מבצע השקה
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            סוף ללחץ <span className="text-primary">לפני המוסך.</span>
          </h1>
          <p className="text-base md:text-2xl text-white/70 font-light tracking-wide mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            ה-D10 מתחבר לרכב שלך, מנתח בזמן אמת עם בינה מלאכותית, ומסביר לך <span className="text-white">בעברית פשוטה</span> — לפני שאתה מוציא שקל אחד.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <a
          href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-tesla btn-tesla-primary w-full sm:w-auto text-center px-8 sm:px-12"
        >
          הזמן עכשיו — החל מ-₪299
        </a>
        <a href="#features" className="btn-tesla btn-tesla-secondary w-full sm:w-auto text-center px-8 sm:px-12">
          למד עוד
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="container mx-auto px-6 relative z-10 flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-12"
      >
        {[
          { icon: <Check size={14} />, text: "משלוח חינם" },
          { icon: <RotateCcw size={14} />, text: "30 יום החזרה" },
          { icon: <ShieldCheck size={14} />, text: "תאימות 99%" },
          { icon: <Lock size={14} />, text: "הצפנת AES-256" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white/50 text-xs md:text-sm font-medium">
            <span className="text-primary">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
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
    <section ref={containerRef} className="py-16 md:py-32 bg-black overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6">
        <motion.div 
          style={{ scale, opacity }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-blue-500/10 blur-[150px] rounded-full" />
          <img 
            src="/smart-diagnostic.jpg" 
            alt="D10 AI Smart Diagnostic Assistant" 
            className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/5"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 z-20 bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-xs hidden md:block">
            <h4 className="text-xl font-bold text-white mb-2">3M+ קודי תקלות</h4>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              המערכת לא רק זורקת קוד טכני. ה-AI מתרגם לעברית: מה הבעיה, עד כמה חמורה, ואם אפשר להמשיך לנסוע — בשניות.
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
      title: "ניתוח תקלות מבוסס AI",
      desc: "ה-AI מתרגם לעברית: מה הבעיה, עד כמה חמורה, ואם אפשר להמשיך לנסוע — בשניות. לא עוד קודים טכניים.",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "חיבור מיידי",
      desc: "חבר ל-OBD2, פתח אפליקציה, קבל תשובות. 5 שניות. אין כלים, אין התקנות מסובכות.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    },
    {
      title: "100% עברית",
      desc: "ממשק מלא והסברי תקלות בשפת האם שלך. בלי אנגלית, בלי קודים מוזרים. פותח בישראל, עבור ישראלים.",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      title: "חיסכון עצום",
      desc: "הערכת עלות תיקון לפני המוסך. מגיע למוסכניק עם ידע — מונע עקיצות ותיקונים מיותרים.",
      icon: <ShieldCheck className="w-6 h-6" />,
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    }
  ];

  return (
    <section id="features" className="py-16 md:py-32 bg-[#050505]" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <div className={cn(
                "w-11 h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-6 transition-all duration-500 border",
                f.color
              )}>
                {f.icon}
              </div>
              <h4 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4 tracking-tight">{f.title}</h4>
              <p className="text-white/50 font-light leading-relaxed text-sm">
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
    <section className="py-16 md:py-32 bg-black" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-widest mb-4">
            נורת המנוע נדלקה
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">שתי דרכים. בחר את שלך.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Without D10 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 md:p-8 rounded-2xl border border-red-500/20 bg-red-500/[0.03]"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4">בלי D10</div>
            <h3 className="text-xl font-bold text-white mb-6">לחץ ואי ודאות</h3>
            <div className="space-y-4">
              {[
                "לא יודע אם בטוח לנסוע",
                "גרירה למוסך רק \"לבדיקת מחשב\"",
                "קודים טכניים שאתה לא מבין",
                "משלם אלפים על תיקון שאולי לא צריך"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X size={16} className="text-red-400 shrink-0 mt-1" />
                  <span className={cn("text-white/70 text-sm", i === 3 && "font-bold text-white")}>{item}</span>
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
            className="p-6 md:p-8 rounded-2xl border border-primary/20 bg-primary/[0.03]"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-4">עם D10 AI</div>
            <h3 className="text-xl font-bold text-white mb-6">שליטה מלאה</h3>
            <div className="space-y-4">
              {[
                "יודע מיד אם אפשר להמשיך לנסוע",
                "הסבר בעברית פשוטה מה הבעיה",
                "הערכת מחיר לפני שנכנסים למוסך",
                "מגיע למוסך עם ידע — לא תותחנים עליך"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={16} className="text-primary shrink-0 mt-1" />
                  <span className={cn("text-white/70 text-sm", i === 3 && "font-bold text-white")}>{item}</span>
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
      desc: "חבר את ה-D10 לפורט ה-OBD2 מתחת לדאשבורד (5 שניות). אין כלים, אין התקנות מסובכות. כמו לחבר USB."
    },
    {
      num: "02",
      title: "פתח את האפליקציה",
      desc: "ה-D10 מתחבר בלוטות' לטלפון. ה-AI מנתח ומציג תמונה מלאה של בריאות הרכב — הכל בעברית."
    },
    {
      num: "03",
      title: "קבל תשובות ברורות",
      desc: "תקלה? ה-AI מסביר מה זה, כמה דחוף, כמה יעלה התיקון. אתה מחליט — מעודכן ובביטחון."
    }
  ];

  return (
    <section id="how" className="py-16 md:py-32 bg-[#050505]" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold uppercase tracking-widest mb-4">
            איך זה עובד
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">שלושה שלבים. זהו.</h2>
          <p className="text-white/70 text-base max-w-xl mx-auto">אפילו סבתא שלך יכולה. בלי ידע טכני, בלי כלים מיוחדים.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="text-center md:text-right"
            >
              <div className="text-5xl md:text-7xl font-black text-white/[0.15] mb-4 leading-none">{step.num}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
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
    <section id="testimonials" className="py-16 md:py-32 bg-black" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[11px] font-bold uppercase tracking-widest mb-4">
            ★★★★★ מה אומרים עלינו
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">נהגים חכמים כבר משתמשים.</h2>
          <p className="text-white/50 font-light text-base">הצטרפו ל-1,240+ נהגים שכבר חוסכים אלפי שקלים ומגיעים למוסך עם ידע.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all flex flex-col"
            >
              <div className="text-yellow-400 text-sm mb-4">★★★★★</div>
              <p className="text-white/70 text-sm leading-relaxed mb-6 flex-grow">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-white/30 text-xs">{review.car}</div>
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
            className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white transition-colors"
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
    <section className="py-16 md:py-32 bg-black" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
            <Cpu size={12} /> מפרט טכני
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">בנוי לביצועים</h2>
          <p className="text-white/50 font-light max-w-xl mx-auto text-base">כל הפרטים הטכניים שאתה צריך כדי להיות בטוח במוצר.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {specs.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="text-primary">{group.icon}</div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{group.category}</h3>
              </div>
              <div className="space-y-4">
                {group.items.map((item, j) => (
                  <div key={j} className="flex justify-between items-center">
                    <span className="text-white/50 text-sm">{item.label}</span>
                    <span className="text-white font-semibold text-sm font-mono">{item.value}</span>
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
  const brands = [
    "Toyota", "Hyundai", "Kia", "BMW", "Mercedes-Benz", "Audi",
    "Volkswagen", "Mazda", "Honda", "Nissan", "Subaru", "Škoda",
    "Seat", "Mitsubishi", "Peugeot", "Citroën", "Ford", "Chevrolet"
  ];

  return (
    <section className="py-16 md:py-32 bg-[#050505]" dir="rtl">
      <div className="container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold uppercase tracking-widest mb-4">
          <Car size={12} /> תאימות
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">תואם לרכב שלך?</h2>
        <p className="text-white/50 font-light max-w-2xl mx-auto mb-12 md:mb-16 text-base">
          D10 AI תואם לכל רכב עם יציאת OBD2 — כלומר <span className="text-white font-medium">כמעט כל רכב משנת 1996 ומעלה</span>. תומך ביותר מ-10,000 דגמים.
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto mb-12">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10">
          <span className="text-white/60 text-sm">לא בטוח אם הרכב שלך תואם?</span>
          <a href="mailto:support@d10.store" className="text-primary text-sm font-bold hover:underline">שלח לנו את דגם הרכב ←</a>
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
      subtitle: "ליחידה אחת",
      features: ["יחידה אחת", "אפליקציה מלאה בעברית", "אחריות שנה", "תמיכה בדוא\"ל", "ייצוא נתונים CSV/PDF"],
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
      subtitle: "מושלם למשפחה עם כמה רכבים",
      features: ["3 יחידות", "אפליקציה מלאה בעברית", "אחריות שנה", "תמיכה מועדפת", "לוח בקרה משפחתי", "ייצוא נתונים CSV/PDF"],
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
      subtitle: "לבעלי מספר רכבים או עסקים קטנים",
      features: ["4 יחידות", "אפליקציה מלאה בעברית", "אחריות שנתיים", "תמיכה VIP", "לוח בקרה מרכזי", "ייצוא נתונים מתקדם"],
      cta: "הזמן עכשיו",
      highlight: false,
      color: "border-white/10",
      paymentUrl: "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=800&Coin=1&FixTash=False&Info=D10_4_bunddle&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&sendemail=True&tmp=1&signature=e4be36b9fd6a9f887aca12fbaae6d85770913acc40622940f310c070f3d0cd4f"
    }
  ];

  const soloPaymentUrl = SOLO_PAYMENT_URL;

  return (
    <section id="pricing" className="py-16 md:py-32 bg-[#050505]" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">בחר את החבילה שלך</h2>
          <p className="text-white/50 font-light text-base mb-4">מחירים שקופים. ללא דמי מנוי. תשלום חד-פעמי בלבד.</p>
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
                "p-6 sm:p-8 md:p-12 rounded-2xl border flex flex-col items-center text-center transition-all duration-500 relative",
                b.color,
                !b.highlight && "bg-white/5 hover:border-white/30"
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
              <p className="text-white/40 text-sm mb-4">{b.subtitle}</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-5xl font-bold text-white">₪{b.price}</span>
              </div>
              {b.perUnit && (
                <p className="text-white/40 text-sm mb-6 md:mb-8">{b.perUnit} ליחידה</p>
              )}
              {!b.perUnit && <div className="mb-6 md:mb-8" />}
              
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-grow">
                {b.features.map((f, j) => (
                  <li key={j} className="text-sm font-light text-white/80 flex items-center gap-2 justify-center">
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
                  b.highlight ? "bg-primary text-white hover:bg-primary-dark" : "bg-white text-black hover:bg-white/90"
                )}
              >
                {b.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 md:mt-16 text-white/40">
          {[
            { icon: <Clock size={16} />, text: "\u05de\u05e9\u05dc\u05d5\u05d7 \u05de\u05d4\u05d9\u05e8" },
            { icon: <RotateCcw size={16} />, text: "30 \u05d9\u05d5\u05dd \u05dc\u05d4\u05d7\u05d6\u05e8\u05d4" },
            { icon: <ShieldCheck size={16} />, text: "\u05d0\u05d7\u05e8\u05d9\u05d5\u05ea \u05de\u05dc\u05d0\u05d4" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
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
    <footer className="bg-black text-white py-12 md:py-20 border-t border-white/5" dir="rtl" role="contentinfo">
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
      <div className="max-w-3xl mx-auto glass border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-white/80 font-light leading-relaxed">
            אתר זה משתמש בעוגיות (Cookies) ובכלי מעקב לצורך שיפור חוויית הגלישה וניתוח תנועה. 
            למידע נוסף, ראה את <a href="#privacy" className="text-primary underline">מדיניות הפרטיות</a> שלנו.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={handleAccept} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors">אשר</button>
          <button onClick={handleDecline} className="px-6 py-2 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">דחה</button>
        </div>
      </div>
    </div>
  );
};

// --- Legal Page Layout ---

const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#050505] pt-28 pb-20" dir="rtl">
    <div className="container mx-auto px-6 max-w-3xl">
      <a href="#" className="inline-flex items-center gap-2 text-primary text-sm mb-8 hover:underline">→ חזרה לעמוד הראשי</a>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight">{title}</h1>
      <div className="prose-legal space-y-6 text-white/70 text-sm font-light leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

// --- Privacy Policy ---

const PrivacyPolicy = () => (
  <LegalPage title="מדיניות פרטיות">
    <p className="text-white/40 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-white">1. כללי</h2>
    <p>D10 ("החברה", "אנחנו") מפעילה את אתר www.d10.store ואת מוצרי D10 AI. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.</p>
    
    <h2 className="text-lg font-bold text-white">2. מידע שאנו אוספים</h2>
    <p>אנו עשויים לאסוף את סוגי המידע הבאים:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>פרטי קשר: שם, כתובת דוא"ל, מספר טלפון (בעת יצירת קשר או הזמנה)</li>
      <li>מידע על הזמנות: פרטי רכישה, כתובת למשלוח, פרטי תשלום</li>
      <li>נתוני גלישה: כתובת IP, סוג דפדפן, דפים שנצפו, זמני גלישה</li>
      <li>עוגיות וכלי מעקב: Meta Pixel, Google Analytics (בכפוף להסכמתך)</li>
    </ul>
    
    <h2 className="text-lg font-bold text-white">3. מטרות השימוש במידע</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>עיבוד הזמנות ומשלוחים</li>
      <li>מתן שירות לקוחות ותמיכה טכנית</li>
      <li>שיפור האתר והמוצרים שלנו</li>
      <li>שליחת עדכונים ותקשורת שיווקית (בכפוף להסכמתך בלבד)</li>
      <li>ניתוח סטטיסטי ומגמות שימוש</li>
    </ul>
    
    <h2 className="text-lg font-bold text-white">4. שיתוף מידע עם צדדים שלישיים</h2>
    <p>אנו עשויים לשתף מידע עם ספקי שירות צד שלישי הנדרשים לתפעול העסק, כגון:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>Meta (Facebook) — לצורך פרסום ממוקד (Meta Pixel)</li>
      <li>שירותי שילוח ולוגיסטיקה</li>
      <li>מעבדי תשלומים</li>
    </ul>
    <p>אנו לא מוכרים את המידע האישי שלך לצדדים שלישיים.</p>
    
    <h2 className="text-lg font-bold text-white">5. תקופת שמירת המידע</h2>
    <p>אנו שומרים מידע אישי כל עוד הוא נדרש למטרות שלשמן נאסף, או כנדרש על פי חוק. מידע הקשור לעסקאות יישמר לפחות 7 שנים לצורכי מס וחשבונאות.</p>
    
    <h2 className="text-lg font-bold text-white">6. עוגיות (Cookies)</h2>
    <p>האתר משתמש בעוגיות חיוניות לתפעול האתר ובעוגיות אנליטיות/שיווקיות (בכפוף להסכמתך). ניתן לשלוט בעוגיות דרך הגדרות הדפדפן.</p>
    
    <h2 className="text-lg font-bold text-white">7. זכויותיך</h2>
    <p>בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, עומדות לך הזכויות הבאות:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>עיון במידע האישי שלך</li>
      <li>תיקון מידע שגוי</li>
      <li>בקשה למחיקת מידע</li>
      <li>הסרה מרשימות תפוצה שיווקיות</li>
    </ul>
    
    <h2 className="text-lg font-bold text-white">8. יצירת קשר</h2>
    <p>לשאלות בנושא פרטיות או למימוש זכויותיך, ניתן לפנות אלינו בדוא"ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

// --- Terms of Use ---

const TermsOfUse = () => (
  <LegalPage title="תנאי שימוש">
    <p className="text-white/40 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-white">1. כללי</h2>
    <p>ברוכים הבאים לאתר www.d10.store המופעל על ידי D10 ("החברה"). השימוש באתר ובמוצרים שלנו מהווה הסכמה לתנאים אלה.</p>
    
    <h2 className="text-lg font-bold text-white">2. תיאור המוצר</h2>
    <p>D10 AI הוא מכשיר דיאגנוסטי לרכב המתחבר ליציאת OBD2 ומספק מידע על מצב הרכב באמצעות אפליקציה ייעודית.</p>
    <p className="text-yellow-400/80 font-medium">⚠️ חשוב: המוצר מספק מידע אינפורמטיבי בלבד ואינו מהווה תחליף לבדיקה מקצועית של רכב על ידי מוסכניק מוסמך. אין להסתמך על המוצר לצורך קבלת החלטות בטיחותיות.</p>
    
    <h2 className="text-lg font-bold text-white">3. תאימות</h2>
    <p>המוצר תואם לרוב כלי הרכב המצוידים ביציאת OBD2 (1996 ומעלה). החברה אינה מתחייבת לתאימות מלאה עם כל דגם רכב. מומלץ לבדוק תאימות לפני הרכישה.</p>
    
    <h2 className="text-lg font-bold text-white">4. רכישות ותשלומים</h2>
    <p>המחירים באתר כוללים מע"מ אלא אם צוין אחרת. החברה שומרת לעצמה את הזכות לעדכן מחירים. מחיר שאושר בעת ההזמנה הוא המחיר הקובע.</p>
    
    <h2 className="text-lg font-bold text-white">5. הגבלת אחריות</h2>
    <p>החברה אינה אחראית לנזקים ישירים או עקיפים הנובעים משימוש במוצר, לרבות נזקים לרכב, אובדן נתונים, או הסתמכות על מידע שסופק על ידי המוצר. השימוש במוצר הוא על אחריות המשתמש.</p>
    
    <h2 className="text-lg font-bold text-white">6. קניין רוחני</h2>
    <p>כל התכנים באתר, לרבות טקסטים, עיצובים, לוגואים ותוכנה, הם קניינה של D10 ואין להעתיקם ללא אישור.</p>
    
    <h2 className="text-lg font-bold text-white">7. דין וסמכות שיפוט</h2>
    <p>תנאים אלה כפופים לחוקי מדינת ישראל. סמכות השיפוט הבלעדית תהא לבתי המשפט המוסמכים בישראל.</p>
    
    <h2 className="text-lg font-bold text-white">8. יצירת קשר</h2>
    <p>לשאלות בנוגע לתנאי השימוש: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

// --- Accessibility Statement ---

const AccessibilityStatement = () => (
  <LegalPage title="הצהרת נגישות">
    <p className="text-white/40 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-white">מחויבות לנגישות</h2>
    <p>D10 מחויבת להנגשת האתר והשירותים שלה לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998 ותקנות הנגישות.</p>
    
    <h2 className="text-lg font-bold text-white">מה עשינו</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>שימוש ב-HTML סמנטי עם היררכיית כותרות נכונה</li>
      <li>תמיכה בניווט מקלדת מלא</li>
      <li>תמיכה בקוראי מסך (ARIA labels)</li>
      <li>ניגודיות צבעים מספקת</li>
      <li>תמיכה מלאה בעברית (RTL)</li>
      <li>טפסים עם תוויות נגישות</li>
      <li>טקסט חלופי לתמונות</li>
    </ul>
    
    <h2 className="text-lg font-bold text-white">מגבלות ידועות</h2>
    <p>ייתכן שחלק מהתכנים באתר אינם נגישים באופן מלא. אנו עובדים באופן שוטף לשיפור הנגישות.</p>
    
    <h2 className="text-lg font-bold text-white">יצירת קשר בנושא נגישות</h2>
    <p>נתקלתם בבעיית נגישות? נשמח לשמוע ולטפל. פנו אלינו בדוא"ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

// --- Returns & Cancellation Policy ---

const ReturnsCancellationPolicy = () => (
  <LegalPage title="מדיניות ביטולים והחזרות">
    <p className="text-white/40 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-lg font-bold text-white">1. זכות ביטול</h2>
    <p>בהתאם לחוק הגנת הצרכן, התשמ"א-1981, הינך רשאי/ת לבטל עסקה תוך 14 ימים מיום קבלת המוצר או מיום קבלת מסמך הגילוי (המאוחר מביניהם), בתנאי שהמוצר לא נפגע ולא נעשה בו שימוש.</p>
    
    <h2 className="text-lg font-bold text-white">2. תהליך ביטול</h2>
    <p>לביטול עסקה, יש לשלוח הודעה בדוא"ל ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a> עם פרטי ההזמנה. נאשר את קבלת הבקשה תוך 2 ימי עסקים.</p>
    
    <h2 className="text-lg font-bold text-white">3. החזר כספי</h2>
    <p>ההחזר הכספי יבוצע תוך 14 ימים מקבלת בקשת הביטול, באמצעי התשלום המקורי. החברה רשאית לגבות דמי ביטול בשיעור של עד 5% ממחיר המוצר או 100 ש"ח, הנמוך מביניהם.</p>
    
    <h2 className="text-lg font-bold text-white">4. החזרת המוצר</h2>
    <p>המוצר יוחזר באריזתו המקורית, תקין ושלם. עלויות משלוח ההחזרה יחולו על הלקוח, אלא אם המוצר התקבל פגום.</p>
    
    <h2 className="text-lg font-bold text-white">5. מוצר פגום</h2>
    <p>קיבלת מוצר פגום? פנה/י אלינו מיידית ב: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a> ונטפל בהחלפה או החזר מלא כולל עלויות משלוח.</p>
    
    <h2 className="text-lg font-bold text-white">6. אחריות</h2>
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
    <div className="fixed bottom-0 left-0 right-0 z-[200] md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 safe-area-pb" dir="rtl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-white font-bold text-sm">D10 AI</div>
          <div className="text-white/50 text-xs">החל מ-₪299 · משלוח חינם</div>
        </div>
        <a
          href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 bg-primary text-black font-bold text-sm rounded-lg hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap"
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
    { question: "האם D10 AI מרוקן את סוללת הרכב?", answer: "לא. D10 AI עובר אוטומטית למצב שינה עם צריכת חשמל של פחות מ-1mA — זניח לחלוטין. אפשר להשאיר אותו מחובר 24/7 ללא חשש." },
    { question: "אילו פרוטוקולי OBD2 נתמכים?", answer: "D10 AI תומך בכל הפרוטוקולים הסטנדרטיים: CAN (ISO 15765-4), K-Line (ISO 9141-2), KWP2000 (ISO 14230-4) ו-SAE J1850 PWM/VPW. זה מכסה את כל כלי הרכב עם יציאת OBD2." },
    { question: "האם המידע שלי מאובטח?", answer: "בהחלט. כל הנתונים מוצפנים ב-AES-256 והחיבור מאובטח באמצעות Secure BLE Pairing. הנתונים נשמרים מקומית במכשיר שלך בלבד — ללא ענן, ללא שיתוף עם צדדים שלישיים." },
    { question: "האם D10 AI תואם לרכב שלי?", answer: "D10 AI תואם לכמעט כל רכב עם יציאת OBD2, כלומר רוב כלי הרכב משנת 1996 ומעלה. זה כולל יצרנים כמו Toyota, Hyundai, Kia, BMW, Mercedes, Volkswagen ועוד. לא בטוח? שלח לנו את דגם הרכב ונבדוק עבורך." },
    { question: "איך מייצאים נתונים מהאפליקציה?", answer: "ניתן לייצא את כל הנתונים בפורמט CSV או PDF ישירות מהגדרות האפליקציה. מושלם לשיתוף עם המוסכניק שלך או לתיעוד אישי." },
    { question: "למה כדאי לקנות חבילה של כמה יחידות?", answer: "חבילות המשפחה והאולטימייט מושלמות למשפחות עם כמה רכבים. ניתן לסנכרן את כל היחידות לחשבון אחד ולנהל את כל הרכבים מלוח בקרה אחד — וגם לחסוך עד 33% לעומת רכישה בודדת." }
  ];

  return (
    <section id="faq" className="py-16 md:py-32 bg-black" dir="rtl">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-bold uppercase tracking-widest mb-4">
            <HelpCircle size={12} /> שאלות נפוצות
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">שאלות ותשובות</h2>
          <p className="text-white/50 font-light text-base">כל מה שצריך לדעת לפני הרכישה</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center p-5 md:p-6 text-right hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-semibold text-base">{faq.question}</span>
                <ChevronDown size={20} className={cn("text-white/40 transition-transform duration-300 shrink-0 mr-4", openIndex === i && "rotate-180")} />
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
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-white/60 leading-relaxed text-base">{faq.answer}</p>
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
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
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
            
            {/* Stats Bar */}
            <div className="bg-black py-12 border-y border-white/5 overflow-hidden">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 md:gap-24">
                  {[
                    { label: "תאימות לרכבים", value: "99%" },
                    { label: "קודי תקלות במאגר", value: "3M+" },
                    { label: "חיבור תוך שניות", value: "5שנ׳" },
                    { label: "נהגים חכמים", value: "1,240+" }
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ProductShowcase />
            <CompareSection />
            <FeatureSection />
            <HowItWorks />

            {/* Mid-page CTA */}
            <section className="py-12 md:py-20 bg-gradient-to-b from-[#050505] to-black" dir="rtl">
              <div className="container mx-auto px-6 text-center">
                <p className="text-yellow-400 text-sm font-bold mb-3">★★★★★ 4.9/5 — 1,240+ נהגים מרוצים</p>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">מוכן להתחיל?</h3>
                <p className="text-white/50 text-base mb-6 max-w-lg mx-auto">החל מ-₪299. משלוח חינם. 30 יום החזרה.</p>
                <a
                  href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 bg-primary text-black font-bold text-base rounded-lg hover:bg-primary/90 transition-all active:scale-95 min-h-[48px]"
                >
                  קנה עכשיו — ₪299
                </a>
              </div>
            </section>

            <Testimonials />
            <TechnicalSpecs />
            <CompatibilityChecker />
            <FullScreenImage />
            
            {/* Secondary Showcase */}
            <section className="py-16 md:py-32 bg-black" dir="rtl">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8 tracking-tight">
                      האפליקציה עובדת רק עם D10.
                    </h2>
                    <p className="text-white/50 font-light leading-relaxed text-base md:text-lg mb-8 md:mb-10">
                      לא עוד אפליקציות גנריות מחו"ל. פיתחנו בישראל, עבור ישראלים — ממשק מלא בעברית, הסברים שמתאימים לשוק המקומי, וגישה למאגרי משרד התחבורה.
                    </p>
                    <div className="space-y-6">
                      {[
                        { title: "הערכת עלות תיקון", desc: "יודע מראש כמה יעלה התיקון — מגיע למוסך עם ידע, לא תותחנים עליך." },
                        { title: "גישה למאגרי משרד התחבורה", desc: "הצלבת נתונים חכמה — מידע מדויק על הרכב שלך, ריקולים, והיסטוריה ישירות מהמקור." },
                        { title: "עדכוני AI שוטפים", desc: "המערכת לומדת ומשתפרת כל הזמן. רכבים חדשים, תקלות חדשות — תמיד מעודכן." },
                        { title: "ניהול מספר רכבים", desc: "יש לך יותר מרכב אחד? סנכרן מספר יחידות D10 AI לחשבון אחד ונהל את כל הרכבים מלוח בקרה אחד." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="mt-1">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                          <div>
                            <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-wider">{item.title}</h5>
                            <p className="text-white/40 text-xs font-light">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative"
                  >
                    <img 
                      src="/app-mockup.jpg" 
                      alt="ממשק אפליקציית D10 AI לדיאגנוסטיקת רכב" 
                      className="w-full max-w-xs sm:max-w-sm mx-auto rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>
              </div>
            </section>

            <Pricing />
            <FAQ />

            {/* Final CTA */}
            <section className="py-20 md:py-40 bg-primary text-white text-center relative overflow-hidden" dir="rtl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary opacity-90" />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              
              <div className="container mx-auto px-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                >
                  <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tighter">
                    העתיד של הרכב שלך <br className="hidden md:inline" /> מתחיל כאן.
                  </h2>
                  <p className="text-white/80 text-base sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto font-light px-2">
                    הצטרף למהפכת הדיאגנוסטיקה החכמה עם D10 AI.
                  </p>
                  <a
                    href="https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-12 py-5 bg-white text-primary rounded-full font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 inline-block"
                  >
                    הזמן את ה-D10 AI שלך
                  </a>
                  <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-[10px] font-bold uppercase tracking-widest text-white/60">
                    <div className="flex items-center gap-2"><Clock size={14} /> משלוח מהיר</div>
                    <div className="flex items-center gap-2"><Award size={14} /> אחריות מלאה</div>
                    <div className="flex items-center gap-2"><RotateCcw size={14} /> 30 יום החזרה</div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-12 md:py-20 bg-[#050505] border-t border-white/5" dir="rtl">
              <div className="container mx-auto px-6 text-center max-w-xl">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">עדכונים וטיפים לרכב</h3>
                <p className="text-white/50 text-sm mb-6">הירשמו לניוזלטר וקבלו טיפים לתחזוקת הרכב, עדכוני מוצר, ומבצעים בלעדיים.</p>
                <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="האימייל שלך" 
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/50 min-h-[48px]"
                  />
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-primary text-black font-bold text-sm rounded-lg hover:bg-primary/90 transition-all active:scale-95 whitespace-nowrap min-h-[48px]"
                  >
                    הירשמו
                  </button>
                </form>
                <p className="text-white/20 text-xs mt-3">ללא ספם. ביטול בכל עת.</p>
              </div>
            </section>

            {/* Disclaimer */}
            <div className="bg-[#050505] py-6 px-6 text-center" dir="rtl">
              <p className="text-white/30 text-xs max-w-2xl mx-auto leading-relaxed">
                * D10 AI הוא מכשיר דיאגנוסטי אינפורמטיבי ואינו מהווה תחליף לבדיקה מקצועית. יש להתייעץ עם מוסכניק מוסמך לפני ביצוע תיקונים. המחירים כוללים מע"מ.
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
