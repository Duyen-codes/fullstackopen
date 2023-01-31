import toNewDiaryEntry from '../utils'
import express from 'express'
import diaryService from '../services/diaryService'

const router = express.Router()

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id))
  if (diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries())
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedEntry = diaryService.addDiary(newDiaryEntry)
    res.json(addedEntry)
  } catch (error) {
    let errorMessage = 'Something went wrong'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
