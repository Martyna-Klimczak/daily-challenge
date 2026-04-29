export type ChallengeCategory =
  | 'Rozwój'
  | 'Zdrowie'
  | 'Wellbeing'
  | 'Nauka'
  | 'Sport'

export type ChallengeFrequency =
  | 'Jednorazowo'
  | 'Codziennie'
  | 'Co tydzień'
  | 'W dni robocze'
  | 'W weekendy'

export type Challenge = {
  id: string
  title: string
  category: ChallengeCategory
  meta: string
  startDate: string
  frequency: ChallengeFrequency
  reminderTime?: string
  description?: string
  completedDates?: string[]
}

export const CHALLENGES_STORAGE_KEY = 'dailyChallenge.challenges'

export const COMPLETED_CHALLENGES_STORAGE_KEY =
  'dailyChallenge.completions'
