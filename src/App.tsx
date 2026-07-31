/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, Hero } from './components/HeroSection';
import { PainPoints, SolutionOverview } from './components/PainAndSolution';
import { FeatureDeepDive } from './components/Features';
import { HowItWorks } from './components/MiddleSections';
import { CompatibilityChecker } from './components/Compatibility';
import { Pricing, Testimonials } from './components/PricingAndTestimonials';
import { FAQ, FinalCTA, Footer, CookieConsentBanner, MobileStickyBar, AccessibilityWidget, InlineCTA } from './components/BottomSections';
import { PrivacyPolicy, TermsOfUse, AccessibilityStatement, ReturnsCancellationPolicy } from './components/LegalPages';

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
    <div className="min-h-screen bg-[#06070a] font-sans selection:bg-primary selection:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-[300] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md">דלג לתוכן</a>
      <Navbar />

      {currentPage ? (
        <>
          {renderLegalPage()}
          <Footer />
        </>
      ) : (
        <>
          <main id="main-content" role="main">
            <Hero>
              <PainPoints />
              <SolutionOverview />
              <FeatureDeepDive />
            </Hero>
            <HowItWorks />
            <CompatibilityChecker />
            <Pricing />
            <Testimonials />
            <InlineCTA variant="dark" />
            <FAQ />
            <FinalCTA />

            <div className="section-dark py-5 px-6 border-t border-white/6" dir="rtl">
              <p className="text-white/25 text-[10px] max-w-6xl mx-auto leading-relaxed">
                * D10 הוא מכשיר דיאגנוסטי אינפורמטיבי ואינו מהווה תחליף לבדיקה מקצועית. יש להתייעץ עם מוסכניק מוסמך לפני ביצוע תיקונים. המחירים כוללים מע"מ.
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
