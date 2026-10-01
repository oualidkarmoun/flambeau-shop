# Deploiement Vercel

## Checklist

1. Executer `npm run check`.
2. Verifier que `.env` n'est pas versionne.
3. Redeployer Google Apps Script apres modification.
4. Definir les variables Vercel.
5. Tester `/api/health`, `/api/products`, puis une commande.

## Variables Vercel

```env
NODE_ENV=production
ADMIN_PASSWORD=un-mot-de-passe-long-et-unique
SESSION_SECRET=une-cle-aleatoire-de-plus-de-32-caracteres
CORS_ALLOWED_ORIGINS=https://votre-projet.vercel.app
TRUST_PROXY=true
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/xxx/exec
HF_TOKEN=
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct
```

## Architecture

- `public/` sert le site statique.
- `/api/products` lit et ajoute les produits via Google Apps Script.
- `/api/orders` envoie les commandes via Google Apps Script.
- `/api/contact` envoie les messages via Google Apps Script.
- `/api/chat` utilise Hugging Face cote serveur.

Le disque Vercel est ephemere. Les produits et commandes de production doivent
etre dans Google Sheets, pas dans `data/*.json`.

## Verification apres deploiement

```text
https://votre-projet.vercel.app/api/health
https://votre-projet.vercel.app/api/products
```


## Durcissement checkout / production

Avant de redeployer `google-apps-script.js`, configurez les **Script Properties** dans Google Apps Script:

```text
SHEET_ID=<id de votre Google Sheet>
ADMIN_PASSWORD=<mot de passe admin long et unique>
```

Les valeurs sensibles ne sont plus conservees en dur dans le repository.

Le checkout de production suit maintenant ce flux:

```text
Navigateur
  -> envoie productId + quantite + parfum
Vercel
  -> valide client + format de commande
Google Apps Script (LockService)
  -> detecte les doublons par orderNum
  -> relit les produits depuis Google Sheets
  -> recalcule les prix cote serveur
  -> verifie et decremente le stock
  -> calcule livraison + total
  -> enregistre la commande
```

### Rate limiting partage

Pour eviter qu'un rate limit en memoire soit different sur chaque instance Vercel, ajoutez si possible:

```env
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

Sans ces variables, l'application conserve un fallback local en memoire.

### Monitoring

Les routes backend emettent maintenant des logs JSON structures avec:

- `requestId`
- methode HTTP
- route
- statut
- duree
- evenements de creation/echec de commande

Ils sont consultables dans les logs Vercel.

### Tests

```bash
npm test
npm run check:prod
```

### Stress test lecture

Le script ne cree aucune commande par defaut:

```bash
STRESS_TARGET=https://flambeau-shop.vercel.app npm run stress
```

Il teste successivement 10, 25 et 50 requetes concurrentes sur `/api/health` et `/api/products`.
