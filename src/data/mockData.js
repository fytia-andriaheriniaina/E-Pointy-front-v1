// mockData.js

// === ÉTUDIANTS ===
export const mockStudents = [
  { 
    id: 1, 
    nom: 'Paul', 
    prenom: 'Jean', 
    matricule: 'ETU001', 
    email: 'jean.Paul@email.com', 
    telephone: '+261 34 12 345 67',
    dateNaissance: '2002-05-15',
    lieuNaissance: 'Antananarivo',
    adresse: 'Lot IVA 23 Ambohipo',
    filiere: 'Informatique',
    niveau: 'L2',
    anneeInscription: '2023',
    genre: 'M',
    photoUrl: null,
    nomUrgence: 'Marie Paul',
    telUrgence: '+261 32 98 765 43',
    qrCode: 'QR-ETU001' 
  },
  { 
    id: 2, 
    nom: 'Martin', 
    prenom: 'Marie', 
    matricule: 'ETU002', 
    email: 'marie.martin@email.com',
    telephone: '+261 33 45 678 90',
    dateNaissance: '2003-08-22',
    lieuNaissance: 'Toamasina',
    adresse: 'Lot VB 12 Ankatso',
    filiere: 'Mathématiques',
    niveau: 'L1',
    anneeInscription: '2024',
    genre: 'F',
    photoUrl: null,
    nomUrgence: 'Pierre Martin',
    telUrgence: '+261 34 56 789 01',
    qrCode: 'QR-ETU002' 
  },
  { 
    id: 3, 
    nom: 'Bernard', 
    prenom: 'Pierre', 
    matricule: 'ETU003', 
    email: 'pierre.bernard@email.com',
    telephone: '+261 32 11 223 34',
    dateNaissance: '2001-12-10',
    lieuNaissance: 'Fianarantsoa',
    adresse: 'Lot II 45 Talatamaty',
    filiere: 'Gestion',
    niveau: 'L3',
    anneeInscription: '2022',
    genre: 'M',
    photoUrl: null,
    nomUrgence: 'Sophie Bernard',
    telUrgence: '+261 33 22 334 45',
    qrCode: 'QR-ETU003' 
  },
];

// === COURS ===
export const mockCourses = [
  { id: 1, code: 'INF101', nom: 'Programmation Web', enseignant: 'Prof. Rakoto', semestre: 'S1' },
  { id: 2, code: 'MAT201', nom: 'Mathématiques Avancées', enseignant: 'Prof. Rabe', semestre: 'S2' },
  { id: 3, code: 'GES301', nom: 'Gestion des Entreprises', enseignant: 'Prof. Randria', semestre: 'S3' },
];

// === PRÉSENCES ===
export const mockPresences = [
  { id: 1, coursId: 1, coursNom: 'Programmation Web', date: '2024-11-10', heureDebut: '08:00', heureFin: '10:00', presents: 25, absents: 5, total: 30 },
  { id: 2, coursId: 2, coursNom: 'Mathématiques Avancées', date: '2024-11-11', heureDebut: '10:00', heureFin: '12:00', presents: 28, absents: 2, total: 30 },
  { id: 3, coursId: 3, coursNom: 'Gestion des Entreprises', date: '2024-11-12', heureDebut: '13:00', heureFin: '15:00', presents: 27, absents: 3, total: 30 },
];

// === FILIÈRES ===
export const mockFilieres = [
  { id: 1, nom: 'Informatique', code: 'INF' },
  { id: 2, nom: 'Mathématiques', code: 'MAT' },
  { id: 3, nom: 'Gestion', code: 'GES' },
  { id: 4, nom: 'Économie', code: 'ECO' },
];

// === EMPLOIS DU TEMPS ===
export const mockSchedules = [
  { 
    id: 1, 
    filiere: 'Informatique', 
    niveau: 'L1', 
    jour: 'Lundi', 
    heureDebut: '08:00', 
    heureFin: '10:00', 
    cours: 'Programmation Web', 
    salle: 'Salle A1',
    enseignant: 'Prof. Rakoto'
  },
  { 
    id: 2, 
    filiere: 'Informatique', 
    niveau: 'L1', 
    jour: 'Lundi', 
    heureDebut: '10:00', 
    heureFin: '12:00', 
    cours: 'Algorithmique', 
    salle: 'Salle A1',
    enseignant: 'Prof. Rabe'
  },
  { 
    id: 3, 
    filiere: 'Mathématiques', 
    niveau: 'L2', 
    jour: 'Mardi', 
    heureDebut: '08:00', 
    heureFin: '10:00', 
    cours: 'Analyse Mathématique', 
    salle: 'Salle B2',
    enseignant: 'Prof. Razaf'
  },
  { 
    id: 4, 
    filiere: 'Gestion', 
    niveau: 'L3', 
    jour: 'Mercredi', 
    heureDebut: '13:00', 
    heureFin: '15:00', 
    cours: 'Comptabilité Générale', 
    salle: 'Salle C1',
    enseignant: 'Prof. Randria'
  },
];
