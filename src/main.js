import './style.css'

let budget = 0
let debts = []

function render() {
  const app = document.querySelector('#app')
  
  app.innerHTML = `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div class="container mx-auto px-4 max-w-4xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-2 text-center">DebtGo</h1>
        <p class="text-gray-600 text-center mb-8">Simple debt payoff calculator</p>
        
        <!-- Budget Input -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Monthly Budget for Debt</h2>
          <div class="flex gap-4">
            <input 
              type="number" 
              id="budget-input" 
              placeholder="Enter monthly amount for debt payments" 
              value="${budget || ''}"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button id="set-budget" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold">
              Set Budget
            </button>
          </div>
          ${budget > 0 ? `<p class="text-green-600 mt-2">Budget: $${budget.toFixed(2)}/month</p>` : ''}
        </div>
        

        <!-- Add Debt -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Add Debt</h2>
          <div class="grid md:grid-cols-2 gap-4 mb-4">
            <input 
              type="text" 
              id="debt-name" 
              placeholder="Debt name (e.g., Credit Card)" 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input 
              type="number" 
              id="debt-balance" 
              placeholder="Balance" 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input 
              type="number" 
              id="debt-rate" 
              placeholder="Interest rate (%)" 
              step="0.01"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input 
              type="number" 
              id="debt-minimum" 
              placeholder="Minimum payment" 
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="date"
              id="debt-duedate"
              placeholder="Due date (optional)"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button id="add-debt" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold w-full">
            Add Debt
          </button>
        </div>
        
        <!-- Debts List -->
        ${debts.length > 0 ? `
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Your Debts</h2>
            <div class="space-y-3">
              ${debts.map((debt, index) => `
                <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">${debt.name}</h3>
                    <p class="text-sm text-gray-600">
                      Balance: $${debt.balance.toFixed(2)} | 
                      Rate: ${debt.rate}% | 
                      Min: $${debt.minimum.toFixed(2)} | 
                      Due: ${debt.duedate ? debt.duedate : 'N/A'}
                    </p>
                  </div>
                  <button onclick="removeDebt(${index})" class="text-red-600 hover:text-red-700 px-3 py-1">
                    Remove
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Results -->
        <div id="results"></div>
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
