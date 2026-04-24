import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  Sparkles,
  Target,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import BottomNav from '../components/common/BottomNav'

type ChallengeForm = {
  title: string
  description: string
  category: string
  difficulty: string
  reminderTime: string
  frequency: string
}

type ChallengeErrors = Partial<Record<keyof ChallengeForm, string>>

const initialForm: ChallengeForm = {
  title: '',
  description: '',
  category: '',
  difficulty: '',
  reminderTime: '',
  frequency: '',
}

const categories = ['Rozwój', 'Zdrowie', 'Nauka', 'Wellbeing', 'Sport']
const difficulties = ['Łatwy', 'Średni', 'Trudny']
const frequencies = ['Codziennie', 'Co tydzień', 'W dni robocze', 'W weekendy']

export default function AddChallengePage() {
  const [form, setForm] = useState<ChallengeForm>(initialForm)
  const [errors, setErrors] = useState<ChallengeErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  const updateField = (field: keyof ChallengeForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
    setSuccessMessage('')

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }))
    }
  }

  const validateForm = () => {
    const nextErrors: ChallengeErrors = {}

    if (!form.title.trim()) {
      nextErrors.title = 'Tytuł wyzwania jest wymagany'
    }

    if (!form.category) {
      nextErrors.category = 'Wybierz kategorię'
    }

    if (!form.difficulty) {
      nextErrors.difficulty = 'Wybierz poziom trudności'
    }

    if (!form.frequency) {
      nextErrors.frequency = 'Wybierz częstotliwość'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      setSuccessMessage('')
      return
    }

    console.log('Zapisano wyzwanie:', form)
    setSuccessMessage('Wyzwanie zostało zapisane')
    setForm(initialForm)
  }

  const fieldClass = (hasError: boolean) =>
    `h-14 w-full rounded-[18px] border bg-slate-50 px-4 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
        : 'border-slate-200'
    }`

  const selectClass = (hasError: boolean, hasValue: boolean) =>
    `${fieldClass(hasError)} appearance-none pr-12 ${
      hasValue ? 'text-slate-950' : 'text-slate-500'
    }`

  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col bg-white/25">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 shadow-[0_6px_18px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="mx-auto flex w-full max-w-[600px] items-center gap-4">
            <Link
              aria-label="Wróć"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-100"
              to="/home"
            >
              <ArrowLeft className="h-7 w-7" strokeWidth={2.4} />
            </Link>
            <Target
              aria-hidden="true"
              className="h-7 w-7 shrink-0 text-blue-600"
              strokeWidth={2.5}
            />
            <h1 className="text-[28px] font-bold leading-tight tracking-normal text-slate-900">
              Nowe wyzwanie
            </h1>
          </div>
        </header>

        <form
          className="mx-auto flex w-full max-w-[600px] flex-1 flex-col px-5 pb-8 pt-7"
          noValidate
          onSubmit={handleSubmit}
        >
          <section className="mb-7 flex items-start gap-3 rounded-[24px] border border-cyan-100 bg-cyan-50 px-5 py-5 text-slate-700">
            <Sparkles
              aria-hidden="true"
              className="mt-0.5 h-6 w-6 shrink-0 text-blue-600"
              strokeWidth={2.4}
            />
            <p className="text-base font-medium leading-7">
              Wyznacz sobie nowy cel i buduj swoją motywację krok po kroku!
            </p>
          </section>

          <div className="space-y-6">
            <section className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(14,165,233,0.10)] sm:p-6">
              <label
                className="mb-3 block text-[15px] font-semibold text-slate-900"
                htmlFor="challenge-title"
              >
                Tytuł wyzwania <span className="text-red-500">*</span>
              </label>
              <input
                aria-describedby={
                  errors.title ? 'challenge-title-error' : undefined
                }
                aria-invalid={Boolean(errors.title)}
                className={fieldClass(Boolean(errors.title))}
                id="challenge-title"
                name="title"
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="np. Przeczytaj 20 stron książki"
                type="text"
                value={form.title}
              />
              {errors.title ? (
                <p
                  className="mt-2 text-sm font-medium text-red-600"
                  id="challenge-title-error"
                >
                  {errors.title}
                </p>
              ) : null}
            </section>

            <section className="rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(20,184,166,0.10)] sm:p-6">
              <label
                className="mb-3 block text-[15px] font-semibold text-slate-900"
                htmlFor="challenge-description"
              >
                Opis (opcjonalnie)
              </label>
              <textarea
                className="min-h-24 w-full resize-none rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-4 text-base font-medium text-slate-950 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                id="challenge-description"
                name="description"
                onChange={(event) =>
                  updateField('description', event.target.value)
                }
                placeholder="Dodaj szczegóły swojego wyzwania..."
                value={form.description}
              />
              <p className="mt-3 text-sm font-medium text-slate-500">
                Opisz, dlaczego to wyzwanie jest dla Ciebie ważne
              </p>
            </section>

            <section className="space-y-6 rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(99,102,241,0.08)] sm:p-6">
              <div>
                <label
                  className="mb-3 block text-[15px] font-semibold text-slate-900"
                  htmlFor="challenge-category"
                >
                  Kategoria <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    aria-describedby={
                      errors.category ? 'challenge-category-error' : undefined
                    }
                    aria-invalid={Boolean(errors.category)}
                    className={selectClass(
                      Boolean(errors.category),
                      Boolean(form.category),
                    )}
                    id="challenge-category"
                    name="category"
                    onChange={(event) =>
                      updateField('category', event.target.value)
                    }
                    value={form.category}
                  >
                    <option value="">Wybierz kategorię</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    strokeWidth={2.4}
                  />
                </div>
                {errors.category ? (
                  <p
                    className="mt-2 text-sm font-medium text-red-600"
                    id="challenge-category-error"
                  >
                    {errors.category}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="mb-3 block text-[15px] font-semibold text-slate-900"
                  htmlFor="challenge-difficulty"
                >
                  Poziom trudności <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    aria-describedby={
                      errors.difficulty
                        ? 'challenge-difficulty-error'
                        : undefined
                    }
                    aria-invalid={Boolean(errors.difficulty)}
                    className={selectClass(
                      Boolean(errors.difficulty),
                      Boolean(form.difficulty),
                    )}
                    id="challenge-difficulty"
                    name="difficulty"
                    onChange={(event) =>
                      updateField('difficulty', event.target.value)
                    }
                    value={form.difficulty}
                  >
                    <option value="">Wybierz poziom</option>
                    {difficulties.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    strokeWidth={2.4}
                  />
                </div>
                {errors.difficulty ? (
                  <p
                    className="mt-2 text-sm font-medium text-red-600"
                    id="challenge-difficulty-error"
                  >
                    {errors.difficulty}
                  </p>
                ) : null}
              </div>
            </section>

            <section className="space-y-6 rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(20,184,166,0.10)] sm:p-6">
              <div>
                <label
                  className="mb-3 block text-[15px] font-semibold text-slate-900"
                  htmlFor="challenge-reminder"
                >
                  Przypomnienie o godzinie
                </label>
                <div className="relative">
                  <input
                    className={`${fieldClass(false)} pr-12`}
                    id="challenge-reminder"
                    name="reminderTime"
                    onChange={(event) =>
                      updateField('reminderTime', event.target.value)
                    }
                    type="time"
                    value={form.reminderTime}
                  />
                  <Clock
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                    strokeWidth={2.3}
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-slate-500">
                  Otrzymasz powiadomienie, gdy nadejdzie czas
                </p>
              </div>

              <div>
                <label
                  className="mb-3 block text-[15px] font-semibold text-slate-900"
                  htmlFor="challenge-frequency"
                >
                  Częstotliwość <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    aria-describedby={
                      errors.frequency
                        ? 'challenge-frequency-error'
                        : undefined
                    }
                    aria-invalid={Boolean(errors.frequency)}
                    className={selectClass(
                      Boolean(errors.frequency),
                      Boolean(form.frequency),
                    )}
                    id="challenge-frequency"
                    name="frequency"
                    onChange={(event) =>
                      updateField('frequency', event.target.value)
                    }
                    value={form.frequency}
                  >
                    <option value="">Jak często?</option>
                    {frequencies.map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    strokeWidth={2.4}
                  />
                </div>
                {errors.frequency ? (
                  <p
                    className="mt-2 text-sm font-medium text-red-600"
                    id="challenge-frequency-error"
                  >
                    {errors.frequency}
                  </p>
                ) : null}
              </div>
            </section>
          </div>

          {successMessage ? (
            <p
              className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700"
              role="status"
            >
              {successMessage}
            </p>
          ) : null}

          <button
            className="mt-7 flex h-14 w-full items-center justify-center rounded-[18px] bg-gradient-to-r from-blue-600 to-cyan-600 px-5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(37,99,235,0.26)] transition hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-px"
            type="submit"
          >
            Zapisz wyzwanie
          </button>

          <p className="mt-5 text-center text-sm font-medium text-slate-500">
            Pola oznaczone <span className="text-red-500">*</span> są wymagane
          </p>
        </form>

        <BottomNav />
      </div>
    </main>
  )
}
