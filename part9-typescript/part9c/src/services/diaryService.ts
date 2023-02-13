import diaries from '../../data/diaries'
import { NewDiaryEntry, DiaryEntry, NonSensitiveDiaryEntry } from '../types'

// func for fetching diary entries
const getEntries = (): DiaryEntry[] => {
  return diaries
}

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }))
}

// func for saving diary entries
const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  }
  diaries.push(newDiaryEntry)
  return newDiaryEntry
}

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((d) => d.id === id)
  return entry
}

export default { getEntries, addDiary, getNonSensitiveEntries, findById }
