# Neumorphisme (Soft UI)

> Paradigme visuel — Surface extrudée continue | Époque : fin 2019–2020 (Michal Malewicz)

## Origine & Contexte
Popularisé fin 2019/2020. Simulation de plastique extrudé / surface organique continue partageant la couleur du fond.

## Fondements & Construction
- L'élément partage **exactement** la même couleur que son conteneur parent
- Illusion 3D créée exclusivement par double ombre opposée : ombre claire en haut-gauche + ombre sombre en bas-droite
- Propriété clé documentée dans l'ontologie :
  ```css
  box-shadow: -6px -6px 12px #ffffff, 6px 6px 12px #d1d9e6;
  ```

<!-- TODO: à compléter — variantes (pressed/inset), rayons, transitions et tokens DTCG non détaillés dans l'ontologie source -->

## Typologies de projets cibles
- Dashboards domotique (thermostats, télécommandes virtuelles)
- Applications bien-être, concepts portfolios d'expérimentation
- Interfaces de contrôle tactile où l'effet d'extrusion est démonstratif

## Particularités & Compromis
- Esthétique douce, organique, très distinctive
- **Échec critique accessibilité (a11y)** : contrastes de bords < 3:1, sous seuils WCAG
- Faible lisibilité des états actifs/inactifs/focus

## Quand l'utiliser / éviter
- Utiliser uniquement pour concepts / démos, jamais pour service public, santé, e-commerce ou SaaS critique.
- Si choisi, prévoir impérativement une alternative contrastée pour RGAA/WCAG AA.

## Référence production associée
Aucun design system AAA ne le recommande. À titre de contre-exemple pédagogique.
