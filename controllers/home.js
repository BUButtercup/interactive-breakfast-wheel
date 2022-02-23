const router = require('express').Router();
const { Recipe, Comment, User } = require('../models/');

router.get('/', async (req, res) => {
  try {
    // const recipeData = await Recipe.findAll({
    //   include: [User],
    // });

    // const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render('landing');
  } catch (err) {
  res.status(500).json(err);
  }
});



// get all posts for homepage
router.get('/recipe', async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [User],
    });

    // const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.json(recipeData);
  } catch (err) {
  res.status(500).json(err);
  }
});
  // } catch (err) {
  //   res.status(500).json(err);
  // }
// });



// get single post
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (recipeData) {
      const recipe = recipeData.get({ plain: true });

      res.json(recipe);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




//to get to the login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});


//to get to the sign up page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;
