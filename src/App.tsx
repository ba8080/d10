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
  RotateCcw
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

  const navLinks = [
    { name: 'יכולות', href: '#features' },
    { name: 'איך זה עובד', href: '#how' },
    { name: 'לקוחות', href: '#testimonials' },
    { name: 'חבילות', href: '#pricing' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4",
      isScrolled ? "glass border-b border-white/10" : "bg-transparent"
    )} dir="rtl">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">
            D10 <span className="font-light text-primary">AI</span>
          </span>
        </div>

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
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-[90] bg-black pt-24 px-8"
          >
            <div className="flex flex-col gap-8">
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
                className="bg-white text-black text-center py-4 rounded-md font-bold text-lg"
              >
                הזמן עכשיו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-[#050505] pt-24 md:pt-32 pb-16" dir="rtl">
      {/* Background Image - Tesla Style */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/car-tech/1920/1080" 
          alt="Car Technology" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]" />
        
        {/* Animated Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
            <Zap size={12} /> המהפכה כבר כאן
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            D10 <span className="text-primary">AI</span>
          </h1>
          <p className="text-base md:text-2xl text-white/70 font-light tracking-wide mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            המוסכניק האישי שלך. <span className="text-white">בכל מקום.</span> תובנות חכמות בזמן אמת על מצב הרכב שלך.
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto px-6 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <a href="#pricing" className="btn-tesla btn-tesla-primary w-full sm:w-auto text-center px-8 sm:px-12">
          הזמן עכשיו
        </a>
        <a href="#features" className="btn-tesla btn-tesla-secondary w-full sm:w-auto text-center px-8 sm:px-12">
          למד עוד
        </a>
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
            src="https://picsum.photos/seed/obd2/1200/800" 
            alt="D10 AI Device" 
            className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/5"
            referrerPolicy="no-referrer"
          />
          
          <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 z-20 bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-xs hidden md:block">
            <h4 className="text-xl font-bold text-white mb-2">דיוק של 99.9%</h4>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              המערכת מנתחת מיליוני נקודות נתונים בזמן אמת כדי לספק לך את המידע המדויק ביותר על מצב הרכב שלך.
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
      title: "ניתוח AI מתקדם",
      desc: "אלגוריתמים של למידת מכונה המנתחים את נתוני הרכב ומספקים תובנות בעברית פשוטה.",
      icon: <Cpu className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
    },
    {
      title: "חיבור מיידי",
      desc: "התקנה תוך פחות מ-30 שניות. פשוט חבר לפורט ה-OBD2 והתחל לקבל נתונים.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    },
    {
      title: "אפליקציה ייעודית",
      desc: "ממשק משתמש נקי ומודרני המעניק לך שליטה מלאה על כל המידע של הרכב שלך.",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20"
    },
    {
      title: "אבטחה מקסימלית",
      desc: "הנתונים שלך מוצפנים ומאובטחים. רק אתה יכול לגשת למידע של הרכב שלך.",
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
                "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 md:mb-6 transition-all duration-500 border",
                f.color
              )}>
                {f.icon}
              </div>
              <h4 className="text-base md:text-xl font-bold text-white mb-2 md:mb-4 tracking-tight">{f.title}</h4>
              <p className="text-white/50 font-light leading-relaxed text-xs md:text-sm">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FullScreenImage = () => {
  return (
    <section className="relative h-[50vh] md:h-[80vh] bg-black overflow-hidden" dir="rtl">
      <img 
        src="https://picsum.photos/seed/interior/1920/1080?grayscale" 
        alt="Car Interior" 
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
  const bundles = [
    {
      name: "סולו",
      price: "299",
      features: ["יחידה אחת", "אפליקציה בעברית", "אחריות שנה"],
      cta: "הזמן עכשיו",
      highlight: false,
      color: "border-white/10"
    },
    {
      name: "משפחתי",
      price: "719",
      features: ["3 יחידות", "אפליקציה בעברית", "אחריות שנה", "תמיכה מועדפת"],
      cta: "הזמן עכשיו",
      highlight: true,
      color: "border-primary bg-primary/5 shadow-2xl shadow-primary/10"
    },
    {
      name: "אולטימייט",
      price: "799",
      features: ["4 יחידות", "אפליקציה בעברית", "אחריות שנתיים", "תמיכה VIP"],
      cta: "הזמן עכשיו",
      highlight: false,
      color: "border-white/10"
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-32 bg-[#050505]" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">בחר את החבילה שלך</h2>
          <p className="text-white/50 font-light">מחירים שקופים. ללא דמי מנוי.</p>
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
                "p-6 sm:p-8 md:p-12 rounded-2xl border flex flex-col items-center text-center transition-all duration-500",
                b.color,
                !b.highlight && "bg-white/5 hover:border-white/30"
              )}
            >
              <h4 className={cn(
                "text-sm font-bold uppercase tracking-widest mb-4",
                b.highlight ? "text-primary" : "opacity-60"
              )}>{b.name}</h4>
              <div className="flex items-baseline gap-1 mb-4 md:mb-8">
                <span className="text-4xl md:text-5xl font-bold text-white">₪{b.price}</span>
              </div>
              
              <ul className="space-y-3 md:space-y-4 mb-8 md:mb-12 flex-grow">
                {b.features.map((f, j) => (
                  <li key={j} className="text-sm font-light text-white/80 flex items-center gap-2 justify-center">
                    <Check size={14} className="text-primary" /> {f}
                  </li>
                ))}
              </ul>

              <button className={cn(
                "w-full py-3 rounded-md font-bold text-xs uppercase tracking-widest transition-all duration-300",
                b.highlight ? "bg-primary text-white hover:bg-primary-dark" : "bg-white text-black hover:bg-white/90"
              )}>
                {b.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 md:py-20 border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
          <div className="text-center md:text-right">
            <span className="text-2xl font-bold tracking-tighter text-white mb-4 block">
              D10 <span className="font-light text-white/60">AI</span>
            </span>
            <p className="text-white/40 text-sm font-light max-w-xs">
              העתיד של דיאגנוסטיקת הרכב כבר כאן. פותח בישראל עם אהבה לטכנולוגיה ורכבים.
            </p>
          </div>

          <div className="flex gap-6 md:gap-12 text-xs font-bold uppercase tracking-widest text-white/40">
            <a href="#features" className="hover:text-white transition-colors">יכולות</a>
            <a href="#pricing" className="hover:text-white transition-colors">חבילות</a>
            <a href="#" className="hover:text-white transition-colors">פרטיות</a>
          </div>

          <div className="flex gap-6">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
              <Globe size={18} />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
              <Activity size={18} />
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
          © 2026 D10 AI · כל הזכויות שמורות · פותח בישראל 🇮🇱
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Stats Bar - Apple Style */}
        <div className="bg-black py-12 border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 md:gap-24">
              {[
                { label: "תאימות", value: "99%" },
                { label: "דיוק", value: "99.9%" },
                { label: "משלוח", value: "חינם" },
                { label: "אחריות", value: "מלאה" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProductShowcase />
        <FeatureSection />
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
                  הכל תחת שליטה.
                </h2>
                <p className="text-white/50 font-light leading-relaxed text-base md:text-lg mb-8 md:mb-10">
                  האפליקציה שלנו מעניקה לך מבט מעמיק אל תוך המערכות המורכבות ביותר של הרכב שלך. בלי קודים מסובכים, בלי אי-ודאות. רק מידע נקי וברור.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "דוחות בזמן אמת", desc: "קבל התראות מיידיות על כל שינוי במצב הרכב." },
                    { title: "היסטוריית טיפולים", desc: "נהל את כל היסטוריית הטיפולים של הרכב במקום אחד." },
                    { title: "חיסכון בדלק", desc: "טיפים מבוססי AI לשיפור צריכת הדלק של הרכב שלך." }
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
                  src="https://picsum.photos/seed/phone/800/1200?grayscale" 
                  alt="Phone Interface" 
                  className="w-full max-w-xs sm:max-w-sm mx-auto rounded-[2rem] sm:rounded-[3rem] border border-white/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <Pricing />
        
        {/* Final CTA - Apple Style */}
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
              <a href="#pricing" className="px-12 py-5 bg-white text-primary rounded-full font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 inline-block">
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
      </main>

      <Footer />
    </div>
  );
}
