# VALDUS Namecard

Responsive two-sided digital business cards for VALDUS Interactive, built with React and Vite.

## Development

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

## Production build

```sh
npm run build
npm run test:sites
```

Static output: `dist/client`. A Sites-compatible Worker is also emitted at `dist/server/index.js`.

## Cards

- `?card=COO`: JINNPHA (PAPP), Chief Operating Officer
- `?card=PM`: NATTAPONG (DONUT), Project Manager

Contact details are maintained in `members` in `src/App.jsx`. The team menu reserves CEO, CTO and HR until their contact details are supplied.

Features include TH/EN switching, card flipping, downloadable vCards, email/phone copying, and a 90:54 card aspect ratio.
