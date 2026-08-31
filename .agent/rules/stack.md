# Stack — .agents (méthodologie senior)

> **Nature de ce fichier :** contrairement à la version précédente (issue
> d'une analyse réelle d'un dossier vide), ce fichier décrit désormais le
> **stack cible par défaut** de la méthodologie, déduit des skills que tu as
> choisi de garder dans le vault. Ce n'est plus une "détection", c'est une
> **déclaration** — à confirmer ou corriger toi-même projet par projet, et à
> adapter dans `rules/stack.md` de chaque projet réel si un projet utilise
> une stack différente.
>
> **Hypothèse à valider :** tu as gardé à la fois `nextjs-app-router-patterns`
> ET `nodejs-backend-patterns`. Ça peut vouloir dire deux choses différentes :
> (a) un monolithe Next.js avec API Routes/Route Handlers, ou (b) un frontend
> Next.js séparé d'un backend Node/Express indépendant. Ce fichier part sur
> l'hypothèse (a), la plus simple pour un projet solo en formation — dis-moi
> si c'est (b) et je corrige.

## Stack technique cible

- **Langage :** TypeScript (partout — front, back, config)
- **Frontend :** Next.js (App Router), Tailwind CSS pour le styling
- **Backend :** Route Handlers Next.js (API intégrée au même projet) —
  à confirmer selon l'hypothèse ci-dessus
- **Base de données :** PostgreSQL
- **Gestionnaire de paquets :** à définir au démarrage de chaque projet réel
  (npm/pnpm/yarn — noter le choix ici une fois fixé)
- **Dépôt Git :** à initialiser au démarrage de chaque projet réel

## Conventions de nommage

- Dossiers : `kebab-case` (`design-system-selector`, `rgaa-accessibility`)
- Fichiers : `kebab-case.md` + `SKILL.md` en majuscules pour les skills
- Composants React : `PascalCase.tsx`
- Références de skills : `references/<sous-dossier>/<nom>.md`

## Arborescence de référence de la méthodologie

```
.agents/
├── rules/
│   └── stack.md                     (ce fichier)
├── skills/
│   ├── design-system-selector/
│   ├── rgaa-accessibility/
│   ├── rgpd-cnil-audit/
│   └── security-owasp/
└── workflows/
    └── build-cycle.md
```

## Arborescence attendue d'un projet réel utilisant cette méthodologie

```
mon-projet/
├── .agents/                  (copié/lié depuis cette méthodologie)
├── app/                      (Next.js App Router)
├── components/
├── lib/
├── prisma/ ou drizzle/       (ORM — à choisir au démarrage du projet)
└── package.json
```

<!-- Note pour l'agent : ce fichier décrit un stack par défaut/cible, pas
un stack détecté sur un projet vide. Si tu travailles sur un vrai projet et
que sa stack diffère de celle-ci, mets à jour ce fichier avec les vraies
valeurs observées dans le dépôt, comme le faisait la version précédente. -->