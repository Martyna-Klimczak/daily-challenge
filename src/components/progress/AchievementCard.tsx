import type { LucideIcon } from 'lucide-react'

type AchievementCardProps = {
  title: string
  description: string
  statusText: string
  unlocked: boolean
  Icon: LucideIcon
}

export default function AchievementCard({
  title,
  description,
  statusText,
  unlocked,
  Icon,
}: AchievementCardProps) {
  return (
    <article
      className={`rounded-[24px] border p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] ${
        unlocked
          ? 'border-violet-200 bg-gradient-to-br from-violet-50 via-white to-cyan-50'
          : 'border-slate-200 bg-slate-100/80'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
            unlocked
              ? 'bg-white text-violet-600 shadow-[0_8px_18px_rgba(59,130,246,0.12)]'
              : 'bg-slate-200 text-slate-400'
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <div>
          <h3 className={`font-bold ${unlocked ? 'text-slate-950' : 'text-slate-600'}`}>
            {title}
          </h3>
          <p
            className={`mt-2 text-sm font-medium leading-6 ${
              unlocked ? 'text-slate-600' : 'text-slate-500'
            }`}
          >
            {description}
          </p>
          <p
            className={`mt-3 text-sm font-semibold ${
              unlocked ? 'text-emerald-600' : 'text-slate-500'
            }`}
          >
            {statusText}
          </p>
        </div>
      </div>
    </article>
  )
}
