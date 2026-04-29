import { categoryStyles } from '../home/challengeStyles'
import type { ChallengeCategory } from '../../types/challenge'

type HistoryCategoryBreakdownProps = {
  categories: Array<{ category: ChallengeCategory; count: number }>
}

export default function HistoryCategoryBreakdown({
  categories,
}: HistoryCategoryBreakdownProps) {
  if (categories.length === 0) {
    return null
  }

  return (
    <section className="mt-4">
      <h3 className="text-sm font-semibold text-slate-700">Kategorie w tym okresie</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {categories.map(({ category, count }) => {
          const style = categoryStyles[category] ?? categoryStyles.Wellbeing

          return (
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${style.badge}`}
              key={category}
            >
              {category}: {count}
            </span>
          )
        })}
      </div>
    </section>
  )
}
