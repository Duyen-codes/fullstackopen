// create a type using typescript keyword type

type Operation = 'multiply' | 'add' | 'divide'
type Result = number

const calculator = (a: number, b: number, op: Operation): Result => {
  switch (op) {
    case 'multiply':
      return a * b
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!")
      return a / b

    case 'add':
      return a + b
    default:
      throw new Error('Operation is not multiply, add or divide!')
  }
}

try {
  console.log(calculator(1, 5, 'divide'))
} catch (error) {
  let errorMessage = 'Something went wrong'

  // object instanceof constructor
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log('errorMessage', errorMessage)
}

console.log(process.argv)

export { calculator }
