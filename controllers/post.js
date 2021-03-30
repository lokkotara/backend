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

exports.modifyPost = (req, res, next) => {};

exports.deletePost = (req, res, next) => {};

exports.likePost = (req, res, next) => {};

exports.getOnePost = (req, res, next) => {};

exports.getAllPosts = (req, res, next) => {};
