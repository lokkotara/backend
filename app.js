const express = require('express');//Importe le framework express pour node.js
const dotenv = require('dotenv').config();//Permet de créer un environnement de variables

const app = express();//Applique le framework express

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

//Permet de récupérer le corps de la requête au format json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

module.exports = app;