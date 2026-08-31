# Rétro / Y2K & Cyberpunk (Retro Web / Dark Sci-Fi)

> Paradigme visuel — Nostalgie 90s + futurisme néon | Époque : Win95/GeoCities → Cyberpunk 2020+

## Origine & Contexte
- **Y2K / Win95** : nostalgie fin 90s (Windows 95, GeoCities) — fenêtres grises biseautées, pixel-art, cursors personnalisés, typographies matricielles.
- **Cyberpunk / Dark Sci-Fi** : futurisme sombre high-tech — fonds noir profond, accents néons, scanlines, glitch.

## Fondements & Construction
- Y2K : barres de titre grises biseautées, icônes pixel-art, biseaux ` outset `
- Cyberpunk documenté :
  ```css
  background: #0a0a0c;
  color: #00f0ff; /* cyan néon */
  /* + magenta #ff003c, angles coupés */
  clip-path: polygon(0 0, 90% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%);
  /* + scanlines / glitch SVG/Canvas */
  ```

<!-- TODO: à compléter — valeurs exactes de glitch, animations, fonts matricielles et tokens DTCG non fournies -->

## Typologies de projets cibles
- Gaming, streaming, Web3, hackathons, cybersécurité
- Plateformes à forte identité sous-culture numérique, audiences niches

## Particularités & Compromis
- Identité extrêmement forte et mémorable
- Très ciblée : rebute le grand public / service public, risque accessibilité si contrastes néons mal gérés
- Effets Canvas/SVG gourmands en perf

## Quand l'utiliser / éviter
- Utiliser pour produit gaming/Web3 où l'audience attend cette esthétique.
- À proscrire pour service public, santé, médical, e-commerce grand public.

## Référence production associée
Aucun design system AAA générique — identité sur-mesure. Voir `../production-systems.md` pour contre-exemples.
