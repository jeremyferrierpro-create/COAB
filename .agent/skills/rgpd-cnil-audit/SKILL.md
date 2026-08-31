---
name: rgpd-cnil-audit
description: >-
  Utiliser pour tout audit ou mise en conformité RGPD/CNIL d'un projet web.
  Déclenche sur "RGPD", "CNIL", "données personnelles", "consentement",
  "privacy by design", "droit à l'oubli".
---

# RGPD / CNIL — Travail et Données Personnelles (CNIL mai 2025)

> **Source unique :** 9 synthèses CNIL « L'Atelier RGPD — Travail et données personnelles » (Unités 1→9, PDF fournis par l'utilisateur, mai 2025). Aucune checklist inventée — tout vient des PDFs. Transposé pour audit web (site/app collectant des données RH/utilisateurs).

## 1. Principes transverses — à vérifier sur tout traitement web

- [ ] **Base légale** identifiée parmi 5 RGPD : obligation légale, contrat, intérêt légitime, mission d'intérêt public, consentement. **Attention :** consentement rarement valable en lien de subordination (employeur/collaborateur) → privilégier contrat/intérêt légitime/obligation.
- [ ] **Minimisation** : ne collecter que données **pertinentes et strictement nécessaires** à la finalité (ex. recrutement = données en lien direct avec aptitudes/compétences/diplômes ; annuaire = nom/fonction/coordonnées pro seulement).
- [ ] **Information & droits** : collaborateurs/utilisateurs informés **avant** collecte (notice : existence du traitement, caractéristiques, droits opposition/rectification/effacement/accès/limitation).
- [ ] **Accès** : interne = uniquement habilités pertinents ; externe = données strictement nécessaires + cadre activité destinataire + info préalable. Toujours sous responsabilité de l'employeur/responsable de traitement.
- [ ] **Conservation** : durée légale appliquée si existe ; sinon durée à déterminer selon données/finalités (et justifiée). Ex. contrôle accès locaux : CNIL recommande **3 mois max**.
- [ ] **Sécurité** : mesures **logiques** (antivirus, gestion habilitations) + **physiques** (alarmes, verrouillage) proportionnées aux risques.
- [ ] **AIPD** : si traitement à risque élevé pour droits/libertés → Analyse d'Impact obligatoire. Ressources : référentiel CNIL + listes AIPD CNIL.

## 2. Checklist actionnable — 9 unités CNIL

### Unité 1 — Recrutement
- [ ] Données collectées = uniquement en lien direct et nécessaire avec le poste, évaluant aptitudes/compétences/qualifications (pas de données perso hors sujet).
- [ ] Accès restreint aux seuls chargés de recrutement (managers/dirigeants/RRH).
- [ ] Actions : informer candidats, permettre exercice droits, limiter durée conservation, sécuriser accès.
- [ ] Guide CNIL recrutement utilisé comme aide (non contraignant mais référence).

### Unité 2 — Casier judiciaire (B1/B2/B3) — traitement **interdit par principe**
- [ ] **B1** (toutes condamnations) accessible uniquement magistrats/établissements pénitentiaires — jamais recruteur.
- [ ] **B2** (certaine gravité, hors certaines) accessible autorités admin/organismes privés **seulement si texte le prévoit**.
- [ ] **B3** (crimes/délits graves >2 ans ferme) accessible **uniquement à la personne concernée** sur demande.
- [ ] Vérification B3 par recruteur **seulement** si emploi l'exige avec base légale (ex. journaliste) ; sinon **lien direct poste justifié + vérification visuelle seule**.
- [ ] Pas de copie/conservation du casier — interdiction stricte hors exception.

### Unité 3 — Gestion du personnel : principes + 3 traitements types
**3.1 Principes (voir §1)**
**3.2 Trois missions RH à auditer :**
- [ ] **Annuaires/organigrammes** — Base : intérêt légitime. Données : nom, prénom, fonction, coordonnées pro. Vérifier minimisation.
- [ ] **Évaluation professionnelle** — Base : intérêt légitime. Données : objectifs/résultats, appréciation compétences, observations/souhaits.
- [ ] **Rémunération/paie** — Base : contrat. Données : nom/prénom/adresse, congés, **NIR (N° sécu)**. **NIR autorisé uniquement 3 cas** : fiches de paie, DSN, démarches administratives — vérifier qu'aucun autre usage (ex. identifiant web) n'en fait.

### Unité 4 — Dispositifs d'alertes professionnelles (DAP / whistleblowing)
- [ ] Finalité : **potentielle violation en lien avec activités pro** uniquement.
- [ ] Données : seules pertinentes au regard du recueil/gestion alertes ; informer potentiels lanceurs **avant** signalement.
- [ ] Sécurité : authentification robuste, gestion habilitations, audits réguliers.
- [ ] Confidentialité/anonymat : procédure protège infos/personnes ; **signalement anonyme = bonne pratique CNIL**.
- [ ] Qui informer : **IRP avant mise en place** ; **ensemble des personnes concernées dès mise en place** ; **en cas d'alerte** : auteur (réception, recevabilité, suite) + personnes concernées (existence, caractéristiques, droits) — **exception RGPD** : retarder info si risque disparition preuves/pressions/représailles.
- [ ] Conservation : durée définie par responsable selon objectifs → après décision, **archivage intermédiaire** ; données **anonymisées = pas de limite**. Réf. : référentiel « Alertes pro » CNIL.

### Unité 5 — Télétravail (4 étapes CNIL)
- [ ] **1. Encadrer juridiquement** : accord individuel/collectif ou charte après consultation CSE/CSA.
- [ ] **2. Mesurer risques** : gravité + vraisemblance des risques liés au télétravail.
- [ ] **3. Informer/sensibiliser** : charte sécurité + outils de communication/collab adaptés.
- [ ] **4. Mesures sécurité** : VPN, pare-feu, floutage arrière-plan visio, etc. — **Pas de surveillance permanente** (sauf exception dûment justifiée). Vérifier **proportionnalité** et **absence d'atteinte excessive**.

### Unité 6 — Santé au travail (DMST)
- [ ] **SPST** (Service Prévention Santé au Travail, équipe pluridisciplinaire indépendante) = responsable traitement DMST (Dossier Médical en Santé au Travail).
- [ ] **Employeur** : assure sécurité physique/mentale mais **pas d'accès aux données médicales** ; adapte postes selon préconisations médecin.
- [ ] **Durée** : selon risques d'exposition des travailleurs.
- [ ] **Accès DMST** : restreint aux **pros de santé** (+ autres membres équipe sous supervision médecin).
- [ ] **Continuité** : transmission DMST au nouveau SPST compétent, **sauf opposition travailleur**. Employeur n'a jamais accès.

### Unité 7 — Pouvoir de contrôle de l'employeur (3 conditions cumulatives)
Cocher les 3, sinon dispositif non conforme :
- [ ] **1. Proportionné** : nécessaire à l'objectif + respect droits/libertés.
- [ ] **2. Personnel informé avant** : obligation loyauté/transparence.
- [ ] **3. CSE/CSA informés et consultés avant**.

### Unité 8 — Équipements pro & informatiques (BYOD, messagerie, etc.)
- [ ] Contact **DPO + personnel + CSE/CSA avant installation** — garantie conformité.
- [ ] Contrôle permanent **interdit sauf exception justifiée** par nature tâche + garanties.
- [ ] Buts seuls légitimes : **sécurité systèmes/réseaux + limiter usage privé excessif**.
- [ ] **Poste informatique** : logiciel prise en main = maintenance/téléassistance uniquement ; contenu présumé pro mais dossiers « personnels » = règles particulières.
- [ ] **Téléphone** : écoute/enregistrement uniquement usage précis (ex. formation) et si **pas de moyen moins intrusif**.
- [ ] **Messagerie pro** : secret des correspondances — **seul contenu non privé (pro) consultable** ; privé inaccessible sauf exception (enquête judiciaire).
- [ ] **Internet** : filtrage illicites OK, contrôle usage privé excessif OK (à documenter).
- [ ] **Véhicule géolocalisé** : vérifier usage autorisé + **désactivable**.
- [ ] **BYOD** : décision employeur, enjeux vie perso + sécurité orga — charte dédiée.

### Unité 9 — Accès locaux & contrôle horaires
- [ ] Données **saisies à l'enrôlement** : identité, plages horaires/zones autorisées.
- [ ] Données **générées** : identifiant, localisation dispositif, horodatage.
- [ ] Conditions dispositifs :
  - [ ] Proportionnalité : seules données nécessaires à la finalité.
  - [ ] Libertés/droits respectés.
  - [ ] Pas de surveillance constante.
  - [ ] Communication : collaborateurs informés.
- [ ] Sécurité 3 objectifs : disponibilité système, confidentialité, intégrité.
- [ ] Conservation : **temps nécessaire à la finalité, 3 mois max recommandé CNIL**.

## 3. Workflow d'audit RGPD/CNIL pour l'agent

1. **Cartographier** les traitements du site/app (recrutement, annuaire, paie, télétravail, contrôles...) — lister bases légales.
2. **Tester chaque unité** avec la checklist §2 — cocher chaque sous-point, relever écarts.
3. **Vérifier transversal §1** : minimisation, info/droits, accès, durée, sécurité, AIPD.
4. **Produire rapport** : par unité, conforme / non conforme / N/A + recommandations CNIL (référentiels, guide recrutement, DAP, etc.).
5. **PAUSE** avant merge — comme `workflows/build-cycle.md` : scan RGAA → PAUSE → sécurité → PAUSE → **scan RGPD → PAUSE** → merge.

## 4. Ressources CNIL citées dans les PDFs

- Guide recrutement CNIL, référentiel gestion du personnel, référentiel Alertes professionnelles, document DAP — Problématiques, listes AIPD CNIL.

---

<!-- Source : 9 synthèses CNIL mai 2025 Unités 1-9. Pour RGPD web général (cookies, consentement, privacy by design), compléter avec référentiel CNIL gestion personnel + guide recrutement. TODO si nouveau PDF fourni. -->
