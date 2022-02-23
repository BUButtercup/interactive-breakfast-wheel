const router = require('express').Router();
const { Recipe } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    if(recipeData){
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
   
    res.render('user-home', {
        allRecipes: recipes,
        layout: 'dashboard',
      });
    } else {
      res.render('user-home', {
        layout: 'dashboard',
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/new', withAuth, (req, res) => {
  res.render('add-recipe', {
    layout: 'dashboard',
  });
});



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
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
