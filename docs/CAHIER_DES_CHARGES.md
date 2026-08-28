# Cahier des charges — COAB

## 1. Présentation du projet

**Nom du projet** : COAB  
**Slogan** : *Cohabitation intergénérationnelle solidaire en Ariège*  
**Type** : Plate-forme web de mise en relation entre des séniors propriétaires d’une chambre disponible et des jeunes (18–30 ans) ou profils courts (HTH) cherchant un logement abordable.

COAB vise à favoriser la cohabitation intergénérationnelle sur le territoire de l’Ariège en proposant un accompagnement structuré : inscription, étude des profils, rencontre et suivi. La plate-forme est pensée comme un service humain avant d’être un outil numérique : elle doit rassurer, simplifier et sécuriser chaque étape selon le cadre strict de Cohabilis et de la Loi ELAN (Articles L.118-1 du CASF et L.631-17 du CCH).

### 1.1 Contexte
- Pénurie de logements pour les jeunes en zone rurale.
- Isolement partiel de certains séniors disposant d’une chambre inoccupée.
- Besoin d’un intermédiaire de confiance (COAB) pour encadrer la relation par une charte et un contrat-type.

### 1.2 Objectifs (Matrice MoSCoW)
- **Must Have (MVP)** : Permettre l'inscription séparée (Sénior/Jeune/HTH), offrir à l'administration un matching assisté, générer automatiquement des contrats/quittances, assurer une accessibilité parfaite (RGAA).
- **Should Have (V1.1)** : Paiement centralisé via Stripe, automatisation des comptes rendus des bénévoles par e-mail.
- **Could Have (V2)** : Questionnaires de suivi et rapports d'activités pour les financeurs.
- **Won't Have (Hors scope)** : Visio intégrée (on utilisera des liens externes comme Jitsi), ERP natif lourd.

---

## 2. Portée du livrable actuel

Le livrable correspond au **MVP complet (Phase 1)** pour validation lors du jury DWWM. Il ne s'agit plus d'une simple maquette, mais bien d'une architecture de production.

### 2.1 Ce qui est inclus dans le MVP (Livrable)
- Landing page et espace public (Charte, Valeurs, Présentation).
- Parcours de formulaires d'inscription complets (Senior, Junior, HTH).
- Authentification complète, chiffrée et sécurisée.
- Base de données relationnelle en place (PostgreSQL via Prisma).
- Espace administrateur fonctionnel (gestion des statuts, notes, matching).
- Génération automatique des contrats de cohabitation et quittances au format PDF.

### 2.2 Ce qui viendra juste après (V1.1 / V2)
- Abonnement Stripe pour le paiement des cotisations/loyers.
- Interface dédiée aux bénévoles (comptes rendus de visites).
- Envoi automatique d'e-mails.

---

## 3. Utilisateurs et personas (RBAC)

### 3.1 Personas principaux

| Persona | Rôle | Besoins | Craintes |
|---|---|---|---|
| **Marie, 72 ans** | Sénior | Rassurer, partager, compléter ses revenus | Inconnus, sécurité, charges, lisibilité |
| **Lucas, 23 ans** | Junior / HTH | Logement abordable, relation respectueuse | Manque d’intimité, paperasse compliquée |
| **Sophie, 45 ans** | Bénévole | Saisir les CR de suivi simplement | Outil complexe, perte de données |
| **Théo** | Administrateur | Gérer, filtrer, matcher, automatiser les PDF | Erreurs humaines, lenteurs |

### 3.2 Parcours utilisateurs

#### Parcours senior
1. Découvre le concept sur la landing page (haute lisibilité).
2. S'inscrit et renseigne son profil (chambre, accessibilité, critères).
3. Accepte la charte / RGPD.
4. COAB étudie et valide son profil.

#### Parcours junior / HTH
1. S'inscrit via mobile.
2. Renseigne son profil (budget, villes, ou statut HTH).
3. Téléverse ses justificatifs.
4. COAB lui propose un matching avec un senior.

#### Parcours administrateur
1. Visualise les candidatures, filtre par type, statut, ville.
2. Organise une rencontre.
3. Génère et valide le contrat PDF.
4. Gère les quittances.

---

## 4. Fonctionnalités détaillées

### 4.1 Espace public & Landing page
- Hero "BENTO Grid" ultra accessible.
- Photos 100% réelles des adhérents COAB pour l'authenticité.
- Formulaires différenciés avec validation instantanée.

### 4.2 Formulaires dynamiques
- **Séniors** : Animaux, accessibilité (plain-pied/ascenseur), attentes (présence, services).
- **Juniors** : Budget, écoles, villes cibles (multi-sélection).
- **HTH** : Mission (service civique, stagiaire), durée stricte.

### 4.3 Espace administrateur
- Moteur de matching assisté (comparaison Villes/Critères).
- Module d'édition et génération PDF (Contrat type Loi ELAN, Charte Cohabilis).
- Sécurité renforcée pour l'accès aux justificatifs (CNI).

---

## 5. UI / UX — Design System « COAB »

### 5.1 Charte & Ambiance
- Design System basé sur l'approche **"BENTO Grid"** (cartes aux angles très arrondis).
- Clarté avant tout : Fond `coab-cream` (`#FAF8F5`).
- Couleurs métiers :
  - **Bleu (`#4A9DB8`)** : Actions et univers Séniors (confiance, apaisement).
  - **Orange (`#F5A118`)** : Actions et univers Jeunes (dynamisme, chaleur).
  - **Vert (`#5CB794`)** : Succès, validations.

### 5.2 Typographie & Accessibilité (RGAA / WCAG 2.1 AA)
- Titres : **Montserrat** / Corps : **EB Garamond**.
- Contraste strict (Ratio > 4.5:1 minimum).
- Boutons larges tactiles (44x44px minimum).
- Navigation complète accessible au clavier (`focus-visible`).

---

## 6. Architecture technique Cible (Full-Stack JS)

### 6.1 Frontend (Client)
- **Framework** : React 18 / Vite.js.
- **Styling** : Tailwind CSS v4.
- **Validation** : React Hook Form + Zod.
- **State Management** : Zustand (local) + TanStack Query (cache serveur).

### 6.2 Backend (Serveur)
- **Environnement** : Node.js / Express.js (TypeScript).
- **ORM** : Prisma.
- **Sécurité** : JWT sécurisés (`HttpOnly`), Helmet, Express Rate Limit.
- **Génération Documentaire** : PDF-lib ou Puppeteer.

### 6.3 Base de données
- **SGBD** : PostgreSQL (via Supabase ou instance dédiée).
- Stockage sécurisé des fichiers via Object Storage S3/Supabase.

---

## 7. Modèle de données (Schéma Prisma)

### Entités principales :
- `User` : Authentification, rôle, données de base.
- `SeniorProfile`, `JuniorProfile`, `HthProfile` : Spécificités liées au statut.
- `Match` : Lien entre un Sénior et un Junior/HTH, incluant les dates, le statut, et la formule (Solidaire, Conviviale, HTH).
- `MonthlyFollowup` : Suivis réguliers gérés par les bénévoles.
- `Document` : Contrats et quittances générés au format PDF.
- `FinancialTransaction` : Pour préparer l'arrivée de Stripe (adhésions, loyers).

---

## 8. Exigences non-fonctionnelles

### 8.1 Performance & Qualité de code
- Architecture Monorepo claire.
- Typage strict TypeScript de bout en bout.

### 8.2 RGPD et Sécurité (OWASP)
- RLS (Row Level Security) / Middlewares stricts pour s'assurer qu'un utilisateur n'accède qu'à ses données.
- Mots de passe chiffrés (Bcrypt).
- Consentements explicites pour l'utilisation des données (Droit à l'effacement).
- Aucun stockage "en clair" de documents sensibles (liens signés à péremption).

---

## 9. Planning & Livrables pour le Jury

- **Semaine A** : Modélisation BDD, Définition Design System.
- **Semaine B** : Maquettage React, Formulaires Zod.
- **Semaine C** : Backend Node.js, authentification JWT.
- **Semaine D** : Mise en relation (Admin) & Génération PDF.
- **Validation Finale** : MVP complet avec jeu de données fictif pour la démo jury.
