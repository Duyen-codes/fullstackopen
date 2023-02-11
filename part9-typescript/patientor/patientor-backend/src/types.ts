export interface DiagnoseEntry {
  code: string
  name: string
  latin?: string
}

// export interface PatientEntry {
//   id: string
//   name: string
//   dateOfBirth: string
//   ssn: string
//   gender: Gender
//   occupation: string
// }

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>

export type NewPatientEntry = Omit<Patient, 'id'>

export type Entry =
  | HospitalEntry
  | HealthCheckEntry
  | OccupationalHealthcareEntry

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never

export type NewEntry = UnionOmit<Entry, 'id'>
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

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<DiagnoseEntry['code']>
}

export interface SickLeave {
  startDate: string
  endDate: string
}

export interface Discharge {
  date: string
  criteria: string
}

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeave
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}
