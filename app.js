const express = require('express');//Importe le framework express pour node.js
const helmet = require('helmet');//Importe helmet pour sécuriser les en-têtes des requêtes
const path = require('path');//Permet d'accéder aux chemins d'accès des fichiers
const dotenv = require('dotenv').config();//Permet de créer un environnement de variables
const app = express();//Applique le framework express
const userRoutes = require('./routes/user');//Importe le routeur pour les utilisateurs
const postRoutes = require('./routes/post');//Importe le routeur pour les posts

app.use(helmet());//Met en place les sous-plugins de helmet

//définit les paramètres d'en-tête
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');//permet l'accès à l'API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');//Autorise les en-têtes spécifiées
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//Permet l'utilisation des méthodes définies
  next();
});

app.use('/images', express.static(path.join(__dirname,'images')));

//Permet de récupérer le corps de la requête au format json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/auth', userRoutes);//Sert les routes concernant les utilisateurs pour toutes demande vers le endpoint /api/auth
app.use('/api/feed', postRoutes);//Sert les routes concernant les utilisateurs pour toutes demande vers le endpoint /api/feed

module.exports = app;