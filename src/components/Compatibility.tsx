import React from 'react';
import { motion } from 'motion/react';

const brands = [
  "Toyota", "Hyundai", "Kia", "BMW", "Mercedes", "Audi", "Volkswagen", "Mazda", "Honda",
  "Nissan", "Subaru", "Škoda", "Mitsubishi", "Peugeot", "Ford", "Chevrolet", "Citroën", "Seat",
];

const BrandChip: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/4 border border-white/8 shrink-0 hover:border-blue-400/30 hover:bg-white/6 transition-colors">
    <span className="text-sm font-bold text-white/45 whitespace-nowrap tracking-wide">{name}</span>
  </div>
);

export const CompatibilityChecker = () => {
  return (
    <section className="py-20 md:py-28 section-dark overflow-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="kicker mb-4">תאימות</span>
          <h2 className="h-display text-4xl md:text-6xl text-white mt-3 mb-3">תואם לרכב שלך.</h2>
          <p className="muted text-sm">כמעט כל רכב מ-1996 ומעלה · יותר מ-10,000 דגמים · מתחבר בשניות</p>
        </motion.div>
      </div>

      {/* Auto-scrolling marquee, two staggered rows */}
      <div className="relative space-y-3" aria-hidden="true">
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#06070a] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#06070a] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-3 animate-marquee-rtl w-max" style={{ animationDuration: '42s' }}>
          {[...brands, ...brands, ...brands].map((b, i) => <BrandChip key={i} name={b} />)}
        </div>
        <div className="flex gap-3 animate-marquee-rtl w-max" style={{ animationDuration: '58s' }}>
          {[...brands.slice(9), ...brands.slice(0, 9), ...brands, ...brands.slice(0, 9)].map((b, i) => <BrandChip key={i} name={b} />)}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 flex flex-col gap-2">
        <a href="mailto:support@d10.store" className="text-blue-300 text-xs font-semibold hover:text-blue-200 hover:underline">לא בטוח לגבי הדגם שלך? שלח לנו ונבדוק ←</a>
        <p className="muted-2 text-[10px]">שמות המותגים שייכים לבעליהם ומוצגים לצורכי תאימות בלבד. אין קשר מסחרי או שותפות עם היצרנים.</p>
      </div>
    </section>
  );
};
