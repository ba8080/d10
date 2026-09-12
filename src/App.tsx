import { useEffect, useState } from 'react';
import { Header, Footer, ConsentBanner, MobilePurchaseBar, AccessibilityControls } from './components/SiteChrome';
import { ProductExperience, HowItWorks, FinalInvitation } from './components/ProductStory';
import { CompatibilitySection, PurchaseSection, FAQSection } from './components/PurchaseSections';
import { PrivacyPolicy, TermsOfUse, AccessibilityStatement, ReturnsCancellationPolicy } from './components/LegalPages';
import { initializeAnalytics } from './utils';
import { Hero } from './components/TechHero';
import { useScrollReveal } from './useScrollReveal';

const legalPages = { privacy: PrivacyPolicy, terms: TermsOfUse, accessibility: AccessibilityStatement, returns: ReturnsCancellationPolicy };
const titles: Record<string, string> = { privacy: 'מדיניות פרטיות', terms: 'תנאי שימוש', accessibility: 'הצהרת נגישות', returns: 'ביטולים והחזרות' };

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));
  useScrollReveal(hash);
  const LegalContent = Object.hasOwn(legalPages, hash) ? legalPages[hash as keyof typeof legalPages] : undefined;
  useEffect(() => {
    const update = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', update);
    initializeAnalytics();
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    document.title = LegalContent ? `${titles[hash]} | D10 AI` : 'D10 AI — הרכב שלך. עכשיו מחובר אליך.';
    const frame = requestAnimationFrame(() => {
      if (LegalContent || !hash || hash === 'home') {
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (LegalContent) document.getElementById('main-content')?.focus({ preventScroll: true });
      } else {
        const section = document.getElementById(hash);
        section?.scrollIntoView({ behavior: 'instant', block: 'start' });
        if (hash === 'main-content') section?.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, LegalContent]);
  return <div className="site" dir="rtl" id="home">
    <Header />
    <main id="main-content" tabIndex={-1}>
      {LegalContent ? <LegalContent /> : <>
        <Hero /><ProductExperience /><HowItWorks /><CompatibilitySection /><PurchaseSection /><FAQSection /><FinalInvitation />
        <div className="product-note shell">D10 מספק מידע על הרכב ואינו תחליף לבדיקה מקצועית. זמינות הנתונים והיכולות משתנה בהתאם לרכב. יש להשתמש באפליקציה רק כשהרכב עומד במקום בטוח.</div>
      </>}
    </main>
    <Footer /><MobilePurchaseBar hidden={!!LegalContent} /><ConsentBanner /><AccessibilityControls />
  </div>;
}
