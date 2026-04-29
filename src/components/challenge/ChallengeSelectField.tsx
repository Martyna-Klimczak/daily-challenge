import { ChevronDown } from 'lucide-react'

type ChallengeSelectFieldProps = {
  id: string
  name: string
  label: string
  value: string
  placeholder: string
  options: string[]
  required?: boolean
  error?: string
  helperText?: string
  onChange: (value: string) => void
}

const fieldClass = (hasError: boolean, hasValue: boolean) =>
  `h-14 w-full appearance-none rounded-[18px] border bg-slate-50 px-4 pr-12 text-base font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 ${
    hasError
      ? 'border-red-400 text-slate-950 focus:border-red-500 focus:ring-red-100'
      : hasValue
        ? 'border-slate-200 text-slate-950'
        : 'border-slate-200 text-slate-500'
  }`

export default function ChallengeSelectField({
  id,
  name,
  label,
  value,
  placeholder,
  options,
  required = false,
  error,
  helperText,
  onChange,
}: ChallengeSelectFieldProps) {
  const describedBy = [error ? `${id}-error` : null, helperText ? `${id}-help` : null]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div>
      <label className="mb-3 block text-[15px] font-semibold text-slate-900" htmlFor={id}>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative">
        <select
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          className={fieldClass(Boolean(error), Boolean(value))}
          id={id}
          name={name}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          strokeWidth={2.4}
        />
      </div>
      {error ? (
        <p className="mt-2 text-sm font-medium text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
      {helperText ? (
        <p className="mt-3 text-sm font-medium text-slate-500" id={`${id}-help`}>
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
