import { Sparkles } from 'lucide-react'

export default function HistoryIntroCard() {
  return (
    <section className="rounded-[28px] border border-cyan-100 bg-cyan-50 p-5 text-slate-700 shadow-[0_16px_34px_rgba(14,165,233,0.08)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-blue-600">
          <Sparkles className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-950">Pełna historia</h2>
          <p className="mt-2 text-sm font-medium leading-6">
            Sprawdź podsumowanie wybranego tygodnia lub miesiąca.
          </p>
        </div>
      </div>
    </section>
  )
}
