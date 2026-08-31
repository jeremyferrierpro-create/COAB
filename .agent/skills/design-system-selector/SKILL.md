---
name: design-system-selector
description: >-
  Utiliser quand il faut définir, choisir ou composer l'identité visuelle
  d'un projet web (paradigme + design system de référence). Déclenche sur
  "design system", "identité visuelle", "style UI", "maquette", "charte
  graphique".
---

# Design System Selector — Sélecteur d'identité visuelle

## Objectif
Choisir **un paradigme visuel + un design system de production** cohérents avec la nature du projet et le brief. Cette skill outille la décision, pas le rendu final.

## Matrice de décision (source : ontologie 100% — Partie IV)

| Nature du projet | Paradigme visuel recommandé | Design System de référence | Raisonnement d'ingénierie |
|---|---|---|---|
| **SaaS B2B & Data Analytics** | Bento Grid + Semi-Flat (Flat 2.0) | **Carbon (IBM)** ou **Ant Design** | Compacité, tri de tables, visualisations complexes, densité d'information |
| **Application Mobile-First Grand Public** | Semi-Flat / Minimalisme tactile | **Material 3 (Material You)** ou **Apple HIG** | Gestuelle tactile intuitive, conventions OS natives, fluidité animations/spring physics |
| **Plateforme Développeurs / Outil Tech** | Néo-Brutalisme / Dark Mode sobre | **Primer (GitHub)** ou **Shadcn UI** | Lisibilité code/diffs, intégration terminal, sentiment outil brut et efficace |
| **Service Public / Santé / Citoyenneté** | Minimalisme Typographique fonctionnel (Swiss/Editorial) | **Gov.uk Design System** ou **DSFR (DINUM)** | Contraste AAA, compatibilité lecteurs d'écran, simplicité cognitive, RGAA |
| **Plateforme E-Commerce & Marketplace** | Flat épuré + cartes Bento | **Polaris (Shopify)** | Friction checkout minimale, conversion optimisée, clarté prix/catalogue |
| **Application Médicale / Industrie Lourde** | Flat contrasté & surfaces sécurisées | **Nordhealth (Nord)** | Évite ambiguïté sur statuts critiques (danger/alerte/validation), minimise erreur humaine |

> Table complète étendue (17 systèmes) disponible dans `references/production-systems.md`. Ontologie complète des 8 paradigmes dans `references/paradigms/*.md`.

## Règle d'or — Composition
**Ne jamais combiner plus de 2 paradigmes visuels pour un même projet.** Au-delà, l'identité se fragmente, l'accessibilité se dégrade et la dette design explose. Le choix doit être **justifié par le brief** (audience, contexte d'usage, contraintes RGAA, objectifs business, stack). Documenter en 2-3 lignes : *pourquoi ce paradigme + ce system, et pourquoi pas les autres*.

Exemples d'anti-patterns :
- Glassmorphisme + Neumorphisme + Néo-brutalisme sur un même dashboard SaaS → illisible.
- Bento + Skeuomorphisme + Cyberpunk sur un service public → rupture cognitive.

## Anatomie technique (rappel DTCG — Partie III)
1. **Fondations & Jetons** : Colors, Typography Scale, Spacing Grid (4/8px), Shadows (Z), Border-Radius, Breakpoints, Animation Curves
2. **Atomes** : Icons, Buttons, Inputs, Checkboxes, Badges, Tooltips
3. **Molécules/Organismes** : Form Groups, Modals, Navigation, Data Tables, Dropdowns, Cards, Drawers
4. **Gabarits & Patterns** : Auth Flow, Master-Detail, Empty States, Dashboards
5. **Outillage & Gouvernance** : Storybook, Stylelint, Style Dictionary, axe-core, Chromatic

Format tokens W3C DTCG (`$value`, `$type`, `$description`) → compilés via Style Dictionary vers CSS variables (`--color-brand-primary`), tokens TS, config Tailwind, SCSS, Swift/XML.

## Instruction d'usage
**Lire uniquement le(s) fichier(s) `references/paradigms/*.md` pertinent(s) au projet en cours — ne pas charger les autres.** Puis consulter `references/production-systems.md` (ou le fichier individuel `references/systems/*.md` du system choisi) pour la stack et les particularités.

<!-- TODO: à compléter — propriétés CSS/spécifications exactes non fournies dans l'ontologie source pour certains tokens/composants -->
