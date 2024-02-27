$ = (q) => {
  const els = document.querySelectorAll(q);
  if (els.length > 1) {
    return els;
  } else if (els.length == 1) {
    return els[0];
  }
};

const calculator = document.querySelector("#calculator");
const output = $("#output");
const expression = $("#expression");

calculator.addEventListener("click", (e) => {
  let target = e.target;
  const btn = target.closest("button");
  if (!btn) return;
  updateDisplay(target);
});

const operatorMap = {};

let statement = "";

function updateDisplay(btn) {
  let type = btn.dataset.type;
  let role = btn.dataset.role;

  if (role) return;

  if (type == "number") {
    expression.innerText += btn.innerText;
    statement += char(btn.innerText);
    output.innerText = eval(statement);
  } else if (type == "operator") {
    if (["%", "×", "÷"].indexOf(btn.innerText) != -1) return;

    console.log(statement);
    if (eval(statement)) {
      output.innerText = eval(statement);
    }
    statement += char(btn.innerText);

    expression.innerText += btn.innerText;
  }
}

function char(key) {
  let charMap = {
    "(": "(",
    ")": ")",
    "%": "%",
    "√": "**0.5",
    "×": "*",
    "÷": "/",
    "+": "+",
    "-": "-",
    ".": ".",
  };
  console.log(expression);
  return +key || charMap[key];
}
