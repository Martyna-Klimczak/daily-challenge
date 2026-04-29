import type { AchievementDefinition } from '../../utils/progressStats'
import AchievementCard from './AchievementCard'

type AchievementsGridProps = {
  achievements: AchievementDefinition[]
}

export default function AchievementsGrid({
  achievements,
}: AchievementsGridProps) {
  return (
    <section className="mt-5">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-950">Osiągnięcia</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">
          Odblokowuj kolejne kamienie milowe wraz z regularnością.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <AchievementCard
            Icon={achievement.icon}
            description={achievement.description}
            key={achievement.id}
            statusText={achievement.statusText}
            title={achievement.title}
            unlocked={achievement.unlocked}
          />
        ))}
      </div>
    </section>
  )
}
