const express = require('express');
const router = express.Router();//Permet de charger le middleware niveau routeur
const auth = require("../middleware/auth");//Permet de charger le middleware d'authentification
const multer = require('../middleware/multer-config');//et celui pour la gestion des images

const userCtrl = require('../controllers/user');//On appelle la logique métier de nos routes

router.post('/signup', userCtrl.signup);//Permet de créer un nouvel utilisateur
router.post('/login', userCtrl.login);//Connecte un utilisateur existant

router.get("/profil/:id", auth, multer, userCtrl.getOneUser);//Route pour obtenir un utilisateur
router.get("/profil", auth, multer, userCtrl.getAllUsers);//Route pour obtenir tous les utilisateurs
router.patch("/profil/:id", auth, multer, userCtrl.modifyUser);//Route pour modifier un utilisateur
router.patch("/profil/:id/password", auth, multer, userCtrl.modifyPassword);//Route pour modifier le mot de passe
router.delete("/profil/:id", auth, userCtrl.deleteUser);//Route pour supprimer un utilisateur

module.exports = router;