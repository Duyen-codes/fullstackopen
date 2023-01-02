import express from 'express'
const app = express()
import diagnoseRouter from './routes/diagnoses'
app.use(express.json())

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

app.use('/api/diagnoses', diagnoseRouter)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
