import { Calendar, CalendarClock, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Challenge } from '../../types/challenge'
import type { ChallengeCompletions } from '../../types/home'
import { dateLabelFormatter, parseDate } from '../../utils/date'
import { formatCompletionKey } from '../../utils/challengeSchedule'
import ChallengeItem from './ChallengeItem'

type ChallengeListProps = {
  selectedDate: string
  isToday: boolean
  visibleChallenges: Challenge[]
  completions: ChallengeCompletions
  addChallengeHref: string
  onToggleChallenge: (id: string) => void
  onRequestDelete: (challenge: Challenge) => void
}

export default function ChallengeList({
  selectedDate,
  isToday,
  visibleChallenges,
  completions,
  addChallengeHref,
  onToggleChallenge,
  onRequestDelete,
}: ChallengeListProps) {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            {isToday
              ? 'Wyzwania na dziś'
              : `Wyzwania na ${dateLabelFormatter.format(parseDate(selectedDate))}`}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Zadania zaplanowane na wybrany dzień.
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-violet-600 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
          <CalendarClock className="h-5 w-5" strokeWidth={2.3} />
        </div>
      </div>

      {visibleChallenges.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-slate-200 bg-white/90 p-6 text-center shadow-[0_16px_34px_rgba(15,23,42,0.05)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Calendar className="h-7 w-7" strokeWidth={2.2} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-950">
            Brak wyzwań na ten dzień
          </h3>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-500">
            Dodaj nowe wyzwanie albo wybierz inny dzień w kalendarzu.
          </p>
          <Link
            className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(59,130,246,0.22)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-violet-100"
            to={addChallengeHref}
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            Dodaj wyzwanie
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {visibleChallenges.map((challenge) => {
            const isCompleted = Boolean(
              completions[formatCompletionKey(challenge.id, selectedDate)],
            )

            return (
              <li key={challenge.id}>
                <ChallengeItem
                  challenge={challenge}
                  isCompleted={isCompleted}
                  onDelete={() => onRequestDelete(challenge)}
                  onToggle={() => onToggleChallenge(challenge.id)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
