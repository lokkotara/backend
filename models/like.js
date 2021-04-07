// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Like extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Like.init({
//     idPost: DataTypes.INTEGER,
//     idUser: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Like',
//   });
//   return Like;
// };
'use strict';
const {Sequelize,DataTypes, database} = require('./connexion');

const Like= database.define('Like', {
        idPost: DataTypes.INTEGER,
        idUser: DataTypes.INTEGER
    }, {
        Sequelize,
        modelName: 'Like',
        underscored: false,
        paranoid: false
    }, {
        classMethods: {
            associate: function(models) {
                models.Like.belongsTo(models.Post, {
                    foreignKey: {
                        allowNull:false,
                    },
                    constraints: true,
                    onDelete:'CASCADE',
                    hooks: true
                })
            }
        }
    });

 module.exports = Like;