const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  chooseOperation(operation) {}

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '×':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  updateDisplay() {
       this.currentOperandTextElement.value =
         this.getDisplayNumber(this.currentOperand)
       if (this.operation != null) {
           this.previousOperandTextElement.innerText =
           `${this.getDisplayNumber(this.previousOperand)} ${this.operation} ${this.currentOperand}`
       } else {
         this.previousOperandTextElement.innerText = ''
       }
    }
  

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })

})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})


equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})








/*let calculator = {
  calcInputBox: document.querySelector("#calc-display"),
  resultBox: document.querySelector("#result-box"),
 
  keys: {  numbers: [1,2,3,4,5,6,7,8,9,0],
            operators: ['+','-','÷','×','%'],
            period: '.'
          },
 
  splitValues: function(){
    let nums = calculator.keys.numbers
    let ops = calculator.keys.operators
    let inputs = calculator.calcInputBox.value
    
    if (nums !== ''){
    for (var i = 0; i < inputs.length; i++) {
        for (var a = 0; a < ops.length; i++) {
          return inputs[i]
        }
      }
     }
  },
  add: function(){
  //  input.valuebeforeoperator + input.valueafteroperator
  }
}


    let nums = calculator.keys.numbers
    let ops = calculator.keys.operators
    let inputs = calculator.calcInputBox.value

for (var a = 0; a < ops.length; a++) {
  if (inputs.includes(ops[a])) {
        console.log(ops[a])
  }
}
calculator.calcInputBox.addEventListener("input", () => {
  console.log(inputs)
})
*/