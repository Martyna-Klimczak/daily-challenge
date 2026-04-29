import { Navigate, Route, Routes } from 'react-router-dom'
import AddChallengePage from '../pages/AddChallengePage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import HistoryPage from '../pages/HistoryPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage'
import ProgressPage from '../pages/ProgressPage'
import RegisterPage from '../pages/RegisterPage'
import TermsPage from '../pages/TermsPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<TermsPage />} path="/terms" />
      <Route element={<PrivacyPolicyPage />} path="/privacy-policy" />
      <Route element={<ForgotPasswordPage />} path="/forgot-password" />
      <Route element={<AddChallengePage />} path="/add" />
      <Route element={<ProgressPage />} path="/progress" />
      <Route element={<HistoryPage />} path="/history" />
      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  )
}
