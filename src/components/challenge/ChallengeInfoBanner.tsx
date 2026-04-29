import { Sparkles } from 'lucide-react'

export default function ChallengeInfoBanner() {
  return (
    <section className="mb-7 flex items-start gap-3 rounded-[24px] border border-cyan-100 bg-cyan-50 px-5 py-5 text-slate-700">
      <Sparkles
        aria-hidden="true"
        className="mt-0.5 h-6 w-6 shrink-0 text-blue-600"
        strokeWidth={2.4}
      />
      <p className="text-base font-medium leading-7">
        Wyznacz sobie nowy cel i buduj swoją motywację krok po kroku!
      </p>
    </section>
  )
}
