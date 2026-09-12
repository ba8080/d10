import { useState, useRef, type KeyboardEvent } from 'react';
import { ArrowLeft, ArrowUpLeft, Check, CheckCheck, Activity, ScanLine, Wrench, Cable, Smartphone, MessageCircle, Truck, ShieldCheck, CreditCard, Languages, CircleHelp, Gauge, Battery, Thermometer, Bluetooth, ChevronDown } from 'lucide-react';

const experiences = [
  {id:'diagnostics', Icon:ScanLine, number:'01', title:'מקוד תקלה לתשובה ברורה.', short:'סריקת תקלות', text:'נורת המנוע נדלקה? קבלו הסבר בעברית על הקוד שהרכב מדווח, כדי לדעת מה לשאול בבדיקה המקצועית.'},
  {id:'live', Icon:Activity, number:'02', title:'כל הנתונים, במבט אחד.', short:'נתוני רכב', text:'סל״ד, טמפרטורה ונתוני מצבר — מרוכזים בתצוגה נוחה. הנתונים הזמינים תלויים בדגם הרכב.'},
  {id:'maintenance', Icon:Wrench, number:'03', title:'גם לטיפול הבא יש מקום.', short:'מעקב טיפולים', text:'מרכזים את היסטוריית הטיפולים והתזכורות, ושומרים את הדברים שחשוב לזכור במקום אחד.'},
];
function AppDemo({ active }: { active:number }) {
  const [expanded, setExpanded] = useState(false);
  return <div className="demo-stage" onPointerMove={event=>{ if(event.pointerType!=="mouse") return; const rect=event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--tilt-x", `${(event.clientY-rect.top-rect.height/2)/-45}deg`); event.currentTarget.style.setProperty("--tilt-y", `${(event.clientX-rect.left-rect.width/2)/45}deg`); }} onPointerLeave={event=>{event.currentTarget.style.setProperty("--tilt-x","0deg");event.currentTarget.style.setProperty("--tilt-y","0deg");}}>
    <div className="demo-stage-label"><span className="eyebrow">כל המידע. ממש כאן.</span><span dir="ltr">LIVE INTERFACE / DEMO</span></div>
    <div className="app-window">
      <div className="app-header"><span className="app-logo" dir="ltr">D10<span>AI</span></span><span className="app-connected"><Bluetooth size={12}/> תצוגה לדוגמה</span><span className="app-avatar" aria-hidden="true">ד</span></div>
      <div className="app-car"><div><span>הרכב שלי</span><strong>הכול מתחיל בלהבין.</strong></div><div className="car-icon"><Gauge size={27} strokeWidth={1.3}/></div></div>
      <div className="app-tabs" aria-hidden="true">{experiences.map((item,i)=><span className={active===i?'active':''} key={item.id}>{item.short}</span>)}</div>
      {experiences.map((item,index)=><div className="app-panel" id={`experience-${item.id}`} key={item.id} role="tabpanel" hidden={active!==index} aria-labelledby={`tab-${item.id}`} tabIndex={0}>
        {index===0 && <>
          <div className="scan-complete"><span><CheckCheck size={18}/> הסריקה הושלמה</span><span>דוח לדוגמה</span></div>
          <div className="diagnostic-card">
            <div className="diagnostic-top"><span className="engine-icon"><ScanLine size={23}/></span><span className="status-tag">לבירור מקצועי</span></div>
            <span className="app-label">זוהה קוד תקלה</span><h3>מערכת ניהול המנוע</h3><p>הרכב מדווח על חריגה. D10 עוזר להבין את משמעות הקוד ולרכז מידע לקראת הבדיקה במוסך.</p>
            <button className="report-button" onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} aria-controls="sample-report">{expanded?'סגירת ההסבר':'מה זה אומר?'}<ArrowLeft size={16}/></button>
            <div className="sample-report" id="sample-report" hidden={!expanded}>קוד תקלה הוא נקודת התחלה לבדיקה. הוא אינו מוכיח שחלק מסוים דורש החלפה. מומלץ להציג את המידע לאיש מקצוע לפני ביצוע תיקון.</div>
          </div>
          <div className="app-hint"><CircleHelp size={15}/><span>התמונה ברורה יותר. השיחה במוסך פשוטה יותר.</span></div>
        </>}
        {index===1 && <>
          <div className="scan-complete"><span><Activity size={18}/> תמונת מצב של הרכב</span><span>נתונים לדוגמה</span></div>
          <div className="live-gauge"><div className="gauge-arc"><span>סיבובי מנוע</span><strong dir="ltr">820</strong><small>RPM</small></div><div className="gauge-ticks" aria-hidden="true"><span>0</span><span>8,000</span></div></div>
          <svg className="live-signal" viewBox="0 0 320 38" aria-hidden="true"><path d="M0 26H24L30 17L37 29L45 22H65L73 5L82 34L90 20H119L130 13L143 25L150 20H185L195 5L205 35L214 21H255L265 15L278 27L285 22H320"/></svg><div className="live-readings"><div><Thermometer size={18}/><span>טמפרטורת נוזל קירור</span><bdi>88°C</bdi></div><div><Battery size={18}/><span>מתח מצבר</span><bdi>12.6V</bdi></div></div>
          <div className="app-hint"><CircleHelp size={15}/><span>זמינות הנתונים תלויה ברכב ובתמיכת המערכות.</span></div>
        </>}
        {index===2 && <>
          <div className="scan-complete"><span><Wrench size={18}/> היומן של הרכב</span><span>נתונים לדוגמה</span></div>
          <div className="maintenance-head"><span>מוכנים לקילומטרים הבאים.</span><h3>טיפול קטן בזיכרון.<br/>סדר גדול בראש.</h3></div>
          <div className="maintenance-rows">{[{title:'החלפת שמן ומסנן',sub:'הטיפול האחרון',state:'תועד',done:true},{title:'טיפול תקופתי',sub:'התזכורת הבאה',state:'מתוכנן',done:false},{title:'בדיקת צמיגים',sub:'להוסיף ליומן הרכב',state:'למעקב',done:false}].map(row=><div key={row.title}><span className={row.done?'maintenance-dot complete':'maintenance-dot'}>{row.done?<Check size={12}/>:<Wrench size={11}/>}</span><div><b>{row.title}</b><span>{row.sub}</span></div><small>{row.state}</small></div>)}</div>
        </>}
      </div>)}
      <div className="app-bottom"><span dir="ltr">D10 AI</span><span>הדמיית ממשק · לא סריקה של רכב אמיתי</span></div>
    </div>
    <p className="demo-caption">לחצו על היכולות וגלו את החוויה <ArrowUpLeft size={14}/></p>
  </div>;
}
export function ProductExperience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement|null)[]>([]);
  function onTabKey(event:KeyboardEvent<HTMLButtonElement>, index:number) {
    let next = index;
    if(event.key==='ArrowDown'||event.key==='ArrowRight') next=(index+1)%3;
    else if(event.key==='ArrowUp'||event.key==='ArrowLeft') next=(index+2)%3;
    else if(event.key==='Home') next=0;
    else if(event.key==='End') next=2;
    else return;
    event.preventDefault();setActive(next);tabs.current[next]?.focus();
  }
  return <section className="experience-section shell" id="features" aria-labelledby="experience-title">
    <div className="section-heading"><div><span className="eyebrow" dir="ltr">YOUR CAR. DECODED.</span><h2 className="section-title" id="experience-title">מאחורי כל נורה,<br/>יש תשובה.</h2></div><p>לא צריך להיות מכונאים כדי להבין יותר.<br/>צריך פשוט את המידע הנכון, בשפה שלכם.</p></div>
    <div className="experience-layout">
      <div className="experience-options" role="tablist" aria-label="בחרו יכולת להדגמה" aria-orientation="vertical">
        {experiences.map(({id,Icon,number,title,text},index)=><button key={id} ref={el=>{tabs.current[index]=el;}} id={`tab-${id}`} role="tab" aria-selected={active===index} aria-controls={`experience-${id}`} tabIndex={active===index?0:-1} onKeyDown={event=>onTabKey(event,index)} onClick={()=>setActive(index)} className={`experience-option ${active===index?'selected':''}`}><div className="experience-option-top"><Icon size={22} strokeWidth={1.5}/><span>{number}</span></div><h3>{title}</h3><p>{text}</p><span className="experience-see">לצפייה בהדגמה <ArrowLeft size={15}/></span></button>)}
      </div>
      <AppDemo active={active}/>
    </div>
    <div className="more-capabilities"><span>ויש עוד מקום לדברים החשובים</span><div><Battery size={16}/> נתוני מצבר</div><div><CircleHelp size={16}/> מדריך נורות</div><div><Languages size={16}/> עברית ואנגלית</div><a href="#compatibility">מה מתאים לרכב שלי? <ArrowLeft size={15}/></a></div>
  </section>;
}
export function HowItWorks() {
  return <section className="how-section" id="how" aria-labelledby="how-title"><div className="shell">
    <div className="section-heading"><div><span className="eyebrow" dir="ltr">PLUG IN. CONNECT. UNDERSTAND.</span><h2 className="section-title" id="how-title">מתחברים.<br/>מתקדמים.</h2></div><a href="#compatibility" className="text-link">נתחיל מבדיקת התאמה <ArrowLeft size={18}/></a></div>
    <div className="steps-grid">
      {[{Icon:Cable,num:'01',title:'מחברים לרכב.',description:'מחברים את המתאם לשקע ה־OBD2, שנמצא בדרך כלל מתחת להגה. בהתאם להוראות ההתקנה של המוצר.',detail:'מתאם קטן. חיבור פשוט.'},{Icon:Smartphone,num:'02',title:'פותחים את האפליקציה.',description:'מורידים את אפליקציית D10 ומבצעים את החיבור הראשוני לפי ההנחיות. הצוות שלנו כאן אם צריך עזרה.',detail:'כל החוויה בעברית.'},{Icon:MessageCircle,num:'03',title:'מתחילים להבין.',description:'מפעילים סריקה כשהרכב עומד במקום בטוח, ומקבלים את המידע הזמין מהרכב בתצוגה ברורה.',detail:'המידע מגיע אליכם.'}].map(({Icon,num,title,description,detail})=><article className="step" key={num}><div className="step-top"><span>{num}</span><Icon size={29} strokeWidth={1.3}/></div><h3>{title}</h3><p>{description}</p><span className="step-detail">{detail}</span></article>)}
    </div>
  </div></section>;
}
export function FinalInvitation() {
  return <section className="final-invitation shell"><div><span className="eyebrow" dir="ltr">READY FOR YOUR NEXT UPGRADE?</span><h2>הנסיעה הבאה שלך.<br/><span>ברמה אחרת.</span></h2><a className="button button-primary" href="#pricing">בואו להכיר את ה־D10 שלכם <ArrowLeft size={18}/></a></div><div className="final-monogram" aria-hidden="true" dir="ltr">D10<span>AI</span></div></section>;
}
