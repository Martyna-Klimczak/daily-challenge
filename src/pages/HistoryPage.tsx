import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import BottomNav from '../components/common/BottomNav'
import HistoryHeader from '../components/history/HistoryHeader'
import HistoryIntroCard from '../components/history/HistoryIntroCard'
import HistoryPeriodCard from '../components/history/HistoryPeriodCard'
import HistoryRangeTabs from '../components/history/HistoryRangeTabs'
import { loadChallenges, loadCompletions } from '../utils/challengeStorage'
import {
  addDays,
  getTodayDate,
  monthFormatter,
  parseDate,
  toDateString,
} from '../utils/date'
import {
  getBestDay,
  getBestWeekInMonth,
  getCategoryBreakdown,
  getMonthRange,
  getPeriodInsight,
  getPeriodOccurrences,
  getPeriodSummary,
  getTopCategory,
  getWeekRange,
} from '../utils/history'

type HistoryMode = 'week' | 'month'

const monthInputValue = (dateString: string) => {
  const [year, month] = dateString.split('-')
  return `${year}-${month}`
}

export default function HistoryPage() {
  const todayString = getTodayDate()
  const [mode, setMode] = useState<HistoryMode>('week')
  const [selectedDate, setSelectedDate] = useState(todayString)
  const challenges = loadChallenges()
  const completions = loadCompletions()

  const weekRange = useMemo(() => getWeekRange(selectedDate), [selectedDate])
  const monthRange = useMemo(() => getMonthRange(selectedDate), [selectedDate])

  const currentRange = mode === 'week' ? weekRange : monthRange

  const occurrences = useMemo(
    () =>
      getPeriodOccurrences(
        challenges,
        completions,
        currentRange.startDateString,
        currentRange.endDateString,
      ),
    [
      challenges,
      completions,
      currentRange.startDateString,
      currentRange.endDateString,
    ],
  )

  const summary = useMemo(() => getPeriodSummary(occurrences), [occurrences])
  const bestDay = useMemo(() => getBestDay(occurrences), [occurrences])
  const bestWeekInMonth = useMemo(
    () => (mode === 'month' ? getBestWeekInMonth(occurrences, selectedDate) : null),
    [mode, occurrences, selectedDate],
  )
  const topCategory = useMemo(() => getTopCategory(occurrences), [occurrences])
  const categoryBreakdown = useMemo(
    () => getCategoryBreakdown(occurrences),
    [occurrences],
  )
  const insight = getPeriodInsight(summary.scheduledCount, summary.completionRate)

  const goToPrevious = () => {
    setSelectedDate((currentDate) =>
      toDateString(
        mode === 'week'
          ? addDays(parseDate(currentDate), -7)
          : new Date(
              parseDate(currentDate).getFullYear(),
              parseDate(currentDate).getMonth() - 1,
              parseDate(currentDate).getDate(),
            ),
      ),
    )
  }

  const goToNext = () => {
    setSelectedDate((currentDate) =>
      toDateString(
        mode === 'week'
          ? addDays(parseDate(currentDate), 7)
          : new Date(
              parseDate(currentDate).getFullYear(),
              parseDate(currentDate).getMonth() + 1,
              parseDate(currentDate).getDate(),
            ),
      ),
    )
  }

  const goToCurrentPeriod = () => {
    setSelectedDate(todayString)
  }

  const handleDatePick = (value: string) => {
    if (!value) {
      return
    }

    if (mode === 'month') {
      setSelectedDate(`${value}-01`)
      return
    }

    setSelectedDate(value)
  }

  const periodTitle =
    mode === 'week' ? 'Podsumowanie tygodnia' : 'Podsumowanie miesiąca'
  const periodSubtitle =
    mode === 'week'
      ? currentRange.label
      : monthFormatter.format(parseDate(currentRange.startDateString))
  const addHref = `/add?date=${currentRange.startDateString}`

  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col">
        <section className="mx-auto w-full max-w-[600px] flex-1 px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-7">
          <HistoryHeader title="Historia wyzwań" />
          <HistoryIntroCard />
          <HistoryRangeTabs
            onChange={(value) => setMode(value === 'weeks' ? 'week' : 'month')}
            value={mode === 'week' ? 'weeks' : 'months'}
          />

          <section className="mt-5 rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-slate-950">
                  {mode === 'week' ? 'Wybierz tydzień' : 'Wybierz miesiąc'}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {mode === 'week'
                    ? 'Sprawdź historię tygodnia, w którym znajduje się wybrana data.'
                    : 'Sprawdź historię wybranego miesiąca.'}
                </p>
              </div>
              <span className="max-w-full whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold capitalize text-slate-600">
                {mode === 'week'
                  ? currentRange.label
                  : monthFormatter.format(parseDate(currentRange.startDateString))}
              </span>
            </div>

            <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex min-w-0 w-full items-center justify-between gap-1 rounded-[22px] bg-slate-50 px-2 py-2 ring-1 ring-slate-100 sm:flex-1 sm:gap-2 sm:px-3">
                <button
                  aria-label={mode === 'week' ? 'Poprzedni tydzień' : 'Poprzedni miesiąc'}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-violet-100"
                  onClick={goToPrevious}
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
                </button>
                <p className="min-w-0 flex-1 px-1 text-center text-sm font-semibold text-slate-700">
                  {periodSubtitle}
                </p>
                <button
                  aria-label={mode === 'week' ? 'Następny tydzień' : 'Następny miesiąc'}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-violet-100"
                  onClick={goToNext}
                  type="button"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
                </button>
              </div>

              <button
                aria-label={mode === 'week' ? 'Przejdź do bieżącego tygodnia' : 'Przejdź do bieżącego miesiąca'}
                className="h-11 w-full rounded-full bg-violet-100 px-4 text-sm font-semibold text-violet-700 transition hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:w-auto"
                onClick={goToCurrentPeriod}
                type="button"
              >
                {mode === 'week' ? 'Dziś' : 'Bieżący miesiąc'}
              </button>
            </div>

            <div className="mt-3 flex min-w-0 flex-col gap-3 rounded-[20px] bg-slate-50 px-4 py-3 ring-1 ring-slate-100 sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-center gap-3">
                <Calendar
                  className="h-5 w-5 shrink-0 text-violet-600"
                  strokeWidth={2.2}
                />
                <label
                  className="text-sm font-medium text-slate-600"
                  htmlFor="history-period-picker"
                >
                  {mode === 'week' ? 'Data' : 'Miesiąc'}
                </label>
              </div>
              <input
                className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 sm:ml-auto sm:w-auto sm:max-w-full"
                id="history-period-picker"
                onChange={(event) => handleDatePick(event.target.value)}
                type={mode === 'week' ? 'date' : 'month'}
                value={mode === 'week' ? selectedDate : monthInputValue(selectedDate)}
              />
            </div>
          </section>

          <div className="mt-5">
            <HistoryPeriodCard
              addHref={addHref}
              bestDay={bestDay}
              bestWeekInMonth={bestWeekInMonth}
              categoryBreakdown={categoryBreakdown}
              completedCount={summary.completedCount}
              completionRate={summary.completionRate}
              insight={insight}
              mode={mode}
              occurrences={occurrences}
              scheduledCount={summary.scheduledCount}
              subtitle={periodSubtitle}
              title={periodTitle}
              topCategory={topCategory}
            />
          </div>
        </section>

        <BottomNav activeItem="progress" />
      </div>
    </main>
  )
}
