import { useState } from 'react'
import type { FormEvent } from 'react'
import { Target } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCheckboxField from '../components/auth/AuthCheckboxField'
import AuthPasswordField from '../components/auth/AuthPasswordField'
import AuthTextField from '../components/auth/AuthTextField'

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

const PASSWORD_REQUIREMENTS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

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
      nextErrors.password = 'Minimum 8 znaków / Wielka litera / Mała litera / Cyfra'
    } else if (!PASSWORD_REQUIREMENTS.test(form.password)) {
      nextErrors.password =
        'Hasło musi mieć minimum 8 znaków, wielką i małą literę oraz cyfrę'
    }

    if (!form.confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Hasła muszą być takie same'
    } else if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Hasła muszą być takie same'
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
        <section className="mb-5 flex flex-col items-center text-center">
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
          <div className="space-y-3">
            <AuthTextField
              autoComplete="username"
              error={errors.username}
              id="username"
              label="Nazwa użytkownika"
              name="username"
              onChange={(value) => updateField('username', value)}
              placeholder="Twoja nazwa"
              value={form.username}
            />

            <AuthTextField
              autoComplete="email"
              error={errors.email}
              id="email"
              inputMode="email"
              label="Email"
              name="email"
              onChange={(value) => updateField('email', value)}
              placeholder="twoj@email.com"
              type="email"
              value={form.email}
            />

            <AuthPasswordField
              autoComplete="new-password"
              error={errors.password}
              id="password"
              isVisible={showPassword}
              label="Hasło"
              name="password"
              onChange={(value) => updateField('password', value)}
              onToggleVisibility={() => setShowPassword((isVisible) => !isVisible)}
              placeholder="Minimum 8 znaków"
              toggleHiddenLabel="Pokaż hasło"
              toggleVisibleLabel="Ukryj hasło"
              value={form.password}
            />

            <AuthPasswordField
              autoComplete="new-password"
              error={errors.confirmPassword}
              id="confirm-password"
              isVisible={showConfirmPassword}
              label="Potwierdź hasło"
              name="confirmPassword"
              onChange={(value) => updateField('confirmPassword', value)}
              onToggleVisibility={() =>
                setShowConfirmPassword((isVisible) => !isVisible)
              }
              placeholder="Powtórz hasło"
              toggleHiddenLabel="Pokaż potwierdzenie hasła"
              toggleVisibleLabel="Ukryj potwierdzenie hasła"
              value={form.confirmPassword}
            />
          </div>

          <AuthCheckboxField
            checked={form.acceptedTerms}
            error={errors.acceptedTerms}
            id="accepted-terms"
            onChange={(checked) => updateField('acceptedTerms', checked)}
          />

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
