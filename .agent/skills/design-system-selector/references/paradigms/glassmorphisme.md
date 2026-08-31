# Glassmorphisme (Frosted Glass / Glassmorphism)

> Paradigme visuel — Verre dépoli flottant | Époque : Windows Vista Aero Glass → modernisé macOS Big Sur, iOS, Fluent 2

## Origine & Contexte
Popularisé par Windows Vista (Aero Glass), modernisé par Apple (macOS Big Sur, iOS) et Microsoft Fluent 2. Effet de verre semi-transparent flottant au-dessus d'un fond coloré/animé.

## Fondements & Construction
- Transparence semi-floue + reflets fins + bordure lumineuse + ombre diffuse douce
- Propriétés maîtresses documentées :
  ```css
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  /* + box-shadow diffuse douce */
  ```

<!-- TODO: à compléter — valeurs exactes d'ombre, blur alternatifs (8–24px), opacités et tokens DTCG non exhaustifs dans l'ontologie source -->

## Typologies de projets cibles
- Overlays d'OS modernes, navigation flottante, modals contextuels
- Fintechs haut de gamme, dashboards premium
- Systèmes avec arrière-plan coloré / animé où la hiérarchie par transparence a du sens

## Particularités & Compromis
- Esthétique sophistiquée, hiérarchie par profondeur
- **Performance** : dépend fortement du GPU ; `backdrop-filter` imbriqué dégrade les terminaux mobiles modestes
- Accessibilité : veiller au contraste du texte sur fond flou (WCAG AA)

## Quand l'utiliser / éviter
- Utiliser avec parcimonie (1–2 surfaces max), jamais en grille dense.
- Éviter sur mobile low-end ou pour contenus critiques nécessitant AAA.

## Référence production associée
- **Fluent 2 (Microsoft)** — matériau *Acrylic* maîtrisé
- **Apple HIG** — effets de profondeur visionOS
Voir `../production-systems.md`.
