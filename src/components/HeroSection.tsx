import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Check, ShieldCheck, RotateCcw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, SOLO_PAYMENT_URL } from '../utils';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => { document.body.style.overflow = mobileOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [mobileOpen]);

  const links = [
    { name: 'יכולות', href: '#features' },
    { name: 'איך זה עובד', href: '#how' },
    { name: 'מחירים', href: '#pricing' },
    { name: 'שאלות', href: '#faq' },
  ];

  return (
    <>
    <nav className={cn("fixed z-[100] transition-all duration-300 px-6 md:px-12 py-4", scrolled ? "top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm" : "top-0 left-0 right-0 bg-transparent")} dir="rtl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-1.5">
          <span className={cn("text-xl font-black tracking-tight", scrolled ? "text-surface-dark" : "text-white")}>D10</span>
          <span className={cn("text-sm font-light", scrolled ? "text-primary" : "text-white/60")}>AI</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (<a key={l.name} href={l.href} className={cn("text-xs font-medium tracking-wide transition-colors", scrolled ? "text-gray-500 hover:text-surface-dark" : "text-white/60 hover:text-white")}>{l.name}</a>))}
          <a href="#pricing" className={cn("text-xs font-bold px-5 py-2 rounded-lg transition-all", scrolled ? "bg-primary text-white hover:bg-primary-dark" : "bg-white text-surface-dark hover:bg-white/90")}>הזמן עכשיו</a>
        </div>
        <button className={cn("md:hidden p-2", scrolled ? "text-surface-dark" : "text-white")} onClick={() => setMobileOpen(true)} aria-label="תפריט"><Menu size={22} /></button>
      </div>
    </nav>
    <AnimatePresence>
      {mobileOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 z-[200] bg-white" dir="rtl">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <span className="text-xl font-black">D10 <span className="text-primary font-light text-sm">AI</span></span>
            <button onClick={() => setMobileOpen(false)} aria-label="סגור"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-1 px-6 pt-6">
            {links.map((l) => (<a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-gray-800 py-3 border-b border-gray-50">{l.name}</a>))}
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="mt-4 bg-primary text-white text-center py-3.5 rounded-lg font-bold">הזמן עכשיו</a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const FRAME_COUNT = 121;
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/frame${String(i + 1).padStart(4, '0')}.jpg`
);

export const Hero = ({ children }: { children?: React.ReactNode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));
        const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    const onResize = () => drawFrame(currentFrameRef.current);

    let loaded = 0;
    imagesRef.current = FRAMES.map((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (i === 0) drawFrame(0);
        if (loaded === FRAME_COUNT) onScroll();
      };
      return img;
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ position: 'relative', background: '#0c0c0a' }}>

      {/* Sticky canvas — stays pinned as content scrolls over it */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 0 }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(12,12,10,0.7) 0%, rgba(12,12,10,0.3) 50%, rgba(12,12,10,0.85) 100%)' }} />
      </div>

      {/* All content scrolls naturally on top */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-100vh' }}>

        {/* Hero text — first screen */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }} dir="rtl">
          <div className="flex-grow flex items-center">
            <div className="container mx-auto px-6 max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="pt-24 md:pt-0">
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em] mb-6">Smart Car Diagnostics</p>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                  הרכב שלך<br/>מדבר. עכשיו<br/><span className="text-primary">תבין אותו.</span>
                </h1>
                <p className="text-white/40 text-base md:text-lg max-w-md mb-8 leading-relaxed">צ'יפ OBD-II + אפליקציה + AI בעברית פשוטה. לדעת מה קורה ברכב — לפני שמוציאים שקל במוסך.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-center">הזמן עכשיו — ₪299</a>
                  <a href="#features" className="btn-outline border-white/20 text-white/70 hover:text-white hover:border-white/40 text-center">מה בפנים ↓</a>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="container mx-auto px-6 pb-8">
            <div className="flex flex-wrap gap-6 text-white/25 text-xs font-medium">
              {[
                { icon: <Check size={12} />, t: "משלוח חינם" },
                { icon: <RotateCcw size={12} />, t: "30 יום החזרה" },
                { icon: <ShieldCheck size={12} />, t: "כל רכב מ-1996" },
                { icon: <Lock size={12} />, t: "AES-256" },
              ].map((i, idx) => (
                <div key={idx} className="flex items-center gap-2"><span className="text-primary">{i.icon}</span>{i.t}</div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/15 animate-bounce">
            <ChevronDown size={28} strokeWidth={1} />
          </div>
        </div>

        {/* Extra sections passed as children */}
        {children}

      </div>
    </div>
  );
};
