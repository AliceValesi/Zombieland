// Charger les variables d'environnement
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const apiRoutes = require('./src/routes/route');
const authRoutes = require('./src/routes/auth');
require('./config/passport')(passport);

// Initialiser Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour les sessions
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// Configurer le moteur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour analyser les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware pour gérer les erreurs JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ error: 'Invalid JSON' });
    }
    next();
});

// Middleware pour Passport.js
app.use(passport.initialize());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser les routes définies dans routes.js
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Routes pour les pages EJS
app.get('/', (req, res) => res.render('index'));

app.get('/attractions', (req, res) => {
    const attractions = [
        {
            name: "Dead Encounter",
            category: "expérience-immersive",
            identifier: "dead-encounter",
            description: "Plongez dans l'horreur avec 'Dead Encounter,'...",
            images: [
                "/images/dead-encounter-1.png",
                "/images/dead-encounter-2.png",
                "/images/dead-encounter-3.png",
                "/images/dead-encounter-4.png"
            ],
            tags: ["Immersive", "Zombies"]
        },
        {
            name: "Feast of Shadows",
            category: "restaurant",
            identifier: "feast-of-shadows",
            description: "Bienvenue à 'Feast of Shadows,'...",
            images: [
                "/images/feast-of-shadows-1.png",
                "/images/feast-of-shadows-2.png",
                "/images/feast-of-shadows-3.png",
                "/images/feast-of-shadows-4.png"
            ],
            tags: ["Restaurant", "Cuisine"]
        },
        {
            name: "Undead Plunge",
            category: "rollercoaster",
            identifier: "undead-plunge",
            description: "Préparez-vous à vivre une aventure...",
            images: [
                "/images/undead-plunge-1.png",
                "/images/undead-plunge-2.png"
            ],
            tags: ["Rollercoaster", "Looping"]
        },
        {
            name: "Zombie Parade",
            category: "expérience-immersive",
            identifier: "zombie-parade",
            description: "Bienvenue dans 'Zombie Parade,'...",
            images: [
                "/images/zombie-parade-1.png",
                "/images/zombie-parade-2.png",
                "/images/zombie-parade-3.png"
            ],
            tags: ["Immersive", "Zombies"]
        },
        {
            name: "Zombie Thrill",
            category: "rollercoaster",
            identifier: "zombie-thrill",
            description: "Préparez-vous à une expérience...",
            images: [
                "/images/zombie-thrill-1.png",
                "/images/zombie-thrill-2.png"
            ],
            tags: ["Rollercoaster", "Vitesse"]
        }
    ];

    res.render('attractions', { attractions });
});

app.get('/reservations', (req, res) => res.render('reservations'));
app.get('/infos', (req, res) => res.render('infos'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/connexion', (req, res) => res.render('connexion'));
app.get('/profil', passport.authenticate('jwt', { session: false }), (req, res) => res.render('profil'));

// Route pour une page d'erreur personnalisée (404 Not Found)
app.use((req, res) => {
    res.status(404).render('error', { message: "Désolé, cette page n'existe pas !" });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

const { sequelize } = require('./src/models');

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Unable to synchronize the database:', err);
});

module.exports = app;
