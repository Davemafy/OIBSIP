const output = document.querySelector('output')

let calc = '2(3 + 4 - 6)3*(4)'
let result

try {
  result = eval(calc)
  console.log('works');
  update()
} catch {
  try {
    result = eval(checked(calc))
    update()
  } catch {
    console.log('error');
  }
}


function checked(exp) {
  let newExp = ''
  let index = 0
  for (let char of exp) {
    if (char == '(') {
      if (!isNaN(exp[index - 1])) {
        newExp += '*('
      }
    } else if (char == ')') {
      if (!isNaN(exp[index + 1])) {
        newExp += ')*'
      }
    } else {
        newExp += char
        
    }

    index++
  }
  return newExp;
}



function update() {
  output.innerText = result
  console.log(result);
}