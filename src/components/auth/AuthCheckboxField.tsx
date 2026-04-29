import { Link } from 'react-router-dom'

type AuthCheckboxFieldProps = {
  id: string
  checked: boolean
  error?: string
  onChange: (checked: boolean) => void
}

export default function AuthCheckboxField({
  id,
  checked,
  error,
  onChange,
}: AuthCheckboxFieldProps) {
  return (
    <div className="mt-7">
      <div className="flex items-start gap-3">
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          checked={checked}
          className={`mt-0.5 h-5 w-5 shrink-0 rounded border text-emerald-600 accent-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
            error ? 'border-red-400' : 'border-slate-300'
          }`}
          id={id}
          name="acceptedTerms"
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <div className="text-[15px] font-medium leading-6 text-slate-700">
          <label className="cursor-pointer" htmlFor={id}>
            Akceptuję
          </label>{' '}
          <Link
            className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            to="/terms"
          >
            regulamin
          </Link>{' '}
          i{' '}
          <Link
            className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            to="/privacy-policy"
          >
            politykę prywatności
          </Link>
        </div>
      </div>
      {error ? (
        <p className="mt-2 pl-8 text-sm font-medium text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
