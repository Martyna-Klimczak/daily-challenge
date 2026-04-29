import type { InputHTMLAttributes } from 'react'

type AuthTextFieldProps = {
  id: string
  name: string
  label: string
  type?: string
  variant?: 'blue' | 'emerald'
  value: string
  placeholder: string
  autoComplete: string
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  error?: string
  onChange: (value: string) => void
}

export default function AuthTextField({
  id,
  name,
  label,
  type = 'text',
  variant = 'emerald',
  value,
  placeholder,
  autoComplete,
  inputMode,
  error,
  onChange,
}: AuthTextFieldProps) {
  const focusClasses =
    variant === 'blue'
      ? 'focus:border-blue-600 focus:ring-blue-100'
      : 'focus:border-emerald-500 focus:ring-emerald-100'
  const errorClasses =
    variant === 'blue'
      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
      : 'border-red-400 focus:border-red-500 focus:ring-red-100'
  const errorTextClass = variant === 'blue' ? 'text-red-500' : 'text-red-600'

  return (
    <div>
      <label
        className="mb-3 block text-[15px] font-semibold text-slate-950"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:bg-white focus:ring-4 ${focusClasses} ${
          error ? errorClasses : 'border-slate-200'
        }`}
        id={id}
        inputMode={inputMode}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className={`mt-2 text-sm font-medium ${errorTextClass}`} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
