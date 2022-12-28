import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
  if (
    isNaN(Number(req.query.height)) ||
    isNaN(Number(req.query.weight)) ||
    !req.query.height ||
    !req.query.weight
  ) {
    res.json({
      error: 'malformatted parameters',
    })
  }
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight))
  console.log('bmi', bmi)

  res.json({
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: bmi,
  })
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
