const db = require("../database");


const insertIngredients = async (ingredients) => {
  const query = `
        INSERT INTO Ingredients (name, amount, amount_type, recipe_id) 
        VALUES ?
      `;

  const values = ingredients.map((ing) => [ing.name, ing.amount, ing.amount_type, ing.recipe_id]);

  const result = await db.query(query, [values]);

  return {
    firstInsertId: result.insertId,
    affectedRows: result.affectedRows,
  };
};

const insertCategories = async (categories) => {
  const query = `
        INSERT IGNORE INTO Categories (name) 
        VALUES ?
      `;

  const values = categories.map((cat) => [cat.name]);

  const result = await db.query(query, [values]);

  const firstId = result.insertId;
  const numberOfRows = result.affectedRows;
  const allIds = numberOfRows > 0 
  ? Array.from({ length: numberOfRows }, (_, i) => firstId + i) 
  : [];
  return allIds;
}

const getCategoriesIds = async (categoryNames) => {
  const query = `
        SELECT id FROM Categories 
        WHERE name IN (?)
      `;

  const result = await db.query(query, [categoryNames]);
  console.log("getCategoriesIds ", result)
  return result.map((row) => row.id);
}

const bindRecipeToCategories = async (categories, recipe_id) => {
  const query = `
        INSERT INTO Recipe_Category (recipe_id, category_id) 
        VALUES ?
      `;

  const values = categories.map((cat) => [recipe_id, cat]);

  const result = await db.query(query, [values]);

  return result
}


const insertRecipe = async ({
  description,
  title,
  cook_time,
  servings,
  steps,
  notes,
  imagePath,
  username,
}) => {

  const query = `
        INSERT INTO Recipes (
          description, 
          title,
          cook_time, 
          servings,
          steps,
          notes,
          imagePath, 
          fk_user
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

  const result = await db.query(query, [
    description,
    title,
    cook_time,
    servings,
    steps,
    notes,
    imagePath,
    username,
  ]);
  return result;
};

const findRecipeById = async (id) => {
  const query = "SELECT * FROM Recipes WHERE id = ? LIMIT 1";
  const results = await db.query(query, [id]);
  return results[0];
};

const getRecipeIngredients = async (recipeId) => {
  const query = `
          SELECT * FROM Ingredients 
          WHERE recipe_id = ?
        `;

  const result = await db.query(query, [recipeId]);
  return result;
};

const deleteIngredients = async (id) => {
  if (!id) {
    return;
  }

  const query = `
          DELETE FROM Ingredients 
          WHERE id IN (?)
        `;

  const result = await db.query(query, [id]);
  return result;
};

const updateRecipe = async (
  recipeId,
  {
    description,
    title,
    cook_time,
    servings,
    steps,
    notes,
    imagePath = null,
    username,
  }
) => {
  let query = `
          UPDATE Recipes 
          SET 
            description = ?,
            title = ?,
            cook_time = ?,
            servings = ?,
            steps = ?,
            notes = ?
        `;

  let params = [description, title, cook_time, servings, steps, notes];

  if (imagePath) {
    query += `, imagePath = ?`;
    params.push(imagePath);
  }

  query += ` WHERE id = ? AND fk_user = ?`;
  params.push(recipeId, username);
  const result = await db.query(query, params);
  return result;
};


const updateIngredient = async (ingredient) => {
  const result = await db.query(
    "UPDATE Ingredients SET name = ?, amount = ?, amount_type = ? WHERE id = ?",
    [ingredient.name, ingredient.amount, ingredient.amount_type, ingredient.id]
  );
  return result;
}

// not used
const addIngredient = async (ingredient, recipe_id) => {
  const result = await db.query(
    "INSERT INTO Ingredients (recipe_id, name, amount, amount_type) VALUES (?, ?, ?, ?)",
    [recipe_id, ingredient.name, ingredient.amount, ingredient.amount_type]
  );
  return result;
}

const getAllRecipes = async () => {
  const query = "SELECT * FROM Recipes ORDER BY update_date DESC LIMIT 20";
  const results = await db.query(query);
  return results;
}

const getAllCategories = async () => {
  const query = "SELECT * FROM Categories";
  const results = await db.query(query);
  return results;
}

const getRecipeCategories = async (recipeId) => {
  const query = `
          SELECT * FROM Categories 
          WHERE id IN (
          SELECT category_id FROM Recipe_Category 
          WHERE recipe_id = ?) 
        `;

  const result = await db.query(query, [recipeId]);
  return result;
};

const deleteBoundCategories = async (idsToDelete, recipeId) => {
  const query = `
          DELETE FROM Recipe_Category 
          WHERE recipe_id = ? AND category_id IN (?)
        `;
  const result = await db.query(query, [recipeId, idsToDelete]);
  return result;
}


module.exports = {
  insertIngredients,
  insertRecipe,
  updateRecipe,
  findRecipeById,
  getRecipeIngredients,
  updateIngredient,
  deleteIngredients,
  getAllRecipes,
  getAllCategories,
  insertCategories,
  bindRecipeToCategories,
  getRecipeCategories,
  deleteBoundCategories,
  getCategoriesIds
};
