const { Router } = require("express");
const config = require("config");

const auth = require("../middleware/auth.middleware.js");
const Recipe = require("../models/Recipe");
const router = Router();

// api/recipes/add
router.post("/add", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const recipe = new Recipe({
      title,
      description,
      owner: req.user.userId,
    });

    await recipe.save();

    res.status(201).json({ recipe });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something is wrong, try again" });
  }
});

// api/recipes/modify
router.post("/modify", auth, async (req, res) => {
  try {
    const { title, description, recipeId } = req.body;

    const modifiedRecipe = new Recipe({
      title,
      description,
      owner: req.user.userId,
      prevVersion: recipeId,
    });

    await Recipe.findOneAndUpdate(
      { _id: recipeId },
      {
        $set: { nextVersion: modifiedRecipe.id },
        $currentDate: { lastModified: true },
      }
    );

    await modifiedRecipe.save();

    res.status(201).json({ modifiedRecipe });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something is wrong, try again" });
  }
});

// api/recipes/:page
router.get("/:page", async (req, res) => {
  try {
    const page = +req.params.page || 1;
    const postsPerPage = config.get("postsPerPage");

    const recipes = await Recipe.find({ nextVersion: null })
      .skip(postsPerPage * page - postsPerPage)
      .limit(postsPerPage)
      .sort({ createdAt: -1 });

    const docsCount = await Recipe.countDocuments({ nextVersion: null });

    res.json({ recipes, docsCount });
  } catch (e) {
    res.status(500).json({ message: "Something is wrong, try again" });
  }
});

// api/recipes/recipe/:id
router.get("/recipe/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById({ _id: req.params.id });
    res.json(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something is wrong, try again" });
  }
});

module.exports = router;
