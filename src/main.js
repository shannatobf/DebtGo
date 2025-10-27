import './style.css'

let budget = 0
let debts = []

function render() {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="min-h-screen py-12">
      <div class="max-w-6xl mx-auto px-6">
        <!-- HERO -->
        <div class="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h1 class="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">DebtGo — Clear payoff plans, less interest</h1>
            <p class="text-slate-600 mb-6 text-lg">Use the Avalanche method to prioritize high-interest debt and get to "debt-free" faster. Visual timelines, clear steps, and actionable insights.</p>

            <div class="bg-white dg-shadow rounded-2xl p-6 w-full max-w-md">
              <label for="budget-input" class="block text-sm font-medium text-slate-700 mb-2">Monthly budget for debt</label>
              <div class="flex gap-3">
                <input id="budget-input" type="number" inputmode="numeric" aria-label="Monthly budget" value="${budget || ''}" placeholder="e.g. 500" class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <button id="set-budget" class="inline-flex items-center px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold dg-transition hover:bg-indigo-700">Set</button>
              </div>
              ${budget > 0 ? `<p class="text-sm text-green-600 mt-3">Budget set to <strong>$${budget.toFixed(2)}/month</strong></p>` : `<p class="text-sm text-slate-500 mt-3">Set a monthly amount and add your debts to see a payoff plan.</p>`}
            </div>
          </div>

          <div class="flex justify-center lg:justify-end">
            <div class="w-full max-w-md">
              <div class="rounded-2xl overflow-hidden dg-shadow dg-accent-bg text-white p-6">
                <div class="text-sm opacity-90">DebtGo Snapshot</div>
                <h3 class="text-2xl font-semibold mt-2">Payoff faster with Avalanche</h3>
                <p class="mt-3 text-sm opacity-90">Pay minimums on all debts, then send extra money to the highest-interest balance first.</p>
                <div class="mt-6 bg-white bg-opacity-10 rounded-xl p-4">
                  <div class="text-xs opacity-90">Estimated time to debt-free</div>
                  <div class="text-3xl font-bold mt-1">—</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MAIN CONTROLS -->
        <div class="grid mt-10 gap-6 lg:grid-cols-2">
          <div class="bg-white rounded-xl p-6 dg-shadow">
            <h2 class="text-lg font-semibold mb-4">Add Debt</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label for="debt-name" class="block text-xs font-medium text-slate-600 mb-1">Name</label>
                <input id="debt-name" type="text" placeholder="e.g. Credit Card" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label for="debt-balance" class="block text-xs font-medium text-slate-600 mb-1">Balance</label>
                <input id="debt-balance" type="number" placeholder="0.00" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label for="debt-rate" class="block text-xs font-medium text-slate-600 mb-1">Interest rate (%)</label>
                <input id="debt-rate" type="number" step="0.01" placeholder="e.g. 18.5" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div>
                <label for="debt-minimum" class="block text-xs font-medium text-slate-600 mb-1">Minimum payment</label>
                <input id="debt-minimum" type="number" placeholder="0.00" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300" />
              </div>
              <div class="sm:col-span-2">
                <label for="debt-duedate" class="block text-xs font-medium text-slate-600 mb-1">Due date (optional)</label>
                <input id="debt-duedate" type="date" class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-300" />
              </div>
            </div>
            <button id="add-debt" class="mt-4 w-full inline-flex justify-center items-center px-4 py-3 bg-emerald-600 text-white rounded-md font-semibold dg-transition hover:bg-emerald-700">Add Debt</button>
          </div>

          <div>
            ${debts.length > 0 ? `
              <div class="bg-white rounded-xl p-6 dg-shadow">
                <h2 class="text-lg font-semibold mb-3">Your Debts</h2>
                <div class="space-y-3">
                  ${debts.map((debt, index) => `
                    <div class="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div class="font-semibold text-slate-800">${debt.name}</div>
                        <div class="text-sm text-slate-500">Balance $${debt.balance.toFixed(2)} • ${debt.rate}% • Min $${debt.minimum.toFixed(2)}</div>
                      </div>
                      <div class="flex items-center gap-3">
                        <button onclick="removeDebt(${index})" class="text-red-600 hover:text-red-700">Remove</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : `
              <div class="bg-white rounded-xl p-6 dg-shadow text-slate-600">No debts added yet — add one on the left to start.</div>
            `}
          </div>
        </div>

        <!-- Results -->
        <div id="results" class="mt-8"></div>
      </div>
    </div>
  `
  
  attachEventListeners()
  if (budget > 0 && debts.length > 0) {
    calculatePayoff()
  }
}

function attachEventListeners() {
  document.getElementById('set-budget').addEventListener('click', () => {
    const input = document.getElementById('budget-input')
    budget = parseFloat(input.value) || 0
    render()
  })
  
  document.getElementById('add-debt').addEventListener('click', () => {
    const name = document.getElementById('debt-name').value
    const balance = parseFloat(document.getElementById('debt-balance').value)
    const rate = parseFloat(document.getElementById('debt-rate').value)
    const minimum = parseFloat(document.getElementById('debt-minimum').value)
    const duedate = document.getElementById('debt-duedate').value

    
    if (name && balance > 0 && rate >= 0 && minimum > 0) {
      debts.push({ name, balance, rate, minimum, duedate })
      render()
    }
  })


}

window.removeDebt = function(index) {
  debts.splice(index, 1)
  render()
}

function calculatePayoff() {
  const totalMinimum = debts.reduce((sum, debt) => sum + debt.minimum, 0)
  
  if (budget < totalMinimum) {
    document.getElementById('results').innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-red-800 mb-2">⚠️ Budget Too Low</h2>
        <p class="text-red-700">
          Your budget ($${budget.toFixed(2)}) is less than the total minimum payments ($${totalMinimum.toFixed(2)}).
          Please increase your budget.
        </p>
      </div>
    `
    return
  }
  
  const sortedDebts = [...debts].sort((a, b) => b.rate - a.rate)
  
  let workingDebts = sortedDebts.map(d => ({ ...d, remaining: d.balance }))
  let month = 0
  let totalInterest = 0
  const payoffSchedule = []
  
  while (workingDebts.some(d => d.remaining > 0)) {
    month++
    
    if (month > 600) break
    
    workingDebts.forEach(debt => {
      if (debt.remaining > 0) {
        const interest = (debt.remaining * (debt.rate / 100)) / 12
        debt.remaining += interest
        totalInterest += interest
      }
    })
    
    let availableBudget = budget
    
    workingDebts.forEach(debt => {
      if (debt.remaining > 0 && availableBudget > 0) {
        const payment = Math.min(debt.minimum, debt.remaining, availableBudget)
        debt.remaining -= payment
        availableBudget -= payment
      }
    })
    
    while (availableBudget > 0.01) {
      const nextDebt = workingDebts.find(d => d.remaining > 0)
      if (!nextDebt) break
      
      const payment = Math.min(availableBudget, nextDebt.remaining)
      nextDebt.remaining -= payment
      availableBudget -= payment
    }
    
    workingDebts.forEach(debt => {
      if (debt.remaining < 0) debt.remaining = 0
    })
    
    if (workingDebts.some(d => d.remaining <= 0 && !payoffSchedule.find(p => p.name === d.name))) {
      workingDebts.forEach(d => {
        if (d.remaining <= 0 && !payoffSchedule.find(p => p.name === d.name)) {
          payoffSchedule.push({ name: d.name, month })
        }
      })
    }
  }
  
  const years = Math.floor(month / 12)
  const months = month % 12
  
  document.getElementById('results').innerHTML = `
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">💡 Payoff Plan (Avalanche Method)</h2>
      
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <div class="bg-blue-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-600 mb-1">Time to Debt Free</p>
          <p class="text-2xl font-bold text-blue-600">
            ${years > 0 ? `${years}y ` : ''}${months}m
          </p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-600 mb-1">Total Debt</p>
          <p class="text-2xl font-bold text-green-600">
            $${debts.reduce((sum, d) => sum + d.balance, 0).toFixed(2)}
          </p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg text-center">
          <p class="text-sm text-gray-600 mb-1">Total Interest</p>
          <p class="text-2xl font-bold text-purple-600">
            $${totalInterest.toFixed(2)}
          </p>
        </div>
      </div>
      
      <div class="mb-4">
        <h3 class="font-semibold text-gray-800 mb-3">Payoff Order:</h3>
        <div class="space-y-2">
          ${payoffSchedule.map((item, i) => {
            const y = Math.floor(item.month / 12)
            const m = item.month % 12
            return `
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span class="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  ${i + 1}
                </span>
                <div class="flex-1">
                  <span class="font-semibold text-gray-800">${item.name}</span>
                </div>
                <span class="text-sm text-gray-600">
                  ${y > 0 ? `${y}y ` : ''}${m}m
                </span>
              </div>
            `
          }).join('')}
        </div>
      </div>
      
      <p class="text-sm text-gray-600 mt-4">
        💡 <strong>Avalanche Strategy:</strong> Pay minimums on all debts, then put extra money toward the highest interest rate debt first.
      </p>
    </div>
  `
}

render()
