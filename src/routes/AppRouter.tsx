import { Navigate, Route, Routes } from 'react-router-dom'
import BottomNav from '../components/common/BottomNav'
import AddChallengePage from '../pages/AddChallengePage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

function ProgressPage() {
  return (
    <main className="min-h-svh bg-gradient-to-b from-sky-50 via-white to-teal-50 text-slate-950">
      <div className="mx-auto flex min-h-svh w-full max-w-[720px] flex-col bg-white/25">
        <section className="mx-auto flex w-full max-w-[600px] flex-1 flex-col justify-center px-5 py-10 text-center">
          <p className="text-sm font-semibold text-blue-600">
            Daily Challenge
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-normal">Postępy</h1>
          <p className="mt-3 text-base font-medium text-slate-600">
            Tutaj pojawią się statystyki i historia aktywności.
          </p>
        </section>
        <BottomNav />
      </div>
    </main>
  )
}

function ForgotPasswordPage() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50 px-5 text-center text-slate-950">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">
          Daily Challenge
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal">
          Przypomnienie hasła
        </h1>
      </div>
    </main>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<AddChallengePage />} path="/add" />
      <Route element={<ProgressPage />} path="/progress" />
      <Route element={<ProgressPage />} path="/history" />
      <Route element={<ForgotPasswordPage />} path="/forgot-password" />
      <Route element={<Navigate replace to="/home" />} path="*" />
    </Routes>
  )
}
