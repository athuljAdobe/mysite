export default function decorate(block) {

  block.innerHTML = `
    <div class="calculator1">
      <div class="display">
        <input id="result" type="text" placeholder="0" readonly />
      </div>
      <div class="buttons">
        ${generateButtons()}
      </div>
    </div>
  `;

  const result = block.querySelector('#result');
  const buttons = block.querySelectorAll('button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {

      if (btn.id === 'ac') {
        result.value = '';
        return;
      }

      if (btn.id === 'back') {
        result.value = result.value.slice(0, -1);
        return;
      }

      if (btn.id === 'equals') {
        calculate(result);
        return;
      }

      const value = btn.dataset.value;
      if (value) {
        appendValue(result, value);
      }
    });
  });
}

/* ---------- Buttons ---------- */

function generateButtons() {
  const values = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','+'];
  let html = '';

  values.forEach(val => {
    html += `<button data-value="${val}">${val}</button>`;
  });

  html += `
    <button id="ac">AC</button>
    <button id="equals">=</button>
    <button id="back">Back</button>
  `;

  return html;
}

/* ---------- Append ---------- */

function appendValue(result, val) {
  const operators = ['+', '-', '*', '/'];
  const lastChar = result.value.slice(-1);

  if (operators.includes(val) && operators.includes(lastChar)) {
    return;
  }

  result.value += val;
}

/* ---------- Safe Calculator ---------- */

function calculate(result) {
  try {
    if (!result.value) return;

    const expression = result.value;

    const match = expression.match(/^(-?\d+(\.\d+)?)([\+\-\*\/])(-?\d+(\.\d+)?)$/);

    if (!match) {
      result.value = "Invalid Expression";
      return;
    }

    const num1 = parseFloat(match[1]);
    const operator = match[3];
    const num2 = parseFloat(match[4]);

    let output;

    switch (operator) {
      case '+':
        output = num1 + num2;
        break;
      case '-':
        output = num1 - num2;
        break;
      case '*':
        output = num1 * num2;
        break;
      case '/':
        output = num2 === 0 ? "Cannot divide by 0" : num1 / num2;
        break;
      default:
        output = "Invalid Expression";
    }

    result.value = output;

  } catch (error) {
    result.value = "Invalid Expression";
  }
}