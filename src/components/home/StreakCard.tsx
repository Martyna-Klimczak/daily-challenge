import { Flame, RotateCcw, Target } from 'lucide-react'

type StreakCardProps = {
  currentStreak: number
  hasActiveStreak: boolean
  isTodayCompleted: boolean
  todaysChallengesCount: number
  daysToNextBadge: number
  streakDescription: string
}

export default function StreakCard({
  currentStreak,
  hasActiveStreak,
  isTodayCompleted,
  todaysChallengesCount,
  daysToNextBadge,
  streakDescription,
}: StreakCardProps) {
  return (
    <section
      aria-label={
        hasActiveStreak
          ? `Aktualna passa: ${currentStreak} dni`
          : 'Brak aktywnej passy'
      }
      className={`mt-5 overflow-hidden rounded-[30px] px-5 py-5 shadow-[0_22px_48px_rgba(15,23,42,0.14)] sm:px-6 ${
        hasActiveStreak
          ? 'bg-gradient-to-br from-orange-500 via-orange-400 to-rose-500 text-white'
          : 'bg-gradient-to-br from-slate-200 via-slate-100 to-violet-100 text-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-sm font-semibold uppercase tracking-[0.16em] ${
              hasActiveStreak ? 'text-white/80' : 'text-slate-600'
            }`}
          >
            Twoja passa
          </p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-5xl font-bold leading-none">
              {currentStreak}
            </span>
            <span
              className={`pb-1 text-base font-semibold ${
                hasActiveStreak ? 'text-white/88' : 'text-slate-700'
              }`}
            >
              dni z rzędu
            </span>
          </div>
          <p
            className={`mt-3 text-sm font-medium ${
              hasActiveStreak ? 'text-white/88' : 'text-slate-700'
            }`}
          >
            {streakDescription}
          </p>
        </div>

        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[22px] ${
            hasActiveStreak ? 'bg-white/16 backdrop-blur' : 'bg-white/70'
          }`}
        >
          {hasActiveStreak ? (
            <Flame className="h-9 w-9" strokeWidth={2.4} />
          ) : (
            <RotateCcw
              className="h-9 w-9 text-slate-700"
              strokeWidth={2.4}
            />
          )}
        </div>
      </div>

      <div
        className={`mt-5 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${
          hasActiveStreak
            ? 'bg-white/16 text-white/92 backdrop-blur'
            : 'bg-white/70 text-slate-700'
        }`}
      >
        <Target className="h-4 w-4" strokeWidth={2.3} />
        {hasActiveStreak
          ? `Jeszcze ${daysToNextBadge} ${daysToNextBadge === 1 ? 'dzień' : 'dni'} do kolejnej odznaki`
          : todaysChallengesCount > 0
            ? isTodayCompleted
              ? 'Nowy start jest zawsze możliwy'
              : 'Nowy start jest zawsze możliwy'
            : 'Dodaj wyzwania, aby rozpocząć nową passę'}
      </div>
    </section>
  )
}
