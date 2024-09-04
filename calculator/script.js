const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let currentValue = '0';
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;
let fullExpression = '';

const MAX_DECIMALS = 8;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      handleNumber(value);
    } else if (button.classList.contains('operator')) {
      handleOperator(value);
    } else if (button.classList.contains('equals')) {
      handleEquals();
    } else if (button.classList.contains('decimal')) {
      handleDecimal();
    } else if (button.classList.contains('clear')) {
      handleClear();
    } else if (button.classList.contains('sign')) {
      handleSign();
    } else if (button.classList.contains('percent')) {
      handlePercent();
    }

    updateDisplay();
  });
});

function handleNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
  if (operation) {
    fullExpression = `${previousValue} ${operation} ${currentValue}`;
  } else {
    fullExpression = currentValue;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (operation !== null && !shouldResetDisplay) {
    handleEquals();
  }
  previousValue = currentValue;
  operation = op;
  shouldResetDisplay = true;
  fullExpression = `${previousValue} ${operation}`;
  updateDisplay();
}

function roundResult(number) {
  return parseFloat(number.toFixed(MAX_DECIMALS)).toString();
}

function handleEquals() {
  if (operation === null || shouldResetDisplay) return;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result;
  switch (operation) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '×': result = prev * current; break;
    case '÷': result = prev / current; break;
  }
  currentValue = roundResult(result);
  fullExpression = currentValue;
  operation = null;
  previousValue = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function handleDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  fullExpression = currentValue;
  updateDisplay();
}

function handleClear() {
  currentValue = '0';
  previousValue = null;
  operation = null;
  fullExpression = '0';
  updateDisplay();
}

function handleSign() {
  currentValue = (parseFloat(currentValue) * -1).toString();
  fullExpression = currentValue;
  updateDisplay();
}

function handlePercent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
  fullExpression = currentValue;
  updateDisplay();
}

function updateDisplay() {
  display.textContent = fullExpression;
}
