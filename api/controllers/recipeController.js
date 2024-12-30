

// recipeController.js
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { insertIngredients,
  insertRecipe,
  updateRecipe,
  findRecipeById,
  getRecipeIngredients,
  updateIngredient,
  deleteIngredients,
  getAllRecipes} = require('../models/recipeModel');

const handleImageUpload = (file) => {
  if (!file) return null;
  
  const { originalname, path } = file;
  const extension = originalname.split(".").pop();
  const newPath = `${path}.${extension}`;
  fs.renameSync(path, newPath);
  return newPath;
};

const handleNewRecipe = async (req, res) => {
  try {
    // Verify user token
    const token = req.cookies.token;
    const info = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
    // Handle image upload if present
    const newPath = req.file ? handleImageUpload(req.file) : null;

    // Extract recipe data and ingredients array
    const { description, title, cook_time, servings, steps, notes, ingredients } = req.body;

    // Step 1: Insert the recipe
    const recipeData = {
      description,
      title,
      cook_time,
      servings,
      steps,
      notes,
      imagePath: newPath,
      username: info.username
    };

    const recipeResult = await insertRecipe(recipeData); // Insert recipe
    const recipeId = recipeResult.insertId; // Get the inserted recipe ID

    // Step 2: Insert ingredients with the `recipe_id` assigned
    const ingredientData = JSON.parse(ingredients).map(ingredient => ({
      name: ingredient.pavadinimas,
      amount: ingredient.kiekis,
      amount_type: ingredient.kiekioTipas,
      recipe_id: recipeId
    }));

    const ingredientsResult = await insertIngredients(ingredientData); // Insert ingredients

    // Respond with the recipe and ingredient details
    res.json({
      message: "Recipe and ingredients added successfully",
      recipeId,
      ingredientsAdded: ingredientsResult.affectedRows
    });

  } catch (err) {
    console.error("Error in handleNewRecipe:", err);
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};



const handleUpdateRecipe = async (req, res) => {
    try {
      // Verify user token
      const token = req.cookies.token;
      const info = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (err) reject(err);
          resolve(decoded);
        });
      });
      
  
      // Handle file upload if new image is provided
      const newPath = req.file ? handleImageUpload(req.file) : null;
  
      // Extract recipe data and ingredients array
      const { recipeId, description, title, cook_time, servings, steps, notes, ingredients } = req.body;
     
      // Update the recipe
      const recipeResult = await updateRecipe(
        recipeId, {
        description,
        title,
        cook_time,
        servings,
        steps,
        notes,
        imagePath: newPath,
        username: info.username
      });
  
      // const existingIngredients = await getRecipeIngredients(recipeId);
      const ingredientsResult = await handleUpdateIngredients(ingredients, recipeId);
       
  
      // If there was an old image and a new image is uploaded, delete the old one
      if (newPath && recipeResult.oldImagePath) {
        fs.unlink(recipeResult.oldImagePath, (err) => {
          if (err) console.error('Error deleting old image:', err);
        });
      }
  
      res.json({
        message: "Recipe updated successfully",
        recipe: recipeResult
      });
  
    } catch (err) {
      console.error('Error in handleUpdateRecipe:', err);
      if (err.message === 'Recipe not found or unauthorized') {
        res.status(404).json({ error: err.message });
      } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        res.status(500).json({ error: "Server error" });
      }
    }
  };

  const handleUpdateIngredients = async (ingredients, recipe_id) => {
    if (!ingredients || !recipe_id) {
      return;
    }
    const currentIngredients = await getRecipeIngredients(recipe_id)
    ingredients = JSON.parse(ingredients);
    ingredients = ingredients.map((ingredient) => ingredient);
  ingredients = ingredients.map((ingredient) => ({
    ...ingredient,
    recipe_id
  }));
    const currentIds = currentIngredients.map((ingredient) => ingredient.id);
    const incomingIds = ingredients.map((ingredient) => ingredient.id).filter((id) => id !== null);
  
    // Step 2: Identify operations
    const idsToDelete = currentIds.filter((id) => !incomingIds.includes(id));
    const ingredientsToUpdate = ingredients.filter((ingredient) => ingredient.id !== null);
    const ingredientsToInsert = ingredients.filter((ingredient) => ingredient.id === null);
  
    // Step 3: Delete removed ingredients
    if (idsToDelete.length > 0) {
      await deleteIngredients(idsToDelete);
    }
    
    // Step 4: Update existing ingredients
    for (const ingredient of ingredientsToUpdate) {
      await updateIngredient(ingredient);
    }
    if (ingredientsToInsert.length > 0) {
      await insertIngredients(ingredientsToInsert);
    }
    
    // for (const ingredient of ingredientsToInsert) {
    //   await addIngredient(ingredient, recipe_id);
    // }
  
    return true;
    
  };

  const handleGetAllRecipes = async (req, res) => {
    try {
      const results = await getAllRecipes();
      res.json(results);
      
    } catch (err) {
      console.error("Error in handleGetAllRecipes:", err);
      res.status(500).json({ error: "Server error" });
    }
  }

  const handleGetRecipe = async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await findRecipeById(id);
      if (!recipe) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }
  
      const ingredients = await getRecipeIngredients(id);
      res.json({
        ...recipe,
        ingredients
      });
    } catch (err) {
      console.error("Error in handleGetRecipe:", err);
      res.status(500).json({ error: "Server error" });
    }
  };
  
  module.exports = {
    handleNewRecipe,
    handleUpdateRecipe,
    handleUpdateIngredients,
    handleGetAllRecipes,
    handleGetRecipe
};    