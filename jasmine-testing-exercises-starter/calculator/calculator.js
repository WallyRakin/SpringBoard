window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupInitialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupInitialValues() {
  const defaultValues = {
    amount: 10000,
    years: 5,
    rate: 5
  };
  document.getElementById("loan-amount").value = defaultValues.amount;
  document.getElementById("loan-years").value = defaultValues.years;
  document.getElementById("loan-rate").value = defaultValues.rate;
  const monthlyPayment = calculateMonthlyPayment(defaultValues);
  updateMonthly(monthlyPayment);
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValues = getCurrentUIValues();
  const monthlyPayment = calculateMonthlyPayment(currentValues);
  updateMonthly(monthlyPayment);
}

// Given an object of values (a value has amount, years and rate),
// calculate the monthly payment. The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const P = values.amount;
  const i = values.rate / 100 / 12;
  const n = values.years * 12;
  const numerator = P * i;
  const denominator = 1 - Math.pow((1 + i), -n);
  const monthly = numerator / denominator;
  return monthly.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const paymentSpan = document.getElementById("monthly-payment");
  paymentSpan.innerText = `$${monthly}`;
}
