import {
  Calendar,
  Flame,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Challenge, ChallengeCategory } from '../types/challenge'
import type { ChallengeCompletions } from '../types/home'
import {
  addDays,
  dayNameFormatter,
  getStartOfWeek,
  getTodayDate,
  parseDate,
  toDateString,
} from './date'
import { formatCompletionKey, getChallengesForDate } from './challengeSchedule'
import { calculateCurrentStreak, isDayCompleted } from './streak'

export type ActivityPoint = {
  label: string
  value: number
  ariaLabel: string
}

export type AchievementDefinition = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  unlocked: boolean
  statusText: string
}

const ALL_CATEGORIES: ChallengeCategory[] = [
  'Rozwój',
  'Zdrowie',
  'Nauka',
  'Wellbeing',
  'Sport',
]

const WEEKDAY_ACCESSIBLE_LABELS = [
  'Niedziela',
  'Poniedziałek',
  'Wtorek',
  'Środa',
  'Czwartek',
  'Piątek',
  'Sobota',
]

export const getCompletedTotal = (completions: ChallengeCompletions) =>
  Object.values(completions).filter(Boolean).length

export const getRangeStartDate = (
  challenges: Challenge[],
  todayString = getTodayDate(),
) => {
  if (challenges.length === 0) {
    return todayString
  }

  return challenges.reduce(
    (earliest, challenge) =>
      challenge.startDate < earliest ? challenge.startDate : earliest,
    challenges[0].startDate,
  )
}

export const getDateRange = (startDateString: string, endDateString: string) => {
  const dates: string[] = []
  let cursor = parseDate(startDateString)
  const endDate = parseDate(endDateString)

  while (cursor <= endDate) {
    dates.push(toDateString(cursor))
    cursor = addDays(cursor, 1)
  }

  return dates
}

export const getCompletedCountForDate = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  dateString: string,
) =>
  getChallengesForDate(challenges, dateString).filter((challenge) =>
    Boolean(completions[formatCompletionKey(challenge.id, dateString)]),
  ).length

export const getScheduledCountForDate = (
  challenges: Challenge[],
  dateString: string,
) => getChallengesForDate(challenges, dateString).length

export const getCompletedThisWeek = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  todayString = getTodayDate(),
) => {
  const weekStartDate = getStartOfWeek(parseDate(todayString))

  return Array.from({ length: 7 }, (_, index) =>
    getCompletedCountForDate(
      challenges,
      completions,
      toDateString(addDays(weekStartDate, index)),
    ),
  ).reduce((sum, value) => sum + value, 0)
}

export const getLongestStreak = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  todayString = getTodayDate(),
) => {
  const rangeStartDate = getRangeStartDate(challenges, todayString)
  const dates = getDateRange(rangeStartDate, todayString)
  let current = 0
  let longest = 0

  dates.forEach((dateString) => {
    if (isDayCompleted(challenges, completions, dateString)) {
      current += 1
      longest = Math.max(longest, current)
      return
    }

    current = 0
  })

  return longest
}

export const getCompletedCategoriesCount = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
) => {
  const completedCategories = new Set<ChallengeCategory>()

  challenges.forEach((challenge) => {
    const hasCompletion = Object.entries(completions).some(
      ([key, value]) => value && key.startsWith(`${challenge.id}_`),
    )

    if (hasCompletion) {
      completedCategories.add(challenge.category)
    }
  })

  return completedCategories.size
}

export const getCompletionRateStats = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  todayString = getTodayDate(),
) => {
  const rangeStartDate = getRangeStartDate(challenges, todayString)
  const dates = getDateRange(rangeStartDate, todayString)

  const scheduledOccurrences = dates.reduce(
    (total, dateString) =>
      total + getScheduledCountForDate(challenges, dateString),
    0,
  )

  const completedOccurrences = dates.reduce(
    (total, dateString) =>
      total + getCompletedCountForDate(challenges, completions, dateString),
    0,
  )

  const completionRate =
    scheduledOccurrences > 0
      ? Math.round((completedOccurrences / scheduledOccurrences) * 100)
      : 0

  return {
    completedOccurrences,
    scheduledOccurrences,
    completionRate,
  }
}

export const buildWeeklyActivity = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  todayString = getTodayDate(),
): ActivityPoint[] => {
  const weekStartDate = getStartOfWeek(parseDate(todayString))

  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStartDate, index)
    const dateString = toDateString(date)
    const value = getCompletedCountForDate(challenges, completions, dateString)
    const dayLabel = WEEKDAY_ACCESSIBLE_LABELS[date.getDay()]

    return {
      label: dayNameFormatter.format(date).slice(0, 2),
      value,
      ariaLabel: `${dayLabel}, ${value} ukończone wyzwania`,
    }
  })
}

export const buildMonthlyActivity = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  todayString = getTodayDate(),
): ActivityPoint[] => {
  const today = parseDate(todayString)
  const currentWeekStart = getStartOfWeek(today)

  return Array.from({ length: 4 }, (_, index) => {
    const weeksBack = 3 - index
    const weekStart = addDays(currentWeekStart, -weeksBack * 7)
    const value = Array.from({ length: 7 }, (_, dayIndex) =>
      getCompletedCountForDate(
        challenges,
        completions,
        toDateString(addDays(weekStart, dayIndex)),
      ),
    ).reduce((sum, current) => sum + current, 0)

    return {
      label: `Tydz. ${index + 1}`,
      value,
      ariaLabel: `Tydzień ${index + 1}, ${value} ukończone wyzwania`,
    }
  })
}

export const getInsightMessage = ({
  completedTotal,
  currentStreak,
  completionRate,
  scheduledOccurrences,
}: {
  completedTotal: number
  currentStreak: number
  completionRate: number
  scheduledOccurrences: number
}) => {
  if (completedTotal === 0) {
    return 'Zacznij od pierwszego wyzwania. Każdy postęp zaczyna się od małego kroku.'
  }

  if (currentStreak > 0) {
    return `Dobra robota! Utrzymujesz passę przez ${currentStreak} dni.`
  }

  if (completionRate >= 80) {
    return 'Świetna konsekwencja. Realizujesz większość zaplanowanych wyzwań.'
  }

  if (completionRate < 50 && scheduledOccurrences > 0) {
    return 'Spróbuj zaplanować mniej wyzwań na dzień, aby łatwiej utrzymać regularność.'
  }

  return 'Dodaj pierwsze wyzwanie, aby zacząć śledzić postępy.'
}

export const getProgressAchievements = ({
  completedTotal,
  completedThisWeek,
  completedCategoriesCount,
  currentStreak,
  longestStreak,
}: {
  completedTotal: number
  completedThisWeek: number
  completedCategoriesCount: number
  currentStreak: number
  longestStreak: number
}): AchievementDefinition[] => [
  {
    id: 'first-step',
    title: 'Pierwszy krok',
    description: 'Ukończ pierwsze wyzwanie',
    icon: Target,
    unlocked: completedTotal >= 1,
    statusText: completedTotal >= 1 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
  {
    id: 'active-week',
    title: 'Aktywny tydzień',
    description: 'Ukończ 10 wyzwań w jednym tygodniu',
    icon: TrendingUp,
    unlocked: completedThisWeek >= 10,
    statusText: completedThisWeek >= 10 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
  {
    id: 'diverse-growth',
    title: 'Różnorodny rozwój',
    description: 'Ukończ wyzwania z 3 różnych kategorii',
    icon: Sparkles,
    unlocked: completedCategoriesCount >= 3,
    statusText:
      completedCategoriesCount >= 3 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
  {
    id: 'back-to-rhythm',
    title: 'Powrót do rytmu',
    description: 'Utrzymaj passę przez 3 dni',
    icon: Flame,
    unlocked: currentStreak >= 3,
    statusText: currentStreak >= 3 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
  {
    id: 'streak-7',
    title: 'Pierwsza passa 7 dni',
    description: 'Utrzymaj passę przez tydzień',
    icon: Sparkles,
    unlocked: longestStreak >= 7,
    statusText: longestStreak >= 7 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
  {
    id: 'completed-50',
    title: '50 wyzwań ukończonych',
    description: 'Ukończ 50 wyzwań',
    icon: Star,
    unlocked: completedTotal >= 50,
    statusText: completedTotal >= 50 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
  {
    id: 'completed-100',
    title: '100 wyzwań',
    description: 'Ukończ 100 wyzwań',
    icon: Trophy,
    unlocked: completedTotal >= 100,
    statusText: completedTotal >= 100 ? 'Zdobyte!' : 'Jeszcze niezdobyte',
  },
]

export const getProgressStats = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  todayString = getTodayDate(),
) => {
  const completedTotal = getCompletedTotal(completions)
  const completedThisWeek = getCompletedThisWeek(
    challenges,
    completions,
    todayString,
  )
  const currentStreak = calculateCurrentStreak(
    challenges,
    completions,
    todayString,
  )
  const longestStreak = getLongestStreak(challenges, completions, todayString)
  const completedCategoriesCount = getCompletedCategoriesCount(
    challenges,
    completions,
  )
  const { completedOccurrences, scheduledOccurrences, completionRate } =
    getCompletionRateStats(challenges, completions, todayString)

  return {
    completedTotal,
    completedThisWeek,
    currentStreak,
    longestStreak,
    completedCategoriesCount,
    totalCategories: ALL_CATEGORIES.length,
    completedOccurrences,
    scheduledOccurrences,
    completionRate,
  }
}

export const progressIcons = {
  longestStreak: Calendar,
  categories: Trophy,
  completionRate: Target,
}
