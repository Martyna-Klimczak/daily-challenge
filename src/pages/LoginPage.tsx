import { useState } from 'react'
import type { FormEvent } from 'react'
import { Target } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthPasswordField from '../components/auth/AuthPasswordField'
import AuthTextField from '../components/auth/AuthTextField'

type LoginForm = {
  email: string
  password: string
}

type LoginErrors = Partial<Record<keyof LoginForm, string>>

const initialForm: LoginForm = {
  email: '',
  password: '',
}

const MIN_PASSWORD_LENGTH = 8

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<LoginForm>(initialForm)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)

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
    } else if (form.password.length < MIN_PASSWORD_LENGTH) {
      nextErrors.password = 'Hasło musi mieć minimum 8 znaków'
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
            aria-hidden="true"
            className="mb-6 flex h-[76px] w-[76px] items-center justify-center rounded-[24px] bg-blue-600 text-white shadow-[0_18px_35px_rgba(37,99,235,0.28)]"
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
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="space-y-3">
            <AuthTextField
              autoComplete="email"
              error={errors.email}
              id="email"
              inputMode="email"
              label="Email"
              name="email"
              onChange={(value) => updateField('email', value)}
              placeholder="twoj@email.com"
              type="text"
              value={form.email}
              variant="blue"
            />

            <AuthPasswordField
              autoComplete="current-password"
              error={errors.password}
              id="password"
              isVisible={showPassword}
              label="Hasło"
              name="password"
              onChange={(value) => updateField('password', value)}
              onToggleVisibility={() => setShowPassword((isVisible) => !isVisible)}
              placeholder="Wprowadź hasło"
              toggleHiddenLabel="Pokaż hasło"
              toggleVisibleLabel="Ukryj hasło"
              value={form.password}
              variant="blue"
            />
          </div>

          <div className="mt-2 flex justify-end">
            <Link
              className="rounded-md text-[15px] font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              to="/forgot-password"
            >
              Zapomniałeś hasła?
            </Link>
          </div>

          <button
            className="mt-4 flex h-14 w-full items-center justify-center rounded-[18px] bg-blue-600 px-5 text-base font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.26)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-px"
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
