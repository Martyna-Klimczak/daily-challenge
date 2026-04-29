import { Flame, RotateCcw, Trophy } from 'lucide-react'

type ProgressSummaryCardsProps = {
  currentStreak: number
  completedTotal: number
}

export default function ProgressSummaryCards({
  currentStreak,
  completedTotal,
}: ProgressSummaryCardsProps) {
  const hasStreak = currentStreak > 0

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <article
        className={`overflow-hidden rounded-[28px] p-5 shadow-[0_20px_44px_rgba(15,23,42,0.12)] ${
          hasStreak
            ? 'bg-gradient-to-br from-orange-500 via-orange-400 to-rose-500 text-white'
            : 'bg-gradient-to-br from-slate-200 via-slate-100 to-violet-100 text-slate-900'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`text-sm font-semibold uppercase tracking-[0.16em] ${
                hasStreak ? 'text-white/80' : 'text-slate-600'
              }`}
            >
              {hasStreak ? 'Aktualna passa' : 'Brak aktywnej passy'}
            </p>
            <p className="mt-3 text-4xl font-bold leading-none">{currentStreak} dni</p>
            <p
              className={`mt-3 text-sm font-medium ${
                hasStreak ? 'text-white/88' : 'text-slate-700'
              }`}
            >
              {hasStreak
                ? 'Każdy kolejny dzień wzmacnia Twoją regularność.'
                : 'Wykonaj wszystkie dzisiejsze wyzwania, aby rozpocząć passę'}
            </p>
          </div>
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] ${
              hasStreak ? 'bg-white/16 backdrop-blur' : 'bg-white/70'
            }`}
          >
            {hasStreak ? (
              <Flame className="h-8 w-8" strokeWidth={2.4} />
            ) : (
              <RotateCcw className="h-8 w-8 text-slate-700" strokeWidth={2.4} />
            )}
          </div>
        </div>
      </article>

      <article className="overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white shadow-[0_20px_44px_rgba(16,185,129,0.16)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
              Ukończone
            </p>
            <p className="mt-3 text-4xl font-bold leading-none">{completedTotal}</p>
            <p className="mt-3 text-sm font-medium text-white/88">
              Wszystkie wykonane wystąpienia wyzwań zapisane w aplikacji.
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-white/16 backdrop-blur">
            <Trophy className="h-8 w-8" strokeWidth={2.4} />
          </div>
        </div>
      </article>
    </section>
  )
}
