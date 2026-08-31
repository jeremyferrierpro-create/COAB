# Skeuomorphisme (Skeuomorphism)

> Paradigme visuel — Philosophie : métaphore physique réaliste | Époque : 1980–2012 (dominant Mac OS X Aqua, iOS 1→6)

## Origine & Contexte
Années 1980–2012. Réplication du monde physique à l'écran pour réduire la rupture cognitive (ex. cuir cousu, papier texturé, verre biseauté, métal brossé).

## Fondements & Construction
- Métaphores visuelles calquées sur objets réels
- Dégradés spectraux photoréalistes, ombres portées douces et intenses (`drop shadows` & `inner shadows`), reflets brillants, textures matérielles
- Assets majoritairement matriciels (PNG haute résolution), gradients radiaux, masques vectoriels

<!-- TODO: à compléter — valeurs CSS exactes (box-shadow, gradients, border) non fournies dans l'ontologie source pour ce paradigme -->

## Typologies de projets cibles
- Émulateurs audio / synthétiseurs virtuels, consoles de mixage VST
- Simulateurs industriels / interfaces analogiques où l'ergonomie physique doit être répliquée fidèlement

## Particularités & Compromis
- Très immersif, repères cognitifs immédiats
- **Limites** : lourd en assets, mauvaise adaptabilité responsive fluide, complexité de rendu CSS pur, peu adapté aux interfaces denses modernes
- Performance : poids réseau élevé, Core Web Vitals pénalisés

## Quand l'utiliser / éviter
- Utiliser si l'immersion physique prime sur la légèreté.
- Éviter pour SaaS dense, dashboards, mobile-first grand public.

## Référence production associée
Aucun design system moderne ne recommande ce paradigme par défaut. Voir `../production-systems.md` — systèmes orientés Flat/Semi-Flat.
