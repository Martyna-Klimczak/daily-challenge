import type { ReactNode } from 'react'

type ChallengeFormSectionProps = {
  children: ReactNode
  className?: string
}

export default function ChallengeFormSection({
  children,
  className = '',
}: ChallengeFormSectionProps) {
  return (
    <section
      className={`rounded-[28px] bg-white p-5 shadow-[0_18px_45px_rgba(14,165,233,0.10)] sm:p-6 ${className}`.trim()}
    >
      {children}
    </section>
  )
}
