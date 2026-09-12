import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global { interface Window { fbq?: any; _fbq?: any; } }
type Consent = 'granted' | 'denied' | null;
let sessionConsent: Consent | undefined;
let analyticsInitialized = false;
const analyticsAllowedHere = () => ['d10.store', 'www.d10.store'].includes(window.location.hostname);
export function getStoredConsent(): Consent {
  if (sessionConsent !== undefined) return sessionConsent;
  try {
    const saved = localStorage.getItem('d10_cookie_consent');
    return saved === 'granted' || saved === 'denied' ? saved : null;
  } catch { return null; }
}
/** Marketing code loads only after consent, on the production store domain. */
export function initializeAnalytics() {
  if (getStoredConsent() !== 'granted' || !analyticsAllowedHere()) return;
  if (analyticsInitialized) { window.fbq?.('consent', 'grant'); return; }
  if (!window.fbq) {
    const pixel: any = function (...args: unknown[]) {
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    };
    pixel.queue = []; pixel.push = pixel; pixel.loaded = true; pixel.version = '2.0';
    window.fbq = pixel; window._fbq = pixel;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  analyticsInitialized = true;
  window.fbq('consent', 'grant');
  window.fbq('init', '1767649204206159');
  window.fbq('track', 'PageView');
}
export function setAnalyticsConsent(granted: boolean) {
  sessionConsent = granted ? 'granted' : 'denied';
  try { localStorage.setItem('d10_cookie_consent', sessionConsent); } catch { /* In-memory preference remains effective. */ }
  if (granted) initializeAnalytics();
  else window.fbq?.('consent', 'revoke');
}
export const trackCheckout = (value: number) => {
  if (getStoredConsent() !== 'granted' || !analyticsAllowedHere()) return;
  try { window.fbq?.('track', 'InitiateCheckout', { value, currency: 'ILS' }); } catch { /* Keep checkout available. */ }
};

export const SOLO_PAYMENT_URL = "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=299&Coin=1&FixTash=False&Info=D10AI&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5BD10AI~D10AI~1~299%5D&sendemail=True&tmp=3&signature=0994d7892e98fc94bc6b7ed74da8b493199690c2fb39d11d58cbd9724d4d989c";

export const FAMILY_PAYMENT_URL = "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=717&Coin=1&FixTash=False&Info=D10_3_bunddle&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&Pritim=True&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&heshDesc=%5B3x~D10_3_bunddle~3~239%5D&sendemail=True&tmp=1&signature=da705b380753b049004ea69ad5152e0f0ba447a1cc89eb71fae15c6aa0876c9f";

export const ULTIMATE_PAYMENT_URL = "https://pay.hyp.co.il/cgi-bin/yaadpay/yaadpay3ds.pl?Amount=800&Coin=1&FixTash=False&Info=D10_4_bunddle&Masof=4502254941&MoreData=True&PageLang=HEB&Postpone=False&ShowEngTashText=True&Tash=1&UTF8out=True&action=pay&freq=1&sendemail=True&tmp=1&signature=e4be36b9fd6a9f887aca12fbaae6d85770913acc40622940f310c070f3d0cd4f";
