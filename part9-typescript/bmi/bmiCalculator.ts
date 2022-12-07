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

console.log(calculateBmi(180, 74))
