# Mode d'Emploi : Déploiement du Backend COAB sur Render.com

Pour héberger gratuitement l'API de COAB (et gérer la génération de PDF avec Puppeteer), Render est le candidat idéal. Voici la marche à suivre étape par étape :

> [!NOTE]
> J'ai déjà préparé votre projet : j'ai ajouté un fichier `Dockerfile` dans le dossier `server/` et j'ai configuré `tsconfig.json` et `package.json` pour la production. Ces ajouts permettent à Render d'installer facilement Puppeteer.

## Étape 1 : Pousser les modifications sur GitHub
Avant toute chose, vous devez envoyer les modifications que je viens de créer (le `Dockerfile` et les mises à jour de configuration) sur votre dépôt GitHub.

```bash
git add server/
git commit -m "feat: configuration Docker pour le déploiement sur Render"
git push origin main
```

## Étape 2 : Créer le service sur Render.com
1. Allez sur [Render.com](https://render.com) et connectez-vous avec votre compte GitHub.
2. Cliquez sur le bouton **"New"** en haut à droite, puis sélectionnez **"Web Service"**.
3. Choisissez **"Build and deploy from a Git repository"** et connectez votre dépôt `COAB`.

## Étape 3 : Configurer le Web Service
Remplissez les champs de configuration avec les informations suivantes :

- **Name** : `coab-api` (ou le nom de votre choix)
- **Region** : Choisissez une région européenne (ex: Frankfurt).
- **Branch** : `main`
- **Root Directory** : `server` *(C'est très important car notre backend est dans ce sous-dossier)*.
- **Environment** : Sélectionnez **Docker** (Render détectera automatiquement le fichier `server/Dockerfile`).
- **Instance Type** : Free ($0/month).

## Étape 4 : Variables d'Environnement
Dans la section **"Environment Variables"**, ajoutez vos clés secrètes en cliquant sur "Add Environment Variable" :

| Key | Value |
| :--- | :--- |
| `DATABASE_URL` | L'URL de votre base de données Neon PostgreSQL (copiez-la depuis votre fichier `.env` local). |
| `JWT_SECRET` | Votre clé secrète (ex: `super_secret_coab_2026`). |

## Étape 5 : Déploiement
1. Cliquez sur le bouton **"Create Web Service"** tout en bas.
2. Le premier déploiement peut prendre entre 3 et 5 minutes (Render télécharge Chrome/Puppeteer).
3. Une fois terminé, Render vous donnera une URL publique (en haut à gauche), par exemple : `https://coab-api-xxx.onrender.com`.

## Étape 6 : Lier Vercel et Render (La touche finale !)
Maintenant que votre Backend est en ligne sur Render, il faut dire à votre Frontend (sur Vercel) de s'y connecter.

1. Allez sur votre tableau de bord **Vercel** > Projet COAB.
2. Allez dans **Settings** > **Environment Variables**.
3. Ajoutez une variable nommée `VITE_API_URL`.
4. Mettez comme valeur l'URL publique de Render (ex: `https://coab-api-xxx.onrender.com`). Ne mettez pas de `/` à la fin de l'URL.
5. Sauvegardez, puis **relancez un déploiement Vercel** (onglet Deployments > Redeploy).

> [!SUCCESS]
> C'est terminé ! Votre Frontend est hébergé ultra-rapidement sur Vercel, et votre Backend (avec Puppeteer) tourne sous Docker sur Render. Vous pouvez utiliser votre application en ligne normalement !
