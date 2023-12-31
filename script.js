let runningTotal = 0;
let buffer = "0";
let PreviousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (PreviousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      PreviousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  PreviousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (PreviousOperator === "+") {
    runningTotal += intBuffer;
  } else if (PreviousOperator === "−") {
    runningTotal -= intBuffer;
  } else if (PreviousOperator("×")) {
    runningTotal *= intBuffer;
  } else if (PreviousOperator === "÷") {
    runningTotal /= intBuffer;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
