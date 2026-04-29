import type { Challenge } from '../../types/challenge'

type DeleteChallengeDialogProps = {
  challenge: Challenge | null
  onCancel: () => void
  onConfirm: () => void
}

export default function DeleteChallengeDialog({
  challenge,
  onCancel,
  onConfirm,
}: DeleteChallengeDialogProps) {
  if (!challenge) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/35 p-4 sm:items-center">
      <div
        aria-describedby="delete-challenge-description"
        aria-labelledby="delete-challenge-title"
        aria-modal="true"
        className="w-full max-w-[360px] rounded-[28px] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.22)]"
        role="dialog"
      >
        <h3 className="text-lg font-bold text-slate-950" id="delete-challenge-title">
          Usunąć wyzwanie?
        </h3>
        <p
          className="mt-2 text-sm font-medium leading-7 text-slate-500"
          id="delete-challenge-description"
        >
          Tej operacji nie można cofnąć.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            className="flex h-12 flex-1 items-center justify-center rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
            onClick={onCancel}
            type="button"
          >
            Anuluj
          </button>
          <button
            className="flex h-12 flex-1 items-center justify-center rounded-[18px] bg-red-500 px-4 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-100"
            onClick={onConfirm}
            type="button"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  )
}
