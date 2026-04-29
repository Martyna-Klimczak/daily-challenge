import { ArrowLeft, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const privacySections = [
  {
    title: '1. Wprowadzenie',
    content:
      'Szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich danych osobowych. Niniejsza polityka wyjaśnia, jakie dane zbieramy i w jaki sposób z nich korzystamy.',
  },
  {
    title: '2. Jakie dane zbieramy',
    intro:
      'W ramach korzystania z aplikacji Daily Challenge zbieramy następujące dane:',
    items: [
      'Nazwa użytkownika',
      'Adres email',
      'Hasło przechowywane w formie zaszyfrowanej',
      'Informacje o Twoich wyzwaniach i postępach',
      'Podstawowe dane techniczne, takie jak typ urządzenia i system operacyjny',
    ],
  },
  {
    title: '3. W jaki sposób wykorzystujemy dane',
    intro: 'Twoje dane wykorzystujemy wyłącznie w celu:',
    items: [
      'Umożliwienia korzystania z aplikacji',
      'Personalizacji doświadczenia użytkownika',
      'Śledzenia postępów i statystyk',
      'Wysyłania powiadomień i przypomnień, jeśli wyrazisz zgodę',
      'Poprawy jakości usług',
    ],
  },
  {
    title: '4. Udostępnianie danych',
    content:
      'Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych podmiotom trzecim w celach marketingowych. Dane mogą być udostępniane wyłącznie w przypadkach wymaganych prawem lub za Twoją wyraźną zgodą.',
  },
  {
    title: '5. Bezpieczeństwo danych',
    content:
      'Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych przed nieautoryzowanym dostępem, utratą lub zniszczeniem. Wszystkie hasła są przechowywane w zaszyfrowanej formie.',
  },
  {
    title: '6. Twoje prawa',
    intro:
      'Przysługują Ci następujące prawa dotyczące Twoich danych osobowych:',
    items: [
      'Prawo dostępu do swoich danych',
      'Prawo do poprawiania danych',
      'Prawo do usunięcia danych',
      'Prawo do ograniczenia przetwarzania',
      'Prawo do przenoszenia danych',
      'Prawo do wycofania zgody',
    ],
  },
  {
    title: '7. Pliki cookies',
    content:
      'Aplikacja może wykorzystywać pliki cookies w celu poprawy funkcjonalności i analizy sposobu korzystania z usług. Możesz zarządzać ustawieniami cookies w swoim urządzeniu.',
  },
  {
    title: '8. Zmiany w polityce prywatności',
    content:
      'Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce prywatności. O istotnych zmianach poinformujemy użytkowników z odpowiednim wyprzedzeniem.',
  },
]

export default function PrivacyPolicyPage() {
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
            Polityka prywatności
          </h1>
        </div>
      </header>

      <div className="px-4 py-6 sm:px-5 sm:py-8">
        <section className="mx-auto w-full max-w-[900px] rounded-[28px] bg-white px-5 py-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] sm:px-9 sm:py-9">
          <div className="flex items-start gap-4 border-b border-slate-200 pb-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-emerald-50 text-emerald-600">
              <Shield className="h-8 w-8" strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-[30px] font-bold leading-tight tracking-normal text-slate-950">
                Polityka prywatności Daily Challenge
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                Ostatnia aktualizacja: 8 kwietnia 2026
              </p>
            </div>
          </div>

          <div className="space-y-10 pt-8 text-lg leading-9 text-slate-700">
            {privacySections.map((section) => (
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
          </div>

          <footer className="mt-10 border-t border-slate-200 pt-6 text-lg text-slate-600">
            Masz pytania dotyczące prywatności? Skontaktuj się z nami:{' '}
            <a
              className="rounded font-semibold text-emerald-600 underline underline-offset-2 transition hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              href="mailto:privacy@dailychallenge.pl"
            >
              privacy@dailychallenge.pl
            </a>
          </footer>
        </section>
      </div>
    </main>
  )
}
