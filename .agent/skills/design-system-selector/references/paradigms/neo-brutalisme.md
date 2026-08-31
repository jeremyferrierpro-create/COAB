# Néo-Brutalisme (Neo-brutalism / Brutalisme Web)

> Paradigme visuel — Brut, contrasté, mémorable | Époque : héritage 1950 → réinventé 2021+ (Gumroad, Figma)

## Origine & Contexte
Hérité de l'architecture brutaliste, réinventé pour le web 2021–présent. Deux variantes :
- **Brutalisme pur** : HTML brut non stylisé, monospace (Courier/Times), fonds blancs/primaires agressifs, liens soulignés.
- **Néo-brutalisme moderne** : bordures noires franches, ombres dures sans flou, palettes ultra-saturées.

## Fondements & Construction
- Bordures épaisses documentées :
  ```css
  border: 2px solid #000;
  box-shadow: 4px 4px 0px #000; /* ombre dure, 0 blur */
  ```
- Palette : jaune canari, violet électrique, vert menthe (ultra-saturées)
- Typographies grasses percutantes, grandes tailles

<!-- TODO: à compléter — échelle typographique exacte, grille, radius (souvent 0) et tokens DTCG non détaillés dans l'ontologie source -->

## Typologies de projets cibles
- Outils pour développeurs / plateformes créateurs (Gumroad)
- Portfolios d'agences, e-commerce D2C, hackathons, Web3 ciblé
- Produits cherchant la différenciation radicale

## Particularités & Compromis
- Score contraste naturellement élevé (noir sur fond vif) → bon pour a11y si bien géré
- Très mémorable, affranchi des conventions lisses
- Risque : fatigue visuelle, perception "agressive" pour audiences grand public / service public

## Quand l'utiliser / éviter
- Parfait pour outil dev / créateur (couplé à Primer/Shadcn).
- À éviter pour service public, santé, médical/industrie.

## Référence production associée
- **Primer (GitHub)** ou **Shadcn UI** — voir `../production-systems.md`
