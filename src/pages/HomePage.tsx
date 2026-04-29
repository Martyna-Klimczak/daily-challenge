import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import BottomNav from '../components/common/BottomNav'
import ChallengeList from '../components/home/ChallengeList'
import DailyProgressCard from '../components/home/DailyProgressCard'
import DeleteChallengeDialog from '../components/home/DeleteChallengeDialog'
import HomeHero from '../components/home/HomeHero'
import MotivationCard from '../components/home/MotivationCard'
import StreakCard from '../components/home/StreakCard'
import WeekPlanner from '../components/home/WeekPlanner'
import { mockStats } from '../data/mockStats'
import type { Challenge } from '../types/challenge'
import type { ChallengeCompletions } from '../types/home'
import { formatCompletionKey, getChallengesForDate } from '../utils/challengeSchedule'
import {
  loadChallenges,
  loadCompletions,
  saveChallenges,
  saveCompletions,
} from '../utils/challengeStorage'
import {
  addDays,
  getStartOfWeek,
  getTodayDate,
  getWeekDays,
  parseDate,
  toDateString,
} from '../utils/date'
import { calculateCurrentStreak, isDayCompleted } from '../utils/streak'

const isValidDateParam = (value: string | null): value is string =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)

export default function HomePage() {
  const [searchParams] = useSearchParams()
  const todayString = getTodayDate()
  const dateFromUrl = searchParams.get('date')
  const initialSelectedDate = isValidDateParam(dateFromUrl)
    ? dateFromUrl
    : todayString
  const initialSelectedDateObject = parseDate(initialSelectedDate)
  const todayDate = parseDate(todayString)
  const currentWeekStartDate = getStartOfWeek(todayDate)
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate)
  const [visibleWeekStartDate, setVisibleWeekStartDate] = useState(
    getStartOfWeek(initialSelectedDateObject),
  )
  const [challenges, setChallenges] = useState<Challenge[]>(() =>
    loadChallenges(),
  )
  const [completions, setCompletions] = useState<ChallengeCompletions>(() =>
    loadCompletions(),
  )
  const [challengeToDelete, setChallengeToDelete] = useState<Challenge | null>(
    null,
  )

  useEffect(() => {
    saveCompletions(completions)
  }, [completions])

  useEffect(() => {
    saveChallenges(challenges)
  }, [challenges])

  const isChallengeCompletedOnDate = (
    challengeId: string,
    dateString: string,
  ) => Boolean(completions[formatCompletionKey(challengeId, dateString)])

  const weekDays = getWeekDays(visibleWeekStartDate)
  const visibleChallenges = getChallengesForDate(challenges, selectedDate)
  const completedCount = visibleChallenges.filter((challenge) =>
    isChallengeCompletedOnDate(challenge.id, selectedDate),
  ).length
  const totalCount = visibleChallenges.length
  const remainingCount = totalCount - completedCount
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const isToday = selectedDate === todayString
  const todaysChallenges = getChallengesForDate(challenges, todayString)
  const isTodayCompleted = isDayCompleted(challenges, completions, todayString)
  const currentStreak = calculateCurrentStreak(
    challenges,
    completions,
    todayString,
  )
  const hasActiveStreak = currentStreak > 0
  const daysToNextBadge =
    hasActiveStreak ? 5 - (currentStreak % 5 || 5) : 0

  const toggleChallenge = (id: string) => {
    setCompletions((current) => {
      const completionKey = formatCompletionKey(id, selectedDate)
      const isCompleted = Boolean(current[completionKey])

      return {
        ...current,
        [completionKey]: !isCompleted,
      }
    })
  }

  const confirmDeleteChallenge = () => {
    if (!challengeToDelete) {
      return
    }

    const challengeId = challengeToDelete.id

    setChallenges((current) =>
      current.filter((challenge) => challenge.id !== challengeId),
    )

    setCompletions((current) =>
      Object.entries(current).reduce<ChallengeCompletions>(
        (result, [completionKey, isCompleted]) => {
          if (!completionKey.startsWith(`${challengeId}_`) && isCompleted) {
            result[completionKey] = isCompleted
          }

          return result
        },
        {},
      ),
    )

    setChallengeToDelete(null)
  }

  const goToPreviousWeek = () => {
    const previousWeekStart = addDays(visibleWeekStartDate, -7)
    setVisibleWeekStartDate(previousWeekStart)
    setSelectedDate(toDateString(previousWeekStart))
  }

  const goToNextWeek = () => {
    const nextWeekStart = addDays(visibleWeekStartDate, 7)
    setVisibleWeekStartDate(nextWeekStart)
    setSelectedDate(toDateString(nextWeekStart))
  }

  const goToToday = () => {
    setSelectedDate(todayString)
    setVisibleWeekStartDate(currentWeekStartDate)
  }

  const handleDatePick = (dateString: string) => {
    if (!dateString) {
      return
    }

    const pickedDate = parseDate(dateString)
    setSelectedDate(dateString)
    setVisibleWeekStartDate(getStartOfWeek(pickedDate))
  }

  const progressTitle = isToday ? 'Postęp dzisiaj' : 'Postęp dnia'

  const progressDescription =
    totalCount === 0
      ? 'Brak zaplanowanych wyzwań na ten dzień'
      : remainingCount === 0
        ? 'Wszystko wykonane. Świetna robota!'
        : `Jeszcze ${remainingCount} wyzwań i zamykasz dzień`

  const streakDescription = hasActiveStreak
    ? isTodayCompleted
      ? 'Świetna robota! Tak trzymaj!'
      : 'Dokończ dzisiejsze wyzwania, aby utrzymać passę'
    : 'Wykonaj wszystkie dzisiejsze wyzwania, aby rozpocząć nową passę'

  return (
    <main className="min-h-svh overflow-x-hidden bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col">
        <section className="mx-auto w-full max-w-[600px] flex-1 px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-5 sm:pt-6">
          <HomeHero username={mockStats.username} />

          <StreakCard
            currentStreak={currentStreak}
            daysToNextBadge={daysToNextBadge}
            hasActiveStreak={hasActiveStreak}
            isTodayCompleted={isTodayCompleted}
            streakDescription={streakDescription}
            todaysChallengesCount={todaysChallenges.length}
          />

          <DailyProgressCard
            completedCount={completedCount}
            progress={progress}
            progressDescription={progressDescription}
            progressTitle={progressTitle}
            totalCount={totalCount}
          />

          <WeekPlanner
            getTasksCountForDate={(dateString) =>
              getChallengesForDate(challenges, dateString).length
            }
            onDatePick={handleDatePick}
            onNextWeek={goToNextWeek}
            onPreviousWeek={goToPreviousWeek}
            onSelectDate={setSelectedDate}
            onToday={goToToday}
            selectedDate={selectedDate}
            todayDate={todayDate}
            visibleWeekStartDate={visibleWeekStartDate}
            weekDays={weekDays}
          />

          <ChallengeList
            addChallengeHref={`/add?date=${selectedDate}`}
            completions={completions}
            isToday={isToday}
            onRequestDelete={setChallengeToDelete}
            onToggleChallenge={toggleChallenge}
            selectedDate={selectedDate}
            visibleChallenges={visibleChallenges}
          />

          <MotivationCard />

          <Link
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-5 text-base font-semibold text-white shadow-[0_16px_34px_rgba(59,130,246,0.24)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-violet-100 active:translate-y-px"
            to={`/add?date=${selectedDate}`}
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
            Dodaj nowe wyzwanie
          </Link>
        </section>

        <BottomNav activeItem="home" />
      </div>

      <DeleteChallengeDialog
        challenge={challengeToDelete}
        onCancel={() => setChallengeToDelete(null)}
        onConfirm={confirmDeleteChallenge}
      />
    </main>
  )
}
