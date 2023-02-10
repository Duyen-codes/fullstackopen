import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedEntry = patientService.addPatient(newPatientEntry)
    res.json(addedEntry)
  } catch (error) {
    let errorMessage = 'something went wrong'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id)
  console.log('patient', patient)
  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

export default router
