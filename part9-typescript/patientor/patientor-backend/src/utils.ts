import { NewPatientEntry, Gender } from './types'

const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: object.dateOfBirth,
    ssn: object.ssn,
    gender: parseGender(object.gender),
    occupation: object.occupation,
  }
  return newEntry
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name')
  }
  return name
}

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  }
  return gender
}

export default toNewPatientEntry
