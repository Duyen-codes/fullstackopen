import patients from '../../data/patients'

import {
  NewPatientEntry,
  Patient,
  NonSensitivePatientEntry,
  Entry,
} from '../types'
import { v1 as uuid } from 'uuid'

const getEntries = (): Patient[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }),
  )
}

const addPatient = (entry: NewPatientEntry): Patient => {
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
  return entry
}

const addEntryToPatient = (entry: Entry, patient: Patient) => {
  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(entry),
  }

  return updatedPatient
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntryToPatient,
}
