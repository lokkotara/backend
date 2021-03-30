const Post = require('../models/post'); //On importe le modèle de sauce
const fs = require('fs'); //système de gestion de fichier de Node

//Créer un post
exports.createPost = (req, res, next) => {
  const postObject = JSON.parse(req.body.post);
  delete postObject._id;//retire l'id généré automatiquement par MongoDb
  const post = new Post({
    ...postObject,//Utilise l'opérateur spread pour copier les infos du corps de la requête
    // userId: req.body.userId,
    // image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),//On génère l'url par rapport à son nom de fichier
    content: req.body.content,
    likes: 0,
    usersLiked: [],
  });
  post.save()//Sauvegarde la nouvelle sauce dans la bdd
  .then(() => res.status(201).json({ message: 'Post enregistré !' }))
  .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {};
exports.deletePost = (req, res, next) => {};
exports.likePost = (req, res, next) => {};
exports.getOnePost = (req, res, next) => {};
exports.getAllPosts = (req, res, next) => {};
