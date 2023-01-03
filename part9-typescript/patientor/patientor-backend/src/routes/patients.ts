import express from 'express'
import patientService from '../services/patientService'
import toNewPatientEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
})

router.post('/', (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body)
  const addedEntry = patientService.addPatient(newPatientEntry)
  res.json(addedEntry)
})

export default router
