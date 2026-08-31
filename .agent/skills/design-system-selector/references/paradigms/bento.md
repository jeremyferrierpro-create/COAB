# Bento Grid UI (Bento Box Layout)

> Paradigme visuel — Compartiments modulaires géométriques | Époque : 2023–2026 (Apple M-series, Linear, Vercel)

## Origine & Contexte
Popularisé par Apple (puces M-series, widgets iOS), standardisé par Linear, Microsoft en 2023–2026. Inspiré de la boîte à bento japonaise : compartiments asymétriques mais rigoureusement alignés.

## Fondements & Construction
- CSS Grid poussé : `grid-template-columns`, `grid-column: span X`, `grid-row: span Y`
- Cartes indépendantes : `border-radius: 16px–24px`, micro-interactions au survol, animations subtiles internes
- Hiérarchie sans saturation : permet de scanner des flux asymétriques tout en conservant rigidité géométrique

<!-- TODO: à compléter — grille exacte (12 cols ?), gaps, breakpoints et tokens DTCG non fournis dans l'ontologie source -->

## Typologies de projets cibles
- Landing pages SaaS (Linear, Apple, Vercel) — présentation produit
- Dashboards de métriques, portfolios, résumés de fonctionnalités
- Se combine idéalement avec Semi-Flat pour SaaS B2B

## Particularités & Compromis
- Excellente scannabilité, hiérarchisation d'une multitude de fonctionnalités
- Vectoriel léger, performant (Core Web Vitals)
- Risque : sur-utilisation → effet "patchwork" si >12 cartes sans hiérarchie typographique

## Quand l'utiliser / éviter
- Recommandé pour SaaS B2B (avec Carbon/Ant Design) et E-commerce (avec Polaris).
- Peut s'ajouter comme **second paradigme** (max 2 au total) sur service public avec parcimonie.

## Référence production associée
- **Carbon / Ant Design** (B2B), **Polaris** (E-commerce) — voir `../production-systems.md`
