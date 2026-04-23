import React from 'react';
import { motion } from 'motion/react';

export const CompatibilityChecker = () => {
  const brands = [
    "Toyota", "Hyundai", "Kia", "BMW", "Mercedes", "Audi",
    "Volkswagen", "Mazda", "Honda", "Nissan", "Subaru", "Škoda",
    "Mitsubishi", "Peugeot", "Ford", "Chevrolet", "Citroën", "Seat",
  ];

  return (
    <section className="py-20 md:py-28 bg-warm overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-warning text-xs font-semibold uppercase tracking-[0.2em] mb-3">תאימות</p>
          <h2 className="text-3xl md:text-5xl font-black text-surface-dark tracking-tight mb-3">תואם לרכב שלך.</h2>
          <p className="text-gray-400 text-sm mb-10">כמעט כל רכב מ-1996+. יותר מ-10,000 דגמים. מתחבר בשניות.</p>
        </motion.div>

        <div className="flex flex-wrap gap-2.5">
          {brands.map((name, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.03 }}
              className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:border-primary/30 hover:-translate-y-0.5 transition-all cursor-default">
              <span className="text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap">{name}</span>
            </motion.div>
          ))}
          <div className="px-4 py-2.5 rounded-lg bg-primary/5 border border-primary/15">
            <span className="text-xs font-semibold text-primary whitespace-nowrap">+ אלפי דגמים נוספים</span>
          </div>
        </div>

        <div className="mt-8">
          <a href="mailto:support@d10.store" className="text-primary text-xs font-semibold hover:underline">לא בטוח? שלח לנו את הדגם ←</a>
        </div>
      </div>
    </section>
  );
};
