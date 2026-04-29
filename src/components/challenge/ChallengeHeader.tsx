import { ArrowLeft, Target } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ChallengeHeader() {
  return (
    <section className="mb-6 flex items-center justify-between">
      <Link
        aria-label="Wróć"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
        to="/home"
      >
        <ArrowLeft className="h-7 w-7" strokeWidth={2.4} />
      </Link>

      <div className="flex flex-1 items-center justify-center gap-2 px-3">
        <Target
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-blue-600"
          strokeWidth={2.5}
        />
        <h1 className="text-[20px] font-bold leading-tight tracking-normal text-slate-900">
          Nowe wyzwanie
        </h1>
      </div>

      <div aria-hidden="true" className="h-10 w-10 shrink-0" />
    </section>
  )
}
