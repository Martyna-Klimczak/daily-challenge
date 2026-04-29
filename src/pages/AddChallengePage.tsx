import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ChallengeFormSection from '../components/challenge/ChallengeFormSection'
import ChallengeHeader from '../components/challenge/ChallengeHeader'
import ChallengeInfoBanner from '../components/challenge/ChallengeInfoBanner'
import ChallengeSelectField from '../components/challenge/ChallengeSelectField'
import ChallengeTextField from '../components/challenge/ChallengeTextField'
import BottomNav from '../components/common/BottomNav'
import type {
  Challenge,
  ChallengeCategory,
  ChallengeFrequency,
} from '../types/challenge'
import { loadChallenges, saveChallenges } from '../utils/challengeStorage'
import { getAvailableFrequencies, getTodayDate } from '../utils/date'

type ChallengeForm = {
  title: string
  category: string
  difficulty: string
  reminderTime: string
  startDate: string
  frequency: string
}

type ChallengeErrors = Partial<Record<keyof ChallengeForm, string>>

const isValidDateParam = (value: string | null): value is string =>
  typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)

const initialForm: ChallengeForm = {
  title: '',
  category: '',
  difficulty: '',
  reminderTime: '',
  startDate: getTodayDate(),
  frequency: '',
}

const categories: ChallengeCategory[] = [
  'Rozwój',
  'Zdrowie',
  'Nauka',
  'Wellbeing',
  'Sport',
]

const difficulties = ['Łatwy', 'Średni', 'Trudny']
export default function AddChallengePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const dateFromUrl = searchParams.get('date')
  const initialStartDate = isValidDateParam(dateFromUrl)
    ? dateFromUrl
    : getTodayDate()
  const [form, setForm] = useState<ChallengeForm>({
    ...initialForm,
    startDate: initialStartDate,
  })
  const [errors, setErrors] = useState<ChallengeErrors>({})
  const [successMessage, setSuccessMessage] = useState('')
  const [frequencyNeedsReselect, setFrequencyNeedsReselect] = useState(false)

  const availableFrequencies = getAvailableFrequencies(form.startDate)

  useEffect(() => {
    if (!isValidDateParam(dateFromUrl)) {
      return
    }

    setForm((currentForm) =>
      currentForm.startDate === dateFromUrl
        ? currentForm
        : {
            ...currentForm,
            startDate: dateFromUrl,
          },
    )
  }, [dateFromUrl])

  useEffect(() => {
    if (!form.frequency) {
      return
    }

    if (availableFrequencies.includes(form.frequency as ChallengeFrequency)) {
      return
    }

    setForm((currentForm) => ({
      ...currentForm,
      frequency: '',
    }))
    setFrequencyNeedsReselect(true)

    if (errors.frequency) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        frequency: undefined,
      }))
    }
  }, [availableFrequencies, errors.frequency, form.frequency])

  const updateField = (field: keyof ChallengeForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
    setSuccessMessage('')

    if (field === 'frequency') {
      setFrequencyNeedsReselect(false)
    }

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

    if (!form.startDate) {
      nextErrors.startDate = 'Wybierz datę rozpoczęcia'
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

    const customChallenge: Challenge = {
      id: `custom-${Date.now()}`,
      title: form.title.trim(),
      category: form.category as ChallengeCategory,
      meta: form.reminderTime
        ? `start o ${form.reminderTime}`
        : form.frequency === 'Jednorazowo'
          ? 'jednorazowe wyzwanie'
          : `od ${form.startDate}`,
      startDate: form.startDate,
      frequency: form.frequency as ChallengeFrequency,
      reminderTime: form.reminderTime || undefined,
    }

    const existingChallenges = loadChallenges()
    saveChallenges([...existingChallenges, customChallenge])

    console.log('Zapisano wyzwanie:', customChallenge)
    setSuccessMessage('Wyzwanie zostało zapisane')
    navigate(`/home?date=${form.startDate}`)
  }

  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col bg-white/25">
        <form
          className="mx-auto flex w-full max-w-[600px] flex-1 flex-col px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-7"
          noValidate
          onSubmit={handleSubmit}
        >
          <ChallengeHeader />
          <ChallengeInfoBanner />

          <div className="space-y-6">
            <ChallengeFormSection>
              <ChallengeTextField
                error={errors.title}
                id="challenge-title"
                label="Tytuł wyzwania"
                name="title"
                onChange={(value) => updateField('title', value)}
                placeholder="np. Przeczytaj 20 stron książki"
                required
                type="text"
                value={form.title}
              />
            </ChallengeFormSection>

            <ChallengeFormSection className="space-y-6 shadow-[0_18px_45px_rgba(99,102,241,0.08)]">
              <ChallengeSelectField
                error={errors.category}
                id="challenge-category"
                label="Kategoria"
                name="category"
                onChange={(value) => updateField('category', value)}
                options={categories}
                placeholder="Wybierz kategorię"
                required
                value={form.category}
              />

              <ChallengeSelectField
                error={errors.difficulty}
                id="challenge-difficulty"
                label="Poziom trudności"
                name="difficulty"
                onChange={(value) => updateField('difficulty', value)}
                options={difficulties}
                placeholder="Wybierz poziom"
                required
                value={form.difficulty}
              />
            </ChallengeFormSection>

            <ChallengeFormSection className="space-y-6 shadow-[0_18px_45px_rgba(20,184,166,0.10)]">
              <ChallengeTextField
                helperText="Otrzymasz powiadomienie, gdy nadejdzie czas"
                id="challenge-reminder"
                label="Przypomnienie o godzinie"
                name="reminderTime"
                onChange={(value) => updateField('reminderTime', value)}
                type="time"
                value={form.reminderTime}
              />

              <ChallengeTextField
                error={errors.startDate}
                helperText={
                  isValidDateParam(dateFromUrl)
                    ? 'Data została ustawiona na podstawie wybranego dnia w planie. Możesz ją zmienić.'
                    : 'Wybierz dzień, od którego wyzwanie ma być widoczne w planie.'
                }
                id="challenge-start-date"
                label="Data rozpoczęcia"
                name="startDate"
                onChange={(value) => updateField('startDate', value)}
                required
                type="date"
                value={form.startDate}
              />

              <ChallengeSelectField
                error={errors.frequency}
                helperText={
                  frequencyNeedsReselect
                    ? 'Zmieniono datę, wybierz częstotliwość ponownie.'
                    : 'Dostępne opcje zostały dopasowane do wybranej daty.'
                }
                id="challenge-frequency"
                label="Częstotliwość"
                name="frequency"
                onChange={(value) => updateField('frequency', value)}
                options={availableFrequencies}
                placeholder="Jak często?"
                required
                value={form.frequency}
              />
            </ChallengeFormSection>
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

        <BottomNav activeItem="add" />
      </div>
    </main>
  )
}
