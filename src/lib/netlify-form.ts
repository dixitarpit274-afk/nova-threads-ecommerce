/**
 * Submits a form to Netlify Forms. The matching hidden registration form
 * lives in /public/forms.html so Netlify can detect it at deploy time.
 */
export async function submitNetlifyForm(form: HTMLFormElement) {
  const body = new URLSearchParams()
  new FormData(form).forEach((value, key) => body.append(key, String(value)))
  const response = await fetch('/forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new Error('Submission failed')
  // A plain static server returns the unprocessed registration page with a 200.
  if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling is unavailable')
}
