import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, Target } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

type LoginForm = {
  email: string
  password: string
}

type LoginErrors = Partial<Record<keyof LoginForm, string>>

const initialForm: LoginForm = {
  email: '',
  password: '',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>(initialForm)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const hasErrors = Object.keys(errors).length > 0

  const updateField = (field: keyof LoginForm, value: string) => {
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
    const nextErrors: LoginErrors = {}

    if (!form.email.trim()) {
      nextErrors.email = 'Email jest wymagany'
    }

    if (!form.password.trim()) {
      nextErrors.password = 'Hasło jest wymagane'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log('Zalogowano użytkownika:', form.email)
    navigate('/home')
  }

  return (
    <main className="min-h-svh bg-slate-50 px-5 py-10 text-slate-950 sm:py-14">
      <div className="mx-auto flex w-full max-w-[410px] flex-col items-center">
        <section className="mb-10 flex flex-col items-center text-center">
          <div
            className="mb-6 flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-blue-600 text-white shadow-[0_18px_35px_rgba(37,99,235,0.28)]"
            aria-hidden="true"
          >
            <Target className="h-10 w-10" strokeWidth={2.6} />
          </div>

          <h1 className="text-[34px] font-bold leading-tight tracking-normal text-slate-950">
            Daily Challenge
          </h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Twój codzienny motywator
          </p>
        </section>

        <form
          className="w-full rounded-[28px] bg-white px-5 py-7 text-left shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:px-7 sm:py-8"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-6">
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
                className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 ${
                  errors.email
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-slate-200'
                }`}
                id="email"
                inputMode="email"
                name="email"
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="twoj@email.com"
                type="text"
                value={form.email}
              />
              {errors.email ? (
                <p
                  className="mt-2 text-sm font-medium text-red-500"
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
                  autoComplete="current-password"
                  className={`h-14 w-full rounded-[18px] border bg-slate-50 px-4 pr-13 text-base text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100 ${
                    errors.password
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200'
                  }`}
                  id="password"
                  name="password"
                  onChange={(event) =>
                    updateField('password', event.target.value)
                  }
                  placeholder="Wprowadź hasło"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                />
                <button
                  aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
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
                  className="mt-2 text-sm font-medium text-red-500"
                  id="password-error"
                >
                  {errors.password}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Link
              className="rounded-md text-[15px] font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              to="/forgot-password"
            >
              Zapomniałeś hasła?
            </Link>
          </div>

          {hasErrors ? (
            <p className="mt-5 text-center text-sm font-medium text-red-500">
              Uzupełnij wymagane pola
            </p>
          ) : null}

          <button
            className="mt-7 flex h-14 w-full items-center justify-center rounded-[18px] bg-blue-600 px-5 text-base font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.26)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-px"
            type="submit"
          >
            Zaloguj się
          </button>
        </form>

        <p className="mt-7 text-center text-base font-medium text-slate-600">
          Nie masz konta?{' '}
          <Link
            className="rounded-md font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
            to="/register"
          >
            Zarejestruj się
          </Link>
        </p>
      </div>
    </main>
  )
}
