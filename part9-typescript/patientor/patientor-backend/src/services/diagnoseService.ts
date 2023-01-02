import diagnoseData from '../../data/diagnoses.json'

import { DiagnoseEntry } from '../types'

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses
}

export default { getEntries }
