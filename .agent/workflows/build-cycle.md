---
name: build-cycle
description: >-
  Cycle de développement complet d'un projet web, de l'idée initiale à la
  livraison, avec planification, conception, implémentation, tests et
  validation humaine obligatoire après chaque scan de conformité.
---

# Build Cycle — Cycle de production web complet

> Ce workflow enchaîne les skills conservées dans le vault (voir
> `keep.txt`) dans l'ordre d'un vrai processus professionnel. La plupart des
> skills du vault global s'activent **automatiquement** par correspondance
> de description — tu n'as normalement pas besoin de les invoquer par leur
> nom. Sur Devin, une seule skill peut être active à la fois : nomme-la
> explicitement si l'auto-activation choisit la mauvaise étape.

## Phase 0 — Cadrage de l'idée

Objectif : transformer une idée floue en brief exploitable avant tout code.

1. Décrire le projet en langage naturel (qui, quoi, pour qui, contraintes).
2. Créer une piste de travail : **`conductor-new-track`** — génère la
   spécification et le plan d'implémentation phasé.
3. Identifier les phases 4°/1°/2°/3° de l'article 47 applicables (public
   visé) — détermine si RGAA est une obligation légale ou une bonne
   pratique pour ce projet précis.

→ **Sortie attendue :** un fichier de spec (via Conductor) que tu relis et
valides avant de passer à la conception.

## Phase 1 — Conception

1. **Architecture** : `backend-architect` s'active sur "comment structurer
   l'API/les services" — définit les frontières de service, le choix
   REST/GraphQL.
2. **Modèle de données** : `database-architect` pour le schéma PostgreSQL ;
   utilise `sql-pro`/`sql-optimization-patterns` dès que des requêtes
   complexes apparaissent.
3. **Identité visuelle** : `design-system-selector` (skill maison) —
   matrice de décision paradigme + design system, jamais plus de 2
   paradigmes combinés.
4. **Schémas** : `mermaid-expert` pour tout diagramme de séquence,
   d'architecture, ou de flux (pas un vrai MCD/MLD Merise — reste sur
   StarUML pour ça, comme convenu).

→ **PAUSE : relis l'architecture et le choix de design avant de coder.**
Une erreur de conception coûte 10x plus cher à corriger après coup — c'est
le moment de challenger les choix, pas après 200 lignes de code.

## Phase 2 — Planification de l'implémentation

1. **`conductor-new-track`** découpe la spec en tâches phasées.
2. **`conductor-status`** pour voir l'avancement à tout moment.
3. **`track-management`** pour créer/archiver/renommer des pistes de
   travail au fil du projet.

## Phase 3 — Implémentation (boucle par fonctionnalité)

Pour chaque tâche de la piste Conductor :

1. **`conductor-implement`** exécute la tâche en suivant un cycle TDD.
2. Le code s'appuie automatiquement sur `typescript-pro`/`javascript-pro`,
   `nextjs-app-router-patterns`, `nodejs-backend-patterns`,
   `api-design-principles` selon ce que la tâche touche.
3. **`frontend-developer`** + `tailwind-design-system` + `ui-ux-designer`
   pour toute tâche UI — doivent respecter la skill
   `design-system-selector` choisie en Phase 1, pas réinventer un style.
4. Sécurité **au fil de l'eau**, pas en fin de projet :
   `backend-security-coder` et `frontend-security-coder` s'activent sur
   toute tâche touchant saisie utilisateur, auth, ou requêtes DB.
   `auth-implementation-patterns` dès qu'il y a login/session/token.
5. **Tests** : `unit-testing-test-generate` à chaque fonction non triviale,
   `e2e-testing-patterns` à chaque parcours utilisateur complet.

→ Chaque tâche se termine par un commit atomique. Pas de merge en Phase 3 —
le merge n'arrive qu'après les 3 scans de la Phase 4.

## Phase 4 — Scans de conformité (bloquants, dans cet ordre précis)

### 4.1 Scan RGAA
`rgaa-accessibility` (skill maison) audite l'échantillon de pages contre
les 106 critères. En complément : `wcag-audit-patterns`,
`accessibility-compliance-accessibility-audit`, et
`screen-reader-testing` pour la vérification manuelle NVDA/JAWS/VoiceOver
que le PDF RGAA exige et qu'aucune skill ne peut automatiser entièrement.

→ **PAUSE : validation humaine obligatoire.** Tu dois toi-même juger si le
taux de conformité obtenu est acceptable pour ce projet — ce n'est pas une
décision que l'agent peut prendre à ta place.

### 4.2 Scan sécurité
`security-owasp` (skill maison, Top 10:2025) + `security-auditor` pour la
vue d'ensemble + `sast-configuration`/`security-scanning-security-sast`
pour l'analyse statique automatisée +
`security-scanning-security-dependencies` pour l'audit des dépendances
(SBOM, CVE) + `threat-modeling-expert` si le projet a une surface
d'attaque non triviale (paiement, données sensibles).

→ **PAUSE : validation humaine obligatoire.** Une faille de sécurité non
corrigée avant merge est le pire moment pour la découvrir.

### 4.3 Scan RGPD
`rgpd-cnil-audit` (skill maison) sur les traitements de données du projet.

→ **PAUSE : validation humaine obligatoire.**

## Phase 5 — Livraison

1. Merge uniquement après les 3 PAUSE validées explicitement.
2. Déclaration d'accessibilité publiée si RGAA applicable (voir skill
   `rgaa-accessibility` §4).
3. Documentation finale : `docs-architect` ou `api-documenter` si le
   projet expose une API à documenter pour un tiers.
4. Aucun déploiement ni commit automatique à aucune étape de ce workflow —
   toute action qui modifie l'état réel du projet attend ta confirmation
   explicite.

---

<!-- Ce fichier remplace l'ancien build-cycle.md (5 étapes design→scans→
merge). Il couvre maintenant tout le cycle de vie, de l'idée à la
livraison, en intégrant les skills du vault conservées dans keep.txt.
Aucune étape n'autorise un commit/push/deploy automatique. -->