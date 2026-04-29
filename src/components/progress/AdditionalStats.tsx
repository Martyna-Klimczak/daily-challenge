import { progressIcons } from '../../utils/progressStats'

type AdditionalStatsProps = {
  longestStreak: number
  completedCategoriesCount: number
  totalCategories: number
  completionRate: number
}

const stats = [
  {
    key: 'longestStreak',
    title: 'Najdłuższa passa',
    description: 'Najlepsza seria ukończonych dni.',
    iconWrap: 'bg-violet-100 text-violet-600',
    cardWrap: 'bg-violet-50/80',
  },
  {
    key: 'categories',
    title: 'Ukończone kategorie',
    description: 'Kategorie, w których udało się zaliczyć wyzwania.',
    iconWrap: 'bg-emerald-100 text-emerald-600',
    cardWrap: 'bg-emerald-50/80',
  },
  {
    key: 'completionRate',
    title: 'Wskaźnik realizacji',
    description: 'Odsetek wykonanych zaplanowanych wystąpień.',
    iconWrap: 'bg-cyan-100 text-cyan-600',
    cardWrap: 'bg-cyan-50/80',
  },
] as const

export default function AdditionalStats({
  longestStreak,
  completedCategoriesCount,
  totalCategories,
  completionRate,
}: AdditionalStatsProps) {
  const values = {
    longestStreak: `${longestStreak} dni`,
    categories: `${completedCategoriesCount}/${totalCategories}`,
    completionRate: `${completionRate}%`,
  }

  return (
    <section className="mt-5 rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
      <h2 className="text-lg font-bold text-slate-950">Dodatkowe statystyki</h2>

      <div className="mt-5 space-y-3">
        {stats.map((stat) => {
          const Icon = progressIcons[stat.key]

          return (
            <div
              className={`flex items-center justify-between gap-4 rounded-[22px] p-4 ${stat.cardWrap}`}
              key={stat.key}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.iconWrap}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.3} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-950">{stat.title}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {stat.description}
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xl font-bold text-slate-950">
                {values[stat.key]}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
