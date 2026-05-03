import React from 'react';
import { motion } from 'motion/react';

const brands = [
  { name: "Toyota", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/toyota.svg" },
  { name: "Hyundai", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hyundai.svg" },
  { name: "Kia", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kia.svg" },
  { name: "BMW", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bmw.svg" },
  { name: "Mercedes", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mercedes.svg" },
  { name: "Audi", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/audi.svg" },
  { name: "Volkswagen", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/volkswagen.svg" },
  { name: "Mazda", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mazda.svg" },
  { name: "Honda", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/honda.svg" },
  { name: "Nissan", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nissan.svg" },
  { name: "Subaru", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/subaru.svg" },
  { name: "Škoda", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/skoda.svg" },
  { name: "Mitsubishi", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mitsubishi.svg" },
  { name: "Peugeot", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/peugeot.svg" },
  { name: "Ford", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ford.svg" },
  { name: "Chevrolet", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/chevrolet.svg" },
  { name: "Citroën", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/citroen.svg" },
  { name: "Seat", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/seat.svg" },
];

export const CompatibilityChecker = () => {
  return (
    <section className="py-16 md:py-20 bg-warm overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-warning text-xs font-semibold uppercase tracking-[0.2em] mb-3">תאימות</p>
          <h2 className="text-3xl md:text-5xl font-black text-surface-dark tracking-tight mb-2">תואם לרכב שלך.</h2>
          <p className="text-gray-400 text-sm">כמעט כל רכב מ-1996+. יותר מ-10,000 דגמים. מתחבר בשניות.</p>
        </motion.div>
      </div>

      {/* Horizontal scroll strip — swipeable on mobile, static on desktop */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#f0f0ed] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-3 overflow-x-auto px-6 pb-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {brands.map((brand, i) => (
            <motion.div key={brand.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white border border-gray-200 shrink-0 group hover:border-primary/30 hover:-translate-y-0.5 transition-all"
              style={{ minWidth: '96px' }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-7 h-7 opacity-40 group-hover:opacity-70 transition-opacity"
                style={{ filter: 'brightness(0)' }}
                loading="lazy"
              />
              <span className="text-[11px] font-semibold text-gray-400 group-hover:text-gray-700 transition-colors whitespace-nowrap">{brand.name}</span>
            </motion.div>
          ))}
          <div className="flex flex-col items-center justify-center gap-2 px-5 py-4 rounded-xl bg-primary/5 border border-primary/15 shrink-0" style={{ minWidth: '96px' }}>
            <span className="text-xl font-black text-primary">+</span>
            <span className="text-[11px] font-semibold text-primary whitespace-nowrap">עוד אלפים</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-4">
        <a href="mailto:support@d10.store" className="text-primary text-xs font-semibold hover:underline">לא בטוח? שלח לנו את הדגם ←</a>
      </div>
    </section>
  );
};
