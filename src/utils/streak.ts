import type { Challenge } from '../types/challenge'
import type { ChallengeCompletions } from '../types/home'
import { addDays, parseDate, toDateString } from './date'
import { formatCompletionKey, getChallengesForDate } from './challengeSchedule'

const isChallengeCompletedOnDate = (
  completions: ChallengeCompletions,
  challengeId: string,
  dateString: string,
) => Boolean(completions[formatCompletionKey(challengeId, dateString)])

export const isDayCompleted = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  dateString: string,
) => {
  const challengesForDate = getChallengesForDate(challenges, dateString)

  if (challengesForDate.length === 0) {
    return false
  }

  return challengesForDate.every((challenge) =>
    isChallengeCompletedOnDate(completions, challenge.id, dateString),
  )
}

export const calculateCurrentStreak = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  dateString: string,
) => {
  const currentDate = parseDate(dateString)
  const todayCompleted = isDayCompleted(challenges, completions, dateString)
  const streakAnchor = todayCompleted ? currentDate : addDays(currentDate, -1)

  if (!isDayCompleted(challenges, completions, toDateString(streakAnchor))) {
    return 0
  }

  let streak = 0
  let cursor = streakAnchor

  while (isDayCompleted(challenges, completions, toDateString(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }

  return streak
}
