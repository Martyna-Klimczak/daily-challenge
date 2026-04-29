import { Eye, EyeOff } from 'lucide-react'

type AuthPasswordFieldProps = {
  id: string
  name: string
  label: string
  variant?: 'blue' | 'emerald'
  value: string
  placeholder: string
  autoComplete: string
  error?: string
  isVisible: boolean
  onToggleVisibility: () => void
  toggleVisibleLabel: string
  toggleHiddenLabel: string
  onChange: (value: string) => void
}

export default function AuthPasswordField({
  id,
  name,
  label,
  variant = 'emerald',
  value,
  placeholder,
  autoComplete,
  error,
  isVisible,
  onToggleVisibility,
  toggleVisibleLabel,
  toggleHiddenLabel,
  onChange,
}: AuthPasswordFieldProps) {
  const focusClasses =
    variant === 'blue'
      ? 'focus:border-blue-600 focus:ring-blue-100'
      : 'focus:border-emerald-500 focus:ring-emerald-100'
  const errorClasses =
    variant === 'blue'
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-red-400 focus:border-red-500 focus:ring-red-100'
  const errorTextClass = variant === 'blue' ? 'text-red-500' : 'text-red-600'
  const toggleFocusClass =
    variant === 'blue' ? 'focus:ring-blue-100' : 'focus:ring-emerald-100'

  return (
    <div>
      <label
        className="mb-3 block text-[15px] font-semibold text-slate-950"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          autoComplete={autoComplete}
          className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 pr-13 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-4 ${focusClasses} ${
            error ? errorClasses : 'border-slate-200'
          }`}
          id={id}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={isVisible ? 'text' : 'password'}
          value={value}
        />
        <button
          aria-label={isVisible ? toggleVisibleLabel : toggleHiddenLabel}
          className={`absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-4 ${toggleFocusClass}`}
          onClick={onToggleVisibility}
          type="button"
        >
          {isVisible ? (
            <EyeOff className="h-5 w-5" strokeWidth={2.2} />
          ) : (
            <Eye className="h-5 w-5" strokeWidth={2.2} />
          )}
        </button>
      </div>
      {error ? (
        <p className={`mt-2 text-sm font-medium ${errorTextClass}`} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
