'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Word extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsToMany(models.User, { through: "UserWord", foreignKey: "word_id" });
		}
	}
	Word.init({
		name: DataTypes.STRING,
		status: DataTypes.BOOLEAN,
		counter: DataTypes.INTEGER
	}, {
		sequelize,
		modelName: 'Word',
	});
	return Word;
};
