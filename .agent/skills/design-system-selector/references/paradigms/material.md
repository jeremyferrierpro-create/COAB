# Material & Flat Design (Material 3 / Flat 1.0 & 2.0 / Semi-Flat)

> Paradigme visuel — Aplat, vectoriel, systémique | Époque : 2010 (Metro) → 2013 (iOS 7) → Material 3 (2021+)

## Origine & Contexte
- **Flat 1.0** (2010–2013, Windows Phone Metro, iOS 7) : suppression totale de la 3D, aplats vifs, sans ombres/biseaux, sans-serif austère.
- **Flat 2.0 / Semi-Flat** : correction affordance → réintroduction ombres subtiles, micro-élévations, hiérarchie douce.
- **Material 3 (Material You)** : évolution Google 2021+, Dynamic Theming extrait du fond d'écran.

## Fondements & Construction
- 100% vectoriel (SVG), scalable, hyper-léger → Core Web Vitals maximaux
- Semi-Flat : ombres douces, hiérarchie Z subtile, élévations
- Material 3 : système de couleur dynamique, tokens DTCG, élévation + forme + mouvement normalisés
- Stack documentée : Web Components, Flutter, Jetpack Compose, Angular (Material)

<!-- TODO: à compléter — valeurs exactes d'élévation Material (0dp–5dp), courbes d'animation, scale typographique et tokens DTCG non exhaustifs dans l'ontologie source -->

## Typologies de projets cibles
- SaaS, portails d'entreprise, dashboards de données denses (Flat 2.0)
- Applications Mobile-First Grand Public (Material 3 / Apple HIG) — gestuelle tactile, conventions OS

## Particularités & Compromis
- Haute maintenabilité, performances, accessibilité correcte par défaut
- Moins distinctif visuellement (risque d'uniformisation) — compenser par bento ou typographie éditoriale si besoin

## Quand l'utiliser / éviter
- Choix par défaut pour SaaS B2B, mobile grand public et dashboards — safe et scalable.
- Se combine bien avec Bento comme second paradigme (limite 2).

## Référence production associée
- **Material Design 3 (Google)** — Dynamic Theming
- **Carbon / Ant Design** — variante B2B du Semi-Flat
Voir `../production-systems.md` et `../systems/material-design-3.md`.
