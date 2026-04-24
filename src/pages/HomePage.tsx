import { CalendarDays, Flame, Plus, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/common/BottomNav'

const todaysChallenges = [
  {
    title: 'Przeczytaj 20 stron książki',
    category: 'Rozwój',
    done: true,
  },
  {
    title: 'Spacer przez 30 minut',
    category: 'Zdrowie',
    done: false,
  },
]

export default function HomePage() {
  const completedCount = todaysChallenges.filter((challenge) => challenge.done)
    .length
  const progress = Math.round((completedCount / todaysChallenges.length) * 100)

  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col bg-white/25">
        <section className="mx-auto w-full max-w-[600px] flex-1 px-5 pb-8 pt-8">
          <header className="mb-7 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Daily Challenge
              </p>
              <h1 className="mt-2 text-[32px] font-bold leading-tight tracking-normal text-slate-950">
                Start
              </h1>
              <p className="mt-2 text-base font-medium text-slate-600">
                Dzisiaj jest dobry dzień na mały krok naprzód.
              </p>
            </div>
            <div
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-blue-600 text-white shadow-[0_14px_28px_rgba(37,99,235,0.24)]"
            >
              <Target className="h-8 w-8" strokeWidth={2.6} />
            </div>
          </header>

          <section className="mb-6 rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(14,165,233,0.10)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Dzisiejszy postęp
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {completedCount} z {todaysChallenges.length} wyzwań wykonane
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                {progress}%
              </span>
            </div>
            <div
              aria-label={`Dzisiejszy postęp ${progress}%`}
              className="h-3 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </section>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <section className="rounded-[24px] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
              <Flame
                aria-hidden="true"
                className="mb-3 h-6 w-6 text-orange-500"
                strokeWidth={2.4}
              />
              <p className="text-2xl font-bold text-slate-950">7 dni</p>
              <p className="mt-1 text-sm font-medium text-slate-500">Passa</p>
            </section>
            <section className="rounded-[24px] bg-white p-5 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
              <TrendingUp
                aria-hidden="true"
                className="mb-3 h-6 w-6 text-blue-600"
                strokeWidth={2.4}
              />
              <p className="text-2xl font-bold text-slate-950">18</p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Ukończone
              </p>
            </section>
          </div>

          <section className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(20,184,166,0.10)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Dzisiejsze wyzwania
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Małe cele, widoczny rytm.
                </p>
              </div>
              <Link
                aria-label="Dodaj wyzwanie"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-[0_10px_22px_rgba(37,99,235,0.24)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                to="/add"
              >
                <Plus className="h-6 w-6" strokeWidth={2.5} />
              </Link>
            </div>

            <ul className="space-y-3">
              {todaysChallenges.map((challenge) => (
                <li
                  className="flex items-center gap-3 rounded-[18px] border border-slate-100 bg-slate-50 px-4 py-4"
                  key={challenge.title}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      challenge.done
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-slate-300 bg-white'
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {challenge.title}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-medium text-slate-500">
                      <CalendarDays className="h-4 w-4" strokeWidth={2.2} />
                      {challenge.category}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <BottomNav />
      </div>
    </main>
  )
}
