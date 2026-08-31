---
name: rgaa-accessibility
description: >-
  Utiliser pour tout audit ou correction d'accessibilité web (RGAA, WCAG).
  Déclenche sur "accessibilité", "a11y", "RGAA", "WCAG", "contraste",
  "lecteur d'écran", "navigation clavier", "ARIA".
---

# RGAA 4.1.2 — Accessibilité Web (DINUM)

> **Source unique :** PDF officiel RGAA 4.1.2 (131p, DINUM) fourni par l'utilisateur. Aucune checklist inventée — tout vient du référentiel. Vérifié ligne par ligne contre le PDF le 2026-08-30.
>
> **Correction :** la numérotation des sous-sections du cadre légal (§1) a été
> corrigée pour correspondre exactement à la numérotation officielle du PDF
> (une version précédente utilisait 1.2/1.3/1.4/1.5 pour des sections qui sont
> en réalité 1.2.1/1.2.2/1.3/1.4). Le contenu lui-même était déjà correct,
> seuls les numéros cités étaient décalés.

## 1. Cadre légal

### 1.1 Définition (L.114 CASF + 4 principes WCAG)
Handicap = limitation d'activité due à altération durable d'une fonction.
Un service est accessible s'il est **perceptible, utilisable, compréhensible et robuste** (POUR).

### 1.2.1 Qui est concerné (art.47 loi 2005-102)
1. Personnes morales de droit public
2. Personnes privées délégataires de mission de service public / besoins d'intérêt général non industriel/commercial (financée/contrôlée/désignée majoritairement par 1)
3. Personnes privées créées par 1+2 pour mêmes besoins
4. Entreprises CA > 250M€ (moyenne 3 ans France)

**Services :** sites internet/intranet/extranet, progiciels web, apps mobiles, mobilier urbain numérique (partie applicative).
**Exclus :** fournisseurs de services de médias audiovisuels, organismes de droit privé à but non lucratif sans service essentiel ni public handicapé ciblé.

### 1.2.2 Contenus exemptés (hors champ)
Fichiers bureautiques <23/09/2018 (sauf démarche administrative), médias pré-enregistrés <23/09/2020, live, cartes (si info essentielle accessible ailleurs), contenus tiers non contrôlés, reproductions patrimoniales incompatibles, intranet/extranet <23/09/2019 jusqu'à refonte, archives non mises à jour après 23/09/2019.

### 1.3 Norme de référence
**EN 301 549 V2.1.2 (2018-08)** = 50 critères WCAG 2.1 A+AA retenus.
Pour le privé 4°, possible d'utiliser WCAG 2.1 A+AA directement si table de correspondance fournie.

### 1.4 Dérogation charge disproportionnée
Invoquable **au cas par cas**, par fonctionnalité/contenu, si impossibilité raisonnable ou compromission mission/économie.
→ **Toujours listée en déclaration** avec justification, durée et alternative accessible (obligatoire si mission principale de service public). Ne dispense pas de déclaration. Taille/ressources/budget/coûts vs bénéfice handicap pris en compte. Manque de temps/priorité/connaissances = non recevable.

## 2. Méthode d'audit — Comment scanner (chap. 1.5)

### 2.1 Principes
- **Fiable** : prestataire externe / experts formés / audits croisés au choix, mais fiabilité à ta charge.
- **Représentatif** : échantillon obligatoire (voir 2.2).
- **Méthode RGAA** : 106 critères → ~2,5 tests/critère → référence aux tests techniques. Si RGAA non mis à jour depuis 3 ans, tu peux créer tes tests complémentaires.

### 2.2 Échantillon minimal (1.5.2) — à cocher
- [ ] Page d'accueil
- [ ] Page contact (infos/formulaire)
- [ ] Page mentions légales
- [ ] Page accessibilité (avec déclaration)
- [ ] Page plan du site
- [ ] Page d'aide (si existe)
- [ ] Page d'authentification (si existe)
- [ ] **+** 1 page pertinente par type de service / rubrique 1er niveau + recherche
- [ ] **+** 1 document téléchargeable pertinent par type de service
- [ ] **+** Ensemble des pages d'un processus (ex. tunnel commande)
- [ ] **+** Exemples de pages à contenu distinct (tableau, média, illustration, formulaire)
- [ ] **+** 10% de pages tirées au hasard parmi celles-ci
- *Pages = pages web + écrans d'app mobile.*

### 2.3 Base de référence — environnement de test (1.5.3 + 2.4)
Certains critères JS nécessitent **tests de restitution** avec technologies d'assistance + navigateur + OS.
Base minimale = **combinaisons majoritaires utilisées par les personnes handicapées** (ex. NVDA+Firefox/Windows, JAWS+Chrome/Windows, VoiceOver+Safari/macOS & iOS, TalkBack+Chrome/Android — à préciser selon ton contexte).
Si tu connais les postes utilisateurs (intranet), teste sur **leur config réelle**. Sinon, ajoute solutions libres/gratuites ou anciennes versions selon usage.

### 2.4 Règle de test des pages (1.5.4)
Un critère est **non applicable** si :
1. Contenu/fonctionnalité n'existe pas (ex. pas de vidéo)
2. Contenu exempté
3. Contenu sous dérogation avec alternative accessible (sans alternative → reste applicable)

- Un critère est **validé page** si TOUS les éléments passent tous les tests.
- Un seul élément en échec → critère non validé pour la page.
- Pour un processus, un critère n'est validé que s'il l'est sur **toutes** les pages du processus.

### 2.5 Taux de conformité (1.5.5)
- **% RGAA respectés** = critères validés / critères applicables (un critère est applicable dès qu'il l'est sur 1 page de l'échantillon ; validé seulement s'il l'est sur TOUTES les pages de l'échantillon).
- **Taux moyen** = moyenne des taux par page.
- Taux à reporter dans la déclaration + état de conformité.

## 3. Checklist actionnable — 13 thématiques / 106 critères

> Mode d'emploi : pour chaque page de l'échantillon, passe les tests listés. Coche [x] si tous les tests passent, [ ] si un échec, [N/A] si non applicable. Source : chap. 2.2 du PDF.

### Théma 1 — Images (9 critères, 1.1→1.9)
- [ ] **1.1** Chaque image porteuse d'info a une alternative textuelle ? Tests 1.1.1→1.1.8 : `<img>`/role=img, `<area>`, `<input type=image>`, `<svg role=img>`, `<object type=image>`, `<embed>`, `<canvas>` — alt/aria-label/aria-labelledby/title + mécanisme alternatif.
- [ ] **1.2** Chaque image de décoration est ignorée ? Tests 1.2.1→1.2.6 : `alt=""` sans autre alt, ou `aria-hidden=true`/`role=presentation`, pas de `<title>/<desc>`.
- [ ] **1.3** Alternative pertinente et courte (≤80c recommandé) ? Tests 1.3.1→1.3.9 : pertinence alt/title/aria-label/aria-labelledby/<title> SVG ; restitution canvas.
- [ ] **1.4** CAPTCHA/image-test : alternative décrit nature/fonction ? Tests 1.4.1→1.4.7 — pas la solution.
- [ ] **1.5** CAPTCHA a solution d'accès alternative ? Tests 1.5.1→1.5.2 : autre CAPTCHA non graphique OU autre accès sécurisé.
- [ ] **1.6** Description détaillée si nécessaire ? Tests 1.6.1→1.6.10 : `longdesc` (HTML<5), réf. adjacente, lien/bouton adjacent, `aria-describedby`/`aria-labelledby` pour SVG/canvas.
- [ ] **1.7** Description détaillée pertinente ? Tests 1.7.1→1.7.6
- [ ] **1.8** Image-texte remplaçable par texte stylé ? Tests 1.8.1→1.8.6 (hors logo/marque/CAPTCHA où non applicable).
- [ ] **1.9** Légende correctement reliée ? Tests 1.9.1→1.9.5 : `<figure role=figure|group aria-label="même que figcaption">` + `<figcaption>` contenant `<img>`/svg/canvas/object.

### Théma 2 — Cadres (2 critères)
- [ ] **2.1** Chaque `<iframe>/<frame>` a un `title` ? Test 2.1.1
- [ ] **2.2** `title` pertinent ? Test 2.2.1

### Théma 3 — Couleurs (3 critères)
- [ ] **3.1** Info non donnée par couleur seule ? Tests 3.1.1→3.1.6 : mots, indications, images, CSS, médias temporels/non temporels.
- [ ] **3.2** Contraste texte/fond ≥4.5:1 (<24px normal ou <18.5px gras) ou ≥3:1 (≥24px ou ≥18.5px gras) ? Tests 3.2.1→3.2.5 — mécanisme alternative possible. Exclus : logo, décoratif, disabled.
- [ ] **3.3** Contraste composants/éléments graphiques porteurs d'info ≥3:1 vs fond contigu ? Tests 3.3.1→3.3.4 (états, couleurs composant, couleurs contiguës). Exclus : inactif, style natif navigateur, logo, info non essentielle.

### Théma 4 — Multimédia (13 critères, 4.1→4.13)
- [ ] **4.1** Média temporel pré-enregistré a transcription/audiodescription si nécessaire ? Tests 4.1.1→4.1.3 (audio seul, vidéo seule, synchronisé) + cas décoratif/CAPTCHA/test.
- [ ] **4.2** Transcription/audiodescription pertinente ? 4.2.1→4.2.3
- [ ] **4.3** Synchronisé a sous-titres synchronisés si nécessaire ? 4.3.1 + `<track kind="captions">` (4.3.2)
- [ ] **4.4** Sous-titres pertinents ? 4.4.1
- [ ] **4.5** Audiodescription synchronisée si nécessaire ? 4.5.1→4.5.2
- [ ] **4.6** Audiodescription pertinente ? 4.6.1→4.6.2
- [ ] **4.7** Média temporel clairement identifiable par contexte adjacent ? 4.7.1
- [ ] **4.8** Média non temporel a alternative si nécessaire ? 4.8.1→4.8.2 (lien/bouton adjacent)
- [ ] **4.9** Alternative pertinente (même contenu/fonction) ? 4.9.1
- [ ] **4.10** Son auto ≤3s OU contrôlable (stop/volume indép. système) ? 4.10.1 — `<object>/<video>/<audio>/<embed>/<bgsound>`/JS
- [ ] **4.11** Consultation du média temporel contrôlable clavier/pointage ? 4.11.1→4.11.3 (fonctions accessibles + activables)
- [ ] **4.12** Idem média non temporel ? 4.12.1→4.12.2
- [ ] **4.13** Média compatible API d'accessibilité (nom/rôle/valeur/états) OU alternative ? 4.13.1→4.13.2

### Théma 5 — Tableaux (8 critères, 5.1→5.8)
- [ ] **5.1** Tableau de données complexe a résumé ? 5.1.1
- [ ] **5.2** Résumé pertinent ? 5.2.1
- [ ] **5.3** Tableau de mise en forme linéarisable + `role="presentation"` ? 5.3.1
- [ ] **5.4** Titre associé correctement ? 5.4.1 (`<caption>` ou `aria-labelledby`)
- [ ] **5.5** Titre pertinent ? 5.5.1
- [ ] **5.6** En-têtes bien déclarés ? 5.6.1→5.6.4 : `<th>` ou `role=columnheader/rowheader` ; cellule associée → `<td>/<th>`
- [ ] **5.7** Association cellule/en-têtes correcte ? 5.7.1→5.7.5 : `scope=row|col`, `id` unique + `headers`, `role=columnheader/rowheader`. Si 1 ligne/colonne d'en-têtes, `scope` optionnel.
- [ ] **5.8** Tableau de mise en forme n'utilise pas d'éléments de données ? 5.8.1 : pas de `summary`, `<caption>/<th>/<thead>/<tfoot>/role=rowheader` et pas de `scope/headers/axis` sur `<td>`.

### Théma 6 — Liens (2 critères)
- [ ] **6.1** Chaque lien est explicite (intitulé seul OU intitulé+contexte) ? 6.1.1→6.1.4 (texte/image/composite/SVG) + 6.1.5 : nom accessible contient intitulé visible. Cas « ambigu pour tout le monde » = N/A.
- [ ] **6.2** Chaque lien a un intitulé entre `<a>` et `</a>` ? 6.2.1

### Théma 7 — Scripts (5 critères, 7.1→7.5)
- [ ] **7.1** Script compatible AT ? 7.1.1→7.1.3 : nom/rôle/valeur/états via API OU composant alternatif + nom pertinent contenant intitulé visible + rôle pertinent.
- [ ] **7.2** Alternative pertinente ? 7.2.1→7.2.2 (`<noscript>`, page sans JS, langage serveur, alt dans page)
- [ ] **7.3** Contrôlable clavier/pointage + pas de suppression de focus ? 7.3.1→7.3.2 (sauf fonction sans équivalent universel, ex. dessin main levée → N/A)
- [ ] **7.4** Changement de contexte averti/contrôlé ? 7.4.1 : texte avant déclenchement OU bouton/lien explicite.
- [ ] **7.5** Messages de statut restitués ? 7.5.1→7.5.3 : `role=status` (réussite), `role=alert` (erreur/suggestion), `role=log|progressbar|status` (progression) — équivalents `aria-live` tolérés.

### Théma 8 — Éléments obligatoires (10 critères, 8.1→8.10)
- [ ] **8.1** Doctype présent, valide, avant `<html>` ? 8.1.1→8.1.3
- [ ] **8.2** Code source valide (balises/attributs/imbrication/id uniques) ? 8.2.1
- [ ] **8.3** Langue par défaut présente (`lang/xml:lang` sur `<html>` ou parent) ? 8.3.1
- [ ] **8.4** Code langue valide + pertinent ? 8.4.1 (ISO 639-1/2)
- [ ] **8.5** Chaque page a un `<title>` ? 8.5.1
- [ ] **8.6** `<title>` pertinent ? 8.6.1
- [ ] **8.7** Changement de langue indiqué (`lang` sur élément/parent) ? 8.7.1 (N/A noms propres, dictionnaire, moteur recherche)
- [ ] **8.8** Code langue du changement valide/pertinent ? 8.8.1
- [ ] **8.9** Balises non détournées pour présentation (hors div/span/table) ? 8.9.1
- [ ] **8.10** Changement sens de lecture signalé (`dir=ltr|rtl`, pertinent) ? 8.10.1→8.10.2

### Théma 9 — Structuration (4 critères)
- [ ] **9.1** Titres hiérarchisés et pertinents, tout titre balisé `<hx>` ou `role=heading aria-level` ? 9.1.1→9.1.3
- [ ] **9.2** Structure cohérente (HTML5) : `<header>`, `<nav>` (réservé), `<main>` unique visible, `<footer>` ? 9.2.1 — N/A si doctype non HTML5.
- [ ] **9.3** Listes correctement structurées : `<ul>/<ol>/<li>` ou `role=list/listitem` ; `<dl>/<dt>/<dd>` ? 9.3.1→9.3.3
- [ ] **9.4** Citations : `<q>` (courte), `<blockquote>` (bloc) ? 9.4.1→9.4.2

### Théma 10 — Présentation (14 critères, 10.1→10.14)
- [ ] **10.1** CSS pour présentation (pas de balises/attributs de présentation, pas d'espaces pour mise en forme) ? 10.1.1→10.1.3
- [ ] **10.2** Contenu visible reste présent CSS désactivé ? 10.2.1 (fond CSS sans texte caché = échec)
- [ ] **10.3** Info reste compréhensible CSS désactivé (ordre séquentiel) ? 10.3.1
- [ ] **10.4** Zoom 200% sans perte (agrandissement texte ou zoom navigateur) ? 10.4.1→10.4.2 (N/A sous-titres incrustés, image-texte, canvas)
- [ ] **10.5** Couleurs CSS : `color` ↔ `background(-color)` toujours pairées (hérité OK) ? 10.5.1→10.5.3 + image de fond paire
- [ ] **10.6** Lien non évident visible vs texte (contraste 3:1 + indication au survol/focus hors couleur) ? 10.6.1
- [ ] **10.7** Focus visible (natif non supprimé OU style auteur visible) ? 10.7.1
- [ ] **10.8** Contenu caché a vocation à être ignoré OU devient restituable sur action clavier/pointage ? 10.8.1 (`display:none`, `visibility:hidden`, `font-size:0`, `hidden`, `aria-hidden=true`)
- [ ] **10.9** Info non donnée par forme/taille/position seule ? 10.9.1→10.9.4
- [ ] **10.10** Idem, implémenté de façon pertinente ? 10.10.1→10.10.4
- [ ] **10.11** Reflow sans perte : 320px large (horizontal) ou 256px haut (vertical) sans scroll bi-directionnel ? 10.11.1→10.11.2 (N/A images/vidéos/jeux/slides/tableaux)
- [ ] **10.12** Espacement texte redéfinissable sans perte : line-height 1.5, p spacing 2, letter 0.12, word 0.16 ? 10.12.1
- [ ] **10.13** Contenu additionnel au survol/focus contrôlable (masquable, survolable, persistant) ? 10.13.1→10.13.3 (N/A `title` natif, modale WAI-ARIA dialog)
- [ ] **10.14** Contenu additionnel CSS visible au clavier ET au pointage ? 10.14.1→10.14.2

### Théma 11 — Formulaires (13 critères, 11.1→11.13)
- [ ] **11.1** Chaque champ a une étiquette ? 11.1.1→11.1.3 : `aria-labelledby`/`aria-label`/`<label for>`/`title`/bouton adjacent + `id=for`.
- [ ] **11.2** Étiquette pertinente + contient intitulé visible ? 11.2.1→11.2.6
- [ ] **11.3** Étiquettes répétées cohérentes (même page + ensemble de pages) ? 11.3.1→11.3.2
- [ ] **11.4** Étiquette accolée (au-dessus/à gauche pour texte, au-dessous/à droite pour checkbox/radio) ? 11.4.1→11.4.3
- [ ] **11.5** Champs de même nature regroupés si nécessaire ? 11.5.1 : `<fieldset>` ou `role=group` / `role=radiogroup`
- [ ] **11.6** Regroupement a légende ? 11.6.1
- [ ] **11.7** Légende pertinente ? 11.7.1
- [ ] **11.8** Liste de choix regroupée pertinemment (`<optgroup label>`, label pertinent) ? 11.8.1→11.8.3 — `role=listbox` = non conforme si regroupement nécessaire.
- [ ] **11.9** Intitulé bouton pertinent + contient intitulé visible ? 11.9.1→11.9.2 (`aria-label/aria-labelledby/value/<button>/alt/title`)
- [ ] **11.10** Contrôle de saisie pertinent (obligatoire visible + `required`/`aria-required`, erreur visible + `aria-invalid`, format visible) ? 11.10.1→11.10.7
- [ ] **11.11** Suggestion correction si nécessaire (type/format + exemple) ? 11.11.1→11.11.2
- [ ] **11.12** Formulaire données/test/financier/juridique récupérable (modifier/annuler OU vérifier avant OU confirmation explicite checkbox/étape) ? 11.12.1→11.12.2
- [ ] **11.13** Autocomplétion pertinente (`autocomplete` avec valeur HTML5.2 valide) ? 11.13.1

### Théma 12 — Navigation (11 critères, 12.1→12.11)
- [ ] **12.1** 2 systèmes de navigation min (menu+plan, menu+recherche, recherche+plan) ? 12.1.1 — N/A site 1 page ou processus.
- [ ] **12.2** Menu/barres toujours même place/ordre source ? 12.2.1
- [ ] **12.3** Plan du site pertinent (représentatif, liens fonctionnels, bonnes destinations) ? 12.3.1→12.3.3
- [ ] **12.4** Accès plan identique, même place/ordre ? 12.4.1→12.4.3
- [ ] **12.5** Moteur recherche atteignable identiquement, même place/ordre ? 12.5.1→12.5.3
- [ ] **12.6** Zones (header/nav/main/footer/recherche) atteignables/évitables (landmark OU titre OU bouton masquer OU lien d'évitement OU lien accès rapide) ? 12.6.1
- [ ] **12.7** Lien d'évitement/accès rapide au contenu principal présent, même place/ordre, visible au focus, fonctionnel ? 12.7.1→12.7.2
- [ ] **12.8** Ordre de tabulation cohérent (y compris après insertion JS) ? 12.8.1→12.8.2
- [ ] **12.9** Pas de piège clavier (tab suivant/précédent atteignable OU mécanisme informé) ? 12.9.1
- [ ] **12.10** Raccourci 1 touche contrôlable (désactiver OU reconfigurer avec modificateur OU actif seulement au focus) ? 12.10.1
- [ ] **12.11** Contenu additionnel au survol/focus/activation atteignable au clavier si interactif ? 12.11.1

### Théma 13 — Consultation (12 critères, 13.1→13.12)
- [ ] **13.1** Limite de temps contrôlable (arrêter/relancer OU x10 OU avertir+20s OU ≥20h) ? 13.1.1→13.1.4 (rafraîchissement `<meta>/<object>/<svg>/<canvas>`, redirection immédiate ou contrôlée, session). N/A si essentiel.
- [ ] **13.2** Pas d'ouverture nouvelle fenêtre sans action ? 13.2.1
- [ ] **13.3** Document bureautique téléchargeable a version accessible si nécessaire ? 13.3.1 (compatible OU HTML) — exempté <23/09/2018 pour privé 2-4.
- [ ] **13.4** Version accessible même info ? 13.4.1
- [ ] **13.5** Contenu cryptique (ASCII art/émoticône) a alternative (`title` ou contexte) ? 13.5.1
- [ ] **13.6** Alternative pertinente ? 13.6.1
- [ ] **13.7** Flash <3/s OU surface cumulée ≤21824px ? 13.7.1→13.7.3 (img/vidéo/svg/canvas/script/CSS)
- [ ] **13.8** Mouvement/clignotement ≤5s OU contrôlable (stop/masquer/afficher sans mouvement) ? 13.8.1→13.8.2
- [ ] **13.9** Consultation possible portrait ET paysage (même contenu) ? 13.9.1 — N/A orientation essentielle (jeu, piano).
- [ ] **13.10** Geste complexe → alternative geste simple (multipoint → 1 point, trajectoire → 1 point) ? 13.10.1→13.10.2 — N/A si geste essentiel (signature).
- [ ] **13.11** Action point unique annulable (au relâcher, ou annulation avant/après, ou mécanisme abandon) ? 13.11.1
- [ ] **13.12** Fonction mouvement appareil → alternative interface + désactivable ? 13.12.1→13.12.3 — N/A si essentiel (podomètre).

## 4. Après le scan — Déclaration & obligations

### 4.1 Déclaration d'accessibilité (1.6)
**Contenu obligatoire :**
- État : **totalement conforme** (100% critères respectés) / **partiellement conforme** (≥50%) / **non conforme** (<50% ou pas d'audit valide)
- Liste contenus non accessibles : non-conformités + contenus exemptés + dérogations (avec justification/durée/alternative)
- Dispositif contact accessible (mail/formulaire) + mention Défenseur des droits si pas de réponse satisfaisante
- Résultats : % RGAA respectés (+ taux moyen facultatif)

**Validité :** à la publication, MAJ si refonte OU 3 ans OU 18 mois après nouvelle version du RGAA (recommandé plus souvent).
**Publication :** page `/accessibilite` accessible depuis **accueil et toute page**, format accessible, dépôt via téléservice ministériel. Pour app mobile : sur site éditeur + état dans l'app.

**Modèle à copier (1.6.1) :**
```
[Organisme] s'engage à rendre [site/app] accessible conformément à l'art.47 loi 2005-102.
Stratégie : [lien schéma pluriannuel + plan action année en cours].
Cette déclaration s'applique à [nom site/app].
ÉTAT DE CONFORMITÉ : totalement/partiellement/non conforme (RGAA 4.1.2).
RÉSULTATS : X% critères respectés, taux moyen Y% — [lien rapport].
CONTENUS NON ACCESSIBLES : [liste + alternatives]
ÉTABLISSEMENT : établie le JJ/MM/AAAA, MAJ le ...
TECHNOS : [liste] | ENVIRONNEMENT TEST : [combinaisons lecteur+navigateur+OS]
PAGES VÉRIFIÉES : [liste échantillon]
CONTACT : [formulaire/mail] | RECOURS : Défenseur des droits https://formulaire.defenseurdesdroits.fr/
```

### 4.2 Mentions obligatoires (1.8)
- **Page d'accueil :** affiche « Accessibilité : totalement conforme » / « partiellement conforme » / « non conforme » (cliquable vers déclaration).
- **Page accessibilité :** contient déclaration + lien schéma pluriannuel + lien plan action année (URL conseillée `/accessibilite`).

### 4.3 Schéma pluriannuel (1.7, max 3 ans)
Contient : politique handicap/numérique, référent accessibilité (rôle/missions), RH/finances, fiches de poste/recrutement, formation, ressources externes/outillage, orga interne/contrôle, clauses marchés (appels d'offres, recette, conventions).
+ Travaux : nouveaux projets, tests utilisateurs handicapés, audits prévus, correctifs avec calendrier priorisé, mesures non obligatoires (LSF, FALC, AAA), bilan annuel.
Publié en ligne, liens depuis déclaration, format accessible. Plan d'action annuel qui en découle.

## 5. Workflow pour l'agent (comment utiliser cette skill)

1. **Cadrer l'échantillon** (2.2) avec le humain — lister les pages. Ne pas scanner 1 URL isolée.
2. **Choisir la base de référence** (NVDA/JAWS/VO + Chrome/Firefox/Safari) — documente-la pour la déclaration.
3. **Scanner chaque page** avec la checklist §3 — marque chaque critère C/NC/NA + capture/axe-core.
4. **Calculer les 2 taux** (1.5.5) — % global et moyenne.
5. **Rédiger la déclaration** (modèle §4.1) + mention accueil + page accessibilité.
6. **Proposer le schéma/plans** si l'organisme est public/grand compte.
7. **PAUSE** avant merge — comme `workflows/build-cycle.md` : scan RGAA → PAUSE → sécurité → PAUSE → RGPD → PAUSE.

## 6. Références croisées

- WCAG 2.1 : chaque critère porte sa référence EN 301 549 + technique WCAG (ex. 1.1 → 9.1.1.1 Non-text Content, F65/H24...).
- Glossaire PDF §2.3 : définitions « accessible au clavier », « accolés », « alternative », « CAPTCHA », « changement de contexte », etc. — à consulter si un test est ambigu.
- Dépôt GitHub RGAA : `criteres.json` / `glossaire.json` (errata 4.1.2).

---

<!-- Source : PDF RGAA 4.1.2 — 131 pages, vérifié section par section le
2026-08-30 (échantillon, taux, seuils de contraste, 106 critères/13 thèmes,
déclaration, schéma pluriannuel — tout confirmé exact). Seule correction :
numérotation §1 alignée sur le PDF officiel (1.2.1/1.2.2/1.3/1.4 au lieu de
1.2/1.3/1.4/1.5). Ne complète pas hors PDF sans valider. -->