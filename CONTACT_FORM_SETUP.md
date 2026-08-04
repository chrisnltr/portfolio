# Contact Form Setup (Resend + Cloudflare Turnstile)

This portfolio is a **Nuxt 3** app on **Vercel**. The contact form posts to `POST /api/contact` (`server/api/contact.post.ts`), sends mail via **Resend**, and blocks bots with **Cloudflare Turnstile**.

Site: [https://chrisnoltemeier.de](https://chrisnoltemeier.de)

---

## 1. Environment variables in Vercel

In the Vercel project → **Settings → Environment Variables**, add **all** of the following.

Select environments: **Production**, **Preview**, and **Development** (check all three unless you intentionally want local-only values).

| Variable | Value to use | Notes |
|----------|--------------|--------|
| `RESEND_API_KEY` | Your Resend API key (`re_...`) | Create at [resend.com/api-keys](https://resend.com/api-keys). Server-only. |
| `CONTACT_TO_EMAIL` | `chris.noltemeier@gmail.com` | Inbox that receives form submissions. |
| `CONTACT_FROM_EMAIL` | A verified Resend sender, e.g. `Portfolio <noreply@chrisnoltemeier.de>` or `Chris <onboarding@resend.dev>` for tests | Must be allowed by Resend (domain verified, or Resend test sender). |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile **Secret Key** | From the Turnstile widget in the Cloudflare dashboard. Server-only. |
| `NUXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile **Site Key** | Public; safe in the browser. Prefer this Nuxt name. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Same Site Key (optional alias) | Supported as fallback if you prefer Next-style naming. Not required if `NUXT_PUBLIC_TURNSTILE_SITE_KEY` is set. |
| `NUXT_PUBLIC_SITE_URL` | `https://chrisnoltemeier.de` | Canonical site URL for SEO/sitemap (already documented in README). |

Do **not** commit real keys. Use `.env.local` only on your machine (gitignored).

### After changing Vercel env vars

Redeploy the project (new deployment). Existing deployments do **not** pick up env changes automatically.

---

## 2. Cloudflare Turnstile

1. Open [Cloudflare Dashboard → Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile).
2. Create a widget (or edit the existing one).
3. Under **Domain Management / Hostname**, allow at least:
   - `chrisnoltemeier.de`
   - `www.chrisnoltemeier.de`
4. For local testing, also add `localhost` (optional).
5. Copy **Site Key** → `NUXT_PUBLIC_TURNSTILE_SITE_KEY`
6. Copy **Secret Key** → `TURNSTILE_SECRET_KEY`
7. Widget theme on the site is set to **dark** in code to match the portfolio.

---

## 3. Resend

1. Create an account at [resend.com](https://resend.com).
2. Create an API key → `RESEND_API_KEY`.
3. Verify your sending domain (recommended: `chrisnoltemeier.de`) **or** use Resend’s onboarding/test sender while testing.
4. Set `CONTACT_FROM_EMAIL` to an address on that verified domain (or the test sender).
5. Set `CONTACT_TO_EMAIL` to `chris.noltemeier@gmail.com`.

Mails use subject `Portfolio-Anfrage von [Name]` and set the visitor’s email as **Reply-To**. Optional phone is included in the body when provided.

---

## 4. Local `.env.local` example

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=chris.noltemeier@gmail.com
CONTACT_FROM_EMAIL=
TURNSTILE_SECRET_KEY=
NUXT_PUBLIC_TURNSTILE_SITE_KEY=
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

Then run:

```bash
npm install
npm run dev
```

---

## 5. How to test the form

1. Open `/de` or `/en` and scroll to **Kontakt / Contact**.
2. Confirm the dark Turnstile widget appears under the message field.
3. Fill Name, Email, optional Phone, Message; complete Turnstile; submit.
4. Button should show **Wird gesendet … / Sending…** and disable while pending.
5. On success: green success message, fields cleared, Turnstile reset.
6. Check inbox at `chris.noltemeier@gmail.com` (and spam folder).
7. Negative checks:
   - Submit without completing Turnstile → validation error.
   - Wrong/missing server secrets → amber “not configured” or send error (no secrets leaked to the browser).

---

## 6. Where to find logs

### Vercel

1. Vercel project → **Deployments** → open the relevant deployment.
2. **Logs** / **Functions** / **Runtime Logs** for `POST /api/contact`.
3. Server errors are logged with `console.error` (Turnstile/Resend misconfiguration, send failures).

### Resend

1. [resend.com/emails](https://resend.com/emails) — delivery status of sent messages.
2. [resend.com/logs](https://resend.com/logs) — API activity and errors.

### Cloudflare Turnstile

1. Cloudflare Dashboard → Turnstile → your widget → analytics / challenge stats (if enabled).

---

## 7. Checklist

- [ ] All env vars set for Production, Preview, Development
- [ ] Turnstile hostnames include `chrisnoltemeier.de` and `www.chrisnoltemeier.de`
- [ ] Resend domain (or test from) verified; `CONTACT_FROM_EMAIL` valid
- [ ] Redeployed on Vercel after env changes
- [ ] Tested successful submit + reply-to works when replying from Gmail
