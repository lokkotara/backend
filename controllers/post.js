const Post = require('../models/post'); //On importe le modèle de sauce
const Comment = require('../models/comment'); //On importe le modèle de sauce
const fs = require('fs'); //système de gestion de fichier de Node
const jwt = require('jsonwebtoken');


// Créer un post
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.userId;  
  Post.create ({
    idUser: userId,
    // image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),//On génère l'url grâce à son nom de fichier
    content: req.body.content,
    likes: 0,
    // usersLiked: [],
  })
  .then(() => res.status(201).json({ message: 'Post enregistré !' }))
  .catch(error => res.status(400).json({ error }));
};

//Modifier un post
exports.modifyPost = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  const isAdmin = decodedToken.isAdmin;//On récupère l'userId du token décrypté
  Post.findOne({ where: { id: id } })
    .then(post => {
      if(post.idUser == userId || isAdmin == true) {
        if (req.file) {
          if (post.image !== null){
            const fileName = post.image.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
              if (err) console.log(err);
              else {
                  console.log("Image supprimée: " + fileName);
              }
            }))
          }
          req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        }
        post.update( { ...req.body, id: req.params.id} )
        .then(() => res.status(200).json({ message: 'Votre post est modifié !' }))
        .catch(error => res.status(400).json({ error }));
      }else {
        return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//Supprimer un post
exports.deletePost = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  const isAdmin = decodedToken.isAdmin;//On récupère l'userId du token décrypté
  Post.findOne({ where: { id: id } })
    .then(post => {
      if(post.idUser == userId || isAdmin == true) {
        if (post.image !== null){
          const fileName = post.image.split('/images/')[1]
          fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
            if (err) console.log(err);
            else {
              console.log("Image supprimée: " + fileName);
            }
          }))
        }
        post.destroy({ where: { id: id } })
          .then(() => res.status(200).json({  message: 'post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      }else {
        return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//Aimer un post
exports.likePost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = decodedToken.userId;
  const like = req.body.likes;
  Post.findOne({ where: { id: req.params.id } })//On sélectionne la sauce par son id
    .then((post) => {
      // const usersLiked = post.usersLiked;
      //Définit le statut de like
      switch(like) {
        case 1://s'il est égale à 1 et que le tableau usersLiked ne contient pas déjà l'id
          if(!usersLiked.includes(user)){
            post.update({
              likes: post.likes +1,//on ajoute 1 au likes
              // usersLiked: req.body.usersLiked
            }, { id: req.params.id })
            .then(() => res.status(200).json({message: 'Vote positif !'}))
            .catch(error => res.status(400).json({error}))
          }
          break;
        case 0://s'il est égale à 0
          if (usersLiked.includes(user)) {//et que usersLiked contient l'userId
            post.update({
                likes: post.likes - 1,//on retire 1 à likes
                // usersLiked: [usersLiked.pull(user)]//et on sort l'id du tableau usersLiked
            }, { id: req.params.id })
                .then(() => res.status(200).json({message: 'Vote réinitialisé !'}))
                .catch(error => res.status(400).json({error}))
          } 
      }
    })
    .catch(error => res.status(400).json({ error }));
};

//Afficher un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })//On récupère le post correspondant à l'id
  .then(post => res.status(200).json(post))
  .catch(error => res.status(404).json({ error }));
};

//Afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll()//On récupère tous les posts de la table
  .then(posts => res.status(200).json(posts))
  .catch(error => res.status(400).json({ error }));
};

//Commenter un post
exports.commentPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = decodedToken.userId;
  const postId = req.params.id;
  Comment.create ({
    idUser: user,
    idPost: postId,
    content: req.body.content
  }),
  Post.findOne({ where: { id: postId } })//On sélectionne la sauce par son id
    .then((post) => {
      post.update({
        comments: post.comments +1,//on ajoute 1 au likes
      }, { id: postId })
      .then(() => res.status(200).json({message: 'Nouveau commentaire envoyé !'}))
      .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(400).json({ error }));
};