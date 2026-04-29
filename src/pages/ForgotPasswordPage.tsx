import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

type ForgotPasswordErrors = {
  email?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<ForgotPasswordErrors>({})
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)

  const handleEmailChange = (value: string) => {
    setEmail(value)

    if (errors.email) {
      setErrors({})
    }
  }

  const validateForm = () => {
    const nextErrors: ForgotPasswordErrors = {}
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      nextErrors.email = 'Email jest wymagany'
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = 'Podaj poprawny adres email'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmittedEmail(email.trim())
  }

  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-slate-50 to-white px-4 py-6 text-slate-950 sm:px-6 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-[600px] flex-col">
        <Link
          className="inline-flex w-fit items-center gap-2 rounded-md px-1 py-2 text-[15px] font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          to="/login"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
          Wróć do logowania
        </Link>

        <div className="flex flex-1 items-center justify-center py-6">
          <section className="w-full rounded-[28px] bg-white px-5 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:px-9 sm:py-10">
            {submittedEmail ? (
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_18px_35px_rgba(34,197,94,0.24)]">
                  <CheckCircle2 className="h-12 w-12" strokeWidth={2.4} />
                </div>
                <h1 className="text-[34px] font-bold leading-tight tracking-normal text-slate-950">
                  Sprawdź swoją skrzynkę!
                </h1>
                <p className="mt-4 max-w-[420px] text-lg leading-8 text-slate-600">
                  Wysłaliśmy instrukcje resetowania hasła na adres
                </p>
                <p className="mt-1 text-xl font-semibold text-slate-950">
                  {submittedEmail}
                </p>
                <Link
                  className="mt-8 flex h-14 w-full items-center justify-center rounded-[18px] bg-blue-600 px-5 text-base font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.26)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-px"
                  to="/login"
                >
                  Wróć do logowania
                </Link>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Mail className="h-11 w-11" strokeWidth={2.1} />
                  </div>
                  <h1 className="text-[34px] font-bold leading-tight tracking-normal text-slate-950">
                    Nie pamiętasz hasła?
                  </h1>
                  <p className="mt-4 max-w-[430px] text-lg leading-8 text-slate-600">
                    Wprowadź swój adres email, a wyślemy Ci instrukcje jak
                    zresetować hasło.
                  </p>
                </div>

                <form className="mt-9" noValidate onSubmit={handleSubmit}>
                  <div>
                    <label
                      className="mb-3 block text-[15px] font-semibold text-slate-950"
                      htmlFor="email"
                    >
                      Adres email
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
                      onChange={(event) => handleEmailChange(event.target.value)}
                      placeholder="twoj@email.com"
                      type="email"
                      value={email}
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

                  <button
                    className="mt-7 flex h-14 w-full items-center justify-center rounded-[18px] bg-blue-600 px-5 text-base font-semibold text-white shadow-[0_12px_24px_rgba(37,99,235,0.26)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-px"
                    type="submit"
                  >
                    Wyślij instrukcje
                  </button>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
