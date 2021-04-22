// const db = require('../models');
const {User, Post, Comment, Like} = require('../models/index');
// const Post = require('../models/post'); //On importe le modèle de post
// const User = require('../models/user'); //On importe le modèle de user
// const Comment = require('../models/comment'); //On importe le modèle de comment
// const Like = require('../models/like'); //On importe le modèle de like
// const fs = require('fs'); //système de gestion de fichier de Node
const jwt = require('jsonwebtoken');

// Créer un post
exports.createPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const userId = decodedToken.userId;  
  Post.create ({
    UserId: userId,
    // image: (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null),//On génère l'url grâce à son nom de fichier
    content: req.body.content,
    likes: 0,
    comments:0
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
  Post.findOne({ where: { id: id } })
    .then(post => {
      if(post.UserId === userId) {
        // if (req.file) {
        //   if (post.image !== null){
        //     const fileName = post.image.split('/images/')[1]
        //     fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
        //       if (err) console.log(err);
        //       else {
        //           console.log("Image supprimée: " + fileName);
        //       }
        //     }))
        //   }
        //   req.body.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        // }
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
      if(post.UserId == userId || isAdmin == true) {
        // if (post.image !== null){
        //   const fileName = post.image.split('/images/')[1]
        //   fs.unlink(`images/${fileName}`, (err => {//On supprime l'ancienne image
        //     if (err) console.log(err);
        //     else {
        //       console.log("Image supprimée: " + fileName);
        //     }
        //   }))
        // }
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
  const postId = req.params.id;
  const like = req.body.likes;
  if (like === 1){
    Like.findOrCreate({ where : { postId: postId, userId: user } })
    .then (([like, isNotPresent])=> {
      if(isNotPresent) {
        Post.findOne({ where: { id: postId } })//On sélectionne le post par son id
          .then((post) => {
            post.update({
              likes: post.likes +1,//on ajoute 1 au likes
            }, { id: req.params.id })
            .then(() => res.status(200).json({message: 'Vote positif !'}))
            .catch(error => res.status(400).json({error}))
          })
      } else {
        res.status(400).json({message:"Déjà liké !"})
      }
    })
    .catch(error => res.status(400).json({error}))
  }else {
    Post.findOne({ where: { id: postId } })//On sélectionne le post par son id
    .then((post) => {
      Like.findOne ({ where: { idUser: user, idPost: postId } })
      .then ((likeRes)=>{
        if(likeRes !== null) {
          Like.destroy ( { where: { idUser: user, idPost:postId } }),
            post.update({
              likes: post.likes - 1,//on retire 1 à likes
            }, { id: req.params.id })
              .then(() => res.status(200).json({message: 'Vote réinitialisé !'}))
              .catch(error => res.status(400).json({error}))
        } else {
          throw {message: 'Vous avez déjà réinitialisé votre vote !'};
        }
      })
      .catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(400).json({ error }));
  }
};

//Afficher un post
exports.getOnePost = (req, res, next) => {
  Post.findOne({ id: req.params.id })//On récupère le post correspondant à l'id
  .then(post => res.status(200).json(post))
  .catch(error => res.status(404).json({ error }));
};

//Afficher tous les posts
exports.getAllPosts = (req, res, next) => {
  Post.findAll({
    include: [{
      model: User
    }, {
      model: Comment
    }]
  })
  .then(posts => res.status(200).json(posts))
  .catch(error => {
    console.log(error);
    res.status(400).json({ error });
  })
};

//Commenter un post
exports.commentPost = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = decodedToken.userId;
  const postId = req.params.id;
  Comment.create ({
    UserId: user,
    PostId: postId,
    content: req.body.content
  }),
  Post.findOne({ where: { id: postId } })//On sélectionne le post par son id
    .then((post) => {
      post.update({
        comments: post.comments +1,//on ajoute 1 au comments
      }, { id: postId })
      .then(() => res.status(200).json({message: 'Nouveau commentaire envoyé !'}))
      .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(400).json({ error }));
};

//Modifier un commentaire
exports.modifyCommentPost = (req, res, next) => {
  const id = req.params.id;
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  Comment.findOne({ where: { id: id } })
    .then(comment => {
      if(comment.userId == userId) {
        comment.update( { ...req.body, id: id} )
        .then(() => res.status(200).json({ message: 'Votre commentaire est modifié !' }))
        .catch(error => res.status(400).json({ error }));
      }else {
        return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//Supprimer un commentaire
exports.deleteCommentPost = (req, res, next) => {
  const id = req.params.id;
  const idPost = req.params.idPost;
  const token = req.headers.authorization.split(' ')[1];//On extrait le token de la requête
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);//On décrypte le token grâce à la clé secrète
  const userId = decodedToken.userId;//On récupère l'userId du token décrypté
  const isAdmin = decodedToken.isAdmin;//On récupère l'userId du token décrypté
  Comment.findOne({ where: { id: id } })
    .then(comment => {
      if(comment.userId == userId || isAdmin == true) {
        comment.destroy({ where: { id: id } }),
        Post.findOne({ where: { id: idPost } })//On sélectionne le post par son id
          .then((post) => {
            post.update({
              comments: post.comments -1,//on retire 1 au comments
            }, { id: idPost })
          .then(() => res.status(200).json({  message: 'commentaire supprimé !' }))
          .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
      }else {
        return res.status(401).json({ error: "vous n'avez pas l'autorisation nécessaire !" });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

