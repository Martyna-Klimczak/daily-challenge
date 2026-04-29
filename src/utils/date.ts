import type { ChallengeFrequency } from '../types/challenge'

const shortMonthFormatter = new Intl.DateTimeFormat('pl-PL', {
  month: 'short',
})

export const dayNameFormatter = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'short',
})

export const monthFormatter = new Intl.DateTimeFormat('pl-PL', {
  month: 'long',
  year: 'numeric',
})

export const dateLabelFormatter = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
})

export const accessibilityDateFormatter = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const getTodayDate = () => {
  const today = new Date()

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
}

export const parseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number)

  return new Date(year, month - 1, day)
}

export const toDateString = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')

export const addDays = (date: Date, amount: number) => {
  const nextDate = new Date(date)
  nextDate.setDate(nextDate.getDate() + amount)

  return nextDate
}

export const getStartOfWeek = (date: Date) => {
  const day = date.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day

  return addDays(date, mondayOffset)
}

export const getWeekDays = (weekStartDate: Date) =>
  Array.from({ length: 7 }, (_, index) => addDays(weekStartDate, index))

export const isSameDate = (dateA: Date, dateB: Date) =>
  toDateString(dateA) === toDateString(dateB)

export const formatShortDate = (date: Date) => {
  const month = shortMonthFormatter.format(date).replace('.', '')

  return `${date.getDate()} ${month}`
}

export const formatWeekRange = (weekStartDate: Date) => {
  const weekEndDate = addDays(weekStartDate, 6)

  return `${formatShortDate(weekStartDate)} – ${formatShortDate(weekEndDate)}`
}

export const isWeekendDate = (dateString: string) => {
  const day = parseDate(dateString).getDay()

  return day === 0 || day === 6
}

export const getAvailableFrequencies = (
  dateString: string,
): ChallengeFrequency[] =>
  isWeekendDate(dateString)
    ? ['Jednorazowo', 'Codziennie', 'Co tydzień', 'W weekendy']
    : ['Jednorazowo', 'Codziennie', 'Co tydzień', 'W dni robocze']
