import React from 'react';

const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="min-h-screen bg-white pt-28 pb-20" dir="rtl">
    <div className="max-w-3xl mx-auto px-6">
      <a href="#" className="text-primary text-xs font-semibold hover:underline mb-8 inline-block">→ חזרה</a>
      <h1 className="text-3xl font-black text-surface-dark mb-8 tracking-tight">{title}</h1>
      <div className="space-y-5 text-gray-500 text-sm leading-relaxed">{children}</div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalPage title="מדיניות פרטיות">
    <p className="text-gray-300 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-base font-bold text-surface-dark">1. כללי</h2>
    <p>D10 ("החברה") מפעילה את אתר www.d10.store. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.</p>
    <h2 className="text-base font-bold text-surface-dark">2. מידע שאנו אוספים</h2>
    <ul className="list-disc pr-6 space-y-1"><li>פרטי קשר: שם, דוא"ל, טלפון</li><li>הזמנות: רכישה, כתובת, תשלום</li><li>גלישה: IP, דפדפן, דפים</li><li>עוגיות (בהסכמה)</li></ul>
    <h2 className="text-base font-bold text-surface-dark">3. מטרות</h2>
    <ul className="list-disc pr-6 space-y-1"><li>עיבוד הזמנות</li><li>שירות לקוחות</li><li>שיפור מוצרים</li><li>שיווק (בהסכמה)</li></ul>
    <h2 className="text-base font-bold text-surface-dark">4. שיתוף</h2>
    <p>ספקי שירות בלבד (Meta, שילוח, תשלומים). לא מוכרים מידע.</p>
    <h2 className="text-base font-bold text-surface-dark">5. זכויותיך</h2>
    <p>עיון, תיקון, מחיקה, הסרה מתפוצות: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

export const TermsOfUse = () => (
  <LegalPage title="תנאי שימוש">
    <p className="text-gray-300 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-base font-bold text-surface-dark">1. כללי</h2>
    <p>השימוש באתר ובמוצרים מהווה הסכמה לתנאים.</p>
    <h2 className="text-base font-bold text-surface-dark">2. המוצר</h2>
    <p>D10 AI — מכשיר דיאגנוסטי אינפורמטיבי. אינו תחליף לבדיקה מקצועית.</p>
    <h2 className="text-base font-bold text-surface-dark">3. תאימות</h2>
    <p>רוב רכבי OBD2 (1996+). אין התחייבות לתאימות מלאה עם כל דגם.</p>
    <h2 className="text-base font-bold text-surface-dark">4. אחריות</h2>
    <p>החברה אינה אחראית לנזקים מהשימוש. שימוש על אחריות המשתמש.</p>
    <h2 className="text-base font-bold text-surface-dark">5. דין</h2>
    <p>חוקי ישראל. קשר: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

export const AccessibilityStatement = () => (
  <LegalPage title="הצהרת נגישות">
    <p className="text-gray-300 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-base font-bold text-surface-dark">מחויבות</h2>
    <p>D10 מחויבת להנגשת האתר בהתאם לחוק שוויון זכויות.</p>
    <ul className="list-disc pr-6 space-y-1"><li>HTML סמנטי</li><li>ניווט מקלדת</li><li>ARIA</li><li>ניגודיות</li><li>RTL מלא</li></ul>
    <p>בעיה? <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

export const ReturnsCancellationPolicy = () => (
  <LegalPage title="ביטולים והחזרות">
    <p className="text-gray-300 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-base font-bold text-surface-dark">ביטול</h2>
    <p>14 ימים מקבלת המוצר, ללא שימוש ופגם.</p>
    <h2 className="text-base font-bold text-surface-dark">החזר</h2>
    <p>14 ימים באמצעי המקורי. דמי ביטול עד 5% או 100 ₪.</p>
    <h2 className="text-base font-bold text-surface-dark">מוצר פגום</h2>
    <p>החלפה/החזר מלא: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);
