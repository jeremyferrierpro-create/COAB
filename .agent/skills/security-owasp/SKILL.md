---
name: security-owasp
description: >-
  Utiliser pour tout diagnostic ou correction de vulnérabilités de sécurité
  web. Déclenche sur "sécurité", "faille", "vulnérabilité", "injection",
  "XSS", "CSRF", "OWASP", "audit sécurité".
---

# OWASP — Sécurité Web (Top 10 & Bonnes Pratiques)

> **Source :** OWASP Top 10:2025 officiel, référentiel **final et publié**
> (owasp.org/Top10/2025 — 8ème édition, annoncée AppSec DC nov. 2025,
> version finale début 2026). Les 10 catégories ci-dessous sont extraites
> des 10 pages officielles individuelles (consultées le 2026-08-29).
> Basé sur ~2,8M d'applications testées, 175k CVE, 589 CWE analysées,
> 248 CWE réparties dans les 10 catégories. Aucune checklist inventée.
>
> **Correction historique :** une version précédente de cette skill
> indiquait le Top 10:2025 comme "non publié" — erreur de sourcing
> corrigée. Voir §4 pour le mapping avec l'ancien référentiel 2021.

## 0. Version de référence

- **Actuelle et primaire : OWASP Top 10:2025.**
- **2 nouvelles catégories** vs 2021 : **A03 Software Supply Chain
  Failures** et **A10 Mishandling of Exceptional Conditions**.
- **1 consolidation majeure** : le SSRF (A10:2021) est absorbé dans
  **A01:2025 Broken Access Control**.
- Traduction FR officielle : disponibilité non confirmée sur
  owasp.org/Top10/2025 au moment de cette rédaction — à vérifier.

## 1. Checklist actionnable — Top 10:2025 (à cocher par page/API)

> Pour chaque catégorie : tester via SAST/DAST/IAST + revue de code +
> pentest. [x] prévention en place, [ ] faille, [N/A] non applicable.

### A01 — Broken Access Control (#1, inchangé — 40 CWEs, 3.74% avg, présent dans 100% des apps testées)
**Absorbe désormais le SSRF** (CWE-918, ex-A10:2021).
**Description :** violation du principe deny-by-default, contournement des
contrôles par manipulation d'URL/état HTML/requêtes API, IDOR (accès au
compte d'un autre utilisateur via son identifiant), API POST/PUT/DELETE
sans contrôle, élévation de privilège, JWT/cookie rejoués, CORS mal
configuré, force browsing vers pages admin.
**Tests :**
- [ ] Modifier un paramètre `?acct=` vers un autre compte → accès bloqué ?
- [ ] Accès direct à une URL admin (`/admin_getInfo`) sans passer par le
      frontend (`curl` direct) → bloqué côté serveur, pas juste en JS ?
- [ ] SSRF : un paramètre acceptant une URL ne permet pas d'atteindre le
      réseau interne / métadonnées cloud (`169.254.169.254`) ?
- [ ] CORS restreint aux origines de confiance, pas de wildcard `*` avec
      credentials ?
- [ ] Directory listing désactivé, `.git`/backups absents du webroot ?
**Prévention :** deny by default sauf ressources publiques, contrôle
d'accès implémenté une seule fois et réutilisé, modèle basé sur la
propriété des enregistrements (pas de CRUD universel), rate limiting sur
API/contrôleurs, JWT stateless à courte durée + refresh token OAuth pour
révocation, invalidation serveur des sessions au logout.

### A02 — Security Misconfiguration (#2, bond depuis #5 en 2021 — 16 CWEs, 3.00% avg, 100% des apps testées)
**Description :** durcissement manquant sur une couche quelconque de la
stack, permissions cloud mal configurées, fonctionnalités/comptes par
défaut non désactivés, messages d'erreur trop verbeux (stack trace),
en-têtes de sécurité absents.
**Tests :**
- [ ] Comptes/mots de passe par défaut désactivés sur consoles admin ?
- [ ] Environnements dev/QA/prod configurés identiquement, avec des
      identifiants distincts (processus reproductible et automatisé) ?
- [ ] Erreurs applicatives : pas de stack trace ni de version de composant
      exposée à l'utilisateur ?
- [ ] Permissions de stockage cloud (buckets S3 etc.) revues, pas
      d'ouverture par défaut sur Internet ?
- [ ] En-têtes de sécurité envoyés (CSP, HSTS, X-Frame-Options...) ?
**Prévention :** processus de durcissement reproductible et automatisé,
plateforme minimale (retirer fonctionnalités/échantillons inutiles),
vérification automatisée de la config à chaque environnement, credentials
courte durée / fédération d'identité plutôt que clés statiques en dur.

### A03 — Software Supply Chain Failures (NOUVEAU — #3, 6 CWEs, 5.19-5.72% avg selon la page, coefficient d'impact CVE le plus élevé du Top 10)
**Description :** rupture ou compromission du processus de build,
distribution ou mise à jour logicielle — dépendances directes ET
transitives, CI/CD, IDE, registries de conteneurs.
**Signaux de vulnérabilité :** pas de suivi de version des composants
(client + serveur + transitifs), pas de scan régulier + abonnement aux
bulletins de sécurité, pas de séparation des devoirs dans le pipeline
(une seule personne écrit ET déploie en prod sans revue), composants issus
de sources non fiables, CI/CD moins sécurisé que ce qu'il construit.
**Prévention :**
- SBOM (Software Bill of Materials) centralisé et maintenu
- Inventaire continu des dépendances directes + transitives (OWASP
  Dependency-Track, Dependency-Check, retire.js)
- Surveillance continue CVE/NVD/OSV (osv.dev), alertes automatiques
- Composants signés, provenance vérifiée (voir A08)
- Durcir dépôt de code, poste dev, build server (MFA, IAM, secrets
  scopés, logs infalsifiables), infra-as-code versionnée
- Déploiements progressifs (canary/staged) pour limiter l'exposition
**Exemples réels :** SolarWinds (2019), vol Bybit 1,5 Md$ (2025, attaque
supply chain sur wallet), ver npm auto-propagateur Shai-Hulud (2025),
Log4Shell (CVE-2021-44228).

### A04 — Cryptographic Failures (#4, descend de #2 en 2021 — 32 CWEs, 3.80% avg, 100% des apps testées)
**Description :** absence ou faiblesse de chiffrement (transit ET repos),
fuite de clés cryptographiques, générateur de nombres pseudo-aléatoires
faible (3 CWE dominants liés à un mauvais PRNG).
**Tests :**
- [ ] Toutes les données sensibles chiffrées en transit (TLS >=1.2, forward
      secrecy, pas de CBC) ET au repos ?
- [ ] Pas de protocole non chiffré (FTP, SMTP, STARTTLS) pour données
      sensibles ?
- [ ] Mots de passe hashés avec Argon2/yescrypt/scrypt/PBKDF2 (jamais
      MD5/SHA1 seuls, jamais sans sel) ?
- [ ] IV jamais réutilisé, généré par CSPRNG, chiffrement authentifié
      utilisé plutôt que chiffrement seul ?
- [ ] Certificat serveur et chaîne de confiance correctement validés ?
- [ ] Clés cryptographiques jamais committées dans le dépôt de code ?
**Prévention :** classifier/étiqueter les données sensibles, ne pas les
conserver plus que nécessaire (tokenisation PCI DSS), HSM pour clés les
plus sensibles, désactiver le cache pour réponses sensibles, planifier
dès maintenant la transition post-quantique (échéance recommandée : fin
2030 selon ENISA/NIST).

### A05 — Injection (#5, descend de #3 en 2021 — 37 CWEs, plus grand nombre de CVE de tout le Top 10, 100% des apps testées)
**Description :** donnée non validée/filtrée envoyée à un interpréteur
(SQL, OS, LDAP, EL/OGNL, NoSQL...) qui en exécute une partie comme du
code. XSS = haute fréquence/impact modéré ; SQLi = fréquence plus faible
mais impact élevé.
**Tests :**
- [ ] Requêtes construites via API paramétrée/ORM, jamais par
      concaténation de chaîne (y compris dans les procédures stockées —
      `EXECUTE IMMEDIATE` reste vulnérable même paramétré) ?
- [ ] Validation positive côté serveur sur toutes les entrées (headers,
      cookies, JSON, XML, paramètres URL) ?
- [ ] Test d'injection basique (`' OR '1'='1`, `; cat /etc/passwd`)
      neutralisé sur tous les champs ?
- [ ] SAST/DAST/IAST intégrés en CI/CD ?
**Prévention :** API sûre paramétrée en priorité, échappement spécifique à
l'interpréteur en dernier recours seulement (noms de tables/colonnes non
échappables — danger connu des outils de reporting), fuzzing systématique.
**Note :** l'injection de prompt dans les LLM est traitée séparément dans
l'OWASP LLM Top 10 (LLM01:2025).

### A06 — Insecure Design (#6, descend de #4 en 2021 — 39 CWEs, 1.86% avg)
**Description :** absence ou inefficacité de contrôles dès la conception —
différent d'un défaut d'implémentation : une conception non sécurisée ne
se corrige pas par une implémentation parfaite, car le contrôle de
sécurité nécessaire n'a jamais été prévu.
**Tests :**
- [ ] Le threat modeling a-t-il couvert auth/contrôle d'accès/logique
      métier avant le développement (pas après) ?
- [ ] Les user stories définissent-elles les flux d'échec et d'état
      attendus, validés par les parties prenantes ?
- [ ] Logique métier testée contre des cas d'abus (pas seulement des cas
      d'usage nominal) — ex. limites de quantité/montant contournables ?
- [ ] Récupération de mot de passe : pas de questions/réponses "secrètes"
      (interdit par NIST 800-63b) ?
**Prévention :** cycle de développement sécurisé avec AppSec impliqué dès
le départ, bibliothèque de patterns de conception sécurisée, threat
modeling sur les flux critiques (auth, accès, paiement), tests
unitaires/intégration couvrant le modèle de menace, ségrégation des
tenants par conception. Référence : OWASP SAMM (owaspsamm.org).

### A07 — Authentication Failures (#7, inchangé — renommé, 36 CWEs, 2.92% avg)
**Changement 2025 :** renommé (perd "Identification and") pour mieux
refléter le périmètre réel.
**Tests :**
- [ ] MFA activable/imposée sur les comptes sensibles ?
- [ ] Rate limiting + détection de credential stuffing (y compris attaques
      "hybrides" par incrémentation type `Password1!`->`Password2!`) ?
- [ ] Nouveaux mots de passe vérifiés contre les identifiants
      compromis connus (ex. type haveibeenpwned) et la liste des 10 000
      pires mots de passe ?
- [ ] Session ID régénéré après connexion (pas de fixation), jamais dans
      l'URL, invalidé au logout/idle/timeout absolu ?
- [ ] Messages d'erreur de login identiques quel que soit le cas
      (pas d'énumération de comptes valides) ?
- [ ] Rotation de mot de passe **non forcée** sauf suspicion de fuite
      (conforme NIST 800-63b) ?
**Prévention :** MFA partout où possible, gestionnaire de session
serveur avec ID à haute entropie, système d'authentification éprouvé
plutôt que fait maison, validation des claims JWT (`aud`, `iss`, scope).

### A08 — Software or Data Integrity Failures (#8, inchangé — renommé légèrement, 14 CWEs, 2.75% avg)
**Précision 2025 :** intégrité au niveau code/artefact individuel —
complémentaire à A03 qui couvre l'écosystème de dépendances dans son
ensemble.
**Tests :**
- [ ] Mises à jour/artefacts signés et vérifiés avant application
      (firmware, auto-update, packages) ?
- [ ] Désérialisation de données non fiables protégée (signature/contrôle
      d'intégrité), jamais d'objet sérialisé accepté tel quel côté client ?
- [ ] Dépendances tirées uniquement de dépôts de confiance (pas de package
      téléchargé hors gestionnaire officiel) ?
- [ ] Pipeline CI/CD segmenté avec contrôle d'accès et revue obligatoire
      des changements de code/config ?
**Prévention :** signatures numériques pour vérifier source et intégrité,
dépôts internes vérifiés pour profils à risque élevé, revue systématique
des changements CI/CD.
**Exemple marquant :** scanner de désérialisation Java détectant la
signature `rO0` en base64 -> exécution de code à distance sur un backend
Spring Boot recevant un état utilisateur sérialisé non protégé.

### A09 — Security Logging & Alerting Failures (#9, inchangé — renommé "Monitoring"->"Alerting", 5 CWEs, 3.91% avg)
**Description :** sans logging ET alerting, une attaque ne peut être ni
détectée ni traitée à temps — un logging sans alerting a une valeur de
détection quasi nulle.
**Tests :**
- [ ] Login/échecs de login/transactions à forte valeur systématiquement
      logués avec contexte utilisateur suffisant ?
- [ ] Intégrité des logs protégée contre la falsification (append-only) ?
- [ ] Seuils d'alerte et processus d'escalade définis et testés (pas
      seulement des logs qui s'accumulent sans jamais être regardés) ?
- [ ] Aucune donnée sensible (PII/PHI) loguée en clair ?
- [ ] Un scan DAST (ZAP/Burp) déclenche-t-il une alerte détectable ?
**Prévention :** logging structuré et consommable par un SIEM, encodage
correct des données loguées (éviter l'injection dans les logs eux-mêmes),
plan de réponse à incident (NIST 800-61r2), honeytokens comme pièges à
faible taux de faux positifs.
**Exemple marquant cité par OWASP :** fournisseur de santé n'ayant détecté
une brèche affectant 3,5M d'enregistrements d'enfants qu'après signalement
externe — l'intrusion avait pu durer plus de 7 ans faute de monitoring.

### A10 — Mishandling of Exceptional Conditions (NOUVEAU — 24 CWEs, 2.95% avg, remplace le SSRF absorbé dans A01)
**Description :** échec à prévenir, détecter ou répondre correctement à
une situation anormale (erreur, timeout, état mémoire/privilège
inattendu).
**Tests :**
- [ ] Chaque erreur interceptée à l'endroit où elle se produit (pas de
      remontée générique en haut de pile) ?
- [ ] Transaction multi-étapes : rollback complet en cas d'échec partiel
      (fail closed), jamais de reprise en l'état ?
- [ ] Messages d'erreur exposés : aucune info système sensible (requête
      SQL, chemin serveur, stack trace) ?
- [ ] Rate limiting/quotas en place pour éviter l'épuisement de ressources
      via erreurs répétées ?
- [ ] Gestionnaire d'exception global centralisé, pas dispersé
      fonction par fonction ?
**Prévention :** catch à la source + gestion centralisée (logging +
alerting + handler global), fail closed systématique, validation d'entrée
stricte en amont.
**Exemples d'attaque :** épuisement de ressources par upload dont les
exceptions ne libèrent jamais la ressource (DoS) ; message d'erreur SQL
détaillé utilisé comme reconnaissance pour affiner une injection ;
transaction financière interrompue en plein milieu (débit compte A,
crédit compte B) sans rollback -> vidage de compte possible.
**CWE notables :** CWE-209, CWE-476 (pointeur null), CWE-636 (fail open),
CWE-703/754/755.

## 2. Workflow d'audit pour l'agent

1. **Inventaire** : lister assets (apps, APIs, dépendances) — outils :
   Dependency-Check, Dependency-Track, retire.js, Snyk.
2. **Tester** : SAST (CodeQL/Sonar), DAST (ZAP/Burp), IAST, tests manuels
   IDOR/injection/SSRF (sous A01 désormais)/exceptions non gérées (A10).
3. **Vérifier config** : headers de sécurité, TLS, CORS, pages d'erreur,
   ACL cloud, comptes par défaut, **SBOM à jour** (réflexe A03).
4. **Couverture CWE** : mapper chaque trouvaille au CWE de la catégorie
   2025 correspondante pour le rapport.
5. **Remediation** : appliquer "How to Prevent" par catégorie + Cheat
   Sheets + re-test.
6. **PAUSE** avant merge — comme `workflows/build-cycle.md` : scan RGAA ->
   PAUSE -> **scan OWASP -> PAUSE** -> scan RGPD -> PAUSE -> merge.

## 3. Références OWASP officielles (à fournir dans le rapport)

- **ASVS** : V1 Architecture, V4/V8 Access (A01), V5 Validation (A05),
  V11/V12/V14 Cryptographie (A04), V15 Secure Coding & Architecture (A03),
  V16 Logging & Error Handling (A09/A10)
- **Cheat Sheets** : Authorization, Injection Prevention, Password
  Storage, Transport Layer Protection, Dependency Graph/SBOM, Error
  Handling, Logging, Software Supply Chain Security, Deserialization
- **Outils** : OWASP Dependency-Track, Dependency-Check, CycloneDX (SBOM),
  retire.js, ZAP, NVD, OSV (osv.dev), GitHub Advisory DB, OWASP SAMM

## 4. Mapping 2021 -> 2025 (pour migration d'un audit existant)

| 2021 | 2025 |
|---|---|
| A01 Broken Access Control | A01 (inchangé, absorbe désormais A10:2021 SSRF) |
| A02 Cryptographic Failures | A04 (descend) |
| A03 Injection | A05 (descend) |
| A04 Insecure Design | A06 (descend) |
| A05 Security Misconfiguration | A02 (monte fortement) |
| A06 Vulnerable and Outdated Components | A03 Software Supply Chain Failures (étendu) |
| A07 Identification and Authentication Failures | A07 Authentication Failures (renommé) |
| A08 Software and Data Integrity Failures | A08 (renommé légèrement, périmètre précisé) |
| A09 Security Logging and Monitoring Failures | A09 Security Logging and Alerting Failures (renommé) |
| A10 Server-Side Request Forgery | **absorbé dans A01** |
| — | A10 Mishandling of Exceptional Conditions (**nouveau**) |

---

<!-- Source : owasp.org/Top10/2025/ — Introduction + les 10 pages de
catégories A01 à A10 consultées individuellement le 2026-08-29. Contenu
paraphrasé et condensé en checklists actionnables à partir des sections
Background/Description/How to Prevent/Example Scenarios/List of Mapped
CWEs de chaque page officielle. Ne pas inventer hors OWASP — pour le
détail exhaustif de chaque CWE, se référer aux pages sources. -->