interface bmiValues {
  heightInCm: number
  weightInKg: number
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

const calculateBmi = (heightInCm: number, weightInKg: number) => {
  const result = weightInKg / Math.pow(heightInCm * 0.01, 2)
  if (result < 18.5) {
    console.log(`Underweight`)
  } else if (18.5 < result && result < 25) {
    console.log('Normal (healthy weight)')
  } else if (result >= 25 && result < 30) {
    console.log('Overweight')
  } else console.log('obesity')
}

try {
  const { heightInCm, weightInKg } = parseArguments(process.argv)
  calculateBmi(heightInCm, weightInKg)
} catch (error) {
  let errorMessage = 'something bad happened'
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message
  }
  console.log(errorMessage)
}
