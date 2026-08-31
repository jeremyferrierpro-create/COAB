# GEMINI.md — Directives de premier niveau

> Ce fichier est la seule règle chargée systématiquement pour ce projet.
> Il reste volontairement court : le détail vit dans `.agents/rules/` et
> `.agents/skills/`, pas ici. Ne duplique pas leur contenu dans ce fichier.

## Nature du projet

Ce dépôt est une **méthodologie de développement web senior**, pas une
application. Il n'y a pas de code applicatif à la racine — c'est un
squelette réutilisable (`.agents/`) destiné à être copié dans de vrais
projets, ou utilisé directement comme guide de travail.

## Où trouver quoi

- **Stack cible et conventions** : @.agents/rules/stack.md
- **Cycle de production complet** (idée → conception → implémentation →
  audits → livraison) : @.agents/workflows/build-cycle.md — invocable
  directement via `/build-cycle`
- **Skills spécialisées** (auto-activées selon la description de la
  tâche) : `.agents/skills/` — 4 skills maison
  (`design-system-selector`, `rgaa-accessibility`, `rgpd-cnil-audit`,
  `security-owasp`) + un sous-ensemble ciblé du vault communautaire listé
  dans `.agents/keep.txt`

## Règles absolues (priorité maximale, non négociables)

1. **Aucun commit, push ou déploiement automatique**, à aucune étape,
   sans confirmation explicite de l'utilisateur.
2. **Trois validations humaines obligatoires** avant tout merge : après
   le scan RGAA, après le scan sécurité (OWASP), après le scan RGPD. Ne
   jamais les sauter ni les fusionner en une seule validation.
3. **Ne jamais générer de contenu réglementaire** (règle RGAA, contrôle
   RGPD/CNIL, catégorie OWASP) de mémoire. Toujours s'appuyer sur les
   fichiers déjà sourcés dans `.agents/skills/*/references/` ou demander
   la source primaire à l'utilisateur si elle manque.
4. **Ne jamais installer de dépendance ni importer de repo tiers** sans
   demande explicite.
5. Si une information manque ou est incertaine (token CSS, valeur
   exacte), le signaler avec `<!-- TODO: à compléter -->` plutôt que de
   l'inventer.

## Style attendu du code produit

- TypeScript partout, conventions détaillées dans `stack.md`
- Sécurité et accessibilité traitées **au fil de l'implémentation**, pas
  reportées en fin de projet
- Un choix de design system se justifie toujours par le brief — jamais
  plus de 2 paradigmes visuels combinés (voir `design-system-selector`)