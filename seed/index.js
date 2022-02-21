const sequelize = require('../config/config');
const { Recipe, Plant, Garden } = require('../models');

const recipeData =  require('./recipeData.json');
// const userData = require('./userData.json');
// const gardenData = require('./gardenData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const recipes = await Recipe.bulkCreate(recipeData, {
        individualHooks: true,
        returning: true,
    });

    // const users = await User.bulkCreate(userData, {
    //     individualHooks: true,
    //     returning: true,
    // });

    // const gardens = await Garden.bulkCreate(gardenData, {
    //     individualHooks: true,
    //     returning: true,
    // })

    process.exit(0);
};

seedDatabase();