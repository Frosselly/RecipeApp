const express = require('express');
const router = express.Router();
const { handleNewRecipe, handleUpdateRecipe, handleGetAllRecipes, handleGetRecipe, handleGetAllCategories} = require('../controllers/recipeController');

const multer = require('multer');
// const uploadMiddleware = multer({ dest: "uploads/" });

// const path = require('path');
// router.use("/uploads", express.static(path.join(__dirname, "uploads")));

const uploadMiddleware = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  }); 

  // Custom error-handling middleware


router.post("/new-recipe", uploadMiddleware.single("image"), handleNewRecipe);
router.put("/recipe", uploadMiddleware.single("image"), handleUpdateRecipe);

router.get("/recipe", handleGetAllRecipes);
router.get("/category", handleGetAllCategories);

router.get("/recipe/:id", handleGetRecipe);

module.exports = router;