import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import type { ActivityPoint } from '../../utils/progressStats'

type ActivityChartProps = {
  weeklyData: ActivityPoint[]
  monthlyData: ActivityPoint[]
}

type ActivityView = 'week' | 'month'

export default function ActivityChart({
  weeklyData,
  monthlyData,
}: ActivityChartProps) {
  const [view, setView] = useState<ActivityView>('week')
  const isMonthView = view === 'month'
  const data = isMonthView ? monthlyData : weeklyData
  const total = data.reduce((sum, point) => sum + point.value, 0)
  const maxValue = Math.max(...data.map((point) => point.value), 0)

  return (
    <section className="mt-5 rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 text-violet-600">
            <TrendingUp className="h-6 w-6" strokeWidth={2.3} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-950">Aktywność</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {isMonthView
                ? `W tym miesiącu ukończono ${total} wyzwań.`
                : `W tym tygodniu ukończono ${total} wyzwań.`}
            </p>
          </div>
        </div>

        <div className="inline-flex rounded-full bg-slate-100 p-1">
          {(['week', 'month'] as const).map((value) => {
            const isActive = value === view

            return (
              <button
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-violet-100 ${
                  isActive
                    ? 'bg-white text-violet-700 shadow-[0_6px_16px_rgba(59,130,246,0.12)]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                key={value}
                onClick={() => setView(value)}
                type="button"
              >
                {value === 'week' ? 'Tydzień' : 'Miesiąc'}
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={`mt-6 min-h-[230px] items-end ${
          isMonthView
            ? 'grid grid-cols-4 gap-4'
            : 'grid grid-cols-7 gap-3 sm:gap-4'
        }`}
      >
        {data.map((point) => {
          const height =
            point.value > 0
              ? Math.max(16, Math.round((point.value / (maxValue || 1)) * 148))
              : isMonthView
                ? 12
                : 8

          return (
            <div className="flex flex-col items-center justify-end" key={point.label}>
              <span className="mb-2 text-center text-xs font-semibold text-slate-500">
                {point.value}
              </span>
              <div className="flex h-[160px] items-end justify-center">
                <div
                  aria-label={point.ariaLabel}
                  className={`rounded-t-[18px] bg-gradient-to-t from-violet-600 via-blue-500 to-cyan-400 shadow-[0_8px_18px_rgba(59,130,246,0.22)] ${
                    isMonthView ? 'w-16 sm:w-24' : 'w-8 sm:w-10'
                  }`}
                  style={{ height }}
                />
              </div>
              <span
                className={`mt-3 text-center font-semibold text-slate-500 ${
                  isMonthView
                    ? 'whitespace-nowrap text-xs sm:text-sm'
                    : 'text-xs sm:text-sm'
                }`}
              >
                {point.label}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
