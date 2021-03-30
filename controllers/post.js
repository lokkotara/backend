const Post = require('../models/post'); //On importe le modèle de sauce
const User = require('../models/user'); //On importe le modèle de sauce
const fs = require('fs'); //système de gestion de fichier de Node
const jwt = require('jsonwebtoken');


// Créer un post
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.userId;  
  Post.create ({
    idUser: userId,
    image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),//On génère l'url grâce à son nom de fichier
    content: req.body.content,
    likes: 0,
    usersLiked: [],
  })
  .then(() => res.status(201).json({ message: 'Post enregistré !' }))
  .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
  .then(post => {
    if (req.file) {
      const fileName = post.image.split('/images/')[1]
      fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
        if (err) console.log(err);
        else {
            console.log("Image supprimée: " + fileName);
        }
      }))
      req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    post.update( { ...req.body, id: req.params.id} )
    .then(() => res.status(200).json({ message: 'Votre post est modifié !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.deletePost = (req, res, next) => {};

exports.likePost = (req, res, next) => {};

exports.getOnePost = (req, res, next) => {};

exports.getAllPosts = (req, res, next) => {};
