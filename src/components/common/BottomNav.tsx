import { Home, Plus, TrendingUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

type BottomNavItem = {
  label: string
  to: string
  icon: typeof Home
  value: 'home' | 'add' | 'progress'
  paths: string[]
}

type BottomNavProps = {
  activeItem?: BottomNavItem['value']
}

const items: BottomNavItem[] = [
  {
    label: 'Start',
    to: '/home',
    icon: Home,
    value: 'home',
    paths: ['/', '/home'],
  },
  {
    label: 'Dodaj',
    to: '/add',
    icon: Plus,
    value: 'add',
    paths: ['/add'],
  },
  {
    label: 'Postępy',
    to: '/progress',
    icon: TrendingUp,
    value: 'progress',
    paths: ['/progress', '/history'],
  },
]

export default function BottomNav({ activeItem }: BottomNavProps) {
  const location = useLocation()

  return (
    <nav
      aria-label="Główna nawigacja"
      className="fixed bottom-0 left-1/2 z-30 w-full max-w-[720px] -translate-x-1/2 border-t border-slate-200/70 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.8rem)] pt-3 shadow-[0_-12px_28px_rgba(15,23,42,0.08)] backdrop-blur"
    >
      <ul className="mx-auto grid w-full max-w-[430px] grid-cols-3 gap-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive =
            item.value === activeItem || item.paths.includes(location.pathname)

          return (
            <li key={item.value}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`mx-auto flex min-h-14 w-full flex-col items-center justify-center rounded-[18px] px-2 text-xs font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-50 via-blue-50 to-cyan-50 text-blue-700 shadow-[0_10px_20px_rgba(59,130,246,0.10)]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
                to={item.to}
              >
                <Icon className="mb-1 h-6 w-6" strokeWidth={2.4} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
