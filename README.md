# 📱 e-Pointy - Système de Gestion de Présence par QR Code

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Une application web moderne de gestion de présence pour établissements scolaires utilisant la technologie QR Code pour un pointage rapide et efficace.

## 🌟 Fonctionnalités Principales

### 👨‍🎓 Gestion des Étudiants
- ✅ Inscription complète avec informations détaillées
- ✅ Génération automatique de QR Code unique par étudiant
- ✅ Profil détaillé avec statistiques de présence
- ✅ Recherche et filtrage avancés
- ✅ Modification et suppression des profils
- ✅ Contact d'urgence et informations académiques

### 📚 Gestion des Cours
- ✅ Création et modification de cours
- ✅ Association filière/niveau/semestre
- ✅ Informations complètes (crédits ECTS, volume horaire)
- ✅ Vue détaillée avec nombre d'étudiants inscrits
- ✅ Recherche et filtrage par semestre

### 📋 Fiches de Présence
- ✅ Création de fiches par cours et date
- ✅ Suivi en temps réel des présences/absences
- ✅ Taux de présence avec visualisation graphique
- ✅ Historique complet des séances
- ✅ Filtrage par date et cours

### 📊 Tableau de Bord
- ✅ Statistiques globales en temps réel
- ✅ Répartition des étudiants par filière
- ✅ Présences du mois avec graphiques
- ✅ Alertes pour faible assiduité
- ✅ Actions rapides vers toutes les sections

### 📅 Emplois du Temps
- ✅ Gestion par filière et niveau (L1, L2, L3)
- ✅ Planification hebdomadaire complète
- ✅ Filtrage dynamique
- ✅ Vue organisée par jour

## 🎨 Design & UX

- **Glassmorphism** - Interface moderne avec effets de verre
- **Responsive Design** - Adapté à tous les écrans
- **Animations fluides** - Transitions et hover effects
- **Mode sombre** - Interface élégante avec dégradés bleus/violets
- **Accessibilité** - Navigation intuitive et claire

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.x** - Bibliothèque JavaScript pour l'interface
- **Vite** - Outil de build ultra-rapide
- **Tailwind CSS v4** - Framework CSS utility-first
- **Lucide React** - Bibliothèque d'icônes modernes

### Backend (Prévu)
- **AdonisJS** - Framework Node.js pour l'API REST
- **PostgreSQL/MySQL** - Base de données relationnelle
- **JWT** - Authentification sécurisée

### Autres
- **QR Code Generator** - Génération de codes QR uniques
- **Application mobile de scan** - Lecture des QR codes (externe)

## 📦 Installation

### Prérequis
- Node.js 18.x ou supérieur
- npm ou yarn
- Git

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/votre-username/e-pointy.git
cd e-pointy
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Tailwind CSS v4**
```bash
npm install -D @tailwindcss/postcss
```

4. **Configurer PostCSS** (`postcss.config.js`)
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

5. **Configurer les styles** (`src/index.css` ou `src/App.css`)
```css
@import "tailwindcss";
```

6. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du Projet
```
e-pointy/
├── public/                    # Fichiers statiques
├── src/
│   ├── components/           # Composants réutilisables
│   │   ├── Modal.jsx
│   │   ├── ReusableGlassModal.jsx
│   │   ├── StudentFormModal.jsx
│   │   ├── StudentProfileModal.jsx
│   │   ├── CourseFormModal.jsx
│   │   └── PresenceFormModal.jsx
│   ├── pages/                # Pages principales
│   │   ├── Dashboard.jsx
│   │   ├── StudentsPage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── PresencesPage.jsx
│   │   ├── SchedulesPage.jsx
│   │   └── LoginPage.jsx
│   ├── context/              # Context API
│   │   └── AuthContext.jsx
│   ├── data/                 # Données mockées
│   │   └── mockData.js
│   ├── App.jsx               # Composant principal
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔐 Authentification (Mock)

Pour la version de développement, utilisez :
- **Username :** `admin`
- **Password :** `1234`

> ⚠️ Ces identifiants sont temporaires. L'authentification sera sécurisée avec JWT lors de l'intégration backend.

## 🚀 Scripts Disponibles
```bash
# Lancer en développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview

# Linter le code
npm run lint
```

## 📊 Données Mockées

L'application utilise des données mockées pour le développement :

### Étudiants
```javascript
{
  id, nom, prenom, matricule, email, telephone,
  dateNaissance, lieuNaissance, adresse,
  filiere, niveau, anneeInscription, genre,
  nomUrgence, telUrgence, qrCode
}
```

### Cours
```javascript
{
  id, code, nom, enseignant, semestre,
  filiere, niveau, credits, volumeHoraire, description
}
```

### Présences
```javascript
{
  id, coursId, coursNom, date,
  heureDebut, heureFin,
  presents, absents, total
}
```

## 🔄 Intégration Backend (À venir)

### Endpoints API prévus
```
POST   /api/auth/login           # Connexion
POST   /api/auth/logout          # Déconnexion

GET    /api/students             # Liste étudiants
POST   /api/students             # Créer étudiant
GET    /api/students/:id         # Détails étudiant
PUT    /api/students/:id         # Modifier étudiant
DELETE /api/students/:id         # Supprimer étudiant

GET    /api/courses              # Liste cours
POST   /api/courses              # Créer cours
PUT    /api/courses/:id          # Modifier cours
DELETE /api/courses/:id          # Supprimer cours

GET    /api/presences            # Liste présences
POST   /api/presences            # Créer fiche
GET    /api/presences/:id        # Détails fiche
PUT    /api/presences/:id        # Modifier fiche

GET    /api/schedules            # Emplois du temps
POST   /api/schedules            # Créer créneau
```

## 🎯 Roadmap

### Version 1.1 (En cours)
- [ ] Intégration API AdonisJS
- [ ] Authentification JWT
- [ ] Base de données PostgreSQL
- [ ] Export PDF des présences

### Version 1.2 (Planifié)
- [ ] Notifications push
- [ ] Statistiques avancées avec graphiques
- [ ] Import/Export Excel
- [ ] Application mobile de scan QR

### Version 2.0 (Futur)
- [ ] Multi-établissements
- [ ] Gestion des enseignants
- [ ] Module de notes
- [ ] API publique

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Guidelines
- Suivre les conventions de code React
- Utiliser Tailwind CSS pour les styles
- Tester toutes les fonctionnalités
- Documenter les nouvelles features

## 🐛 Rapporter un Bug

Ouvrez une issue sur GitHub avec :
- Description détaillée du bug
- Steps to reproduce
- Comportement attendu vs actuel
- Screenshots si possible
- Environnement (OS, navigateur, version)

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développeur Principal* - [@votre-github](https://github.com/votre-username)

## 🙏 Remerciements

- [React](https://reactjs.org/) - Framework JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide Icons](https://lucide.dev/) - Icônes
- [Vite](https://vitejs.dev/) - Build tool

## 📞 Support

Pour toute question ou assistance :
- 📧 Email : support@e-pointy.com
- 💬 Discord : [Serveur e-Pointy](https://discord.gg/e-pointy)
- 📖 Documentation : [docs.e-pointy.com](https://docs.e-pointy.com)

## 🌐 Demo

Testez l'application en ligne : [demo.e-pointy.com](https://demo.e-pointy.com)

---

**Fait avec ❤️ pour simplifier la gestion de présence dans les établissements scolaires**

*Version 1.0.0 - Décembre 2024*