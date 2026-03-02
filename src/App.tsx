import { useState, useEffect } from "react";

const G = { green:"#1a7a2e", light:"#22a83d", pale:"#e8f5eb", dark:"#0d4a1a" };

const DEPT_META = {
  dev:   { label:"Software Dev",  emoji:"💻", color:"#2563eb", bg:"#eff6ff" },
  mkt:   { label:"Marketing",     emoji:"📣", color:"#7c3aed", bg:"#f5f3ff" },
  sales: { label:"Sales",         emoji:"💼", color:"#16a34a", bg:"#f0fdf4" },
  hr:    { label:"HR / Ops",      emoji:"👥", color:"#d97706", bg:"#fffbeb" },
  fin:   { label:"Finance",       emoji:"💰", color:"#db2777", bg:"#fdf2f8" },
  design:{ label:"Design",        emoji:"🎨", color:"#dc2626", bg:"#fff7ed" },
  pm:    { label:"Product Mgmt",  emoji:"📦", color:"#0891b2", bg:"#ecfeff" },
};

const COURSES = {
  phase0:[
    {id:"P0-1",name:"Getting Started with Claude.ai",        hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/12997377-getting-started-with-claude-ai",platform:"Anthropic Video",fmt:"Video"},
    {id:"P0-2",name:"Claude 101",                            hrs:1,    cert:true, link:"https://anthropic.skilljar.com/claude-101",platform:"Anthropic Academy",fmt:"Video + Exercises"},
    {id:"P0-3",name:"AI Fluency: Framework & Foundations",   hrs:1.5,  cert:true, link:"https://anthropic.skilljar.com/ai-fluency-framework-foundations",platform:"Anthropic Academy",fmt:"Video + Exercises"},
    {id:"P0-4",name:"Claude AI Complete Tutorial (29 mins)", hrs:0.5,  cert:false,link:"https://www.classcentral.com/course/youtube-claude-in-29-minutes-489137",platform:"YouTube – Tina Huang",fmt:"YouTube"},
    {id:"P0-5",name:"Intro to Projects",                     hrs:0.25, cert:false,link:"https://support.claude.com/en/articles/9945648-intro-to-projects",platform:"Anthropic Video",fmt:"Video"},
    {id:"P0-6",name:"Intro to Artifacts",                    hrs:0.25, cert:false,link:"https://support.claude.com/en/articles/9945615-intro-to-artifacts",platform:"Anthropic Video",fmt:"Video"},
  ],
  dev:[
    {id:"DEV-1",name:"Claude Code in Action",                hrs:2,    cert:true, link:"https://anthropic.skilljar.com/claude-code-in-action",platform:"Anthropic Academy",fmt:"Video + Exercises"},
    {id:"DEV-2",name:"Introduction to Agent Skills",         hrs:1,    cert:true, link:"https://anthropic.skilljar.com/introduction-to-agent-skills",platform:"Anthropic Academy",fmt:"Video + Exercises"},
    {id:"DEV-3",name:"Building with the Claude API",         hrs:3,    cert:true, link:"https://anthropic.skilljar.com/claude-with-the-anthropic-api",platform:"Anthropic Academy",fmt:"Video + Hands-on"},
    {id:"DEV-4",name:"Introduction to MCP",                  hrs:2,    cert:true, link:"https://anthropic.skilljar.com/introduction-to-model-context-protocol",platform:"Anthropic Academy",fmt:"Video + Exercises"},
    {id:"DEV-5",name:"Advanced MCP Topics",                  hrs:2,    cert:true, link:"https://anthropic.skilljar.com/model-context-protocol-advanced-topics",platform:"Anthropic Academy",fmt:"Video + Exercises"},
    {id:"DEV-6",name:"Claude for Engineering",               hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/9945689-claude-for-engineering",platform:"Anthropic Video",fmt:"Video"},
    {id:"DEV-7",name:"Prompt Engineering Interactive Tutorial",hrs:2,  cert:false,link:"https://github.com/anthropics/courses",platform:"GitHub – Anthropic",fmt:"Hands-on Notebook"},
    {id:"DEV-8",name:"Claude Code Tutorial for Beginners 2026",hrs:0.5,cert:false,link:"https://dev.to/ayyazzafar/claude-code-tutorial-for-beginners-2026-from-installation-to-building-your-first-project-1lma",platform:"YouTube – AyyazTech",fmt:"YouTube"},
    {id:"DEV-9",name:"Using the GitHub Integration",         hrs:0.25, cert:false,link:"https://support.claude.com/en/articles/9945670-using-the-github-integration",platform:"Anthropic Video",fmt:"Video"},
  ],
  mkt:[
    {id:"MKT-1",name:"Claude for Marketing",                 hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/9945697-claude-for-marketing",platform:"Anthropic Video",fmt:"Video"},
    {id:"MKT-2",name:"Intro to Connectors",                  hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/13123742-intro-to-connectors",platform:"Anthropic Video",fmt:"Video"},
    {id:"MKT-3",name:"6 Levels of Claude for Marketing & Sales",hrs:0.5,cert:false,link:"https://www.classcentral.com/course/youtube-1-vs-100m-claude-user-how-openclaw-claude-code-will-make-you-rich-526665",platform:"YouTube – Eric Siu",fmt:"YouTube"},
    {id:"MKT-4",name:"Get Started with Cowork",              hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/13345190-get-started-with-cowork",platform:"Anthropic Support",fmt:"Written Guide"},
    {id:"MKT-5",name:"Claude Cowork Tutorial",               hrs:1,    cert:false,link:"https://www.datacamp.com/tutorial/claude-cowork-tutorial",platform:"DataCamp",fmt:"Written + Exercises"},
    {id:"MKT-6",name:"Cowork Plugins & Custom Skills",       hrs:0.5,  cert:false,link:"https://www.geeky-gadgets.com/claude-cowork-features-workspace/",platform:"Geeky Gadgets",fmt:"Video"},
    {id:"MKT-7",name:"Teach Claude Your Way of Working",     hrs:0.25, cert:false,link:"https://support.claude.com/en/articles/12580051-teach-claude-your-way-of-working-using-skills",platform:"Anthropic Video",fmt:"Video"},
  ],
  sales:[
    {id:"SAL-1",name:"Claude for Sales",                     hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/9945703-claude-for-sales",platform:"Anthropic Video",fmt:"Video"},
    {id:"SAL-2",name:"6 Levels of Claude for Marketing & Sales",hrs:0.5,cert:false,link:"https://www.classcentral.com/course/youtube-1-vs-100m-claude-user-how-openclaw-claude-code-will-make-you-rich-526665",platform:"YouTube – Eric Siu",fmt:"YouTube"},
    {id:"SAL-3",name:"Get Started with Cowork",              hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/13345190-get-started-with-cowork",platform:"Anthropic Support",fmt:"Written Guide"},
    {id:"SAL-4",name:"Complete Guide to Claude Cowork (12 lessons)",hrs:2,cert:false,link:"https://ccforeveryone.com/cowork",platform:"CC for Everyone",fmt:"Hands-on in Cowork"},
    {id:"SAL-5",name:"Connect Your Tools to Unlock Smarter Claude",hrs:0.25,cert:false,link:"https://support.claude.com/en/articles/11817150-connect-your-tools-to-unlock-a-smarter-more-capable-ai-companion",platform:"Anthropic Video",fmt:"Video"},
  ],
  hr:[
    {id:"HR-1",name:"Claude for Human Resources",            hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/9998942-claude-for-human-resources",platform:"Anthropic Video",fmt:"Video"},
    {id:"HR-2",name:"Get Started with Cowork",               hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/13345190-get-started-with-cowork",platform:"Anthropic Support",fmt:"Written Guide"},
    {id:"HR-3",name:"Complete Guide to Claude Cowork (12 lessons)",hrs:2,cert:false,link:"https://ccforeveryone.com/cowork",platform:"CC for Everyone",fmt:"Hands-on in Cowork"},
    {id:"HR-4",name:"Create and Edit Files with Claude",     hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/12143746-create-and-edit-files-with-claude-to-eliminate-hours-of-busy-work",platform:"Anthropic Video",fmt:"Video"},
    {id:"HR-5",name:"Teach Claude Your Way of Working",      hrs:0.25, cert:false,link:"https://support.claude.com/en/articles/12580051-teach-claude-your-way-of-working-using-skills",platform:"Anthropic Video",fmt:"Video"},
  ],
  fin:[
    {id:"FIN-1",name:"Financial Services – Investment Research",hrs:0.5,cert:false,link:"https://support.claude.com/en/articles/12068906-using-claude-for-financial-services-for-investment-research",platform:"Anthropic Video",fmt:"Video"},
    {id:"FIN-2",name:"Financial Services – Analysis & Modeling",hrs:0.5,cert:false,link:"https://support.claude.com/en/articles/12068923-using-claude-for-financial-services-for-analysis-and-modeling",platform:"Anthropic Video",fmt:"Video"},
    {id:"FIN-3",name:"Financial Services – Investment Memos", hrs:0.5, cert:false,link:"https://support.claude.com/en/articles/12068945-using-claude-for-financial-services-for-investment-memos",platform:"Anthropic Video",fmt:"Video"},
    {id:"FIN-4",name:"Get Started with Cowork",              hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/13345190-get-started-with-cowork",platform:"Anthropic Support",fmt:"Written Guide"},
    {id:"FIN-5",name:"Cowork Tutorial – Expense + Excel",    hrs:1,    cert:false,link:"https://www.datacamp.com/tutorial/claude-cowork-tutorial",platform:"DataCamp",fmt:"Written + Exercises"},
    {id:"FIN-6",name:"6 Levels of Claude – Business & Data", hrs:0.5, cert:false,link:"https://www.classcentral.com/course/youtube-1-vs-100m-claude-user-how-openclaw-claude-code-will-make-you-rich-526665",platform:"YouTube – Eric Siu",fmt:"YouTube"},
  ],
  design:[
    {id:"DES-1",name:"Use Artifacts to Visualise & Create AI Apps",hrs:0.5,cert:false,link:"https://support.claude.com/en/articles/11649427-use-artifacts-to-visualize-and-create-ai-apps-without-ever-writing-a-line-of-code",platform:"Anthropic Video",fmt:"Video"},
    {id:"DES-2",name:"Prototype AI-Powered Apps with Artifacts",hrs:0.5,cert:false,link:"https://support.claude.com/en/articles/11649438-prototype-ai-powered-apps-with-claude-artifacts",platform:"Anthropic Video",fmt:"Video"},
    {id:"DES-3",name:"Get Started with Cowork",              hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/13345190-get-started-with-cowork",platform:"Anthropic Support",fmt:"Written Guide"},
    {id:"DES-4",name:"Complete Guide to Cowork – Canvas Design",hrs:2, cert:false,link:"https://ccforeveryone.com/cowork",platform:"CC for Everyone",fmt:"Hands-on in Cowork"},
    {id:"DES-5",name:"Simplify Your Browsing with Claude in Chrome",hrs:0.25,cert:false,link:"https://support.claude.com/en/articles/12431227-simplify-your-browsing-experience-with-claude-in-chrome",platform:"Anthropic Video",fmt:"Video"},
  ],
  pm:[
    {id:"PM-1",name:"Claude for Product Management",         hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/9999062-claude-for-product-management",platform:"Anthropic Video",fmt:"Video"},
    {id:"PM-2",name:"Claude Code for Product Managers",      hrs:2,    cert:false,link:"https://ccforpms.com/cowork",platform:"CC for PMs",fmt:"Written + Hands-on"},
    {id:"PM-3",name:"Cowork: Ultimate Guide for PMs",        hrs:1,    cert:false,link:"https://www.productcompass.pm/p/claude-cowork-guide",platform:"Product Compass",fmt:"Written"},
    {id:"PM-4",name:"Using Research and Google Workspace",   hrs:0.5,  cert:false,link:"https://support.claude.com/en/articles/11101545-using-research-and-google-workspace",platform:"Anthropic Video",fmt:"Video"},
    {id:"PM-5",name:"6 Levels of Claude – Workflow & Agents",hrs:0.5, cert:false,link:"https://www.classcentral.com/course/youtube-1-vs-100m-claude-user-how-openclaw-claude-code-will-make-you-rich-526665",platform:"YouTube – Eric Siu",fmt:"YouTube"},
  ],
};

const WEEK_PLAN = [
  {w:"Week 1",t:"Foundation",     col:"#1a7a2e",d:"All staff completes Phase 0 — Claude 101, AI Fluency, Getting Started"},
  {w:"Week 2",t:"Dept Courses",   col:"#2563eb",d:"Each department begins their specific courses & Anthropic videos"},
  {w:"Week 3",t:"Hands-On",       col:"#d97706",d:"Practical exercises using real tasks inside Cowork & Claude Code"},
  {w:"Week 4",t:"Certify & Launch",col:"#7c3aed",d:"Collect certificates, team Q&A session → Purchase licenses"},
];

// responsive hook
function useWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function Bar({pct, color, h=7}) {
  return (
    <div style={{background:"#e5e7eb",borderRadius:99,height:h,overflow:"hidden",flex:1}}>
      <div style={{background:color,height:h,width:`${pct}%`,borderRadius:99,transition:"width .5s"}}/>
    </div>
  );
}

function Tick({checked, color}) {
  return (
    <div style={{width:22,height:22,borderRadius:6,flexShrink:0,border:`2px solid ${checked?color:"#d1d5db"}`,background:checked?color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}>
      {checked && <svg width={13} height={13} viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );
}

function Ring({pct, size, sw, color}) {
  const r=(size-sw)/2, c=2*Math.PI*r;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={sw}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={c} strokeDashoffset={c-(pct/100)*c} strokeLinecap="round"
        style={{transform:"rotate(-90deg)",transformOrigin:"50% 50%",transition:"stroke-dashoffset .6s"}}/>
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" style={{fontSize:size>80?13:11,fontWeight:700,fill:color}}>{pct}%</text>
    </svg>
  );
}

const SK = "kisan_hub_v2";

export default function App() {
  const vw = useWidth();
  const mob = vw < 600;
  const tab = vw < 900;

  const load = () => { try { const d = JSON.parse(localStorage.getItem(SK)||"{}"); return (d && typeof d === "object") ? d : {}; } catch { return {}; }};
  const [store, setStore] = useState(load);
  const profile  = store.profile  || {};
  const progress = store.progress || {};
  const upd  = p => setStore(prev => { const n={...prev,...p}; try{localStorage.setItem(SK,JSON.stringify(n));}catch{} return n; });
  const toggle = id => upd({progress:{...progress,[id]:!progress[id]}});

  const [page, setPage]     = useState((!profile.name || !profile.name.trim())?"setup":"overview");
  const [nameIn, setNameIn] = useState(profile.name||"");
  const [deptIn, setDeptIn] = useState(profile.dept||"dev");
  const [activeDept, setAD] = useState("dev");
  const [menuOpen, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [dFilter, setDF]    = useState("all");

  const stats = key => {
    const list = key==="phase0"?COURSES.phase0:(COURSES[key]||[]);
    const done=list.filter(c=>progress[c.id]).length;
    const hrs=list.filter(c=>progress[c.id]).reduce((s,c)=>s+c.hrs,0);
    const certs=list.filter(c=>c.cert&&progress[c.id]).length;
    const tcerts=list.filter(c=>c.cert).length;
    return {total:list.length,done,hrs,thrs:list.reduce((s,c)=>s+c.hrs,0),certs,tcerts,pct:list.length?Math.round((done/list.length)*100):0};
  };

  const allKeys = ["phase0",...Object.keys(DEPT_META)];
  const oTotal  = allKeys.reduce((s,k)=>s+(k==="phase0"?COURSES.phase0:COURSES[k]||[]).length,0);
  const oDone   = allKeys.reduce((s,k)=>s+(k==="phase0"?COURSES.phase0:COURSES[k]||[]).filter(c=>progress[c.id]).length,0);
  const oPct    = Math.round((oDone/oTotal)*100)||0;
  const oHrs    = allKeys.reduce((s,k)=>s+(k==="phase0"?COURSES.phase0:COURSES[k]||[]).filter(c=>progress[c.id]).reduce((a,c)=>a+c.hrs,0),0);
  const tHrs    = allKeys.reduce((s,k)=>s+(k==="phase0"?COURSES.phase0:COURSES[k]||[]).reduce((a,c)=>a+c.hrs,0),0);
  const oCerts  = allKeys.reduce((s,k)=>s+(k==="phase0"?COURSES.phase0:COURSES[k]||[]).filter(c=>c.cert&&progress[c.id]).length,0);
  const tCerts  = allKeys.reduce((s,k)=>s+(k==="phase0"?COURSES.phase0:COURSES[k]||[]).filter(c=>c.cert).length,0);

  const myDept  = profile.dept||"dev";
  const myColor = DEPT_META[myDept]?.color||G.green;
  const myBg    = DEPT_META[myDept]?.bg||G.pale;
  const p0s = stats("phase0");
  const mys = stats(myDept);
  const myList = [...COURSES.phase0,...(COURSES[myDept]||[])];
  const nextC  = myList.find(c=>!progress[c.id]);

  const allRows = [];
  COURSES.phase0.forEach(c=>allRows.push({...c,deptKey:"phase0",deptLabel:"Everyone",deptColor:G.green,deptBg:G.pale}));
  Object.keys(DEPT_META).forEach(k=>(COURSES[k]||[]).forEach(c=>allRows.push({...c,deptKey:k,deptLabel:DEPT_META[k].label,deptColor:DEPT_META[k].color,deptBg:DEPT_META[k].bg})));
  const filtered = allRows.filter(r=>{
    if(dFilter!=="all"&&r.deptKey!==dFilter) return false;
    const q=search.toLowerCase();
    if(q&&!r.name.toLowerCase().includes(q)&&!r.platform.toLowerCase().includes(q)) return false;
    return true;
  });

  const TABS=[
    {key:"overview",icon:"📊",label:"Overview"},
    {key:"mine",    icon:"👤",label:"My Progress"},
    {key:"depts",   icon:"🏢",label:"Departments"},
    {key:"courses", icon:"📋",label:"Courses"},
    {key:"setup",   icon:"⚙️",label:"Settings"},
  ];

  const navTo = k => { setPage(k); setMenu(false); };

  // ── course card (used in mobile views) ──────────────────────────
  const CourseCard = ({c, color, bg}) => {
    const done = !!progress[c.id];
    return (
      <div onClick={()=>toggle(c.id)}
        style={{background:done?bg:"#fff",border:`1.5px solid ${done?color+"55":"#e2e8f0"}`,borderRadius:12,padding:"12px 14px",marginBottom:8,cursor:"pointer",transition:"all .15s"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <Tick checked={done} color={color}/>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:600,fontSize:13,color:done?color:"#0f172a",lineHeight:1.4}}>{c.name}</div>
            <div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>{c.platform} · {c.hrs}h {c.cert?"· 🏆 Free Cert":""}</div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:8,gap:8}}>
          {done
            ? <span style={{fontSize:11,color,fontWeight:700,background:bg,padding:"3px 10px",borderRadius:20}}>✓ Done</span>
            : <a href={c.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                style={{fontSize:11,color:G.green,fontWeight:700,background:G.pale,padding:"4px 12px",borderRadius:20,textDecoration:"none"}}>
                Open ↗
              </a>}
        </div>
      </div>
    );
  };

  const pad = mob ? "14px" : "20px 24px";

  return (
    <div style={{fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",background:"#f0faf2",minHeight:"100vh",fontSize:13}}>

      {/* ── HEADER ── */}
      <div style={{background:`linear-gradient(135deg,${G.dark},${G.green})`,boxShadow:"0 2px 12px rgba(0,80,20,0.2)"}}>
        <div style={{padding: mob?"12px 16px":"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          {/* Logo */}
          <div>
            <div style={{color:"#fff",fontWeight:800,fontSize:mob?15:18,letterSpacing:-0.3}}>🌿 KISAN Claude Hub</div>
            <div style={{color:"#a7f3b8",fontSize:10,marginTop:1}}>Free AI Training for All Departments</div>
          </div>
          {/* Avatar + hamburger */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {profile.name && (
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {!mob && <div style={{textAlign:"right"}}>
                  <div style={{color:"#fff",fontWeight:700,fontSize:12}}>{profile.name}</div>
                  <div style={{color:"#a7f3b8",fontSize:10}}>{DEPT_META[myDept]?.emoji} {DEPT_META[myDept]?.label}</div>
                </div>}
                <div style={{width:34,height:34,borderRadius:"50%",background:"rgba(255,255,255,0.2)",border:"2px solid rgba(255,255,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,color:"#fff"}}>
                  {profile.name[0].toUpperCase()}
                </div>
              </div>
            )}
            {/* Hamburger on mobile */}
            {mob && (
              <button onClick={()=>setMenu(m=>!m)} style={{background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:8,padding:"6px 10px",cursor:"pointer",color:"#fff",fontSize:18,lineHeight:1}}>
                {menuOpen ? "✕" : "☰"}
              </button>
            )}
          </div>
        </div>

        {/* Desktop nav */}
        {!mob && (
          <div style={{display:"flex",gap:0,padding:"0 24px"}}>
            {TABS.map(t=>(
              <button key={t.key} onClick={()=>navTo(t.key)} style={{
                display:"flex",alignItems:"center",gap:6,padding:"10px 16px",border:"none",
                borderBottom:page===t.key?"3px solid #a7f3b8":"3px solid transparent",
                background:"none",cursor:"pointer",fontSize:12,
                fontWeight:page===t.key?700:500,
                color:page===t.key?"#fff":"rgba(255,255,255,0.6)",transition:"all .15s",whiteSpace:"nowrap"
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Mobile dropdown menu */}
        {mob && menuOpen && (
          <div style={{background:G.dark,borderTop:"1px solid rgba(255,255,255,0.1)"}}>
            {TABS.map(t=>(
              <button key={t.key} onClick={()=>navTo(t.key)} style={{
                display:"flex",alignItems:"center",gap:10,width:"100%",padding:"14px 20px",
                border:"none",borderLeft:page===t.key?`4px solid #a7f3b8`:"4px solid transparent",
                background:page===t.key?"rgba(255,255,255,0.08)":"none",
                cursor:"pointer",fontSize:14,fontWeight:page===t.key?700:500,
                color:page===t.key?"#fff":"rgba(255,255,255,0.7)",textAlign:"left"
              }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div style={{padding:mob?"12px":"20px 24px",maxWidth:1140,margin:"0 auto"}}>

        {/* ══ SETUP ══ */}
        {page==="setup" && (
          <div style={{maxWidth:480,margin:"24px auto"}}>
            <div style={{background:"#fff",borderRadius:16,padding:mob?20:32,boxShadow:"0 4px 24px rgba(0,80,20,0.10)"}}>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:32,marginBottom:6}}>🌿</div>
                <div style={{fontSize:18,fontWeight:800,color:G.dark}}>Set Up Your Profile</div>
                <div style={{color:"#64748b",fontSize:12,marginTop:4}}>Personalise your dashboard. Progress saves in your browser.</div>
              </div>
              <label style={{display:"block",fontWeight:600,color:"#374151",marginBottom:6,fontSize:12}}>YOUR NAME</label>
              <input value={nameIn} onChange={e=>setNameIn(e.target.value)} placeholder="e.g. Priya Sharma"
                style={{width:"100%",padding:"11px 14px",borderRadius:9,border:`1.5px solid ${G.light}55`,fontSize:14,outline:"none",boxSizing:"border-box",marginBottom:20,background:"#f0faf2"}}/>
              <label style={{display:"block",fontWeight:600,color:"#374151",marginBottom:10,fontSize:12}}>YOUR DEPARTMENT</label>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:24}}>
                {Object.entries(DEPT_META).map(([k,d])=>(
                  <div key={k} onClick={()=>setDeptIn(k)} style={{
                    padding:"11px 12px",borderRadius:10,cursor:"pointer",
                    border:`2px solid ${deptIn===k?d.color:"#e2e8f0"}`,
                    background:deptIn===k?d.bg:"#fafafa",
                    color:deptIn===k?d.color:"#64748b",
                    fontWeight:deptIn===k?700:500,fontSize:12,
                    display:"flex",alignItems:"center",gap:7,transition:"all .15s",
                  }}>
                    {d.emoji} {d.label}
                    {deptIn===k && <span style={{marginLeft:"auto",fontSize:14}}>✓</span>}
                  </div>
                ))}
              </div>
              <button onClick={()=>{if(nameIn.trim()){upd({profile:{name:nameIn.trim(),dept:deptIn}});setPage("overview");}}}
                disabled={!nameIn.trim()}
                style={{width:"100%",padding:"13px",borderRadius:10,
                  background:nameIn.trim()?`linear-gradient(135deg,${G.dark},${G.light})`:"#cbd5e1",
                  color:"#fff",border:"none",fontSize:14,fontWeight:700,
                  cursor:nameIn.trim()?"pointer":"not-allowed"}}>
                {profile.name?"Save Changes ✓":"Get Started →"}
              </button>
            </div>
          </div>
        )}

        {/* ══ OVERVIEW ══ */}
        {page==="overview" && (
          <div>
            {/* Welcome banner */}
            {profile.name && (
              <div style={{background:`linear-gradient(120deg,${G.dark},${G.light})`,borderRadius:14,padding:mob?"14px 16px":"18px 24px",marginBottom:16,boxShadow:"0 4px 18px rgba(26,122,46,0.25)"}}>
                <div style={{color:"#fff",fontWeight:800,fontSize:mob?15:18}}>Welcome back, {profile.name}! 👋</div>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:12,marginTop:4}}>{DEPT_META[myDept]?.emoji} {DEPT_META[myDept]?.label} · {oPct}% complete · {oHrs.toFixed(1)}h learned</div>
                {nextC && <div style={{color:"#a7f3b8",fontSize:12,marginTop:6}}>▶ Next: <b>{nextC.name}</b></div>}
                <button onClick={()=>setPage("mine")} style={{marginTop:12,background:"rgba(255,255,255,0.2)",color:"#fff",border:"1.5px solid rgba(255,255,255,0.4)",borderRadius:9,padding:"8px 18px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  My Courses →
                </button>
              </div>
            )}

            {/* Stat cards — 2x2 on mobile, 4x1 on desktop */}
            <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:10,marginBottom:16}}>
              {[
                {label:"Progress",    val:`${oPct}%`,         sub:`${oDone}/${oTotal} courses`,color:G.green,  icon:"📈"},
                {label:"Hours",       val:`${oHrs.toFixed(1)}h`,sub:`of ${tHrs.toFixed(1)}h`,color:"#2563eb", icon:"⏱️"},
                {label:"Certificates",val:`${oCerts}/${tCerts}`,sub:"Free Anthropic",          color:"#d97706", icon:"🏆"},
                {label:"Phase 0",     val:`${p0s.pct}%`,      sub:`${p0s.done}/${p0s.total}`,  color:"#7c3aed", icon:"📌"},
              ].map(c=>(
                <div key={c.label} style={{background:"#fff",borderRadius:12,padding:"14px",boxShadow:"0 1px 6px rgba(0,80,20,0.07)",borderTop:`4px solid ${c.color}`}}>
                  <div style={{fontSize:22,marginBottom:6}}>{c.icon}</div>
                  <div style={{fontSize:mob?20:24,fontWeight:800,color:c.color,lineHeight:1}}>{c.val}</div>
                  <div style={{fontSize:11,fontWeight:600,color:"#374151",marginTop:4}}>{c.label}</div>
                  <div style={{fontSize:10,color:"#9ca3af",marginTop:2}}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Dept cards */}
            <div style={{background:"#fff",borderRadius:14,padding:mob?14:20,boxShadow:"0 1px 6px rgba(0,80,20,0.07)",marginBottom:16}}>
              <div style={{fontWeight:700,fontSize:14,color:G.dark,marginBottom:14}}>🏢 Departments</div>
              <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":tab?"repeat(3,1fr)":"repeat(4,1fr)",gap:10}}>
                {[["phase0","📌 Phase 0",G.green,G.pale],...Object.entries(DEPT_META).map(([k,d])=>[k,`${d.emoji} ${d.label}`,d.color,d.bg])].map(([k,lbl,col,bg])=>{
                  const s=stats(k);
                  return (
                    <div key={k} onClick={()=>{if(k!=="phase0"){setAD(k);setPage("depts");}else setPage("mine");}}
                      style={{background:bg,borderRadius:10,padding:"12px",cursor:"pointer",border:`1.5px solid ${col}25`,transition:"all .15s"}}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 4px 14px ${col}22`;}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
                      <div style={{fontWeight:700,fontSize:11,color:col,marginBottom:8}}>{lbl}</div>
                      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                        <Bar pct={s.pct} color={col} h={6}/>
                        <span style={{fontSize:11,fontWeight:800,color:col,minWidth:30}}>{s.pct}%</span>
                      </div>
                      <div style={{fontSize:10,color:"#6b7280"}}>{s.done}/{s.total} · {s.hrs.toFixed(1)}h</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4-week plan */}
            <div style={{background:"#fff",borderRadius:14,padding:mob?14:20,boxShadow:"0 1px 6px rgba(0,80,20,0.07)"}}>
              <div style={{fontWeight:700,fontSize:14,color:G.dark,marginBottom:12}}>📅 4-Week Plan</div>
              <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"1fr 1fr",gap:10}}>
                {WEEK_PLAN.map((w,i)=>(
                  <div key={w.w} style={{borderRadius:11,overflow:"hidden",border:`1.5px solid ${w.col}25`}}>
                    <div style={{background:w.col,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}>
                      <div style={{background:"rgba(255,255,255,0.25)",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:"#fff"}}>{i+1}</div>
                      <span style={{fontWeight:700,fontSize:12,color:"#fff"}}>{w.w} – {w.t}</span>
                    </div>
                    <div style={{background:w.col+"0d",padding:"10px 14px",fontSize:12,color:"#475569",lineHeight:1.6}}>{w.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ MY PROGRESS ══ */}
        {page==="mine" && (
          <div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontWeight:800,fontSize:mob?16:18,color:G.dark}}>{profile.name?`${profile.name}'s`:"My"} Progress</div>
                <div style={{color:"#64748b",fontSize:12,marginTop:2}}>{DEPT_META[myDept]?.emoji} {DEPT_META[myDept]?.label} · Tap to mark complete</div>
              </div>
              <button onClick={()=>setPage("setup")} style={{background:"#fff",border:`1.5px solid ${G.light}55`,borderRadius:8,padding:"7px 13px",fontSize:12,cursor:"pointer",color:G.green,fontWeight:600}}>
                ⚙️ Edit
              </button>
            </div>

            {/* Rings — scrollable row on mobile */}
            <div style={{background:"#fff",borderRadius:14,padding:"16px",boxShadow:"0 1px 6px rgba(0,80,20,0.07)",marginBottom:16}}>
              <div style={{display:"flex",gap:mob?16:24,overflowX:"auto",paddingBottom:4,justifyContent:mob?"flex-start":"center",alignItems:"center"}}>
                {[
                  {key:"phase0",label:"Phase 0",color:"#1a7a2e"},
                  {key:myDept, label:DEPT_META[myDept]?.label,color:myColor},
                  {label:"Certs",  color:"#d97706",pct:tCerts>0?Math.round((oCerts/tCerts)*100):0,sub:`${oCerts}/${tCerts}`},
                  {label:"Hours",  color:"#2563eb",pct:Math.round((oHrs/tHrs)*100)||0,sub:`${oHrs.toFixed(1)}h`},
                ].map((r,i)=>{
                  const s = r.key ? stats(r.key) : null;
                  const pct = r.key ? s.pct : r.pct;
                  const sub = r.key ? `${s.done}/${s.total}` : r.sub;
                  return (
                    <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,flexShrink:0}}>
                      <Ring pct={pct} size={mob?74:90} sw={mob?8:9} color={r.color}/>
                      <div style={{fontSize:11,fontWeight:700,color:"#374151",textAlign:"center",maxWidth:70}}>{r.label}</div>
                      <div style={{fontSize:10,color:"#9ca3af"}}>{sub}</div>
                    </div>
                  );
                })}
              </div>
              {nextC && (
                <div style={{marginTop:14,background:myBg,borderRadius:11,padding:14,border:`1.5px solid ${myColor}33`}}>
                  <div style={{fontSize:11,fontWeight:700,color:myColor,marginBottom:4}}>▶ UP NEXT</div>
                  <div style={{fontWeight:700,color:G.dark,fontSize:13,marginBottom:4,lineHeight:1.4}}>{nextC.name}</div>
                  <div style={{fontSize:11,color:"#6b7280",marginBottom:10}}>{nextC.platform} · {nextC.hrs}h {nextC.cert?"· 🏆 Free Cert":""}</div>
                  <a href={nextC.link} target="_blank" rel="noopener noreferrer"
                    style={{display:"inline-block",background:`linear-gradient(135deg,${G.dark},${G.light})`,color:"#fff",padding:"8px 18px",borderRadius:8,fontSize:12,fontWeight:700,textDecoration:"none"}}>
                    Start Course →
                  </a>
                </div>
              )}
            </div>

            {/* Checklists */}
            {[
              {key:"phase0",label:"📌 Phase 0 — Start Here (Everyone)",list:COURSES.phase0,color:"#1a7a2e",bg:G.pale},
              {key:myDept,label:`${DEPT_META[myDept]?.emoji} ${DEPT_META[myDept]?.label} — Your Courses`,list:COURSES[myDept]||[],color:myColor,bg:myBg},
            ].map(sec=>{
              const sc=stats(sec.key);
              return (
                <div key={sec.key} style={{background:"#fff",borderRadius:14,padding:mob?14:20,boxShadow:"0 1px 6px rgba(0,80,20,0.07)",marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                    <div style={{fontWeight:700,fontSize:13,color:sec.color,flex:1}}>{sec.label}</div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:80}}><Bar pct={sc.pct} color={sec.color} h={7}/></div>
                      <span style={{fontSize:13,fontWeight:800,color:sec.color}}>{sc.pct}%</span>
                      <span style={{fontSize:11,color:"#9ca3af"}}>{sc.done}/{sc.total}</span>
                    </div>
                  </div>
                  {sec.list.map(c=><CourseCard key={c.id} c={c} color={sec.color} bg={sec.bg}/>)}
                </div>
              );
            })}
            <div style={{textAlign:"center",fontSize:11,color:"#9ca3af",padding:"8px 0"}}>💾 Progress auto-saved in your browser</div>
          </div>
        )}

        {/* ══ DEPARTMENTS ══ */}
        {page==="depts" && (
          <div>
            {/* Dept selector — horizontal scroll on mobile */}
            <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
              {Object.entries(DEPT_META).map(([k,d])=>{
                const s=stats(k); const active=activeDept===k;
                return (
                  <button key={k} onClick={()=>setAD(k)} style={{
                    padding:"8px 14px",borderRadius:20,cursor:"pointer",flexShrink:0,
                    border:`2px solid ${active?d.color:"#e2e8f0"}`,
                    background:active?d.color:"#fff",
                    color:active?"#fff":"#64748b",
                    fontWeight:600,fontSize:12,transition:"all .15s",
                    display:"flex",alignItems:"center",gap:6,
                  }}>
                    {d.emoji} {mob?"":`${d.label} `}
                    <span style={{background:active?"rgba(255,255,255,0.25)":d.bg,padding:"1px 6px",borderRadius:99,fontSize:11,color:active?"#fff":d.color,fontWeight:700}}>{s.pct}%</span>
                  </button>
                );
              })}
            </div>

            {(()=>{
              const d=DEPT_META[activeDept]; const s=stats(activeDept); const list=COURSES[activeDept]||[];
              return (
                <div style={{display:"grid",gridTemplateColumns:mob?"1fr":tab?"1fr":"260px 1fr",gap:16,alignItems:"start"}}>
                  {/* Stats panel */}
                  <div style={{background:"#fff",borderRadius:14,padding:16,boxShadow:"0 1px 6px rgba(0,80,20,0.07)",borderTop:`4px solid ${d.color}`,display:"flex",flexDirection:mob?"row":"column",alignItems:mob?"center":"stretch",gap:16,flexWrap:"wrap"}}>
                    <div style={{textAlign:"center",flex:mob?"0 0 auto":"auto"}}>
                      <div style={{fontWeight:800,fontSize:14,color:d.color,marginBottom:10}}>{d.emoji} {d.label}</div>
                      <Ring pct={s.pct} size={mob?80:110} sw={mob?8:11} color={d.color}/>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,flex:1}}>
                      {[["📚",s.total,"Courses"],["✅",s.done,"Done"],["⏱",s.hrs.toFixed(1)+"h","Hours"],["🏆",`${s.certs}/${s.tcerts}`,"Certs"]].map(([ic,v,l])=>(
                        <div key={l} style={{background:d.bg,borderRadius:8,padding:"10px 6px",textAlign:"center"}}>
                          <div>{ic}</div>
                          <div style={{fontWeight:800,fontSize:14,color:d.color}}>{v}</div>
                          <div style={{fontSize:10,color:"#6b7280"}}>{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checklist */}
                  <div style={{background:"#fff",borderRadius:14,padding:mob?14:20,boxShadow:"0 1px 6px rgba(0,80,20,0.07)"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                      <div style={{fontWeight:700,fontSize:13,color:d.color}}>{d.emoji} {d.label} Courses</div>
                      <span style={{fontSize:11,color:"#9ca3af"}}>{s.done}/{s.total}</span>
                    </div>
                    {list.map(c=><CourseCard key={c.id} c={c} color={d.color} bg={d.bg}/>)}
                    <div style={{marginTop:12,padding:"10px 14px",background:d.bg,borderRadius:10,display:"flex",alignItems:"center",gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:11,fontWeight:700,color:d.color,marginBottom:5}}>Completion</div>
                        <Bar pct={s.pct} color={d.color} h={8}/>
                      </div>
                      <div style={{fontWeight:800,fontSize:22,color:d.color}}>{s.pct}%</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ══ ALL COURSES ══ */}
        {page==="courses" && (
          <div>
            {/* Filters */}
            <div style={{background:"#fff",borderRadius:12,padding:"12px",marginBottom:12,boxShadow:"0 1px 6px rgba(0,80,20,0.06)",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
              <input placeholder="🔍 Search…" value={search} onChange={e=>setSearch(e.target.value)}
                style={{flex:1,minWidth:140,padding:"8px 12px",borderRadius:8,border:"1.5px solid #e2e8f0",fontSize:13,outline:"none"}}/>
              <select value={dFilter} onChange={e=>setDF(e.target.value)}
                style={{padding:"8px 10px",borderRadius:8,border:"1.5px solid #e2e8f0",fontSize:12,background:"#fff",cursor:"pointer",outline:"none",flex:mob?"1":"0 0 auto"}}>
                <option value="all">All Depts</option>
                <option value="phase0">📌 Phase 0</option>
                {Object.entries(DEPT_META).map(([k,d])=><option key={k} value={k}>{d.emoji} {d.label}</option>)}
              </select>
              <div style={{fontSize:12,color:G.dark,fontWeight:600,background:G.pale,padding:"7px 12px",borderRadius:8}}>
                {filtered.length} courses · {filtered.reduce((s,r)=>s+r.hrs,0).toFixed(1)}h
              </div>
            </div>

            {/* Cards view (mobile) / Table (desktop) */}
            {mob ? (
              <div>
                {filtered.map(r=>{
                  const done=!!progress[r.id];
                  return (
                    <div key={r.id} style={{background:done?r.deptBg:"#fff",borderRadius:12,padding:"13px",marginBottom:8,boxShadow:"0 1px 4px rgba(0,80,20,0.07)",border:`1.5px solid ${done?r.deptColor+"44":"#e2e8f0"}`}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                        <Tick checked={done} color={r.deptColor}/>
                        <div style={{flex:1,minWidth:0}} onClick={()=>toggle(r.id)}>
                          <div style={{fontWeight:600,fontSize:13,color:"#0f172a",lineHeight:1.4}}>{r.name}</div>
                          <div style={{fontSize:10,color:"#9ca3af",marginTop:3}}>{r.platform} · {r.hrs}h</div>
                        </div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <span style={{background:r.deptColor+"18",color:r.deptColor,padding:"2px 8px",borderRadius:6,fontSize:10,fontWeight:700}}>{r.deptLabel}</span>
                        {r.cert && <span style={{background:"#d1fae5",color:"#065f46",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>🏆 Free Cert</span>}
                        <div style={{marginLeft:"auto",display:"flex",gap:6}}>
                          <button onClick={()=>toggle(r.id)} style={{background:done?"#d1fae5":"#f1f5f9",color:done?"#065f46":"#64748b",border:`1px solid ${done?"#a7f3d0":"#e2e8f0"}`,borderRadius:7,padding:"4px 10px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                            {done?"✓ Done":"Mark Done"}
                          </button>
                          <a href={r.link} target="_blank" rel="noopener noreferrer"
                            style={{background:`linear-gradient(135deg,${G.dark},${G.light})`,color:"#fff",padding:"4px 10px",borderRadius:7,fontSize:10,fontWeight:700,textDecoration:"none"}}>
                            Open ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{borderRadius:14,overflow:"hidden",boxShadow:"0 2px 12px rgba(0,80,20,0.09)",background:"#fff"}}>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                    <thead>
                      <tr style={{background:`linear-gradient(90deg,${G.dark},${G.green})`}}>
                        {["ID","Course","Platform","Hrs","Cert","Dept","Status","Link"].map(h=>(
                          <th key={h} style={{padding:"11px 12px",textAlign:"left",fontWeight:600,fontSize:11,letterSpacing:.5,color:"#fff",whiteSpace:"nowrap"}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r,i)=>{
                        const done=!!progress[r.id];
                        const rowBg=done?r.deptBg:(i%2===0?"#fff":"#f8fafc");
                        return (
                          <tr key={r.id} style={{background:rowBg,borderBottom:"1px solid #f1f5f9"}}
                            onMouseEnter={e=>e.currentTarget.style.background=G.pale}
                            onMouseLeave={e=>e.currentTarget.style.background=rowBg}>
                            <td style={{padding:"9px 12px",color:"#9ca3af",fontWeight:600,fontSize:11}}>{r.id}</td>
                            <td style={{padding:"9px 12px",fontWeight:500,color:"#0f172a",maxWidth:240}}>{r.name}</td>
                            <td style={{padding:"9px 12px",color:"#64748b",whiteSpace:"nowrap",fontSize:11}}>{r.platform}</td>
                            <td style={{padding:"9px 12px",color:"#64748b",textAlign:"center",fontWeight:600}}>{r.hrs}h</td>
                            <td style={{padding:"9px 12px",textAlign:"center"}}>
                              {r.cert?<span style={{background:"#d1fae5",color:"#065f46",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700}}>✅</span>:<span style={{color:"#d1d5db"}}>—</span>}
                            </td>
                            <td style={{padding:"9px 12px",whiteSpace:"nowrap"}}>
                              <span style={{background:r.deptColor+"18",color:r.deptColor,padding:"2px 8px",borderRadius:6,fontSize:10,fontWeight:600}}>{r.deptLabel}</span>
                            </td>
                            <td style={{padding:"9px 12px",textAlign:"center"}}>
                              <button onClick={()=>toggle(r.id)} style={{background:done?"#d1fae5":"#f1f5f9",color:done?"#065f46":"#64748b",border:`1px solid ${done?"#a7f3d0":"#e2e8f0"}`,borderRadius:6,padding:"3px 10px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                                {done?"✓ Done":"Mark Done"}
                              </button>
                            </td>
                            <td style={{padding:"9px 12px"}}>
                              <a href={r.link} target="_blank" rel="noopener noreferrer"
                                style={{background:`linear-gradient(135deg,${G.dark},${G.light})`,color:"#fff",padding:"4px 10px",borderRadius:7,fontSize:10,fontWeight:700,textDecoration:"none"}}>
                                Open ↗
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                      {filtered.length===0&&<tr><td colSpan={8} style={{padding:36,textAlign:"center",color:"#9ca3af"}}>No courses found.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── BOTTOM NAV (mobile only) ── */}
      {mob && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #e2e8f0",display:"flex",boxShadow:"0 -2px 12px rgba(0,0,0,0.08)",zIndex:100}}>
          {TABS.map(t=>(
            <button key={t.key} onClick={()=>navTo(t.key)} style={{
              flex:1,padding:"10px 4px 8px",border:"none",background:"none",cursor:"pointer",
              display:"flex",flexDirection:"column",alignItems:"center",gap:2,
              color:page===t.key?G.green:"#9ca3af",transition:"color .15s"
            }}>
              <span style={{fontSize:18}}>{t.icon}</span>
              <span style={{fontSize:9,fontWeight:page===t.key?700:500}}>{t.label}</span>
            </button>
          ))}
        </div>
      )}
      {mob && <div style={{height:70}}/>}

      {/* Footer */}
      {!mob && (
        <div style={{borderTop:`1px solid ${G.light}30`,marginTop:24,padding:"14px 24px",background:"#fff",textAlign:"center"}}>
          <div style={{fontSize:11,color:"#9ca3af"}}>🌿 KISAN Claude Training Hub · All courses free · Progress saved locally</div>
        </div>
      )}
    </div>
  );
}