# Minimalisme Éditorial & Typographique (Swiss Style / Editorial Web)

> Paradigme visuel — Grille suisse, whitespace, type comme interface | Époque : École suisse 1950 → web moderne

## Origine & Contexte
Transposition du Style typographique international (école suisse) au web interactif. La typographie EST l'interface.

## Fondements & Construction
- Typographies Serifs élégantes ou Grotesk géométriques en très grande taille (modulaire)
- Élimination des bordures de cartes : structure par rythme vertical et whitespace, grille modulaire stricte
- Micro-animations texte/scroll : `smooth scroll`, masquage dynamique
- Échelle modulaire documentée :
  ```css
  font-size: clamp(1rem, 4vw, 3.5rem);
  /* unités relatives : rem, ch, interlignage mathématique */
  ```

<!-- TODO: à compléter — scale exacte (ex. 1.250 major third), grille 4/8px, line-height, letter-spacing et tokens DTCG non fournis -->

## Typologies de projets cibles
- Médias en ligne, revues culturelles, maisons de luxe
- Portfolios d'architectes/designers, publications littéraires
- Services publics / santé où la lisibilité prime (variante fonctionnelle)

## Particularités & Compromis
- Exige rigueur mathématique extrême sur l'échelle et la grille
- Très élégant, intemporel, mais pauvre en affordance si mal hiérarchisé
- Excellent pour contraste AAA quand bien réglé

## Quand l'utiliser / éviter
- Recommandé pour Service Public / Santé (avec Gov.uk/DSFR) — Minimalisme typographique fonctionnel.
- Éviter pour dashboards denses sans hiérarchie typographique forte.

## Référence production associée
- **Gov.uk Design System** / **DSFR** — voir `../production-systems.md`
