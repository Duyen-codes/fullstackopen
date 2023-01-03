import patientData from '../../data/patients'

import { PatientEntry, NonSensitivePatientEntry } from '../types'

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

export default { getEntries, getNonSensitiveEntries }
