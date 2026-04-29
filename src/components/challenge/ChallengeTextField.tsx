type ChallengeTextFieldProps = {
  id: string
  name: string
  label: string
  type: string
  value: string
  placeholder?: string
  required?: boolean
  error?: string
  helperText?: string
  onChange: (value: string) => void
}

const fieldClass = (hasError: boolean) =>
  `h-14 w-full rounded-[18px] border bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-slate-200'
  }`

export default function ChallengeTextField({
  id,
  name,
  label,
  type,
  value,
  placeholder,
  required = false,
  error,
  helperText,
  onChange,
}: ChallengeTextFieldProps) {
  const describedBy = [error ? `${id}-error` : null, helperText ? `${id}-help` : null]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div>
      <label className="mb-3 block text-[15px] font-semibold text-slate-900" htmlFor={id}>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <input
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={fieldClass(Boolean(error))}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
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
