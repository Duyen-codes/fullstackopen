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

const calculateExercises = (
  hourArr: Array<number>,
  targetAmount: number,
): resultObject => {
  const periodLength = hourArr.length
  const trainingDaysArr = hourArr.filter((d) => d !== 0)
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
  console.log('trainingDays', trainingDays)
  console.log('periodLength', periodLength)
  const hourSum = hourArr.reduce((sum, value) => {
    return sum + value
  }, 0)
  const average = hourSum / hourArr.length

  console.log('average', average)
  if (average === targetAmount) {
    success = true
  } else success = false
  console.log('rating', rating)
  console.log('ratingDescription', ratingDescription)
  console.log('targetAmount', targetAmount)
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
