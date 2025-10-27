# DebtGo

A simple and powerful debt payoff calculator built with Vite and Tailwind CSS. Calculate the fastest way to become debt-free using proven payoff strategies.

## 🚀 Live Demo

Visit the app to start planning your debt-free journey!

## ✨ Current Features

✅ **Set Monthly Budget** - Define how much you can allocate to debt payments each month

✅ **Add Multiple Debts** - Track unlimited debts with:
  - Debt name (Credit Card, Car Loan, etc.)
  - Current balance
  - Interest rate (%)
  - Minimum monthly payment

✅ **Remove Debts** - Easily manage your debt list

✅ **Avalanche Method Calculator** - Automatic payoff calculation using the debt avalanche strategy (highest interest rate first)

✅ **Time to Debt-Free** - See exactly how long until you're debt-free

✅ **Total Interest Calculation** - Know how much interest you'll pay over time

✅ **Payoff Order** - Visual breakdown showing which debts get paid off first and when

## 🔮 Future Features

We're continuously improving DebtGo! Here are the features coming soon:

1. **Save/Load Data** - Keep your debts saved in browser storage so you don't lose them when you refresh

2. **Snowball Method** - Alternative payoff strategy that targets the smallest balance first for psychological wins

3. **Extra Payment Option** - See the impact of one-time extra payments on your payoff timeline

4. **Month-by-Month Breakdown** - Detailed payment schedule showing exactly what happens each month

5. **Comparison View** - Compare avalanche vs snowball methods side-by-side to choose the best strategy for you

6. **Progress Tracker** - Mark payments as you make them and track your real progress over time

7. **Visual Charts** - Beautiful graphs showing your debt decreasing over time

## 🛠️ Tech Stack

- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework bloat, just clean JS

## 📦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to `http://localhost:5000`

### Build for Production

```bash
npm run build
```

## 💡 How It Works

DebtGo uses the **Debt Avalanche Method**, which is mathematically proven to save you the most money:

1. Pay minimum payments on all debts
2. Put all extra money toward the debt with the highest interest rate
3. Once that's paid off, roll that payment into the next highest interest rate debt
4. Repeat until debt-free!

Monthly Budget Input:

Users can enter their monthly budget for debt payments
The budget is validated against total minimum payments
Debt Management:

Users can add multiple debts with:
Name
Balance
Interest rate
Minimum payment
Due date (optional)
Debts can be removed individually
Avalanche Method Calculation:

Sorts debts by interest rate (highest to lowest)
Ensures minimum payments are made on all debts
Applies extra money to highest interest debt first
Calculates:
Time to debt-free (years and months)
Total debt amount
Total interest paid
Shows payoff order with timeline for each debt
UI Features:

Clean, modern interface with Tailwind CSS
Responsive design
Visual feedback for budget status
Clear presentation of results

## 🤝 Contributing

Have ideas for new features? Feel free to open an issue or submit a pull request!

## 📄 License

MIT License - feel free to use this project however you'd like!

---

Built with ❤️ to help people become debt-free faster
