# Design Systems de Production — Référentiel Industriel (Ontologie 100%)

> Source : Partie II + III + IV de l'ontologie fournie. Aucune propriété CSS inventée — `<!-- TODO: à compléter -->` là où l'ontologie ne fournit pas de spec.

## Panorama rapide (17 systèmes)

| Design System | Éditeur | Domaine & Projets | Stack / Technologies | Particularité clé |
|---|---|---|---|---|
| **Material Design 3 (Material You)** | Google | Android, Web, Wearables, Cloud | Web Components, Flutter, Jetpack Compose, Angular | Dynamic Theming extrait du fond d'écran utilisateur |
| **Human Interface Guidelines (HIG)** | Apple | iOS, macOS, watchOS, visionOS | SwiftUI, AppKit, UIKit | Spring physics, spatial computing visionOS, continuité tactile |
| **Fluent 2** | Microsoft | Windows 11, Office 365, Teams, Azure | React, React Native, Web Components, iOS, Android | Acrylic/Mica (glassmorphisme maîtrisé), multi-plateforme |
| **Carbon Design System** | IBM | Cloud, IA watsonx, Enterprise | React, Vue, Svelte, Angular, Vanilla SCSS | WCAG AAA strict, visualisation données massives |
| **Polaris** | Shopify | E-commerce, back-office marchands | React, TypeScript, GraphQL | Clarté marchande, saisie catalogue rapide, perf transactionnelle |
| **Atlassian Design System (ADS)** | Atlassian (Jira, Confluence, Trello) | Collaboratif, ticketing | React, Emotion/Compiled, Design Tokens DTCG | Formulaires rigoureux, états asynchrones, badges statut |
| **Lightning Design System (SLDS)** | Salesforce | CRM/ERP mondial | Lightning Web Components (LWC), CSS Custom Properties | Haute densité d'information, flux métier |
| **Primer** | GitHub | Outils dev, code review | ViewComponent (Rails), React, Primer CSS, CSS Tokens | Lisibilité code/diffs, arborescences git, Markdown |
| **Base Design System** | Uber | Mobilité, livraison, temps réel | React, Styletron (CSS-in-JS ultra-rapide) | Contraste extrême lisible en plein soleil / mobilité |
| **Ant Design (AntD)** | Ant Group / Alibaba | Back-offices B2B massifs, Fintech | React, Angular, Vue | +60 composants complexes, la plus volumineuse |
| **Spectrum** | Adobe | Creative Cloud, Photoshop Web | Lit / Web Components natifs, React | Curseurs canvas, roues chromatiques, précision créative |
| **Nordhealth (Nord)** | Nordhealth | Médical, vétérinaire, cliniques | Web Components, CSS natif | Minimise erreur humaine critique, statuts sécurisés |
| **Pajamas** | GitLab | DevOps, CI/CD, revues | Vue.js, GitLab UI, Tailwind | Open Source transparent, architecture collaborative ouverte |
| **Audi UI** | Audi | IVI automobile, Web corporate | CSS, React, Android Automotive | Minimalisme haut de gamme, contrastes nocturnes |
| **Gov.uk Design System** | Gouvernement UK | Services publics | Nunjucks, HTML/CSS sémantique, JS minimal | Référence mondiale a11y inclusive, simplicité cognitive |
| **DSFR (Système de Design de l'État Français)** | DINUM (France) | Portails ministériels, démarches | Vanilla JS, SCSS, Web Components | Conforme RGAA strict |
| **Shadcn UI & Tailwind Ecosystem** | Communauté / Vercel | Next.js, Startups, SaaS modernes | Tailwind CSS, Radix UI, TypeScript | Code Ownership — composants copiés dans le projet, pas de lib fermée |

## Détails par système (fiches résumées)

### Material Design 3 — Google
Stack : Web Components, Flutter, Jetpack Compose, Angular. Tokens DTCG → Style Dictionary → CSS vars / TS / Tailwind. Spécialité : Dynamic Theming (couleur extraite du wallpaper).

### HIG — Apple
Stack : SwiftUI, UIKit, AppKit. Principes : profondeur spatiale, ressorts physiques, cohérence tactile iOS/macOS/visionOS.

### Fluent 2 — Microsoft
Stack : React, React Native, Web Components. Matériaux Acrylic/Mica, micro-interactions subtiles, alignement multi-OS.

### Carbon — IBM
Stack : React, Vue, Svelte, Angular, SCSS. WCAG AAA, visualisation données massives, tokens SCSS/CSS vars. Voir SaaS B2B.

### Polaris — Shopify
Stack : React, TypeScript, GraphQL. Optimisé checkout, catalogues, conversion prix.

### Atlassian ADS
Stack : React, Emotion/Compiled, Design Tokens DTCG. Gestion statuts asynchrones, tickets, formulaires.

### Lightning (SLDS) — Salesforce
Stack : LWC, CSS Custom Properties. Haute densité, bases de données métier.

### Primer — GitHub
Stack : ViewComponent (Rails), React, Primer CSS. Contraste code, diffs, Markdown, git trees.

### Base — Uber
Stack : React, Styletron (CSS-in-JS haute vitesse). Contraste extrême pour mobilité/soleil.

### Ant Design — Ant/Alibaba
Stack : React, Vue, Angular. +60 composants (tables éditables, filtres complexes, charts).

### Spectrum — Adobe
Stack : Lit / Web Components natifs, React. Précision outil créatif (canvas, couleurs).

### Nordhealth — Nord
Stack : Web Components, CSS natif. Critique médical : statuts `danger/alerte/validation` non ambigus.

### Pajamas — GitLab
Stack : Vue.js, GitLab UI, Tailwind. Gouvernance open, décisions publiques.

### Audi UI — Audi
Stack : CSS, React, Android Automotive. Anneaux, minimalisme auto, contrastes nocturnes.

### Gov.uk — UK Government
Stack : Nunjucks, HTML/CSS sémantique, JS minimaliste. Inclusivité, RGAA/WCAG AAA.

### DSFR — DINUM France
Stack : Vanilla JS, SCSS, Web Components. Conforme RGAA, Marianne, accessibilité obligatoire service public FR.

### Shadcn UI — Open Source / Tailwind
Stack : Tailwind CSS, Radix UI (headless a11y), TypeScript. Ni lib NPM fermée ni CDN — code injecté et possédé.

## Anatomie commune (Partie III)
```
Fondations & Jetons: Colors • Typography Scale • Spacing Grid (4/8px) • Shadows (Z) • Border-Radius • Breakpoints • Animation
Atomes: Icons • Buttons • Inputs • Checkboxes • Badges • Tooltips
Molécules/Organismes: Form Groups • Modals • Nav Bar • Data Tables • Dropdowns • Cards • Drawers
Gabarits: Auth Flow • Master-Detail • Empty States • Dashboards
Outillage: Storybook • Stylelint • Style Dictionary • axe-core • Chromatic
```
Norme W3C DTCG (`$value`, `$type`, `$description`) — ex :
```json
{ "color": { "brand": { "primary": { "$value": "#2563eb", "$type": "color", "$description": "Couleur d'action principale" } } }, "spacing": { "base": { "$value": "4px", "$type": "dimension" }, "md": { "$value": "{spacing.base} * 4", "$type": "dimension" } } }
```
Compilé vers CSS vars (`--color-brand-primary`), TS typés, config Tailwind, SCSS, Swift/XML.

<!-- TODO: à compléter — valeurs exactes des tokens (couleurs, espacements, shadows, radius, breakpoints) par système non fournies exhaustivement dans l'ontologie source -->
<!-- TODO: à compléter — mapping détaillé composants ↔ Figma ↔ code pour chaque système, à fournir par l'utilisateur -->

## Usage dans la skill
Pour un projet donné, croiser **Partie IV (matrice décision)** + cette table pour choisir **1 système max** (ou 2 paradigmes max si hybride justifié). Charger ensuite la fiche individuelle `systems/<nom>.md`.
