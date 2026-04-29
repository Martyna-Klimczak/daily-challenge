import { CalendarPlus2 } from 'lucide-react'
import { Link } from 'react-router-dom'

type HistoryEmptyStateProps = {
  title?: string
  description?: string
  addHref?: string
}

export default function HistoryEmptyState({
  title = 'Brak historii w tym okresie',
  description = 'Wybierz inny tydzień albo dodaj nowe wyzwanie.',
  addHref = '/add',
}: HistoryEmptyStateProps) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-200 bg-slate-50/70 p-5 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-slate-500 shadow-[0_8px_18px_rgba(15,23,42,0.04)]">
        <CalendarPlus2 className="h-6 w-6" strokeWidth={2.2} />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-7 text-slate-500">{description}</p>
      <Link
        className="mt-5 inline-flex h-12 items-center justify-center rounded-[18px] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(59,130,246,0.22)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-violet-100"
        to={addHref}
      >
        Dodaj wyzwanie
      </Link>
    </div>
  )
}
