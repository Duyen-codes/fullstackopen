import patientData from '../../data/patients'

import {
  NewPatientEntry,
  PatientEntry,
  NonSensitivePatientEntry,
  Patient,
} from '../types'
import { v1 as uuid } from 'uuid'

const patients: Array<PatientEntry> = patientData

const getEntries = (): PatientEntry[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id)
  if (!entry) {
    return undefined
  }
  return { ...entry, entries: [] }
}

export default { getEntries, getNonSensitiveEntries, addPatient, findById }
