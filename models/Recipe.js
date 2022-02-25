const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Recipe extends Model {}

Recipe.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
    },
    servings: {
      type: DataTypes.STRING,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
//diets & allergies
    isSpicy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allergens: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize
  }
);

module.exports = Recipe;
