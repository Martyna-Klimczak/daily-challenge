import {
  BookOpen,
  Brain,
  Dumbbell,
  GraduationCap,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CategoryTone } from '../../types/home'

export const categoryStyles: Record<string, CategoryTone> = {
  Rozwój: {
    badge: 'bg-violet-100 text-violet-700',
    iconWrap: 'bg-violet-100',
    icon: 'text-violet-600',
    label: 'Rozwój',
  },
  Zdrowie: {
    badge: 'bg-emerald-100 text-emerald-700',
    iconWrap: 'bg-emerald-100',
    icon: 'text-emerald-600',
    label: 'Zdrowie',
  },
  Wellbeing: {
    badge: 'bg-cyan-100 text-cyan-700',
    iconWrap: 'bg-cyan-100',
    icon: 'text-cyan-600',
    label: 'Wellbeing',
  },
  Nauka: {
    badge: 'bg-amber-100 text-amber-700',
    iconWrap: 'bg-amber-100',
    icon: 'text-amber-600',
    label: 'Nauka',
  },
  Sport: {
    badge: 'bg-orange-100 text-orange-700',
    iconWrap: 'bg-orange-100',
    icon: 'text-orange-600',
    label: 'Sport',
  },
}

export const categoryIcons: Record<string, LucideIcon> = {
  Rozwój: BookOpen,
  Zdrowie: Dumbbell,
  Wellbeing: Brain,
  Nauka: GraduationCap,
  Sport: Dumbbell,
}

export const defaultChallengeIcon = Target
