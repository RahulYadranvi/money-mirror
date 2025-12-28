import { useState, useEffect } from "react";

const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Other"];

function getTodayKey() {
  return new Date().toDateString();
}

function getWeekKey() {
  const now = new Date();
  const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  return firstDayOfWeek.toDateString();
}

function App() {
  const todayKey = getTodayKey();
  const weekKey = getWeekKey();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  // Load weekly data
  useEffect(() => {
    const savedWeek = localStorage.getItem("week");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedWeek === weekKey && savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    } else {
      localStorage.setItem("week", weekKey);
      localStorage.setItem("expenses", JSON.stringify([]));
      setExpenses([]);
    }
  }, [weekKey]);

  function handleSave() {
    if (!amount) return;

    const newExpense = {
      amount: Number(amount),
      category,
      date: todayKey,
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    setAmount("");
  }

  const todayExpenses = expenses.filter((e) => e.date === todayKey);
  const todayTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0);
  const weekTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = CATEGORIES.map((cat) => ({
    name: cat,
    total: todayExpenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }));

  const topCategory = categoryTotals
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)[0];

  const insight =
    topCategory && todayTotal > 0
      ? `${topCategory.name} is ${Math.round(
          (topCategory.total / todayTotal) * 100
        )}% of your spending today`
      : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1e1e1e",
        color: "#ffffff",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        How much did you spend today?
      </h1>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "12px",
          fontSize: "18px",
          width: "200px",
          marginRight: "10px",
        }}
      />

      <div style={{ margin: "20px 0" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: "8px",
              marginBottom: "8px",
              padding: "8px 12px",
              background: category === cat ? "#ffffff" : "#333",
              color: category === cat ? "#000" : "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Save
      </button>

      <div style={{ marginTop: "40px", fontSize: "22px" }}>
        Today you spent ₹{todayTotal}
      </div>

      <div style={{ marginTop: "10px", fontSize: "18px", color: "#bbbbbb" }}>
        This week you spent ₹{weekTotal}
      </div>

      <div style={{ marginTop: "20px" }}>
        {categoryTotals.map(
          (cat) =>
            cat.total > 0 && (
              <div key={cat.name}>
                {cat.name}: ₹{cat.total}
              </div>
            )
        )}
      </div>

      {insight && (
        <div style={{ marginTop: "30px", fontSize: "18px", color: "#bbbbbb" }}>
          {insight}
        </div>
      )}
    </div>
  );
}

export default App;
