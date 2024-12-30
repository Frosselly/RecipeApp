const express = require('express');
const router = express.Router();
const { handleNewRecipe, handleUpdateRecipe, handleGetAllRecipes, handleGetRecipe} = require('../controllers/recipeController');

const multer = require('multer');
const uploadMiddleware = multer({ dest: "uploads/" });

// const path = require('path');
// router.use("/uploads", express.static(path.join(__dirname, "uploads")));

router.post("/new-recipe", uploadMiddleware.single("image"), handleNewRecipe);
router.put("/recipe", uploadMiddleware.single("image"), handleUpdateRecipe);

router.get("/recipe", handleGetAllRecipes);

router.get("/recipe/:id", handleGetRecipe);

module.exports = router;