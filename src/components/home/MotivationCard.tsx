import { Mountain } from 'lucide-react'

export default function MotivationCard() {
  return (
    <section className="mt-6 rounded-[28px] bg-gradient-to-br from-rose-100 via-orange-50 to-fuchsia-100 p-5 shadow-[0_18px_40px_rgba(244,114,182,0.10)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-rose-500 shadow-[0_10px_24px_rgba(255,255,255,0.35)]">
          <Mountain className="h-6 w-6" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-950">Motywacja dnia</h2>
          <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
            Małe kroki codziennie budują wielkie efekty.
          </p>
        </div>
      </div>
    </section>
  )
}
