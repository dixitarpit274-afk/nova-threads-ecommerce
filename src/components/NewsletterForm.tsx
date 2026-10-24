import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { submitNetlifyForm } from '@/lib/netlify-form'

type State = 'idle' | 'pending' | 'success' | 'error'

export function NewsletterForm({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [state, setState] = useState<State>('idle')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (state === 'pending') return
    const form = e.currentTarget
    setState('pending')
    try {
      await submitNetlifyForm(form)
      form.reset()
      setState('success')
    } catch {
      setState('error')
    }
  }

  const dark = tone === 'dark'
  if (state === 'success') {
    return (
      <p role="status" className="flex items-center gap-3 text-sm">
        <Check className="size-5" aria-hidden="true" /> You’re on the list. We’ll email you before the next drop.
      </p>
    )
  }

  return (
    <form name="newsletter" method="POST" action="/forms.html" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit} onChange={() => state === 'error' && setState('idle')}>
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden>
        <label>Leave empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <fieldset disabled={state === 'pending'} className="flex">
        <label htmlFor={`newsletter-email-${tone}`} className="sr-only">Email address</label>
        <input
          id={`newsletter-email-${tone}`}
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Your email address"
          className={`h-12 w-full min-w-0 border-b bg-transparent pr-3 text-sm focus:outline-none ${dark ? 'border-paper/40 placeholder:text-paper/45 focus:border-paper' : 'border-ink/30 placeholder:text-ink/40 focus:border-ink'}`}
        />
        <button type="submit" className={`btn shrink-0 !px-5 ${dark ? 'btn-light' : 'btn-dark'}`} aria-label="Subscribe to newsletter">
          {state === 'pending' ? 'Joining…' : <>Join <ArrowRight className="size-4" aria-hidden="true" /></>}
        </button>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className={`mt-3 text-xs ${dark ? 'text-sand' : 'text-sale'}`}>
          We couldn’t confirm your signup. Please try again in a moment.
        </p>
      )}
    </form>
  )
}
