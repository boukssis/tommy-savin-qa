# Tommy Savin QA

Independent construction quality assurance consultancy website.

## Develop

```bash
npm install
npm run dev
```

## Contact form

The public enquiry route is LinkedIn until a verified business email is available. To enable the form, set these environment variables and redeploy:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (a sender address verified with Resend)

No phone number, email address or street address is invented in the site.

## Footer credit

`NEXT_PUBLIC_BAKSEEZ_URL` turns “Bakseez Labs” into a link. Leave it empty to keep the credit as text.

## Canonical URL

Set `NEXT_PUBLIC_SITE_URL` to the final domain so metadata, the sitemap and structured data use it.
