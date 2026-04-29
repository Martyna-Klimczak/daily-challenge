import type { Challenge } from '../types/challenge'
import { parseDate } from './date'

export const formatCompletionKey = (challengeId: string, dateString: string) =>
  `${challengeId}_${dateString}`

export const isScheduledForDate = (
  challenge: Challenge,
  selectedDate: string,
) => {
  if (selectedDate < challenge.startDate) {
    return false
  }

  const startDate = parseDate(challenge.startDate)
  const currentDate = parseDate(selectedDate)

  switch (challenge.frequency) {
    case 'Jednorazowo':
      return challenge.startDate === selectedDate
    case 'Codziennie':
      return true
    case 'Co tydzień':
      return startDate.getDay() === currentDate.getDay()
    case 'W dni robocze':
      return currentDate.getDay() >= 1 && currentDate.getDay() <= 5
    case 'W weekendy':
      return currentDate.getDay() === 0 || currentDate.getDay() === 6
    default:
      return false
  }
}

export const getChallengesForDate = (
  challenges: Challenge[],
  dateString: string,
) => challenges.filter((challenge) => isScheduledForDate(challenge, dateString))
