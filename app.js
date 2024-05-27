const calcultaor = document.querySelector('.calculator');
const keys = document.querySelector('.buttons');
const display = document.querySelector('.display');

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    const previousKeyType = calcultaor.dataset.previousKeyType

    if (!action) {
      if (displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calcultaor.dataset.previousKeyType = 'number'
    }

    //When a user hits an operator key
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-despressesd')
      calcultaor.dataset.firstValue = displayedNum
      calcultaor.dataset.operator = action
      calcultaor.dataset.previousKeyType = 'operator'


      const firstValue = calcultaor.dataset.firstValue
      const operator = calcultaor.dataset.operator
      const secondValue = displayedNum

      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue
        calcultaor.dataset.firstValue = calcValue
      } else {
        calcultaor.dataset.firstValue = displayedNum
      }
      key.classList.add('is-depressed')
      calcultaor.dataset.previousKeyType = 'operator'
      calcultaor.dataset.firstValue = displayedNum
      calcultaor.dataset.operator = action
    }

    //When a user hits the decimal key !
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.'
      }

      calcultaor.dataset.previousKeyType = 'decimal'
    }

    if (action === 'clear') {
      const clearButton = calcultaor.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
      if (key.textContent === 'AC') {
        calcultaor.dataset.firstValue = ''
        calcultaor.dataset.modValue = ''
        calcultaor.dataset.operator = ''
        calcultaor.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }

      display.textContent = 0
      calcultaor.dataset.previousKeyType = 'clear'
    }

    if (action === 'calculate') {
      let firstValue = calcultaor.dataset.firstValue
      const operator = calcultaor.dataset.operator
      const secondValue = displayedNum

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum
          secondValue = calcultaor.dataset.modValue
        }
        display.textContent = calculate(firstValue, operator, secondValue)
      }
      calcultaor.dataset.modValue = secondValue
      calcultaor.dataset.previousKeyType = 'calculate'

      display.textContent = calculate(firstValue, operator, secondValue)
    }
  }
})


const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1)
  const secondNum = parseFloat(n2)

  if (operator === 'add') return firstNum + parseFloat(n2)
  if (operator === 'subtract') return firstNum - parseFloat(n2)
  if (operator === 'multiply') return firstNum * parseFloat(n2)
  if (operator === 'divide') return firstNum / parseFloat(n2)
}

const string = 'The hamburgers taste pretty good!'
const hasExclaimation = string.includes('!')
// console.log(hasExclaimation) // true

// if (!displayedNum.includes('.')) {
//   display.textContent = displayedNum + '.'
// }


// if (!action) {
//   // ...
//   calcultaor.dataset.previousKey = 'number'
// }

// if (action === 'decimal') {
//   if (!displayedNum.includes('.')) {
//     display.textContent = displayedNum + '.'
//   } else if (previousKeyType === 'operator') {
//     display.textContent = '0.'
//   }
//   calcultaor.dataset.previousKey = 'decimal'
// }

// if (action !== 'clear') {
//   const clearButton = calculator.querySelector('[data-action=clear]')
//   clearButton.textContent = 'CE'
// }