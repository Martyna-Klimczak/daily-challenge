import { TrendingUp } from 'lucide-react'

type DailyProgressCardProps = {
  progressTitle: string
  progressDescription: string
  completedCount: number
  totalCount: number
  progress: number
}

export default function DailyProgressCard({
  progressTitle,
  progressDescription,
  completedCount,
  totalCount,
  progress,
}: DailyProgressCardProps) {
  return (
    <section className="mt-5 rounded-[30px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 text-violet-600">
            <TrendingUp className="h-6 w-6" strokeWidth={2.3} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-slate-950">{progressTitle}</h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {progressDescription}
            </p>
          </div>
        </div>

        <span className="min-w-fit shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700">
          {completedCount} z {totalCount}
        </span>
      </div>

      <div
        aria-label={`${progressTitle}: ${completedCount} z ${totalCount} wyzwań, ${progress}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="mt-5 h-4 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 shadow-[0_8px_18px_rgba(59,130,246,0.25)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  )
}
