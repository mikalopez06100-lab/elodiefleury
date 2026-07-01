# Élodie Fleury — Site Côte d'Azur

Site vitrine trilingue (FR/ES/EN) pour Élodie Fleury, agente immobilière bilingue à Nice.

## Commandes locales

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Variables d'environnement

Copier `.env.example` vers `.env.local` :

```env
NEXT_PUBLIC_SITE_URL=https://elodiefleury.fr
NEXT_PUBLIC_WHATSAPP_NUMBER=33627121413
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=elodiefleury.fr
```

## Ajouter une photo de bien

1. Placer l'image dans `public/images/properties/`
2. Mettre à jour le tableau `properties` dans `components/sections/Gallery.tsx`
3. Ajouter les traductions (`city`, `title`) dans `i18n/messages/fr.json`, `es.json`, `en.json`

## Modifier une traduction

Éditer les fichiers dans `i18n/messages/` :
- `fr.json` — français (locale par défaut, URL `/`)
- `es.json` — espagnol (URL `/es`)
- `en.json` — anglais (URL `/en`)

## Changer le numéro WhatsApp

1. Mettre à jour `NEXT_PUBLIC_WHATSAPP_NUMBER` dans `.env.local`
2. Ou modifier la valeur par défaut dans `lib/config.ts`

## Stack

- Next.js 14 · TypeScript · Tailwind CSS
- next-intl (i18n) · Framer Motion · next/image
- Déploiement : Vercel

## URLs

| Locale | URL |
|--------|-----|
| FR | `/` |
| ES | `/es` |
| EN | `/en` |
