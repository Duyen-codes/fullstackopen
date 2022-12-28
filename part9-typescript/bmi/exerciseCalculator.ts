// func calculateExercises
// returns an object that includes the following values
interface resultObject {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface hoursAndTarget {
  hoursArr: Array<number>
  target: number
}

const parseArguments = (args: Array<string>): hoursAndTarget => {
  if (args.length < 4) throw new Error('not enough arguments')

  const hoursAndTarget = process.argv.slice(2).map((item) => {
    if (!isNaN(Number(item))) {
      return Number(item)
    } else {
      throw new Error('provided values were not numbers!')
    }
  })

  const hoursArr: Array<number> = hoursAndTarget.slice(1)
  const target: number = hoursAndTarget[0]
  return {
    hoursArr: hoursArr,
    target: target,
  }
}

const calculateExercises = (
  hoursArr: Array<number>,
  targetAmount: number,
): resultObject => {
  const periodLength = hoursArr.length
  const trainingDaysArr = hoursArr.filter((d) => d !== 0)
  const trainingDays = trainingDaysArr.length
  let rating, ratingDescription, success
  if (trainingDays < 3) {
    rating = 1
    ratingDescription = 'not bad, keep pushing'
  } else if (trainingDays >= 5) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 3
    ratingDescription = 'great job'
  }

  const hourSum = hoursArr.reduce((sum, value) => {
    return sum + value
  }, 0)
  const average = hourSum / hoursArr.length

  if (average === targetAmount) {
    success = true
  } else success = false

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  }
}

try {
  const { hoursArr, target } = parseArguments(process.argv)
  console.log(calculateExercises(hoursArr, target))
} catch (error) {
  let errorMessage = 'something bad happened'
  if (error instanceof Error) {
    errorMessage += ' Error ' + error.message
  }
  console.log(errorMessage)
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

export { calculateExercises }
