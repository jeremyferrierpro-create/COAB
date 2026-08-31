# Audit et État des Lieux du Projet COAB (Fin Août 2026)

Ce document dresse un état des lieux complet du projet COAB suite aux récents déploiements en production et à la consolidation de l'architecture. Il intègre les exigences spécifiques de l'association pour garantir une autonomie totale des utilisateurs (Juniors, Seniors, Bénévoles et Administrateurs) et un suivi rigoureux.

---

## 🟢 1. État des Lieux : Ce qui est accompli et fonctionnel

### A. Infrastructure et Déploiement (En Production)
- **Frontend (Vercel)** : Déployé avec succès. Les variables d'environnement (`VITE_API_URL`) sont correctement injectées. Le routage React (SPA) est corrigé pour la production.
- **Backend (Render)** : Déployé via Docker avec succès. Gère nativement **Puppeteer** pour la génération des PDF.
- **Base de Données (Neon PostgreSQL)** : Connectée et fonctionnelle en production. Prisma ORM est généré et opérationnel.
- **Sécurité CORS** : L'API accepte les requêtes venant exclusivement du domaine COAB (Vercel) et de localhost.

### B. Authentification & Utilisateurs
- **Modèles BDD** : Les tables `User`, `SeniorProfile`, `JuniorProfile`, et `Match` sont opérationnelles.
- **Inscription & Connexion** : 
  - Différenciation des parcours (Junior vs Senior).
  - Gestion stricte des erreurs (ex: email en doublon renvoie une erreur 400 propre).
  - Sécurisation via JWT (`jsonwebtoken`) et hachage (`bcrypt`).
- **Onboarding (Wizard)** : Le parcours de complétion de profil en plusieurs étapes est opérationnel.

### C. Gestion Administrateur (Back-Office)
- **Listing & Gestion** : L'administrateur peut voir tous les utilisateurs inscrits.
- **Création d'Utilisateur** : L'admin peut créer un compte manuellement (ex: lors d'une permanence physique avec génération d'e-mail automatique si non fourni).
- **Création de Binômes (Matches)** : L'admin peut associer un Junior et un Senior.

### D. Pôle Juridique & Administratif
- **Génération de PDF (Puppeteer + EJS)** : 
  - Contrats ELAN.
  - Charte Cohabilis.
  - Quittances de loyer.
  - Avis de paiement.
- **Modales de Paramétrage** : L'admin peut définir le loyer, la date de début, etc., avant de générer le contrat.

---

## 🟡 2. En cours de finalisation ou partiellement implémenté

### A. Espace Utilisateur (Dashboards)
- Les tableaux de bord Junior et Senior existent visuellement, mais le **téléchargement de documents** de leur côté manque encore des routes API d'upload robustes et d'un système de stockage cloud.
- **Signature Électronique** : Le composant de dessin `SignaturePad` est créé côté client, mais la sauvegarde de l'image (Base64) en base de données pour l'injecter automatiquement dans les PDF finaux reste à consolider.

---

## 🔴 3. Reste à faire : La "User Story" de Finition (Cahier des Charges)

Pour que le projet réponde à 100% aux exigences du président de l'association, voici les fonctionnalités primordiales manquantes, classées par pôles :

### Étape 1 : Le Pôle "Bénévoles" & Statistiques Institutionnelles
> [!IMPORTANT]
> **Le besoin :** L'espace bénévole est actuellement incomplet. Le bénévole doit pouvoir faire un vrai suivi des binômes et rédiger des rapports détaillés.
- **À implémenter :**
  - Ajout d'une table `VolunteerReport` dans Prisma (liée au Bénévole et au Match).
  - Formulaire structuré dans le Dashboard Bénévole avec des champs spécifiques (qualité de la cohabitation, incidents, points de suivi).
  - Génération d'un **Rapport Global (Statistiques)** ultra détaillé pour les financeurs, partenaires sociaux, institutions, groupes partenaires et Cohabilis.

### Étape 2 : Gestion Documentaire Avancée (Uploads & Validation)
> [!IMPORTANT]
> **Le besoin :** Les juniors et seniors doivent pouvoir déposer leurs documents administratifs (Carte d'identité, RIB, attestation d'assurance, justificatifs divers) depuis leur espace.
- **À implémenter :**
  - Intégration d'un service de stockage (ex: AWS S3, Cloudinary ou Neon Storage).
  - Validation Admin : L'administrateur doit pouvoir classer un dossier comme "Complet" ou "Incomplet" après vérification des pièces jointes.

### Étape 3 : Le Pôle "Finances" (Paiements & Cotisations)
> [!IMPORTANT]
> **Le besoin :** L'association doit percevoir les cotisations et gérer les flux financiers. **Chaque dépense, chaque revenu et chaque transaction doit être consignée de façon stricte.**
- **À implémenter :**
  - Ajout d'une table `Transaction` dans la BDD pour un livre de comptes précis (Loyer, Cotisation, Services).
  - Intégration de **Stripe** pour le paiement en ligne de la cotisation lors de la finalisation de l'inscription/adhésion.
  - Création d'un Dashboard Admin "Finances" récapitulatif.

### Étape 4 : Automatisation des Mails (Notification)
- **Le besoin** : Envoyer automatiquement le contrat et la charte par e-mail au moment où le binôme est validé par l'association.
- **À implémenter** :
  - Intégration d'un service d'envoi (Resend, SendGrid ou Nodemailer).
  - Création de templates d'e-mails HTML élégants et d'une route API dédiée.

### Étape 5 : Gestion de la Signature Électronique
- **Le besoin** : Permettre de signer les contrats de manière totalement dématérialisée (façon SoweSign).
- **À implémenter** :
  - Sauvegarder l'image Base64 issue du `SignaturePad` dans le compte de l'utilisateur.
  - Injecter dynamiquement cette image dans les templates `.ejs` lors de la génération du contrat ELAN.

### Étape 6 : Services Complémentaires (Au-delà du loyer)
- **Le besoin** : Intégrer des services complémentaires au loyer (Internet, Machine à laver, etc.).
- **À implémenter** :
  - Ajouter un système d'options/cases à cocher dans la modale de paramétrage du contrat (`SetupContractModal`).
  - Répercuter le coût de ces options sur le prix final affiché dans les quittances et le contrat.

---

## 💡 Prochaines Étapes pour le Développement

Maintenant que les bases sont robustes, nous devons attaquer ces chantiers un par un. 
Pour conserver un rythme efficace et éviter de tout casser, je vous propose de choisir **une seule des priorités suivantes** pour notre prochain sprint de développement :

1. **L'Espace Bénévole & Statistiques** : Création des tables de rapports et de l'interface de suivi.
2. **L'Upload de Documents** : Configuration du stockage et interface de dépôt pour les utilisateurs.
3. **Le Pôle Finances & Stripe** : Suivi comptable strict et intégration du module de paiement.
4. **La Signature Électronique & Emails** : Sauvegarde des signatures et envoi automatisé des documents PDF.
