import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/common/BottomNav'
import AchievementsGrid from '../components/progress/AchievementsGrid'
import ActivityChart from '../components/progress/ActivityChart'
import AdditionalStats from '../components/progress/AdditionalStats'
import ProgressHeader from '../components/progress/ProgressHeader'
import ProgressInsightCard from '../components/progress/ProgressInsightCard'
import ProgressSummaryCards from '../components/progress/ProgressSummaryCards'
import { loadChallenges, loadCompletions } from '../utils/challengeStorage'
import {
  buildMonthlyActivity,
  buildWeeklyActivity,
  getInsightMessage,
  getProgressAchievements,
  getProgressStats,
} from '../utils/progressStats'

export default function ProgressPage() {
  const challenges = loadChallenges()
  const completions = loadCompletions()
  const stats = getProgressStats(challenges, completions)
  const weeklyData = buildWeeklyActivity(challenges, completions)
  const monthlyData = buildMonthlyActivity(challenges, completions)
  const insightMessage = getInsightMessage({
    completedTotal: stats.completedTotal,
    currentStreak: stats.currentStreak,
    completionRate: stats.completionRate,
    scheduledOccurrences: stats.scheduledOccurrences,
  })
  const achievements = getProgressAchievements({
    completedTotal: stats.completedTotal,
    completedThisWeek: stats.completedThisWeek,
    completedCategoriesCount: stats.completedCategoriesCount,
    currentStreak: stats.currentStreak,
    longestStreak: stats.longestStreak,
  })

  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col">
        <section className="mx-auto w-full max-w-[600px] flex-1 px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-7">
          <ProgressHeader title="Twoje postępy" />

          <ProgressSummaryCards
            completedTotal={stats.completedTotal}
            currentStreak={stats.currentStreak}
          />

          <ProgressInsightCard
            message={
              stats.completedTotal === 0 && stats.scheduledOccurrences === 0
                ? 'Dodaj pierwsze wyzwanie, aby zacząć śledzić postępy.'
                : insightMessage
            }
          />

          <ActivityChart monthlyData={monthlyData} weeklyData={weeklyData} />

          <AdditionalStats
            completedCategoriesCount={stats.completedCategoriesCount}
            completionRate={stats.completionRate}
            longestStreak={stats.longestStreak}
            totalCategories={stats.totalCategories}
          />

          <AchievementsGrid achievements={achievements} />

          <Link
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-[20px] bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-5 text-base font-semibold text-white shadow-[0_16px_34px_rgba(59,130,246,0.24)] transition hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-violet-100 active:translate-y-px"
            to="/history"
          >
            Zobacz pełną historię wyzwań
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </Link>
        </section>

        <BottomNav activeItem="progress" />
      </div>
    </main>
  )
}
