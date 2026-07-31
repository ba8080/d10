import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Check, ShieldCheck, RotateCcw, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, trackCheckout, SOLO_PAYMENT_URL } from '../utils';

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
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-5 md:px-10",
      scrolled ? "py-2.5" : "py-4"
    )} dir="rtl">
      <div className={cn(
        "max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-4 md:px-6 py-2.5 transition-all duration-300",
        scrolled
          ? "bg-[#0b0d12]/80 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "bg-transparent border border-transparent"
      )}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-1.5">
          <span className="text-xl font-black tracking-tight text-white">D10</span>
          <span className="text-sm font-light text-gradient font-bold">AI</span>
        </a>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (<a key={l.name} href={l.href} className="text-[13px] font-medium tracking-wide text-white/60 hover:text-white transition-colors">{l.name}</a>))}
          <a href="#pricing" className="text-xs font-bold px-5 py-2.5 rounded-xl bg-gradient-to-l from-blue-500 to-blue-600 text-white shadow-[0_4px_20px_-4px_rgba(37,99,235,0.6)] hover:shadow-[0_8px_28px_-4px_rgba(37,99,235,0.8)] hover:-translate-y-px transition-all">הזמן עכשיו</a>
        </div>
        <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(true)} aria-label="תפריט"><Menu size={22} /></button>
      </div>
    </nav>
    <AnimatePresence>
      {mobileOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="md:hidden fixed inset-0 z-[200] bg-[#06070a]" dir="rtl">
          <div className="flex justify-between items-center px-6 py-5 border-b border-white/8">
            <span className="text-xl font-black text-white">D10 <span className="text-gradient text-sm">AI</span></span>
            <button onClick={() => setMobileOpen(false)} aria-label="סגור" className="text-white"><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-1 px-6 pt-6">
            {links.map((l) => (<a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-lg font-medium text-white/85 py-3.5 border-b border-white/6">{l.name}</a>))}
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="mt-6 btn-primary text-center">הזמן עכשיו</a>
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

// Progressive load order: frame 0 first, then coarse-to-fine passes, so the
// scroll animation works within ~1s instead of waiting for all ~7MB.
const LOAD_ORDER: number[] = (() => {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const step of [64, 32, 16, 8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) {
      if (!seen.has(i)) { seen.add(i); order.push(i); }
    }
  }
  return order;
})();

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

    const isReady = (i: number) => {
      const img = imagesRef.current[i];
      return !!(img?.complete && img.naturalWidth);
    };

    const nearestLoaded = (index: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (index - d >= 0 && isReady(index - d)) return index - d;
        if (index + d < FRAME_COUNT && isReady(index + d)) return index + d;
      }
      return -1;
    };

    const drawFrame = (index: number) => {
      const actual = nearestLoaded(index);
      if (actual === -1) return;
      const img = imagesRef.current[actual];
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

    imagesRef.current = new Array(FRAME_COUNT);
    let cancelled = false;
    let cursor = 0;
    const loadNext = () => {
      if (cancelled || cursor >= LOAD_ORDER.length) return;
      const idx = LOAD_ORDER[cursor++];
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        imagesRef.current[idx] = img;
        if (idx === 0 || Math.abs(idx - currentFrameRef.current) <= 2) {
          drawFrame(currentFrameRef.current);
        }
        loadNext();
      };
      img.onerror = () => loadNext();
      img.src = FRAMES[idx];
    };
    for (let c = 0; c < 6; c++) loadNext();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ position: 'relative', background: '#06070a' }}>

      {/* Sticky canvas — pinned while content scrolls over it */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', zIndex: 0 }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        {/* Cinematic grade: darken + tint toward the site's ink color */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,7,10,0.82) 0%, rgba(6,7,10,0.45) 24%, rgba(6,7,10,0.3) 48%, rgba(6,7,10,0.45) 72%, rgba(6,7,10,0.92) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 70% at 80% 30%, transparent 40%, rgba(6,7,10,0.55) 100%)' }} />
      </div>

      {/* Content scrolls on top */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-100vh' }}>

        {/* First screen */}
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} dir="rtl">
          <div className="flex-grow flex items-center">
            <div className="container mx-auto px-6 max-w-6xl">
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="pt-24 md:pt-16 max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md px-4 py-1.5 text-[11px] font-bold tracking-[0.18em] uppercase text-white/85 mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                  דיאגנוסטיקה חכמה לרכב · פותח בישראל
                </span>
                <h1 className="h-display text-[2.75rem] sm:text-6xl md:text-[5.25rem] text-white mb-6" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
                  הרכב שלך מדבר.
                  <br />
                  <span className="text-gradient">עכשיו תבין אותו.</span>
                </h1>
                <p className="text-white/80 text-base md:text-xl max-w-lg mb-9 leading-relaxed font-light" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
                  מתאם קטן + אפליקציה חכמה בעברית. כל תקלה, כל נתון, כל נורה —
                  מוסבר בפשטות, <span className="font-semibold text-white">לפני שאתה מוציא שקל במוסך.</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-3.5">
                  <a href={SOLO_PAYMENT_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackCheckout(299)} className="btn-primary text-center text-base px-10">הזמן עכשיו — ₪299</a>
                  <a href="#features" className="btn-ghost text-center">גלה את היכולות</a>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="container mx-auto px-6 pb-10 max-w-6xl">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="flex flex-wrap gap-x-8 gap-y-3 text-white/70 text-xs font-medium">
              {[
                { icon: <Check size={13} />, t: "משלוח חינם" },
                { icon: <RotateCcw size={13} />, t: "30 יום החזרה מלאה" },
                { icon: <ShieldCheck size={13} />, t: "תואם לכל רכב מ-1996" },
                { icon: <Lock size={13} />, t: "הצפנת AES-256" },
              ].map((i, idx) => (
                <div key={idx} className="flex items-center gap-2" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}><span className="text-cyan-300">{i.icon}</span>{i.t}</div>
              ))}
            </motion.div>
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/25 animate-bounce">
            <ChevronDown size={26} strokeWidth={1.5} />
          </div>
        </div>

        {children}

      </div>
    </div>
  );
};
