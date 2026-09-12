import { useEffect } from 'react';

export function useScrollReveal(route: string) {
  useEffect(() => {
    const elements = [...document.querySelectorAll<HTMLElement>('.section-heading, .experience-layout, .step, .ps-compatibility-layout, .ps-purchase-heading, .ps-purchase-layout, .ps-faq-layout, .final-invitation')];
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }, { threshold: .07, rootMargin: '0px 0px 45px 0px' });
    elements.forEach(element=>{element.classList.add('reveal-on-scroll');observer.observe(element);});
    return () => { observer.disconnect(); elements.forEach(el=>el.classList.remove('reveal-on-scroll', 'revealed')); };
  }, [route]);
}
