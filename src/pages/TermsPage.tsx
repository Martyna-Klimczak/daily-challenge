import { ArrowLeft, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const termsSections = [
  {
    title: '1. Postanowienia ogólne',
    content:
      'Daily Challenge to aplikacja mobilna służąca do zarządzania osobistymi wyzwaniami i śledzenia postępów. Korzystanie z aplikacji oznacza akceptację niniejszego regulaminu.',
  },
  {
    title: '2. Warunki korzystania',
    intro: 'Użytkownik zobowiązuje się do:',
    items: [
      'Korzystania z aplikacji zgodnie z jej przeznaczeniem',
      'Niepodawania nieprawdziwych danych',
      'Zachowania poufności swoich danych logowania',
      'Przestrzegania zasad dobrego zachowania',
    ],
  },
  {
    title: '3. Konto użytkownika',
    content:
      'Do korzystania z pełnej funkcjonalności aplikacji wymagane jest utworzenie konta. Użytkownik jest odpowiedzialny za wszystkie działania wykonywane za pomocą swojego konta.',
  },
  {
    title: '5. Ograniczenie odpowiedzialności',
    content:
      'Aplikacja Daily Challenge ma charakter motywacyjny i edukacyjny. Nie gwarantujemy osiągnięcia konkretnych rezultatów. Każdy użytkownik korzysta z aplikacji na własną odpowiedzialność.',
  },
  {
    title: '6. Zmiany w regulaminie',
    content:
      'Zastrzegamy sobie prawo do wprowadzania zmian w niniejszym regulaminie. O istotnych zmianach użytkownicy zostaną powiadomieni z odpowiednim wyprzedzeniem.',
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-svh bg-emerald-50/60 text-slate-950">
      <header className="border-b border-emerald-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-[900px] items-center gap-4 px-5 sm:px-6">
          <Link
            aria-label="Wróć do rejestracji"
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            to="/register"
          >
            <ArrowLeft className="h-6 w-6" strokeWidth={2.4} />
          </Link>
          <h1 className="text-[20px] font-bold tracking-normal text-slate-950">
            Regulamin
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-5 sm:py-8">
        <section className="mx-auto w-full max-w-[900px] rounded-[28px] bg-white px-5 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:px-9 sm:py-9">
          <div className="flex items-start gap-4 border-b border-slate-200 pb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-600">
              <FileText className="h-8 w-8" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[30px] font-bold leading-tight tracking-normal text-slate-950">
                Regulamin Daily Challenge
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Ostatnia aktualizacja: 8 kwietnia 2026
              </p>
            </div>
          </div>

          <div className="space-y-10 pt-8 text-lg leading-9 text-slate-700">
            {termsSections.slice(0, 3).map((section) => (
              <section key={section.title}>
                <h3 className="text-[22px] font-bold leading-tight text-slate-950">
                  {section.title}
                </h3>
                {'content' in section ? (
                  <p className="mt-4">{section.content}</p>
                ) : null}
                {'intro' in section ? (
                  <p className="mt-4">{section.intro}</p>
                ) : null}
                {Array.isArray(section.items) ? (
                  <ul className="mt-4 space-y-2 pl-7 marker:text-slate-500">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <section>
              <h3 className="text-[22px] font-bold leading-tight text-slate-950">
                4. Prywatność danych
              </h3>
              <p className="mt-4">
                Szczegółowe informacje dotyczące przetwarzania danych osobowych
                znajdują się w{' '}
                <Link
                  className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  to="/privacy-policy"
                >
                  Polityce prywatności
                </Link>
                .
              </p>
            </section>

            {termsSections.slice(3).map((section) => (
              <section key={section.title}>
                <h3 className="text-[22px] font-bold leading-tight text-slate-950">
                  {section.title}
                </h3>
                <p className="mt-4">{section.content}</p>
              </section>
            ))}
          </div>

          <footer className="mt-10 border-t border-slate-200 pt-6 text-lg text-slate-600">
            Masz pytania? Skontaktuj się z nami:{' '}
            <a
              className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              href="mailto:kontakt@dailychallenge.pl"
            >
              kontakt@dailychallenge.pl
            </a>
          </footer>
        </section>
      </div>
    </main>
  )
}
