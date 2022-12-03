// create a type using typescript keyword type

type Operation = 'multiply' | 'add' | 'divide'
type Result = string | number

const calculator = (a: number, b: number, op: Operation): Result => {
  if ((op = 'multiply')) {
    return a * b
  } else if ((op = 'add')) {
    return a + b
  } else if ((op = 'divide')) {
    if (b === 0) return 'this cannot be done'
    return a / b
  }
}

calculator(1, 2, 'yolo')
