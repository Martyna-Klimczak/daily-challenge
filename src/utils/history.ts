import type { Challenge, ChallengeCategory } from '../types/challenge'
import type { ChallengeCompletions } from '../types/home'
import {
  addDays,
  formatShortDate,
  getStartOfWeek,
  monthFormatter,
  parseDate,
  toDateString,
} from './date'
import { getChallengesForDate } from './challengeSchedule'

export type ChallengeOccurrence = {
  challengeId: string
  title: string
  category: ChallengeCategory
  date: string
  completed: boolean
  meta?: string
}

export type PeriodSummary = {
  completedCount: number
  scheduledCount: number
  completionRate: number
}

export type BestWeekInMonth = {
  label: string
  completedCount: number
}

const formatPeriodRange = (startDateString: string, endDateString: string) =>
  `${formatShortDate(parseDate(startDateString))} – ${formatShortDate(parseDate(endDateString))}`

export const getWeekRange = (dateString: string) => {
  const startDate = getStartOfWeek(parseDate(dateString))
  const endDate = addDays(startDate, 6)

  return {
    startDate,
    endDate,
    startDateString: toDateString(startDate),
    endDateString: toDateString(endDate),
    label: formatPeriodRange(toDateString(startDate), toDateString(endDate)),
  }
}

export const getMonthRange = (dateString: string) => {
  const date = parseDate(dateString)
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  return {
    startDate,
    endDate,
    startDateString: toDateString(startDate),
    endDateString: toDateString(endDate),
    label: monthFormatter.format(startDate),
  }
}

export const getPeriodOccurrences = (
  challenges: Challenge[],
  completions: ChallengeCompletions,
  startDateString: string,
  endDateString: string,
) => {
  const occurrences: ChallengeOccurrence[] = []
  let cursor = parseDate(startDateString)
  const endDate = parseDate(endDateString)

  while (cursor <= endDate) {
    const currentDateString = toDateString(cursor)
    const challengesForDate = getChallengesForDate(challenges, currentDateString)

    challengesForDate.forEach((challenge) => {
      occurrences.push({
        challengeId: challenge.id,
        title: challenge.title,
        category: challenge.category,
        date: currentDateString,
        completed: Boolean(completions[`${challenge.id}_${currentDateString}`]),
        meta: challenge.meta,
      })
    })

    cursor = addDays(cursor, 1)
  }

  return occurrences
}

export const getPeriodSummary = (occurrences: ChallengeOccurrence[]): PeriodSummary => {
  const completedCount = occurrences.filter((occurrence) => occurrence.completed).length
  const scheduledCount = occurrences.length
  const completionRate =
    scheduledCount > 0 ? Math.round((completedCount / scheduledCount) * 100) : 0

  return {
    completedCount,
    scheduledCount,
    completionRate,
  }
}

export const getBestDay = (occurrences: ChallengeOccurrence[]) => {
  const completedPerDay = occurrences.reduce<Record<string, number>>((result, occurrence) => {
    if (occurrence.completed) {
      result[occurrence.date] = (result[occurrence.date] ?? 0) + 1
    }

    return result
  }, {})

  const bestDayEntry = Object.entries(completedPerDay).sort(
    (entryA, entryB) => entryB[1] - entryA[1],
  )[0]

  if (!bestDayEntry) {
    return null
  }

  return formatShortDate(parseDate(bestDayEntry[0]))
}

export const getTopCategory = (occurrences: ChallengeOccurrence[]) => {
  const categoryCounts = occurrences.reduce<Record<string, number>>((result, occurrence) => {
    result[occurrence.category] = (result[occurrence.category] ?? 0) + 1
    return result
  }, {})

  const topEntry = Object.entries(categoryCounts).sort(
    (entryA, entryB) => entryB[1] - entryA[1],
  )[0]

  return topEntry?.[0] ?? null
}

export const getBestWeekInMonth = (
  occurrences: ChallengeOccurrence[],
  selectedDate: string,
): BestWeekInMonth | null => {
  const monthRange = getMonthRange(selectedDate)
  const monthStart = parseDate(monthRange.startDateString)
  const monthEnd = parseDate(monthRange.endDateString)
  const weekMap = new Map<string, { startDate: string; endDate: string; completedCount: number }>()

  let cursor = new Date(monthStart)

  while (cursor <= monthEnd) {
    const weekStart = getStartOfWeek(cursor)
    const weekEnd = addDays(weekStart, 6)
    const weekStartString = toDateString(weekStart)

    if (!weekMap.has(weekStartString)) {
      weekMap.set(weekStartString, {
        startDate: weekStartString,
        endDate: toDateString(weekEnd),
        completedCount: 0,
      })
    }

    cursor = addDays(cursor, 1)
  }

  occurrences.forEach((occurrence) => {
    if (!occurrence.completed) {
      return
    }

    const weekStart = toDateString(getStartOfWeek(parseDate(occurrence.date)))
    const currentWeek = weekMap.get(weekStart)

    if (currentWeek) {
      currentWeek.completedCount += 1
    }
  })

  const bestWeek = Array.from(weekMap.values()).sort(
    (weekA, weekB) => weekB.completedCount - weekA.completedCount,
  )[0]

  if (!bestWeek || bestWeek.completedCount === 0) {
    return {
      label: 'Brak danych',
      completedCount: 0,
    }
  }

  return {
    label: `${formatShortDate(parseDate(bestWeek.startDate))} – ${formatShortDate(parseDate(bestWeek.endDate))}`,
    completedCount: bestWeek.completedCount,
  }
}

export const getCategoryBreakdown = (occurrences: ChallengeOccurrence[]) =>
  Object.entries(
    occurrences.reduce<Record<string, number>>((result, occurrence) => {
      result[occurrence.category] = (result[occurrence.category] ?? 0) + 1
      return result
    }, {}),
  )
    .sort((entryA, entryB) => entryB[1] - entryA[1])
    .map(([category, count]) => ({
      category: category as ChallengeCategory,
      count,
    }))

export const getPeriodInsight = (
  scheduledCount: number,
  completionRate: number,
) => {
  if (scheduledCount === 0) {
    return 'Brak zaplanowanych wyzwań w tym okresie.'
  }

  if (completionRate === 100) {
    return 'Świetnie! Wszystkie wyzwania z tego okresu zostały wykonane.'
  }

  if (completionRate >= 70) {
    return 'Bardzo dobry wynik. Utrzymujesz regularność.'
  }

  if (completionRate > 0) {
    return 'Masz już postęp. Spróbuj dokończyć pozostałe wyzwania.'
  }

  return 'W tym okresie nic jeszcze nie oznaczono jako wykonane.'
}
