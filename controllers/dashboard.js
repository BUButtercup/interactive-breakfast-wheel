const router = require('express').Router();
const { Recipe } = require('../models/');
const withAuth = require('../utils/auth');

//get all a user's recipes
router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    // if(recipeData){
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log('recipes',recipes)
    // res.render('user-home', {
    //     allRecipes: recipes,
    //     layout: 'dashboard',
    //   });

    res.status(200).json(recipes);

    // } else {
    //   res.render('user-home', {
    //     layout: 'dashboard',
    //   });
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id);
    // if(recipeData){
    const recipes = recipeData.get({ plain: true });
    console.log('recipes',recipes)
    res.render('user-home', {
        allRecipes: recipes,
        layout: 'dashboard',
    });
    // } else {
    //   res.render('user-home', {
    //     layout: 'dashboard',
    //   });
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});


//get new recipe form page
router.get('/new', withAuth, (req, res) => {
  res.render('add-recipe', {
    layout: 'dashboard',
  });
});


//get edit recipe page
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id);

    if (recipeData) {
      const recipe = recipeData.get({ plain: true });

      res.render('edit-recipe', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).alert('No recipe with that ID!');
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
