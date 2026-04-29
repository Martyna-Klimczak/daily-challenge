import { Sparkles, Star } from 'lucide-react'

type HomeHeroProps = {
  username: string
}

export default function HomeHero({ username }: HomeHeroProps) {
  return (
    <header className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-violet-500 via-blue-500 to-cyan-400 px-5 pb-6 pt-5 text-white shadow-[0_24px_55px_rgba(79,70,229,0.24)] sm:px-6">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/18 blur-sm"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[-1.75rem] h-24 w-24 rounded-full bg-fuchsia-300/25"
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="max-w-[72%]">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-sm font-semibold backdrop-blur">
            <Sparkles className="h-4 w-4" strokeWidth={2.2} />
            Daily Challenge
          </div>
          <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-normal sm:text-[30px]">
            Cześć, {username}!
          </h1>
          <p className="mt-2 text-base font-medium text-white/90">
            Dzisiaj jest Twój dzień!
          </p>
        </div>

        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-white/30 blur-md" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/18 backdrop-blur">
            <Star className="h-7 w-7" strokeWidth={2.4} />
          </div>
        </div>
      </div>
    </header>
  )
}
