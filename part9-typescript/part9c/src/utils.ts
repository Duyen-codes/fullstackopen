import { NewDiaryEntry, Weather, Visibility } from './types'

type Fields = {
  comment: unknown
  date: unknown
  weather: unknown
  visibility: unknown
}

// string validation func, is a type guard. it's a func that returns a boolean and has a type predicate as the return type. type predicate in our case is 'text is string'(paramName is Type)
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

// validate comment field, check that it exists and ensure that it is of the type string
const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new EvalError('Incorrect or missing comment')
  }
  return comment
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

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param)
}

const parseWeather = (weather: unknown): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error('Incorrect or missing weather: ' + weather)
  }
  return weather
}

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param)
}

const parseVisibility = (visibility: unknown): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error('Incorrect or missing visibility: ' + visibility)
  }
  return visibility
}

const toNewDiaryEntry = ({
  comment,
  date,
  weather,
  visibility,
}: Fields): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(date),
    weather: parseWeather(weather),
    visibility: parseVisibility(visibility),
    comment: parseComment(comment),
  }

  return newEntry
}

export default toNewDiaryEntry
