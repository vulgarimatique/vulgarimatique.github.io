# Vulgarimatique

Référentiel éditorial consacré à la vulgarisation informatique. Le site est construit avec Astro, publié sous forme statique sur GitHub Pages et administrable avec Decap CMS.

## Développement

```bash
npm install
npm run seed
npm run dev
```

Le site local est alors disponible sur `http://localhost:4321`.

## Administration locale

L’interface se trouve sur `/admin/`. Pour autoriser Decap CMS à écrire dans les fichiers pendant le développement :

```bash
npx decap-server
```

Laisser ce processus ouvert, puis lancer le site avec `npm run dev`.

## Publication sur GitHub Pages

1. Créer un dépôt GitHub et y pousser la branche `main`.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Configurer le proxy OAuth de Decap CMS.
4. Ajouter son URL dans **Settings → Secrets and variables → Actions → Variables** sous le nom `DECAP_OAUTH_URL`.
5. Pousser une modification sur `main`.

Le workflow calcule automatiquement l’URL et le sous-chemin GitHub Pages.

### Authentification de l’administration

GitHub Pages ne peut pas conserver le secret OAuth requis par GitHub. `/admin/` nécessite donc un proxy OAuth externe, par exemple un Cloudflare Worker ou un petit service Netlify réservé à l’authentification. La variable `DECAP_OAUTH_URL` doit contenir son URL publique.

## Contenus

- `src/content/notions/` : notions, articles, podcasts et infographies ;
- `src/data/site.json` : informations générales ;
- `src/data/ads.json` : activation et emplacements AdSense ;
- `public/media/` : médias migrés depuis le site Softr.

Les publicités restent désactivées tant que `enabled` vaut `false`. Une intégration de gestion du consentement doit être validée avant leur activation en production.

## Commandes

- `npm run dev` : serveur de développement ;
- `npm run check` : validation Astro et TypeScript ;
- `npm run build` : validation puis build de production ;
- `npm run preview` : prévisualisation du build ;
- `npm run seed` : régénération initiale des 38 notions migrées.
