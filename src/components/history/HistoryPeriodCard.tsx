import { CalendarDays, CalendarRange, Trophy } from 'lucide-react'
import type { ChallengeCategory } from '../../types/challenge'
import type { BestWeekInMonth, ChallengeOccurrence } from '../../utils/history'
import HistoryCategoryBreakdown from './HistoryCategoryBreakdown'
import HistoryChallengeList from './HistoryChallengeList'
import HistoryEmptyState from './HistoryEmptyState'
import HistoryStatsRow from './HistoryStatsRow'
import HistorySummaryCard from './HistorySummaryCard'

type HistoryPeriodCardProps = {
  title: string
  subtitle: string
  completionRate: number
  completedCount: number
  scheduledCount: number
  insight: string
  bestDay: string | null
  bestWeekInMonth?: BestWeekInMonth | null
  topCategory: string | null
  categoryBreakdown: Array<{ category: ChallengeCategory; count: number }>
  occurrences: ChallengeOccurrence[]
  addHref: string
  mode: 'week' | 'month'
}

export default function HistoryPeriodCard({
  title,
  subtitle,
  completionRate,
  completedCount,
  scheduledCount,
  insight,
  bestDay,
  bestWeekInMonth,
  topCategory,
  categoryBreakdown,
  occurrences,
  addHref,
  mode,
}: HistoryPeriodCardProps) {
  return (
    <article className="rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
          {completionRate}%
        </span>
      </div>

      <HistorySummaryCard
        completedCount={completedCount}
        completionRate={completionRate}
        scheduledCount={scheduledCount}
      />

      <p className="mt-4 text-sm font-medium text-slate-600">{insight}</p>

      <div
        className={`mt-4 grid grid-cols-1 gap-3 ${
          mode === 'month' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'
        }`}
      >
        <HistoryStatsRow
          Icon={CalendarDays}
          backgroundClassName="bg-violet-50/80"
          description="Dzień z największą liczbą wykonanych wyzwań."
          iconClassName="bg-violet-100 text-violet-600"
          title="Najlepszy dzień"
          value={bestDay ?? 'Brak danych'}
        />
        {mode === 'month' ? (
          <HistoryStatsRow
            Icon={CalendarRange}
            backgroundClassName="bg-sky-50/80"
            description="Tydzień z największą liczbą wykonanych wyzwań."
            iconClassName="bg-sky-100 text-sky-600"
            title="Najlepszy tydzień"
            value={bestWeekInMonth?.label ?? 'Brak danych'}
          />
        ) : null}
        <HistoryStatsRow
          Icon={Trophy}
          backgroundClassName="bg-emerald-50/80"
          description="Kategoria z największą aktywnością w tym okresie."
          iconClassName="bg-emerald-100 text-emerald-600"
          title="Najaktywniejsza kategoria"
          value={topCategory ?? 'Brak danych'}
        />
      </div>

      {categoryBreakdown.length > 0 ? (
        <HistoryCategoryBreakdown categories={categoryBreakdown} />
      ) : null}

      {scheduledCount === 0 ? (
        <div className="mt-4">
          <HistoryEmptyState addHref={addHref} />
        </div>
      ) : (
        <HistoryChallengeList occurrences={occurrences} />
      )}
    </article>
  )
}
