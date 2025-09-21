# Guide de déploiement - Site Les Tatouables avec Supabase

## 🎯 Objectif
Transformer votre site statique en site dynamique avec des modifications persistantes via Supabase.

## 📋 Prérequis
- Compte Supabase (gratuit)
- Compte Vercel (gratuit)
- Git installé sur votre machine

## 🚀 Étapes de déploiement

### 1. Configuration de Supabase

#### 1.1 Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Choisissez votre organisation
5. Nom du projet : `les-tatouables`
6. Mot de passe : générez un mot de passe fort
7. Région : choisissez la plus proche (Europe West)
8. Cliquez sur "Create new project"

#### 1.2 Configurer la base de données
1. Une fois le projet créé, allez dans l'onglet "SQL Editor"
2. Copiez tout le contenu du fichier `supabase-setup.sql`
3. Collez-le dans l'éditeur SQL
4. Cliquez sur "Run" pour exécuter le script

#### 1.3 Récupérer les clés API
1. Allez dans l'onglet "Settings" > "API"
2. Copiez :
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Configuration de Vercel

#### 2.1 Installer Vercel CLI
```bash
npm install -g vercel
```

#### 2.2 Se connecter à Vercel
```bash
vercel login
```

#### 2.3 Déployer le projet
```bash
cd c:\Users\Noan\sinkolor-tattoo-website
vercel
```

#### 2.4 Configurer les variables d'environnement
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet "sinkolor-tattoo-website"
3. Allez dans "Settings" > "Environment Variables"
4. Ajoutez :
   - **SUPABASE_URL** : votre Project URL de Supabase
   - **SUPABASE_ANON_KEY** : votre clé anon public de Supabase
5. Cliquez sur "Save"

#### 2.5 Redéployer avec les variables
```bash
vercel --prod
```

### 3. Test du système

#### 3.1 Vérifier les endpoints API
Testez ces URLs (remplacez par votre domaine Vercel) :
- `https://votre-site.vercel.app/api/flash/get`
- `https://votre-site.vercel.app/api/sinkolor/get`
- `https://votre-site.vercel.app/api/tarifs/get`

#### 3.2 Tester les modifications
1. Allez sur votre site en production
2. Cliquez sur "Gérer" sur n'importe quelle page
3. Entrez le mot de passe : `03KinepolisdDiva23!`
4. Modifiez du contenu et sauvegardez
5. Rafraîchissez la page - les modifications doivent persister

## 🔧 Structure du projet

```
sinkolor-tattoo-website/
├── api/
│   ├── flash/
│   │   ├── get.js          # Récupérer les flash
│   │   └── update.js       # Modifier les flash
│   ├── sinkolor/
│   │   ├── get.js          # Récupérer les créations
│   │   └── update.js       # Modifier les créations
│   └── tarifs/
│       ├── get.js          # Récupérer les tarifs
│       └── update.js       # Modifier les tarifs
├── images/                 # Vos images
├── index.html             # Page d'accueil
├── flash.html             # Page flash (modifiable)
├── sinkolor.html          # Page créations (modifiable)
├── ldermo-tarifs.html     # Page tarifs (modifiable)
├── styles.css             # CSS
├── script.js              # JavaScript
├── package.json           # Dépendances
├── vercel.json            # Configuration Vercel
└── supabase-setup.sql     # Script de base de données
```

## 🔐 Sécurité

### Mot de passe d'administration
- **Mot de passe actuel** : `03KinepolisdDiva23!`
- **Pour le changer** : Modifiez la valeur dans la table `admin_keys` de Supabase

### Protection des données
- Les données sont protégées par Row Level Security (RLS)
- Seul le mot de passe correct permet les modifications
- Les lectures sont publiques (pour l'affichage)

## 🛠️ Maintenance

### Ajouter de nouveaux types de contenu
1. Créez une nouvelle table dans Supabase
2. Créez les endpoints API correspondants
3. Modifiez les pages HTML pour utiliser les nouveaux endpoints

### Sauvegarder les données
1. Allez dans Supabase > "Database" > "Backups"
2. Créez une sauvegarde manuelle si nécessaire

### Mettre à jour le mot de passe
1. Allez dans Supabase > "Table Editor" > "admin_keys"
2. Modifiez la valeur de `key_value` pour `admin_password`
3. Mettez à jour le code dans les fichiers API

## 🐛 Dépannage

### Problème : "Variables d'environnement manquantes"
- Vérifiez que les variables SUPABASE_URL et SUPABASE_ANON_KEY sont bien configurées dans Vercel
- Redéployez le projet après avoir ajouté les variables

### Problème : "Erreur lors de la sauvegarde"
- Vérifiez que le mot de passe d'administration est correct
- Vérifiez les logs dans Vercel > Functions pour voir l'erreur exacte

### Problème : "Données ne se chargent pas"
- Vérifiez que les tables Supabase existent et contiennent des données
- Testez les endpoints API directement dans le navigateur

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Vercel Dashboard > Functions
2. Vérifiez les logs dans Supabase Dashboard > Logs
3. Testez les endpoints API individuellement

## 🎉 Félicitations !

Votre site est maintenant dynamique ! Vous pouvez :
- ✅ Modifier les flash depuis la page flash.html
- ✅ Modifier les créations depuis sinkolor.html  
- ✅ Modifier les tarifs depuis ldermo-tarifs.html
- ✅ Toutes les modifications sont visibles par tous les visiteurs
- ✅ Les données sont sauvegardées de manière persistante
