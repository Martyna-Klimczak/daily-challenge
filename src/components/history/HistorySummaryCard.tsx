type HistorySummaryCardProps = {
  completedCount: number
  scheduledCount: number
  completionRate: number
}

export default function HistorySummaryCard({
  completedCount,
  scheduledCount,
  completionRate,
}: HistorySummaryCardProps) {
  return (
    <div className="mt-4 rounded-[24px] border border-slate-100 bg-slate-50/90 p-4">
      <p className="text-sm font-semibold text-slate-600">
        Ukończono {completedCount} z {scheduledCount} zaplanowanych wyzwań
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-[18px] bg-white p-3 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Ukończone
          </p>
          <p className="mt-2 text-xl font-bold text-slate-950">{completedCount}</p>
        </div>
        <div className="rounded-[18px] bg-white p-3 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Zaplanowane
          </p>
          <p className="mt-2 text-xl font-bold text-slate-950">{scheduledCount}</p>
        </div>
        <div className="rounded-[18px] bg-white p-3 text-center shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Skuteczność
          </p>
          <p className="mt-2 text-xl font-bold text-slate-950">{completionRate}%</p>
        </div>
      </div>

      <div
        aria-label={`Skuteczność ${completionRate}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={completionRate}
        className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
      >
        <div
          className={`h-full rounded-full ${
            scheduledCount > 0
              ? 'bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400'
              : 'bg-slate-300'
          }`}
          style={{ width: `${scheduledCount > 0 ? completionRate : 0}%` }}
        />
      </div>
    </div>
  )
}
