import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-5xl font-bold text-gray-900 mb-4 text-center">
          Welcome to DebtGo
        </h1>
        <p class="text-xl text-gray-600 text-center mb-12">
          Your debt management solution
        </p>
        
        <div class="bg-white rounded-lg shadow-xl p-8">
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-6 bg-blue-50 rounded-lg">
              <div class="text-4xl mb-2">📊</div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Track Debts</h3>
              <p class="text-gray-600 text-sm">Monitor all your debts in one place</p>
            </div>
            
            <div class="text-center p-6 bg-green-50 rounded-lg">
              <div class="text-4xl mb-2">💰</div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">Plan Payments</h3>
              <p class="text-gray-600 text-sm">Create a strategy to pay off faster</p>
            </div>
            
            <div class="text-center p-6 bg-purple-50 rounded-lg">
              <div class="text-4xl mb-2">📈</div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">See Progress</h3>
              <p class="text-gray-600 text-sm">Visualize your journey to debt freedom</p>
            </div>
          </div>
          
          <div class="mt-8 text-center">
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-200">
              Get Started
            </button>
          </div>
        </div>
        
        <div class="mt-12 text-center text-gray-500 text-sm">
          <p>Built with Vite and Tailwind CSS</p>
        </div>
      </div>
    </div>
  </div>
`
