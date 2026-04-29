import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  accessibilityDateFormatter,
  dayNameFormatter,
  formatWeekRange,
  isSameDate,
  monthFormatter,
  toDateString,
} from '../../utils/date'

type WeekPlannerProps = {
  selectedDate: string
  visibleWeekStartDate: Date
  todayDate: Date
  weekDays: Date[]
  onPreviousWeek: () => void
  onNextWeek: () => void
  onToday: () => void
  onDatePick: (dateString: string) => void
  onSelectDate: (dateString: string) => void
  getTasksCountForDate: (dateString: string) => number
}

export default function WeekPlanner({
  selectedDate,
  visibleWeekStartDate,
  todayDate,
  weekDays,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onDatePick,
  onSelectDate,
  getTasksCountForDate,
}: WeekPlannerProps) {
  return (
    <section className="mt-5 w-full min-w-0 rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-slate-950">Plan tygodnia</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Wybierz dzień, który chcesz podejrzeć.
          </p>
        </div>
        <span className="max-w-full whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold capitalize text-slate-600">
          {monthFormatter.format(visibleWeekStartDate)}
        </span>
      </div>

      <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 w-full items-center justify-between gap-1 rounded-[22px] bg-slate-50 px-2 py-2 ring-1 ring-slate-100 sm:flex-1 sm:gap-2 sm:px-3">
          <button
            aria-label="Poprzedni tydzień"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-violet-100"
            onClick={onPreviousWeek}
            type="button"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
          </button>
          <p className="min-w-0 flex-1 px-1 text-center text-sm font-semibold text-slate-700">
            {formatWeekRange(visibleWeekStartDate)}
          </p>
          <button
            aria-label="Następny tydzień"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-4 focus:ring-violet-100"
            onClick={onNextWeek}
            type="button"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
          </button>
        </div>

        <button
          aria-label="Przejdź do dzisiejszego dnia"
          className="h-11 w-full rounded-full bg-violet-100 px-4 text-sm font-semibold text-violet-700 transition hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-100 sm:w-auto"
          onClick={onToday}
          type="button"
        >
          Dzisiejsze wyzwania
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
            htmlFor="week-date-picker"
          >
            Data
          </label>
        </div>
        <input
          className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 sm:ml-auto sm:w-auto sm:max-w-full"
          id="week-date-picker"
          onChange={(event) => onDatePick(event.target.value)}
          type="date"
          value={selectedDate}
        />
      </div>

      <div className="mt-5 grid grid-cols-7 gap-2">
        {weekDays.map((date) => {
          const dateString = toDateString(date)
          const isSelected = dateString === selectedDate
          const isCurrentDay = isSameDate(date, todayDate)
          const tasksCountForDay = getTasksCountForDate(dateString)

          return (
            <button
              aria-label={`Wybierz ${accessibilityDateFormatter.format(date)}`}
              aria-pressed={isSelected}
              className={`flex min-w-0 flex-col items-center justify-center rounded-[20px] border px-1 py-2 text-center transition focus:outline-none focus:ring-4 focus:ring-violet-100 sm:rounded-[22px] sm:px-2 sm:py-3 ${
                isSelected
                  ? 'border-transparent bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 text-white shadow-[0_10px_20px_rgba(59,130,246,0.18)]'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-violet-200 hover:bg-white'
              }`}
              key={dateString}
              onClick={() => onSelectDate(dateString)}
              type="button"
            >
              <span
                className={`text-xs font-semibold uppercase ${
                  isSelected ? 'text-white/80' : 'text-slate-500'
                }`}
              >
                {dayNameFormatter.format(date).slice(0, 2)}
              </span>
              <span className="mt-1.5 text-lg font-bold sm:mt-2 sm:text-xl">
                {date.getDate()}
              </span>
              <div className="mt-1.5 flex min-h-[20px] flex-col items-center gap-1 sm:mt-2">
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold sm:px-2 sm:text-[11px] ${
                    isSelected
                      ? 'bg-white/18 text-white'
                      : isCurrentDay
                        ? 'bg-violet-100 text-violet-700'
                        : 'bg-transparent text-transparent'
                  }`}
                >
                  {isCurrentDay ? 'Dziś' : '--'}
                </span>
                {tasksCountForDay > 0 ? (
                  <span
                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold sm:h-6 sm:min-w-6 sm:text-[11px] ${
                      isSelected
                        ? 'bg-white/18 text-white'
                        : 'bg-cyan-100 text-cyan-700'
                    }`}
                  >
                    {tasksCountForDay}
                  </span>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
