export interface DiagnoseEntry {
  code: string
  name: string
  latin?: string
}

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>

export type NewPatientEntry = Omit<PatientEntry, 'id'>

export interface Entry {}

export interface Patient {
  id: string
  name: string
  ssn: string
  occupation: string
  gender: Gender
  dateOfBirth: string
  entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>