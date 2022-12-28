import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

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
    return res.status(400).send({
      error: 'malformatted parameters',
    })
  }
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight))
  console.log('bmi', bmi)

  return res.json({
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: bmi,
  })
})

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body
  if (!req.body.daily_exercises || !req.body.target) {
    return res.send({ error: 'parameters missing' })
  }
  console.log(req.body)

  const result: object = calculateExercises(daily_exercises, target)
  return res.json(result)
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
