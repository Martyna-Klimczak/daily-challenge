import { Check, Clock3 } from 'lucide-react'
import type { ChallengeOccurrence } from '../../utils/history'
import { categoryStyles } from '../home/challengeStyles'
import { formatShortDate, parseDate } from '../../utils/date'

type HistoryChallengeListProps = {
  occurrences: ChallengeOccurrence[]
}

export default function HistoryChallengeList({
  occurrences,
}: HistoryChallengeListProps) {
  return (
    <ul className="mt-4 space-y-3">
      {occurrences.map((occurrence) => {
        const categoryStyle =
          categoryStyles[occurrence.category] ?? categoryStyles.Wellbeing

        return (
          <li key={`${occurrence.challengeId}-${occurrence.date}`}>
            <div
              className={`rounded-[22px] border px-4 py-4 shadow-[0_10px_24px_rgba(15,23,42,0.04)] ${
                occurrence.completed
                  ? 'border-emerald-200 bg-emerald-50/80'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-950">{occurrence.title}</p>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${categoryStyle.badge}`}>
                      {occurrence.category}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-500">
                    {formatShortDate(parseDate(occurrence.date))}
                    {occurrence.meta ? ` • ${occurrence.meta}` : ''}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${
                    occurrence.completed
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {occurrence.completed ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                  ) : (
                    <Clock3 className="h-3.5 w-3.5" strokeWidth={2.6} />
                  )}
                  {occurrence.completed ? 'Wykonane' : 'Niewykonane'}
                </span>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
