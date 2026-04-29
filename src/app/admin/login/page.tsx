'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { login } from '../actions'

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full bg-hunter text-parchment py-4
        font-sans text-[0.8125rem] font-medium tracking-[0.2em] uppercase
        hover:bg-[#1E3D17] transition-colors duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {pending ? 'Signing in…' : 'Sign In →'}
    </button>
  )
}

export default function AdminLoginPage() {
  const [state, action] = useFormState(login, null)

  return (
    <main className="min-h-screen bg-parchment flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <p className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-muted mb-2">
          One Click Tailor
        </p>
        <h1 className="font-playfair text-[2rem] font-medium mb-10">Admin</h1>

        {state?.error && (
          <p className="font-sans text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3 mb-6">
            {state.error}
          </p>
        )}

        <form action={action} className="space-y-6">
          <div>
            <label className="block font-sans text-[0.75rem] uppercase tracking-widest mb-2 text-charcoal">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="input-line w-full font-sans text-[1rem]"
              placeholder="Enter admin password"
            />
          </div>
          <SubmitBtn />
        </form>
      </div>
    </main>
  )
}
