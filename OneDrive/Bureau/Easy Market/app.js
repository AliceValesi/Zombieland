const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models'); // Assurez-vous que ce chemin est correct
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db.sequelize,
    table: 'Sessions', // Assurez-vous que ce nom correspond au nom de votre table
  }),
}));

// Routes
const annonceRoutes = require('./routes/annonceRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/annonces', annonceRoutes);
app.use('/users', userRoutes);

// Error handling
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Synchroniser la base de données
db.sequelize.sync({ force: true })
  .then(() => console.log('Database synced'))
  .catch(error => console.error('Error syncing database:', error));

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
