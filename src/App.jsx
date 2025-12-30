import React, { useState, useEffect } from "react";

/* -------------------------------------------------------------------------- */
/* MONEYMIRROR v27.6 - FIXED TOP GAP (MOBILE ALIGNMENT)                       */
/* -------------------------------------------------------------------------- */

// --- CONFIGURATION ---
const EXPENSE_CATS = [
  { name: "Food", icon: "🍔", color: "#f43f5e" },
  { name: "Travel", icon: "🚕", color: "#3b82f6" },
  { name: "Shopping", icon: "🛍️", color: "#eab308" },
  { name: "Bills", icon: "🧾", color: "#a855f7" },
  { name: "Entmt", icon: "🎬", color: "#ec4899" },
  { name: "Health", icon: "❤️", color: "#ef4444" },
  { name: "Other", icon: "📦", color: "#64748b" }
];
const INCOME_CATS = [
  { name: "Salary", icon: "💰", color: "#10b981" },
  { name: "Freelance", icon: "⚡", color: "#f59e0b" },
  { name: "Gift", icon: "🎁", color: "#8b5cf6" },
  { name: "Invest", icon: "📈", color: "#06b6d4" },
  { name: "Other", icon: "📦", color: "#64748b" }
];

const getCatColor = (name) => {
  const all = [...EXPENSE_CATS, ...INCOME_CATS];
  const found = all.find(c => c.name === name);
  return found ? found.color : "#64748b";
};

const getIcon = (name) => {
  const all = [...EXPENSE_CATS, ...INCOME_CATS];
  const found = all.find(c => c.name === name);
  return found ? found.icon : "⚪";
};

/* -------------------------------------------------------------------------- */
/* MAIN APP WRAPPER                                                           */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const savedName = localStorage.getItem("moneymirror-name");
    if(savedName) setUserName(savedName);
  }, []);

  const handleCompleteOnboarding = (name) => {
    setUserName(name);
    localStorage.setItem("moneymirror-name", name);
    setShowLanding(false);
  };

  return (
    <div className="app-outer">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; color: white; background: #000; overflow: hidden; /* Prevent double scrollbars */ }
        .font-heading { font-family: 'Outfit', sans-serif; }
        
        /* ANIMATIONS */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .anim-enter { animation: fadeIn 0.4s ease-out forwards; will-change: transform, opacity; }
        .list-item-anim { opacity: 0; animation: slideIn 0.3s ease-out forwards; will-change: transform, opacity; }
        
        /* UTILS */
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

        /* --- LAYOUT ARCHITECTURE --- */
        
        /* 1. The Void (Outer Container) */
        .app-outer {
          width: 100vw;
          height: 100dvh;
          background: #020617;
          display: flex;
          /* FIX: Removed center alignment for mobile to prevent top gap */
          flex-direction: column; 
          position: relative;
          overflow: hidden;
        }

        /* 2. The Phone (Mobile Frame) */
        .mobile-frame {
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.95);
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Desktop Specifics: Transform into a "Phone" */
        @media (min-width: 768px) {
          .app-outer {
            /* Restore centering ONLY for desktop */
            align-items: center;
            justify-content: center;
          }
          .mobile-frame {
            width: 400px;
            height: 800px;
            max-height: 90vh;
            border-radius: 40px;
            border: 4px solid #1e293b;
            box-shadow: 0 0 0 10px #0f172a, 0 50px 100px -20px rgba(0,0,0,0.9);
          }
        }

        /* BACKGROUND MESH */
        .bg-mesh {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                      radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                      radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%);
          background-size: cover;
          z-index: 0;
          opacity: 0.6;
        }

        /* COMPONENT STYLES */
        .btn-core { cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); position: relative; overflow: hidden; }
        .btn-core:hover { transform: translateY(-2px); filter: brightness(1.2); }
        .btn-core:active { transform: translateY(1px) scale(0.98); filter: brightness(0.9); }
        
        .input-glass {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          transition: all 0.3s;
        }
        .input-glass:focus {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
          background: rgba(15, 23, 42, 0.8);
          outline: none;
        }
      `}</style>

      <div className="bg-mesh"></div>
      
      <div className="mobile-frame hide-scroll">
        {showLanding ? (
          <LandingPage onFinish={handleCompleteOnboarding} />
        ) : (
          <CoreApp userName={userName} />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LANDING PAGE                                                               */
/* -------------------------------------------------------------------------- */

function LandingPage({ onFinish }) {
  const [step, setStep] = useState(1); 
  const [nameInput, setNameInput] = useState("");
  const [vibe, setVibe] = useState("");

  const finishSetup = () => {
    if(!nameInput) return;
    setStep(3); 
    setTimeout(() => {
      onFinish(nameInput);
    }, 1500);
  };

  if (step === 3) {
    return (
      <div className="anim-enter" style={styles.fullCenter}>
        <div style={{textAlign: 'center'}}>
          <div style={styles.loader}></div>
          <h2 className="font-heading" style={{...styles.setupTitle, marginTop: '24px'}}>Polishing Mirror...</h2>
          <p style={styles.setupSub}>Creating local vault.</p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="anim-enter" style={styles.fullCenter}>
        <div style={styles.setupCard}>
          <div style={styles.progressBar}><div style={{...styles.progressFill, width: '60%'}}></div></div>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <h2 className="font-heading" style={styles.setupTitle}>Welcome💝</h2>
            <p style={styles.setupSub}>Let's Vibe and know each other.</p>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>YOUR NAME</label>
            <input autoFocus value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="e.g. Narendra Modi" className="input-glass" style={styles.setupInput} />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>PRIMARY GOAL</label>
            <div style={styles.vibeGrid}>
              {['Saving 🛡️', 'Investing 📈', 'Tracking 👁️'].map(opt => (
                <button key={opt} onClick={() => setVibe(opt)} style={vibe === opt ? styles.vibeActive : styles.vibeBtn} className="btn-core">
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <button onClick={finishSetup} disabled={!nameInput} style={{...styles.primaryBtn, width: '100%', opacity: nameInput ? 1 : 0.5}} className={nameInput ? "btn-core" : ""}>
            LAUNCH  &rarr;
          </button>
          <button onClick={() => setStep(1)} style={styles.backLink}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="anim-enter hide-scroll" style={styles.landingScroll}>
      <div style={styles.navHeader}>
        <div className="font-heading" style={styles.logoPill}>✦ MoneyMirror</div>
        <div style={styles.statusPill}>What are we?</div>
      </div>
      <div style={styles.heroSection}>
        <div style={styles.heroBadge}>✨ 100% Private & Free</div>
        <h1 className="font-heading" style={styles.heroTitle}>Reflect Your<br /><span style={styles.gradientText}>True Wealth.</span></h1>
        <p style={styles.heroDesc}>Private expense tracker Income and Expenses.<br/><strong>No Bank Link.No Account. No Cloud.</strong></p>
        <button onClick={() => setStep(2)} style={styles.glowBtn} className="btn-core">TAP TO GET IN</button>
      </div>
      <div style={styles.demoContainer}>
        <div style={styles.glassGraphic}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
            <div style={{fontSize:'12px', color:'#1fc8b7', fontWeight:'700', letterSpacing:'1px'}}>LIVE BALANCE</div>
            <div style={{fontSize:'10px', color:'#b9e710', background:'rgba(16,185,129,0.1)', padding:'4px 8px', borderRadius:'8px'}}>+24%</div>
          </div>
          <div className="font-heading" style={{fontSize:'36px', fontWeight:'800', marginBottom:'16px'}}>$10,000</div>
          <div style={{display:'flex', gap:'4px', height:'6px', borderRadius:'3px', overflow:'hidden'}}>
            <div style={{flex:3, background:'#10b981'}}></div>
            <div style={{flex:1, background:'#f43f5e'}}></div>
            <div style={{flex:2, background:'#3b82f6'}}></div>
          </div>
        </div>
      </div>
      <div style={styles.sectionHeader}>FEATURES</div>
      <div style={styles.grid2x2}>
        <div style={styles.featureCard} className="card-hover"><div style={styles.featIcon}>🔒</div><div className="font-heading" style={styles.featTitle}>Local Vault</div><div style={styles.featText}>Data stays 100% on your device.</div></div>
        <div style={styles.featureCard} className="card-hover"><div style={styles.featIcon}>🛅</div><div className="font-heading" style={styles.featTitle}>Privacy</div><div style={styles.featText}>No Bank Link, everything on device.</div></div>
        <div style={styles.featureCard} className="card-hover"><div style={styles.featIcon}>📊</div><div className="font-heading" style={styles.featTitle}>Visuals</div><div style={styles.featText}>Clear spending charts.</div></div>
        <div style={styles.featureCard} className="card-hover"><div style={styles.featIcon}>📥</div><div className="font-heading" style={styles.featTitle}>Export</div><div style={styles.featText}>Download CSV anytime.</div></div>
      </div>
      <div style={styles.trustFooter}><p>Trusted by Many • © 2025 MoneyMirror</p></div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CORE APP                                                                   */
/* -------------------------------------------------------------------------- */

function CoreApp({ userName }) {
  const [transactions, setTransactions] = useState(() => { try { return JSON.parse(localStorage.getItem("moneymirror-tx")) || [] } catch { return [] } });
  const [subscriptions, setSubscriptions] = useState(() => { try { return JSON.parse(localStorage.getItem("moneymirror-subs")) || [] } catch { return [] } });
  const [goals, setGoals] = useState(() => { try { return JSON.parse(localStorage.getItem("moneymirror-goals")) || [] } catch { return [] } });

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("income"); 
  const [category, setCategory] = useState("Salary");
  
  const [goalName, setGoalName] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [subName, setSubName] = useState("");
  const [subCost, setSubCost] = useState("");
  
  const [view, setView] = useState("dashboard"); 
  const [activeGoalId, setActiveGoalId] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("moneymirror-tx", JSON.stringify(transactions));
    localStorage.setItem("moneymirror-subs", JSON.stringify(subscriptions));
    localStorage.setItem("moneymirror-goals", JSON.stringify(goals));
  }, [transactions, subscriptions, goals]);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;
  const subTotal = subscriptions.reduce((acc, s) => acc + s.amount, 0);
  const currentCategories = type === 'expense' ? EXPENSE_CATS : INCOME_CATS;
  
  const chartData = EXPENSE_CATS.map(cat => { const val = transactions.filter(t => t.category === cat.name && t.type === 'expense').reduce((acc, t) => acc + t.amount, 0); return { name: cat.name, icon: cat.icon, color: cat.color, value: val }; }).filter(c => c.value > 0);
  const totalChartExpense = chartData.reduce((acc, c) => acc + c.value, 0);

  const handleSave = () => { if (!amount) return; if (editId) { const updatedTx = transactions.map(t => t.id === editId ? { ...t, amount: parseFloat(amount), note: note || category, category, type } : t); setTransactions(updatedTx); setEditId(null); } else { const newTx = { id: Date.now(), amount: parseFloat(amount), note: note || category, category, type, date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) }; setTransactions([newTx, ...transactions]); } setAmount(""); setNote(""); };
  const handleEdit = (t) => { setEditId(t.id); setAmount(t.amount); setNote(t.note); setType(t.type); setCategory(t.category); };
  const handleCancelEdit = () => { setEditId(null); setAmount(""); setNote(""); };
  const addSubscription = () => { if(!subCost || !subName) return; setSubscriptions([...subscriptions, { id: Date.now(), name: subName, amount: parseFloat(subCost) }]); setSubName(""); setSubCost(""); };
  const addGoal = () => { if(!goalTarget || !goalName) return; setGoals([...goals, { id: Date.now(), name: goalName, target: parseFloat(goalTarget), saved: 0 }]); setGoalName(""); setGoalTarget(""); };
  const handleCustomDeposit = (id) => { if(!depositAmount) return; const val = parseFloat(depositAmount); setGoals(goals.map(g => g.id === id ? { ...g, saved: g.saved + val } : g)); setDepositAmount(""); setActiveGoalId(null); };
  const deleteItem = (setFunc, list, id) => { if(editId === id) handleCancelEdit(); setFunc(list.filter(i => i.id !== id)); };
  
  const handleExport = () => { const csv = "data:text/csv;charset=utf-8,Date,Category,Type,Note,Amount\n" + transactions.map(t => `${t.date},${t.category},${t.type},${t.note},${t.amount}`).join("\n"); const link = document.createElement("a"); link.href = encodeURI(csv); link.download = "moneymirror_data.csv"; link.click(); };
  const preventScroll = (e) => e.target.blur();
  const handleKeyDown = (e) => { if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(); };

  return (
    <div className="anim-enter hide-scroll" style={styles.coreContainer}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <div style={styles.date}>{new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric' })}</div>
          <div className="font-heading" style={styles.welcome}>Hello, {userName}</div>
        </div>
        <div style={styles.avatar}>{userName.charAt(0).toUpperCase()}</div>
      </div>

      {/* BALANCE CARD */}
      <div style={styles.glassCard} className="card-hover">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div style={styles.cardLabel}>TOTAL BALANCE</div>
          <button onClick={handleExport} style={styles.exportBtn} className="btn-core">❗Download Expense</button>
        </div>
        <div className="font-heading" style={styles.bigAmount}>₹{balance.toLocaleString()}</div>
        <div style={styles.statsRow}>
          <div style={styles.statItem}><span style={{color: '#34d399'}}>▼ Income</span><span>₹{income.toLocaleString()}</span></div>
          <div style={styles.vr}></div>
          <div style={styles.statItem}><span style={{color: '#f87171'}}>▲ Expense</span><span>₹{expense.toLocaleString()}</span></div>
        </div>
      </div>

      {/* NAV */}
      <div style={styles.nav}>
        {['dashboard', 'Future Plan', 'stats'].map(v => (
          <button key={v} onClick={() => setView(v)} style={view === v ? styles.navActive : styles.navBtn} className="btn-core">
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* DYNAMIC CONTENT */}
      <div style={{paddingBottom: '40px'}}>
        
        {view === 'dashboard' && (
          <div className="anim-enter">
            <div style={styles.panel}>
              {editId && <div style={styles.editBadge}>✏️ Editing... <button onClick={handleCancelEdit} style={styles.linkBtn}>Cancel</button></div>}
              <div style={styles.toggleContainer}>
                <button onClick={() => { setType('income'); setCategory('Salary'); }} style={type === 'income' ? styles.toggleInc : styles.toggle} className="btn-core">Income</button>
                <button onClick={() => { setType('expense'); setCategory('Other'); }} style={type === 'expense' ? styles.toggleExp : styles.toggle} className="btn-core">Expense</button>
              </div>
              <div style={styles.inputRow}>
                <span className="font-heading" style={{...styles.currency, color: type === 'income' ? '#34d399' : '#f87171'}}>₹</span>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  onWheel={preventScroll} 
                  onKeyDown={handleKeyDown}
                  placeholder="0" 
                  className="input-glass font-heading" 
                  style={styles.inputLg} 
                />
              </div>
              <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Description (e.g. Lunch)" className="input-glass" style={styles.inputText} />
              
              {/* CATEGORY CHIPS */}
              <div style={styles.chipScroll} className="hide-scroll">
                {currentCategories.map(c => (
                  <button 
                    key={c.name} 
                    onClick={() => setCategory(c.name)} 
                    style={category === c.name ? {...styles.chip, ...styles.chipActive, borderColor:c.color, color:c.color} : styles.chip} 
                    className="btn-core"
                  >
                    <span style={{marginRight:'6px'}}>{c.icon}</span> {c.name}
                  </button>
                ))}
              </div>
              <button onClick={handleSave} style={editId ? styles.updateBtn : styles.actionBtn} className="btn-core">{editId ? 'Update Transaction' : (type === 'income' ? 'Add Income' : 'Add Expense')}</button>
            </div>
            
            <div style={styles.sectionHeader}>RECENT ACTIVITY</div>
            <div style={styles.list}>
              {transactions.map((t, i) => (
                <div 
                  key={t.id} 
                  style={{
                    ...(editId === t.id ? styles.listItemEditing : styles.listItem),
                    animationDelay: `${i*0.05}s`
                  }} 
                  className="list-item-anim"
                >
                  <div style={styles.listLeft}>
                    <div style={{...styles.iconBox, background: getCatColor(t.category)+'20', color: getCatColor(t.category)}}>{getIcon(t.category)}</div>
                    <div><div style={styles.itemTitle}>{t.note || t.category}</div><div style={styles.itemSub}>{t.date} • {t.category}</div></div>
                  </div>
                  <div style={styles.listRight}>
                    <span className="font-heading" style={{fontWeight:'700', color: t.type === 'expense' ? '#fff' : '#34d399'}}>{t.type === 'expense' ? '-' : '+'}₹{t.amount}</span>
                    <div style={styles.actionGroup}><button onClick={() => handleEdit(t)} style={styles.iconBtn} className="btn-core">✎</button><button onClick={() => deleteItem(setTransactions, transactions, t.id)} style={styles.iconBtn} className="btn-core">×</button></div>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && <div style={styles.empty}>No transactions yet.</div>}
            </div>
          </div>
        )}

        {view === 'Future Plan' && (
          <div className="anim-enter">
            <div style={styles.panel}>
              <div style={styles.sectionHeader}>🏆 Savings Goals</div>
              <div style={styles.gridInputRow}>
                <input placeholder="Goal Name" value={goalName} onChange={e=>setGoalName(e.target.value)} className="input-glass" style={styles.gridInput} />
                <input placeholder="Target ₹" type="number" value={goalTarget} onChange={e=>setGoalTarget(e.target.value)} onWheel={preventScroll} className="input-glass" style={styles.gridInput} />
                <button onClick={addGoal} style={styles.gridAddBtn} className="btn-core">+</button>
              </div>
              <div style={styles.goalGrid}>
                {(goals || []).map(g => {
                   const progress = Math.min(100, (g.saved / g.target) * 100);
                   return (
                    <div key={g.id} style={styles.goalCard}>
                      <div style={styles.goalHeader}><span>{g.name}</span><button onClick={()=>deleteItem(setGoals, goals, g.id)} style={styles.iconBtn} className="btn-core">×</button></div>
                      <div style={styles.progressRow}><div style={styles.progressBarBg}><div style={{...styles.progressBarFill, width: `${progress}%`}}></div></div><div style={styles.goalStats}>{Math.round(progress)}%</div></div>
                      <div style={styles.goalSub}>Current: <span style={{color:'#fff'}}>₹{g.saved}</span> / ₹{g.target}</div>
                      {activeGoalId === g.id ? (
                        <div style={styles.customDepositBox}><input type="number" autoFocus placeholder="Amount..." value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="input-glass" style={styles.depositInput} /><button onClick={() => handleCustomDeposit(g.id)} style={styles.confirmBtn} className="btn-core">✓</button></div>
                      ) : (<button onClick={() => setActiveGoalId(g.id)} style={styles.depositBtn} className="btn-core">+ Add Funds</button>)}
                    </div>
                   )
                })}
              </div>
            </div>

            <div style={styles.panel}>
              <div style={styles.sectionHeader}>📅 Subscriptions</div>
              <div style={styles.gridInputRow}>
                <input placeholder="Netflix" value={subName} onChange={e=>setSubName(e.target.value)} className="input-glass" style={styles.gridInput} />
                <input placeholder="₹" type="number" value={subCost} onChange={e=>setSubCost(e.target.value)} onWheel={preventScroll} className="input-glass" style={styles.gridInput} />
                <button onClick={addSubscription} style={styles.gridAddBtn} className="btn-core">+</button>
              </div>
              {(subscriptions || []).map(s => (
                <div key={s.id} style={styles.subItem}>
                  <div style={{display:'flex', gap:'10px', alignItems:'center'}}><div style={styles.dot}></div><span>{s.name}</span></div>
                  <div style={{display:'flex', gap:'10px', alignItems:'center'}}><span className="font-heading" style={{fontWeight:'700'}}>₹{s.amount}</span><button onClick={()=>deleteItem(setSubscriptions, subscriptions, s.id)} style={styles.iconBtn} className="btn-core">×</button></div>
                </div>
              ))}
              <div style={styles.subTotal}>Monthly Fixed: ₹{subTotal}</div>
            </div>
          </div>
        )}

        {view === 'stats' && (
          <div className="anim-enter" style={styles.panelCenter}>
            <div className="font-heading" style={styles.chartTitle}>EXPENSE BREAKDOWN</div>
            <div style={{...styles.donut, background: chartData.length ? `conic-gradient(${chartData.map((c, i, arr) => { const start = arr.slice(0, i).reduce((sum, item) => sum + item.value, 0) / totalChartExpense * 100; const end = start + (c.value / totalChartExpense * 100); return `${c.color} ${start}% ${end}%`; }).join(', ')})` : '#222' }}>
              <div style={styles.donutHole}><span style={{fontSize:'12px', color:'#888'}}>TOTAL</span><span className="font-heading" style={{fontWeight:'700', fontSize:'24px'}}>₹{totalChartExpense}</span></div>
            </div>
            <div style={styles.legend}>
              {chartData.map((c) => (
                 <div key={c.name} style={styles.legendItem}>
                   <div style={{display:'flex', alignItems:'center', gap:'10px'}}><div style={{...styles.legendDot, background: c.color}}></div><span>{c.icon} {c.name}</span></div>
                   <span style={{marginLeft:'auto', opacity:0.8}}>₹{c.value}</span>
                 </div>
              ))}
              {chartData.length === 0 && <div style={styles.empty}>No expenses yet.</div>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STYLES                                                                     */
/* -------------------------------------------------------------------------- */

const styles = {
  // LANDING
  landingScroll: { height: "100%", overflowY: "auto", padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center" },
  navHeader: { width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "50px" },
  logoPill: { fontSize: "20px", fontWeight: "800", color: "#fff", letterSpacing: "-0.5px" },
  statusPill: { fontSize: "11px", fontWeight: "700", color: "#34d399", background: "rgba(52, 211, 153, 0.1)", padding: "6px 10px", borderRadius: "10px", border: "1px solid rgba(52, 211, 153, 0.2)" },
  
  heroSection: { textAlign: "center", marginBottom: "50px" },
  heroBadge: { background: "rgba(16, 185, 129, 0.1)", color: "#34d399", padding: "6px 16px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", marginBottom: "20px", display: "inline-block" },
  heroTitle: { fontSize: "46px", fontWeight: "900", lineHeight: "1.1", marginBottom: "16px", letterSpacing: "-2px" },
  gradientText: { background: "linear-gradient(to right, #34d399, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroDesc: { fontSize: "16px", color: "#94a3b8", marginBottom: "30px", lineHeight: "1.6", maxWidth: "340px", margin: "0 auto 30px auto" },
  glowBtn: { background: "#10b981", color: "#fff", padding: "18px 40px", fontSize: "16px", fontWeight: "700", borderRadius: "20px", border: "none", boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)" },

  demoContainer: { position: "relative", marginBottom: "60px", display: "flex", justifyContent: "center" },
  glassGraphic: { width: "260px", padding: "26px", background: "rgba(30, 41, 59, 0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "30px", backdropFilter: "blur(12px)", transform: "rotate(-3deg)", boxShadow: "0 25px 50px rgba(0,0,0,0.4)" },
  
  sectionHeader: { fontSize: "12px", fontWeight: "800", color: "#64748b", marginBottom: "20px", letterSpacing: "1px", textTransform: "uppercase", width: "100%", textAlign: "center" },
  grid2x2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%", marginBottom: "50px" },
  featureCard: { background: "rgba(255,255,255,0.03)", padding: "20px", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" },
  featIcon: { fontSize: "24px", marginBottom: "10px" },
  featTitle: { fontSize: "16px", fontWeight: "700", color: "#e2e8f0", marginBottom: "4px" },
  featText: { fontSize: "12px", color: "#94a3b8", lineHeight: "1.4" },
  trustFooter: { textAlign: "center", paddingBottom: "20px", color: "#475569" },

  // SETUP - FIXED (Removed 100vh constraint)
  fullCenter: { width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "20px" },
  setupCard: { background: "rgba(15, 23, 42, 0.8)", backdropFilter: "blur(30px)", padding: "40px 30px", borderRadius: "32px", width: "100%", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" },
  progressBar: { height: "4px", background: "#1e293b", borderRadius: "2px", marginBottom: "30px", overflow: "hidden" },
  progressFill: { height: "100%", background: "#10b981", borderRadius: "2px" },
  setupTitle: { fontSize: "32px", fontWeight: "800", marginBottom: "8px", letterSpacing: "-1px" },
  setupSub: { fontSize: "15px", color: "#94a3b8" },
  inputGroup: { marginBottom: "24px", textAlign: "left" },
  inputLabel: { display: "block", fontSize: "11px", fontWeight: "800", color: "#64748b", marginBottom: "10px", letterSpacing: "1px" },
  setupInput: { width: "100%", padding: "16px", borderRadius: "14px", color: "#fff", fontSize: "18px", outline: "none" },
  vibeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
  vibeBtn: { padding: "16px", background: "transparent", border: "1px solid #334155", borderRadius: "14px", color: "#94a3b8", fontSize: "13px", fontWeight: "600" },
  vibeActive: { padding: "16px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", borderRadius: "14px", color: "#10b981", fontSize: "13px", fontWeight: "700" },
  backLink: { background: "transparent", border: "none", color: "#64748b", fontSize: "13px", marginTop: "24px", cursor: "pointer", textDecoration: "underline" },
  loader: { width: "50px", height: "50px", border: "4px solid rgba(52, 211, 153, 0.1)", borderTop: "4px solid #34d399", borderRadius: "50%", margin: "0 auto", animation: "spin 1s linear infinite" },

  // CORE APP
  coreContainer: { width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "20px", overflowY: "auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" },
  date: { fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" },
  welcome: { fontSize: "26px", fontWeight: "800", letterSpacing: "-0.5px" },
  avatar: { width: "44px", height: "44px", borderRadius: "14px", background: "linear-gradient(135deg, #10b981, #059669)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"bold", border:"2px solid #064e3b", boxShadow: "0 6px 16px rgba(16, 185, 129, 0.2)", fontSize: "20px" },
  
  glassCard: { background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)", borderRadius: "28px", padding: "30px", border: "1px solid #334155", textAlign: "center", marginBottom: "24px", boxShadow: "0 10px 40px -10px rgba(0,0,0,0.6)" },
  cardLabel: { fontSize: "12px", color: "#94a3b8", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase" },
  exportBtn: { background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", fontSize: "11px", padding: "6px 12px", borderRadius: "8px", fontWeight: "600" },
  bigAmount: { fontSize: "48px", fontWeight: "800", marginBottom: "20px", letterSpacing: "-1px" },
  statsRow: { display: "flex", justifyContent: "space-between", padding: "0 10px" },
  statItem: { display: "flex", flexDirection: "column", gap: "4px", fontSize: "14px", fontWeight: "600" },
  vr: { width: "1px", height: "30px", background: "#334155" },

  nav: { display: "flex", background: "#0f172a", padding: "5px", borderRadius: "18px", border: "1px solid #1e293b", marginBottom: "24px" },
  navBtn: { flex: 1, padding: "14px", background: "transparent", border: "none", color: "#64748b", fontSize: "13px", fontWeight: "600" },
  navActive: { flex: 1, padding: "14px", background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", color: "#fff", fontSize: "13px", fontWeight: "600", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" },

  panel: { background: "#0f172a", borderRadius: "24px", padding: "24px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" },
  toggleContainer: { display: "flex", background: "#020617", padding: "4px", borderRadius: "14px", marginBottom: "8px" },
  toggle: { flex: 1, padding: "10px", background: "transparent", color: "#64748b", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600" },
  toggleInc: { flex: 1, padding: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600" },
  toggleExp: { flex: 1, padding: "10px", background: "rgba(248, 113, 113, 0.15)", color: "#f87171", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: "600" },
  
  inputRow: { display: "flex", alignItems: "center", borderBottom: "1px solid #1e293b", paddingBottom: "8px" },
  currency: { fontSize: "32px", marginRight: "12px", color: "#64748b", fontWeight: "300" },
  inputLg: { flex: 1, background: "transparent", border: "none", fontSize: "36px", fontWeight: "700", color: "#fff", outline: "none", width: "100%" },
  inputText: { width: "100%", padding: "18px", borderRadius: "16px", color: "#fff", fontSize: "15px", outline: "none" },
  
  gridInputRow: { display: "grid", gridTemplateColumns: "1.5fr 1fr 50px", gap: "12px", width: "100%", height: "54px" },
  gridInput: { width: "100%", height: "100%", padding: "0 16px", borderRadius: "16px", color: "#fff", fontSize: "14px", outline: "none" },
  gridAddBtn: { width: "100%", height: "100%", background: "#1e293b", color: "#fff", border: "1px solid #334155", borderRadius: "16px", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center" },

  chipScroll: { display: "flex", gap: "10px", overflowX: "auto", padding: "10px 4px" },
  chip: { flexShrink: 0, minWidth: "max-content", padding: "10px 20px", borderRadius: "20px", background: "rgba(255,255,255,0.1)", border: "1px solid #334155", color: "#94a3b8", fontSize: "13px", fontWeight: "500", transition: "all 0.2s" },
  chipActive: { flexShrink: 0, minWidth: "max-content", padding: "10px 20px", borderRadius: "20px", background: "#fff", border: "1px solid #fff", color: "#000", fontWeight: "700" },
  
  actionBtn: { width: "100%", padding: "18px", background: "#fff", color: "#000", border: "none", borderRadius: "18px", fontSize: "16px", fontWeight: "700", marginTop: "8px" },
  updateBtn: { width: "100%", padding: "18px", background: "#f59e0b", color: "#000", border: "none", borderRadius: "18px", fontSize: "16px", fontWeight: "700", marginTop: "8px" },
  
  editBadge: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", padding: "8px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "600", marginBottom: "10px" },
  linkBtn: { background: "transparent", border: "none", color: "#f59e0b", textDecoration: "underline", cursor: "pointer", fontSize: "11px" },

  list: { display: "flex", flexDirection: "column", gap: "12px" },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px", background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px" },
  listItemEditing: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px", background: "#1a1811", border: "1px solid #f59e0b", borderRadius: "20px" },
  listLeft: { display: "flex", gap: "14px", alignItems: "center" },
  iconBox: { width: "44px", height: "44px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" },
  itemTitle: { fontSize: "15px", fontWeight: "600", color: "#fff" },
  itemSub: { fontSize: "12px", color: "#64748b", marginTop: "2px" },
  listRight: { display: "flex", alignItems: "center", gap: "12px", fontSize: "15px" },
  actionGroup: { display: "flex", alignItems: "center", gap: "8px" },
  iconBtn: { background: "transparent", border: "none", color: "#64748b", fontSize: "16px", padding: "4px" },

  goalGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  goalCard: { background: "#0f172a", borderRadius: "20px", padding: "20px", border: "1px solid #1e293b" },
  goalHeader: { display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "16px", fontWeight: "600" },
  progressRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" },
  progressBarBg: { flex: 1, height: "8px", background: "#1e293b", borderRadius: "4px", overflow: "hidden" },
  progressBarFill: { height: "100%", background: "linear-gradient(90deg, #34d399, #3b82f6)", borderRadius: "4px" },
  goalStats: { fontSize: "12px", color: "#94a3b8", fontWeight: "600" },
  goalSub: { fontSize: "13px", color: "#64748b", marginBottom: "16px" },
  depositBtn: { width: "100%", padding: "12px", background: "rgba(16, 185, 129, 0.1)", color: "#34d399", border: "none", borderRadius: "12px", fontSize: "13px", fontWeight: "600" },
  customDepositBox: { display: "flex", gap: "10px", marginTop: "12px" },
  depositInput: { flex: 1, background: "#020617", border: "1px solid #34d399", padding: "10px", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none" },
  confirmBtn: { background: "#34d399", color: "#fff", border: "none", borderRadius: "10px", width: "44px", fontSize: "18px" },
  subItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #1e293b", fontSize: "15px" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", background: "#64748b" },
  subTotal: { marginTop: "20px", textAlign: "right", fontSize: "14px", color: "#94a3b8", fontWeight: "600" },
  empty: { textAlign: "center", color: "#64748b", fontStyle: "italic", fontSize: "14px", padding: "20px" },

  panelCenter: { background: "#0f172a", borderRadius: "24px", padding: "30px", border: "1px solid #1e293b", display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100%", justifyContent: "center" },
  chartTitle: { fontSize: "16px", color: "#94a3b8", marginBottom: "40px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "700" },
  donut: { width: "280px", height: "280px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" },
  donutHole: { width: "200px", height: "200px", background: "#0f172a", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "absolute", border: "4px solid #0f172a" },
  legend: { marginTop: "50px", width: "100%", display: "flex", flexDirection: "column", gap: "16px" },
  legendItem: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "15px", color: "#cbd5e1", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  legendDot: { width: "12px", height: "12px", borderRadius: "50%" },
};