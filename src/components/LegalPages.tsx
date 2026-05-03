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
    <p>D10 ("החברה") מפעילה את אתר www.d10.store. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלך בהתאם לחוק הגנת הפרטיות, התשמ"א-1981.</p>
    <h2 className="text-base font-bold text-surface-dark">2. מידע שאנו אוספים</h2>
    <ul className="list-disc pr-6 space-y-1"><li>פרטי קשר: שם, דוא"ל, טלפון</li><li>הזמנות: רכישה, כתובת, תשלום</li><li>גלישה: IP, דפדפן, דפים</li><li>עוגיות (בהסכמה)</li></ul>
    <h2 className="text-base font-bold text-surface-dark">3. מטרות</h2>
    <ul className="list-disc pr-6 space-y-1"><li>עיבוד הזמנות ואספקת המוצר</li><li>שירות לקוחות ותמיכה טכנית</li><li>שיפור מוצרים ושירותים</li><li>שיווק ועדכונים (בהסכמה בלבד)</li></ul>
    <h2 className="text-base font-bold text-surface-dark">4. שיתוף מידע</h2>
    <p>אנו משתפים מידע עם ספקי שירות חיוניים בלבד (עיבוד תשלומים, שילוח, ניתוח נתונים). איננו מוכרים, משכירים או מעבירים מידע אישי לצדדים שלישיים למטרות שיווק.</p>
    <h2 className="text-base font-bold text-surface-dark">5. אבטחת מידע</h2>
    <p>אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע, לרבות הצפנת SSL ואחסון מאובטח. יחד עם זאת, אין אפשרות להבטיח אבטחה מלאה של מידע באינטרנט.</p>
    <h2 className="text-base font-bold text-surface-dark">6. זכויותיך</h2>
    <p>בהתאם לחוק הגנת הפרטיות, עומדות לך הזכויות הבאות:</p>
    <ul className="list-disc pr-6 space-y-1"><li>עיון במידע שנאסף עליך</li><li>תיקון מידע שגוי</li><li>מחיקת מידע אישי</li><li>הסרה מרשימות תפוצה</li></ul>
    <p>לכל בקשה: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
    <h2 className="text-base font-bold text-surface-dark">7. עוגיות (Cookies)</h2>
    <p>האתר משתמש בעוגיות לצורכי תפעול ושיפור חוויית הגלישה. ניתן לנהל את העדפות העוגיות דרך הגדרות הדפדפן. שימוש באתר בכפוף לאישור העוגיות כפי שמוצג בבאנר הייעודי.</p>
  </LegalPage>
);

export const TermsOfUse = () => (
  <LegalPage title="תנאי שימוש">
    <p className="text-gray-300 text-xs">עדכון אחרון: מרץ 2026</p>
    <h2 className="text-base font-bold text-surface-dark">1. כללי</h2>
    <p>השימוש באתר www.d10.store ובמוצרים הנמכרים בו מהווה הסכמה לתנאים אלו. אם אינך מסכים, אנא הימנע משימוש באתר.</p>
    <h2 className="text-base font-bold text-surface-dark">2. המוצר</h2>
    <p>D10 הוא מכשיר דיאגנוסטי אינפורמטיבי בלבד. המוצר מספק מידע על מצב הרכב אך <strong>אינו מהווה תחליף לבדיקה מקצועית על ידי מוסכניק מוסמך</strong>. החברה אינה אחראית להחלטות שנתקבלו על סמך נתוני המכשיר.</p>
    <h2 className="text-base font-bold text-surface-dark">3. תאימות</h2>
    <p>המוצר תואם לרוב כלי הרכב התומכים בפרוטוקול OBD-II (רכבים משנת 1996 ומעלה). אין התחייבות לתאימות מלאה עם כל דגם ודגם. בספק — ניתן לפנות אלינו לפני הרכישה.</p>
    <h2 className="text-base font-bold text-surface-dark">4. מחירים ותשלום</h2>
    <p>כל המחירים המוצגים באתר כוללים מע"מ. התשלום מתבצע באמצעות מערכת Yaad Pay המאובטחת. החברה שומרת לעצמה את הזכות לעדכן מחירים.</p>
    <h2 className="text-base font-bold text-surface-dark">5. אספקה ומשלוח</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>זמן אספקה: עד 3 ימי עסקים מרגע ההזמנה</li>
      <li>אזור אספקה: כל רחבי ישראל</li>
      <li>עלות משלוח: חינם לכל ההזמנות</li>
      <li>שליחות עד הבית באמצעות חברת שליחויות</li>
    </ul>
    <h2 className="text-base font-bold text-surface-dark">6. הגבלת אחריות</h2>
    <p>החברה אינה אחראית לנזקים ישירים או עקיפים הנובעים מהשימוש במוצר. המוצר מספק מידע אינפורמטיבי בלבד, והשימוש בו הוא על אחריות המשתמש.</p>
    <h2 className="text-base font-bold text-surface-dark">7. קניין רוחני</h2>
    <p>כל התכנים באתר, לרבות טקסטים, תמונות, עיצוב ולוגו, הם רכוש החברה ומוגנים בזכויות יוצרים.</p>
    <h2 className="text-base font-bold text-surface-dark">8. דין חל וסמכות שיפוט</h2>
    <p>על תנאים אלו יחולו חוקי מדינת ישראל. סמכות השיפוט הבלעדית נתונה לבתי המשפט במחוז המרכז.</p>
    <p>לשאלות: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>
  </LegalPage>
);

export const AccessibilityStatement = () => (
  <LegalPage title="הצהרת נגישות">
    <p className="text-gray-300 text-xs">עדכון אחרון: מאי 2026</p>
    <h2 className="text-base font-bold text-surface-dark">מחויבות לנגישות</h2>
    <p>D10 מחויבת להנגיש את האתר לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ"ח-1998 ותקנות הנגישות הרלוונטיות.</p>
    <h2 className="text-base font-bold text-surface-dark">רמת נגישות</h2>
    <p>האתר נבנה לעמידה בתקן WCAG 2.0 ברמה AA, הכולל:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>HTML סמנטי ומובנה</li>
      <li>ניווט מלא באמצעות מקלדת</li>
      <li>תמיכה בתוכנות קריאת מסך (ARIA)</li>
      <li>ניגודיות צבעים מספקת</li>
      <li>תמיכה מלאה בכיוון RTL</li>
      <li>אפשרות הגדלת טקסט</li>
      <li>גופן קריא ונגיש</li>
    </ul>
    <h2 className="text-base font-bold text-surface-dark">כלי נגישות באתר</h2>
    <p>באתר מוטמע כפתור נגישות המאפשר:</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>הגדלת טקסט</li>
      <li>הגברת ניגודיות</li>
      <li>החלפה לגופן קריא</li>
      <li>הדגשת קישורים</li>
    </ul>
    <h2 className="text-base font-bold text-surface-dark">חריגים ידועים</h2>
    <p>ייתכנו רכיבים באתר שאינם נגישים במלואם, כגון תוכן מדיה (סרטון ברקע). אנו פועלים לשפר את הנגישות באופן מתמשך.</p>
    <h2 className="text-base font-bold text-surface-dark">פניות בנושא נגישות</h2>
    <p>נתקלתם בבעיית נגישות? נשמח לסייע.</p>
    <ul className="list-disc pr-6 space-y-1">
      <li>דוא"ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></li>
      <li>אנו מתחייבים לטפל בכל פנייה תוך 7 ימי עסקים</li>
    </ul>
  </LegalPage>
);

export const ReturnsCancellationPolicy = () => (
  <LegalPage title="ביטולים והחזרות">
    <p className="text-gray-300 text-xs">עדכון אחרון: מאי 2026</p>
    <p>מדיניות זו בהתאם לחוק הגנת הצרכן, תשמ"א-1981 (סעיף 14ג — עסקת מכר מרחוק).</p>

    <h2 className="text-base font-bold text-surface-dark">זכות ביטול</h2>
    <p>הלקוח רשאי לבטל את העסקה <strong>בתוך 14 ימים מיום קבלת המוצר או מיום קבלת מסמך הגילוי, לפי המאוחר מביניהם</strong>, וזאת ללא צורך בציון סיבה.</p>

    <h2 className="text-base font-bold text-surface-dark">אופן הביטול</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>באמצעות פנייה בדוא"ל: <a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></li>
      <li>באמצעות פנייה טלפונית או בכתב</li>
    </ul>

    <h2 className="text-base font-bold text-surface-dark">דמי ביטול</h2>
    <p>במקרה של ביטול שלא בשל פגם או אי-התאמה, החברה רשאית לגבות דמי ביטול בשיעור של <strong>5% ממחיר העסקה או 100 ₪, הנמוך מביניהם</strong>.</p>

    <h2 className="text-base font-bold text-surface-dark">תנאים להחזרת המוצר</h2>
    <ul className="list-disc pr-6 space-y-1">
      <li>המוצר לא נפגם ולא נעשה בו שימוש</li>
      <li>המוצר באריזתו המקורית</li>
      <li>הלקוח אחראי להחזרת המוצר לכתובת החברה</li>
    </ul>

    <h2 className="text-base font-bold text-surface-dark">החזר כספי</h2>
    <p>ההחזר יתבצע באמצעי התשלום המקורי, <strong>תוך 14 ימים ממועד קבלת הודעת הביטול</strong>.</p>

    <h2 className="text-base font-bold text-surface-dark">מוצר פגום / אי-התאמה</h2>
    <p>במקרה של מוצר פגום או שאינו תואם את תיאורו, הלקוח זכאי ל<strong>החלפה או החזר כספי מלא ללא גביית דמי ביטול</strong>. יש לפנות אלינו בצירוף תיאור הפגם:</p>
    <p><a href="mailto:support@d10.store" className="text-primary underline">support@d10.store</a></p>

    <h2 className="text-base font-bold text-surface-dark">אחריות</h2>
    <p>המוצר מגיע עם אחריות לתקופה של שנה אחת מיום הרכישה. האחריות מכסה פגמי ייצור בלבד ואינה חלה על נזק שנגרם כתוצאה משימוש לא תקין.</p>
  </LegalPage>
);
