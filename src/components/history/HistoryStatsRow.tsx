import type { LucideIcon } from 'lucide-react'

type HistoryStatsRowProps = {
  Icon: LucideIcon
  title: string
  description: string
  value: string
  detailText?: string
  iconClassName: string
  backgroundClassName: string
}

export default function HistoryStatsRow({
  Icon,
  title,
  description,
  value,
  detailText,
  iconClassName,
  backgroundClassName,
}: HistoryStatsRowProps) {
  return (
    <div className={`flex items-center justify-between gap-4 rounded-[22px] p-4 ${backgroundClassName}`}>
      <div className="flex min-w-0 items-center gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}>
          <Icon className="h-5 w-5" strokeWidth={2.3} />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{description}</p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <span className="block text-base font-bold text-slate-950">{value}</span>
        {detailText ? (
          <span className="mt-1 inline-flex rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {detailText}
          </span>
        ) : null}
      </div>
    </div>
  )
}
