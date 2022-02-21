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
    hasBeef: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasPork: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasPoultry: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasFish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasDairy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasTreeNuts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasPeanuts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasGluten: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasShellfish: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasHoney: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasEggs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    hasSoy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize
  }
);

module.exports = Recipe;
