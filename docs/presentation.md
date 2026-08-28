---
marp: true
theme: default
paginate: true
backgroundColor: #FAF8F5
color: #1a1a1a
---

# COAB
## Cohabitation intergénérationnelle solidaire en Ariège

*Plateforme web de mise en relation entre séniors propriétaires d’une chambre et jeunes (18-30 ans) ou profils de courte durée (HTH) cherchant un logement abordable.*

---

## 1. Le constat

- Pénurie de logements pour les jeunes en milieu rural (Ariège).
- Isolement de certains séniors disposant d’une chambre inoccupée.
- Besoin d’un tiers de confiance pour encadrer la relation et garantir l'inclusion.

**Opportunité** : Créer du lien tout en répondant à deux problèmes d’habitat par la solidarité.

---

## 2. Notre solution

Une plateforme humaine, structurée et sécurisée (Label Cohabilis) :

- **Mettre en relation** un accueillant senior et un jeune accueilli.
- **Accompagner** chaque étape : inscription, étude des profils, rencontre, suivi bénévole.
- **Garantir** le respect de la loi ELAN (contrat-type) et de la charte Cohabilis.
- **Automatiser** : Génération des quittances de loyer et contrats.

---

## 3. Les publics (Personas)

### Marie, 72 ans — Accueillante Sénior
- Besoin : Rassurer, partager, compléter ses revenus.
- Accessibilité : Interface ultra-lisible (police agrandie, contrastes élevés).

### Lucas, 23 ans — Accueilli (Junior / HTH)
- Besoin : Logement abordable, étudiant ou travailleur temporaire (Habitat Temporaire chez l'Habitant).
- Usage : 100% Mobile-first, dépôt de pièces justificatives simplifié.

### Théo — Administrateur & Les Bénévoles
- Besoin : Outils de suivi, formulaires de visite, matching assisté, statistiques.

---

## 4. Valeurs & Charte

- **Inclusion & Lien social** : Retisser le lien entre générations. Photos 100% réelles d'adhérents.
- **Solidarité** : Logement abordable contre présence et entraide.
- **Respect** : Pas de rapport de subordination.
- **Sécurité & RGPD** : Tous les profils sont vérifiés, données chiffrées.
- **Accessibilité (RGAA)** : Normes d'accessibilité strictes intégrées au cœur du design.

---

## 5. Fonctionnalités clés (Matrice MoSCoW - MVP)

**Must Have (MVP - Livrable 22 Janvier) :**
- Espace public, vitrine, valeurs.
- Formulaires de candidature séparés (Sénior / Jeune).
- Espace Administration (Tableau de bord, statuts des dossiers, matching assisté).
- Génération automatique des modèles de documents (PDF : quittances, contrats).
- Accessibilité RGAA, Design Bento Grid.

**Should Have (V1.1) :**
- Paiement Stripe centralisé (adhésions + cotisations par abonnement).
- Espace Bénévoles (CR d'entretiens) et notifications e-mails.

---

## 6. Style tile / Charte graphique

### Couleurs principales
- **`coab-cream` (`#FAF8F5`)** : Fond de page, rassurant.
- **`coab-black` (`#1a1a1a`)** : Typographie principale.
- **`coab-blue` (`#4A9DB8`)** : Boutons/actions Séniors (Confiance).
- **`coab-orange` (`#F5A118`)** : Boutons/actions Jeunes (Chaleur).
- **`coab-green` (`#5CB794`)** : Validation, succès.

### Typographie & Composants (Design "Bento")
- **Titres** : Montserrat / **Corps** : EB Garamond.
- Cartes aux angles très arrondis (`rounded-3xl`), boutons larges (min 44px) pour le tactile, contrastes adaptés aux seniors.

---

## 7. Architecture Technique

**Approche Monorepo (Split Client/Serveur) :**

### Frontend (React 18)
- **Vite**, **TypeScript**, **Tailwind CSS v4** (Design System Bento).
- **React Hook Form** + **Zod** pour des formulaires robustes.
- **Zustand** & **TanStack Query** (État & Cache).

### Backend (Node.js)
- **Express.js**, **TypeScript**, middlewares de sécurité (Helmet, Rate Limiting).
- Modélisation BDD : **PostgreSQL** gérée via **Prisma ORM**.
- Architecture REST, JWT sécurisé (HttpOnly).

---

## 8. Modèle de Données (MCD simplifé)

- **Users** : Authentification, Rôles (Admin, Sénior, Junior, Bénévole).
- **Profiles** : Données spécifiques (Accessibilité Sénior, Villes cibles Junior, Mission HTH).
- **Matches** : Suivi du statut de cohabitation, dates, formule.
- **Documents** : Contrats, quittances générées (URL sécurisée).
- **FollowUps** : Comptes-rendus mensuels par les bénévoles.
- **Transactions** : Adhésions, versements, intégration Stripe.

---

## 9. Sécurité & Risques (OWASP)

- **Authentification** : Mots de passe hashés (Bcrypt), JWT en cookies sécurisés.
- **Protection API** : CORS strict, Express Rate Limit contre le brute-force.
- **Validation** : Zod (validation stricte des entrées côté client et serveur).
- **Hébergement** : Base de données isolée et sécurisée, conformité RGPD (gestion des consentements et pièces d'identité).

---

## 10. Prochaines étapes immédiates

1. **Validation du périmètre** : Accord sur le MVP (candidatures, admin, génération PDF) séparé de la V2 (ERP, messagerie).
2. **Intégration Design** : Réception de la charte graphique finale et du logo (versions HD).
3. **Modélisation** : Finalisation du schéma relationnel (MCD/MLD) sous Prisma pour le jury (CCP2).
4. **Développement** : Implémentation des formulaires de candidature avec validation Zod.

---

# Merci

## COAB : Prêt à cohabiter autrement ?

**Architecture Validée** : React / Node.js / PostgreSQL
**Charte** : Accessibilité RGAA / Design Bento
