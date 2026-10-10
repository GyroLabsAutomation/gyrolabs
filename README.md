# Gyro Labs website

Static website for **Gyro Labs** — *Engineered in India. Built for the Future.*
Plain HTML, CSS and JavaScript. No build step, no dependencies. Works on GitHub Pages as is.

## Folder structure

```
gyro-labs/
├── index.html              Home
├── services.html           Services
├── about.html              About
├── contact.html            Contact + inquiry form
├── privacy.html            Privacy policy
├── 404.html                Not-found page
├── robots.txt
├── .nojekyll               Tells GitHub Pages to serve files as they are
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css      All styling (design tokens at the top)
│   ├── js/
│   │   ├── config.js       Email address and optional form endpoint (edit here)
│   │   ├── main.js         Mobile menu, footer year, copy-email button
│   │   └── contact.js      Form validation and sending
│   └── images/
│       ├── logo/           gyro-labs-mark.png, gyro-labs-mark-512.png, gyro-labs-logo-full.png, favicon-64.png, apple-touch-icon.png
│       ├── hero/           hero-robot-cell.svg
│       ├── concepts/       concept-operator-pendant.jpg
│       ├── icons/          icon-*.svg (8 service and value icons)
│       ├── photos/         founder-portrait.jpg
│       ├── renders/        render-workcell-*.jpg (illustrative workcell images)
│       ├── og/             og-share.png (social-share card)
│       └── projects/       future approved project images
└── docs/
    └── image-guide.md      Naming rules and the list of images to supply
```

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `gyro-labs`.
2. Upload everything in this folder to the repository root (so `index.html` is at the top level).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
5. After a minute the site is live at `https://<your-username>.github.io/gyro-labs/`.

Custom domain: in **Settings → Pages → Custom domain**, enter your domain and follow GitHub's DNS instructions.

## Before you go live — checklist

- [ ] Change the `og:image` line in each page to the full URL of `og-share.png`, e.g. `https://<your-username>.github.io/gyro-labs/assets/images/og/og-share.png`.
- [ ] Add the approved founder name and biography to `about.html` (the photo is already in place).
- [ ] Confirm you have the right to publish the three render/visualization images in `concepts/` and `renders/`.
- [ ] Decide how the contact form should send (see below).
- [ ] Review `privacy.html` against the rules that apply to your business.
- [ ] Read through every page once on a phone.

## Contact form

GitHub Pages is static, so it cannot receive form posts on its own.

- **Default (works now):** the form validates the fields, then shows the finished inquiry with a **Copy** button and an **Open in email app** link. It does not claim anything was sent.
- **Automatic sending:** create a form on a service such as Formspree, then paste its URL into `formEndpoint` in `assets/js/config.js`. The form will then send directly, show a success message only after the request succeeds, and fall back to email if it fails. The endpoint URL is public by design; never put secret keys in this repository.

## Editing content

| To change | Edit |
| --- | --- |
| Colors, fonts, spacing | Tokens at the top of `assets/css/styles.css` |
| Email address, form endpoint | `assets/js/config.js` (and the visible address in the HTML pages) |
| A service's text | `services.html` |
| The hero or any illustration | Replace the SVG in `assets/images/`, keeping the same file name |
| Page titles and descriptions | The `<head>` of each page |

## Honesty rules this site follows

No invented clients, logos, certifications, partnerships, awards, testimonials, statistics or years in business. The operator screen is a labelled concept. Gyro Labs is not described as an ABB partner or authorized provider.
