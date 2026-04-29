import { Check, Trash2 } from 'lucide-react'
import type { Challenge } from '../../types/challenge'
import {
  categoryIcons,
  categoryStyles,
  defaultChallengeIcon,
} from './challengeStyles'

type ChallengeItemProps = {
  challenge: Challenge
  isCompleted: boolean
  onToggle: () => void
  onDelete: () => void
}

export default function ChallengeItem({
  challenge,
  isCompleted,
  onToggle,
  onDelete,
}: ChallengeItemProps) {
  const Icon = categoryIcons[challenge.category] ?? defaultChallengeIcon
  const categoryStyle =
    categoryStyles[challenge.category] ?? categoryStyles.Rozwój

  return (
    <div
      className={`group flex w-full items-center gap-3 rounded-[24px] border px-4 py-4 text-left shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition ${
        isCompleted
          ? 'border-emerald-200 bg-emerald-50/90'
          : 'border-slate-200/80 bg-white hover:border-violet-200 hover:shadow-[0_16px_34px_rgba(79,70,229,0.08)]'
      }`}
    >
      <button
        aria-label={
          isCompleted
            ? `Oznacz wyzwanie jako niewykonane: ${challenge.title}`
            : `Oznacz wyzwanie jako wykonane: ${challenge.title}`
        }
        className="flex min-w-0 flex-1 items-center gap-4 rounded-[20px] text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-100"
        onClick={onToggle}
        type="button"
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
            isCompleted
              ? 'bg-emerald-100 text-emerald-600'
              : `${categoryStyle.iconWrap} ${categoryStyle.icon}`
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className={`font-semibold ${
                isCompleted
                  ? 'text-emerald-800 line-through decoration-2'
                  : 'text-slate-950'
              }`}
            >
              {challenge.title}
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-700'
                  : categoryStyle.badge
              }`}
            >
              {categoryStyle.label}
            </span>
          </div>
          <p
            className={`mt-2 text-sm font-medium ${
              isCompleted ? 'text-emerald-700' : 'text-slate-500'
            }`}
          >
            {challenge.meta}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition ${
            isCompleted
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-slate-300 bg-white text-slate-300 group-hover:border-violet-400 group-hover:text-violet-400'
          }`}
        >
          {isCompleted ? <Check className="h-5 w-5" strokeWidth={3} /> : null}
        </span>
      </button>

      <button
        aria-label={`Usuń wyzwanie ${challenge.title}`}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
        onClick={onDelete}
        type="button"
      >
        <Trash2 className="h-4.5 w-4.5" strokeWidth={2.2} />
      </button>
    </div>
  )
}
