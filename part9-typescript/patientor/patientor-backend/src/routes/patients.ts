import express from 'express'
import patientService from '../services/patientService'
import { toNewPatientEntry, toNewEntry } from '../utils'

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

  if (patient) {
    res.send(patient)
  } else {
    res.sendStatus(404)
  }
})

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id)

  if (!patient) {
    return
  }
  try {
    const newEntryToAdd = toNewEntry(req.body)
    const updatedPatient = patientService.addEntryToPatient(
      newEntryToAdd,
      patient,
    )

    console.log('updatedPatient', updatedPatient)

    res.json(updatedPatient)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router
