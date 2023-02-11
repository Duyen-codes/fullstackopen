import {
  NewPatientEntry,
  Gender,
  Entry,
  Discharge,
  HealthCheckRating,
} from './types'

import { v4 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing name')
  }
  return text
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date)
  }
  return date
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn')
  }
  return ssn
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

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating)
}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating)
  }
  return rating
}

const isDischarge = (discharge: any): discharge is Discharge => {
  const { date, criteria } = discharge

  return (
    date !== undefined &&
    criteria !== undefined &&
    isString(date) &&
    isDate(date) &&
    isString(criteria)
  )
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge)
  }
  return discharge
}
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing name')
  }
  return occupation
}

type Fields = {
  name: unknown
  dateOfBirth: unknown
  ssn: unknown
  gender: unknown
  occupation: unknown
  entries: Entry[]
}

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries,
  }
  return newEntry
}

export const toNewEntry = (object: any): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  const newEntry = {
    id: uuid(),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
  }

  switch (object.type) {
    case 'Hospital':
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      }

    case 'HealthCheck':
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      }

    case 'OccupationalHealthcare':
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(object.employerName),
      }
    default:
      throw new Error(`Unrecognized type: ${object.type}`)
  }
}
