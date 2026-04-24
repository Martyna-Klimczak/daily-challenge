import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, Target } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

type RegisterForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
  acceptedTerms: boolean
}

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>

const initialForm: RegisterForm = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptedTerms: false,
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterForm>(initialForm)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const updateField = <Field extends keyof RegisterForm>(
    field: Field,
    value: RegisterForm[Field],
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }))
    }
  }

  const validateForm = () => {
    const nextErrors: RegisterErrors = {}

    if (!form.username.trim()) {
      nextErrors.username = 'Nazwa użytkownika jest wymagana'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email jest wymagany'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Hasło jest wymagane'
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Potwierdź hasło'
    }

    if (!form.acceptedTerms) {
      nextErrors.acceptedTerms = 'Musisz zaakceptować regulamin'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log('Utworzono konto:', {
      username: form.username,
      email: form.email,
    })
    navigate('/home')
  }

  return (
    <main className="min-h-svh bg-emerald-50/60 px-5 py-10 text-slate-950 sm:py-14">
      <div className="mx-auto flex w-full max-w-[430px] flex-col items-center">
        <section className="mb-9 flex flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="mb-6 flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-emerald-500 text-white shadow-[0_18px_35px_rgba(16,185,129,0.26)]"
          >
            <Target className="h-10 w-10" strokeWidth={2.8} />
          </div>

          <h1 className="text-[34px] font-bold leading-tight tracking-normal text-slate-950">
            Utwórz konto
          </h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Zacznij swoją podróż z Daily Challenge
          </p>
        </section>

        <form
          className="w-full rounded-[28px] bg-white px-5 py-7 text-left shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:px-7 sm:py-8"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div>
              <label
                className="mb-3 block text-[15px] font-semibold text-slate-950"
                htmlFor="username"
              >
                Nazwa użytkownika
              </label>
              <input
                aria-describedby={
                  errors.username ? 'username-error' : undefined
                }
                aria-invalid={Boolean(errors.username)}
                autoComplete="username"
                className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${
                  errors.username
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200'
                }`}
                id="username"
                name="username"
                onChange={(event) =>
                  updateField('username', event.target.value)
                }
                placeholder="Twoja nazwa"
                type="text"
                value={form.username}
              />
              {errors.username ? (
                <p
                  className="mt-2 text-sm font-medium text-red-600"
                  id="username-error"
                >
                  {errors.username}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-3 block text-[15px] font-semibold text-slate-950"
                htmlFor="email"
              >
                Email
              </label>
              <input
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={Boolean(errors.email)}
                autoComplete="email"
                className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                    : 'border-slate-200'
                }`}
                id="email"
                inputMode="email"
                name="email"
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="twoj@email.com"
                type="email"
                value={form.email}
              />
              {errors.email ? (
                <p
                  className="mt-2 text-sm font-medium text-red-600"
                  id="email-error"
                >
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-3 block text-[15px] font-semibold text-slate-950"
                htmlFor="password"
              >
                Hasło
              </label>
              <div className="relative">
                <input
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  aria-invalid={Boolean(errors.password)}
                  autoComplete="new-password"
                  className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 pr-13 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${
                    errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-200'
                  }`}
                  id="password"
                  name="password"
                  onChange={(event) =>
                    updateField('password', event.target.value)
                  }
                  placeholder="Minimum 6 znaków"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                />
                <button
                  aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  onClick={() => setShowPassword((isVisible) => !isVisible)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={2.2} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={2.2} />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p
                  className="mt-2 text-sm font-medium text-red-600"
                  id="password-error"
                >
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-3 block text-[15px] font-semibold text-slate-950"
                htmlFor="confirm-password"
              >
                Potwierdź hasło
              </label>
              <div className="relative">
                <input
                  aria-describedby={
                    errors.confirmPassword
                      ? 'confirm-password-error'
                      : undefined
                  }
                  aria-invalid={Boolean(errors.confirmPassword)}
                  autoComplete="new-password"
                  className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 pr-13 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 ${
                    errors.confirmPassword
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                      : 'border-slate-200'
                  }`}
                  id="confirm-password"
                  name="confirmPassword"
                  onChange={(event) =>
                    updateField('confirmPassword', event.target.value)
                  }
                  placeholder="Powtórz hasło"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                />
                <button
                  aria-label={
                    showConfirmPassword
                      ? 'Ukryj potwierdzenie hasła'
                      : 'Pokaż potwierdzenie hasła'
                  }
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  onClick={() =>
                    setShowConfirmPassword((isVisible) => !isVisible)
                  }
                  type="button"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={2.2} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={2.2} />
                  )}
                </button>
              </div>
              {errors.confirmPassword ? (
                <p
                  className="mt-2 text-sm font-medium text-red-600"
                  id="confirm-password-error"
                >
                  {errors.confirmPassword}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-start gap-3">
              <input
                aria-describedby={
                  errors.acceptedTerms ? 'accepted-terms-error' : undefined
                }
                aria-invalid={Boolean(errors.acceptedTerms)}
                checked={form.acceptedTerms}
                className={`mt-0.5 h-5 w-5 shrink-0 rounded border text-emerald-600 accent-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
                  errors.acceptedTerms ? 'border-red-400' : 'border-slate-300'
                }`}
                id="accepted-terms"
                name="acceptedTerms"
                onChange={(event) =>
                  updateField('acceptedTerms', event.target.checked)
                }
                type="checkbox"
              />
              <label
                className="text-[15px] font-medium leading-6 text-slate-700"
                htmlFor="accepted-terms"
              >
                Akceptuję{' '}
                <a
                  className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  href="#regulamin"
                >
                  regulamin
                </a>{' '}
                i{' '}
                <a
                  className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  href="#polityka-prywatnosci"
                >
                  politykę prywatności
                </a>
              </label>
            </div>
            {errors.acceptedTerms ? (
              <p
                className="mt-2 pl-8 text-sm font-medium text-red-600"
                id="accepted-terms-error"
              >
                {errors.acceptedTerms}
              </p>
            ) : null}
          </div>

          <button
            className="mt-7 flex h-14 w-full items-center justify-center rounded-[18px] bg-emerald-600 px-5 text-base font-semibold text-white shadow-[0_12px_24px_rgba(5,150,105,0.26)] transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 active:translate-y-px"
            type="submit"
          >
            Utwórz konto
          </button>
        </form>

        <p className="mt-7 text-center text-base font-medium text-slate-600">
          Masz już konto?{' '}
          <Link
            className="rounded-md font-semibold text-emerald-600 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            to="/login"
          >
            Zaloguj się
          </Link>
        </p>
      </div>
    </main>
  )
}
