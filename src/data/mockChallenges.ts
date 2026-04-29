import type { Challenge } from '../types/challenge'

const today = new Date()
const todayString = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
].join('-')

export const mockChallenges: Challenge[] = [
  {
    id: 'read-book',
    title: 'Przeczytaj 20 stron książki',
    category: 'Rozwój',
    meta: 'około 25 min',
    startDate: todayString,
    frequency: 'Codziennie',
    completedDates: [todayString],
  },
  {
    id: 'walk',
    title: 'Spacer przez 30 minut',
    category: 'Zdrowie',
    meta: 'rano',
    startDate: todayString,
    frequency: 'W dni robocze',
  },
  {
    id: 'water',
    title: 'Wypij 2 litry wody',
    category: 'Zdrowie',
    meta: 'przez cały dzień',
    startDate: todayString,
    frequency: 'Codziennie',
  },
  {
    id: 'study',
    title: 'Powtórz materiał z angielskiego',
    category: 'Nauka',
    meta: 'wieczorem, 15 min',
    startDate: todayString,
    frequency: 'Co tydzień',
    completedDates: [todayString],
  },
  {
    id: 'focus',
    title: '15 minut bez rozpraszaczy',
    category: 'Rozwój',
    meta: 'po południu',
    startDate: todayString,
    frequency: 'Jednorazowo',
  },
]
