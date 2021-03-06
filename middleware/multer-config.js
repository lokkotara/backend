const multer = require('multer');

//Indique comment nous voulons écrire les types de médias
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

//Limite la taille des images à 1280 par 1280 et le poids à 3mb
const maxSize = 3 * 1280 * 1280; 
//Utilise une méthode de multer pour enregistrer les nouvelles images dans le dossier images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/avatars')
  },
  filename: (req, file, callback) => {//Crée un nom unique pour la nouvelle image
    const name = file.originalname.split(' ').join('_').split('.')[0];
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage, limits: { fileSize: maxSize }}).single('image');