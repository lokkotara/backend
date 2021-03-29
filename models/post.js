// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Post extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       models.Post.belongsTo(models.User, {
//         foreignKey: {
//           allowNull: false
//         }
//       })
//     }
//   };
//   Post.init({
//     userId: DataTypes.INTEGER,
//     imageUrl: DataTypes.STRING,
//     content: DataTypes.TEXT,
//     likes: DataTypes.INTEGER,
//     idParent: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Post',
//   });
//   return Post;
// };

'use strict';
//const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        idUser: DataTypes.INTEGER,
        idParent: DataTypes.STRING,
        content: DataTypes.STRING,
        image: DataTypes.STRING,
        likes: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Post',
        paranoid: true
    }, {
        classMethods: {
            associate: function(models) {
                models.Post.belongsTo(models.User, {
                    foreignKey: {
                        allowNull:false
                    }
                })
            }
        }
    });
    return Post;
};