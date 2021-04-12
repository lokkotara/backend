const bcrypt =require('bcrypt');//Sert à hasher et saler les mots de passe
const jwt = require('jsonwebtoken');//Permet de créer un token utilisateur
const fs = require('fs'); //système de gestion de fichier de Node

const User =require('../models/User');

const passwordValidator = require('password-validator');
const schema = new passwordValidator();//On crée un schema pour obtenir des mots de passe plus sécurisés
schema
    .is().min(8)            //min 8 caractères
    .has().not().spaces()   // ne doit pas contenir d'espace
    .has().digits(1)        // min 1 chiffre
    .has().uppercase(1)     // min 1 caractère majuscule
    .has().lowercase(1)     // min 1 caractère minuscule

//Permet de crypter l'adresse mail dans la bdd
function mask(str, mask=true) {
  const ref = str;
  let arobase = false;
  let newStr = "";
  str = str.split("");
  for (let i = 0, size = str.length; i < size; i++) {
    if (str[i] === "@") {
      arobase = true;
      newStr += str[i];
      continue;
    }
    if (str[i] === "." && arobase) {
      return newStr+ref.slice(i);
    }
    if (mask) newStr += String.fromCharCode(str[i].charCodeAt() + 9);
    else newStr += String.fromCharCode(str[i].charCodeAt() - 9);
  }
}

//Enregistre un nouvel utilisateur
exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)) {//Renvoie une erreur si le schema de mot de passe n'est pas respecté
    res.status(401).json({ message: 'Mot de passe pas assez sécurisé !' }); 
      return false;
  }
  bcrypt.hash(req.body.password, 10)//On hash le mot de passe et on le sale 10 fois
      .then(hash => {
        User.create({
          username:req.body.username,
          email: mask(req.body.email),//L'adresse mail cryptée
          password: hash//le mot de passe crypté
        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

//Connecte un utlisateur existant
exports.login = (req, res, next) => {
  const email = mask(req.body.email);
  User.findOne({ where:{ email }})//On cherche l'email correspondant dans la collection 
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)//on compare le mot de passe de la requête avec le hash de l'utilisateur
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: jwt.sign(//On attribue un token d'authentification
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.JWT_SECRET_KEY,
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Obtenir les infos sur un utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id }})
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

//Modifier un utilisateur
exports.modifyUser = (req, res, next) => {
  const id = JSON.parse(req.params.id)
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  if(id === userId) {
    User.findOne({ where: { id: id } })
      .then(user => {
        //Si une nouvelle image est reçue dans la requête
        if (req.file) {
          if (user.image !== null){
            const fileName = user.image.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
              if (err) console.log(err);
              else {
                  console.log("Image supprimée: " + fileName);
              }
            }))
          }
          req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        delete(req.body.isAdmin);
        user.update( { ...req.body, id: req.params.id} )
        .then(() => res.status(200).json({ message: 'Votre profil est modifié !' }))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }else {
    return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
  }
};

//Supprimer un utilisateur
exports.deleteUser = (req, res, next) => {
  const id = JSON.parse(req.params.id)
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  const isAdmin = decodedToken.isAdmin;
  if(id === userId || isAdmin === true){
    User.findOne({ where: { id: id } })
        .then(user => {
          if (user.image !== null){
            const fileName = user.image.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
              if (err) console.log(err);
              else {
                  console.log("Image supprimée: " + fileName);
              }
            }))
          }
          user.destroy({ where: { id: id } })
              .then(() => res.status(200).json({  message: 'utilisateur supprimé !' }))
              .catch(error =>  res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
  }else {
    return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
  }
};