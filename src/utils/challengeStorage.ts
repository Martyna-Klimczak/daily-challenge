import { mockChallenges } from '../data/mockChallenges'
import {
  CHALLENGES_STORAGE_KEY,
  COMPLETED_CHALLENGES_STORAGE_KEY,
  type Challenge,
} from '../types/challenge'
import type { ChallengeCompletions } from '../types/home'
import { formatCompletionKey } from './challengeSchedule'

export { CHALLENGES_STORAGE_KEY, COMPLETED_CHALLENGES_STORAGE_KEY }

export const loadChallenges = () => {
  if (typeof window === 'undefined') {
    return mockChallenges
  }

  try {
    const storedChallenges = window.localStorage.getItem(CHALLENGES_STORAGE_KEY)

    if (storedChallenges !== null) {
      return JSON.parse(storedChallenges) as Challenge[]
    }

    window.localStorage.setItem(
      CHALLENGES_STORAGE_KEY,
      JSON.stringify(mockChallenges),
    )

    return mockChallenges
  } catch {
    window.localStorage.setItem(
      CHALLENGES_STORAGE_KEY,
      JSON.stringify(mockChallenges),
    )

    return mockChallenges
  }
}

export const buildInitialCompletions = () =>
  mockChallenges.reduce<ChallengeCompletions>((result, challenge) => {
    challenge.completedDates?.forEach((date) => {
      result[formatCompletionKey(challenge.id, date)] = true
    })

    return result
  }, {})

export const loadCompletions = () => {
  const initialCompletions = buildInitialCompletions()

  if (typeof window === 'undefined') {
    return initialCompletions
  }

  try {
    const storedCompletions = window.localStorage.getItem(
      COMPLETED_CHALLENGES_STORAGE_KEY,
    )

    if (!storedCompletions) {
      return initialCompletions
    }

    const parsed = JSON.parse(storedCompletions) as
      | ChallengeCompletions
      | Record<string, string[]>

    const normalizedCompletions = Object.entries(parsed).reduce<ChallengeCompletions>(
      (result, [key, value]) => {
        if (typeof value === 'boolean') {
          result[key] = value
          return result
        }

        if (Array.isArray(value)) {
          value.forEach((challengeId) => {
            result[formatCompletionKey(challengeId, key)] = true
          })
        }

        return result
      },
      {},
    )

    return {
      ...initialCompletions,
      ...normalizedCompletions,
    }
  } catch {
    return initialCompletions
  }
}

export const saveChallenges = (challenges: Challenge[]) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    CHALLENGES_STORAGE_KEY,
    JSON.stringify(challenges),
  )
}

export const saveCompletions = (completions: ChallengeCompletions) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    COMPLETED_CHALLENGES_STORAGE_KEY,
    JSON.stringify(completions),
  )
}
