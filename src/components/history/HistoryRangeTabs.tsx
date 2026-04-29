type HistoryRangeTabsProps = {
  value: 'weeks' | 'months'
  onChange: (value: 'weeks' | 'months') => void
}

export default function HistoryRangeTabs({
  value,
  onChange,
}: HistoryRangeTabsProps) {
  return (
    <section className="mt-5">
      <div className="inline-flex rounded-full bg-slate-100 p-1">
        {([
          ['weeks', 'Tygodnie'],
          ['months', 'Miesiące'],
        ] as const).map(([tabValue, label]) => {
          const isActive = tabValue === value

          return (
            <button
              aria-pressed={isActive}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-violet-100 ${
                isActive
                  ? 'bg-white text-violet-700 shadow-[0_6px_16px_rgba(59,130,246,0.12)]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              key={tabValue}
              onClick={() => onChange(tabValue)}
              type="button"
            >
              {label}
            </button>
          )
        })}
      </div>
    </section>
  )
}
