const express = require('express');
const router = express.Router();//Permet de charger le middleware niveau routeur

const sauceCtrl = require('../controllers/post');//On appelle la logique métier de nos routes
const auth = require('../middleware/auth');//On appelle le middleware d'authentification
const multer = require('../middleware/multer-config');//et celui pour la gestion des images

router.post('/', auth, multer, sauceCtrl.createPost);//Permet de créer un post
router.put('/:id', auth, sauceLimiter, multer, sauceCtrl.modifyPost);//Permet de modifier un post existant
router.delete('/:id', auth, sauceCtrl.deletePost);//Supprime un post
router.post('/:id/like', auth, sauceCtrl.likePost);//Permet de liker le post
router.get('/:id', auth, sauceCtrl.getOnePost);//Récupère un seul post
router.get('/', auth, sauceCtrl.getAllPosts);//Récupère tous les posts

module.exports = router;

