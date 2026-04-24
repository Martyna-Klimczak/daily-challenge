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
      className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-10px_24px_rgba(15,23,42,0.06)] backdrop-blur"
    >
      <ul className="mx-auto grid w-full max-w-[430px] grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          const isActive =
            item.value === activeItem || item.paths.includes(location.pathname)

          return (
            <li key={item.value}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`mx-auto flex min-h-14 w-20 flex-col items-center justify-center rounded-xl text-xs font-semibold transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-800'
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
