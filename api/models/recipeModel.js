const db = require("../database");

//TODO - fix ingredient query
const insertIngredients = async (ingredients) => {
  const query = `
        INSERT INTO Ingredients (name, amount, amount_type, recipe_id) 
        VALUES ?
      `;

  // Format ingredients for bulk insert
  const values = ingredients.map((ing) => [ing.name, ing.amount, ing.amount_type, ing.recipe_id]);

  const result = await db.query(query, [values]);

  return {
    firstInsertId: result.insertId,
    affectedRows: result.affectedRows,
  };
};


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

// const updateRecipe = (id, title, summary, content, imagePath) => {

//   // id	description	title	ingredient_id	cook_time	servings	update_date	notes	fk_user

//   //recipe has id I use it to save ingredients
//   // INGREDIENT id	name	amount	amount_type
//   //"UPDATE Recipe SET title = ?, description = ?, ingredient_id =?, cook_time = ?, servings = ?, notes = ?, imagePath = ? WHERE id = ?"

//     return new Promise((resolve, reject) => {
//         if (imagePath === null) {
//             query = "UPDATE Recipes SET title = ?, description = ?, ingredient_id =?, cook_time = ?, servings = ?, notes = ? WHERE id = ?";
//             params = [title, description, ingredient_id, cook_time, servings, notes, id];
//         } else {
//             query = "UPDATE Recipes SET title = ?, description = ?, ingredient_id =?, cook_time = ?, servings = ?, notes = ?, imagePath = ? WHERE id = ?";
//             params = [title, description, ingredient_id, cook_time, servings, notes, imagePath, id];
//         }
//         db.query(query, params, (err, result) => {
//             if (err) {
//                 reject(new Error("Database error while updating post"));
//                 return;
//             }
//             resolve(result);
//         });
//     });
// };

const findRecipeById = async (id) => {
  const query = "SELECT * FROM Recipes WHERE id = ?";
  const results = await db.query(query, [id]);
  return results[0];
};

const getRecipeIngredients = async (recipeId) => {
  const query = `
          SELECT * FROM Ingredients 
          WHERE recipe_id = ?
        `;

  const result = await db.query(query, [recipeId]);
  // const ingredientIds = result[0]?.ingredient_id.split(",").map(Number) || [];
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

  // Only include image update if new image is provided
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



module.exports = {
  insertIngredients,
  insertRecipe,
  updateRecipe,
  findRecipeById,
  getRecipeIngredients,
  updateIngredient,
  deleteIngredients,
  getAllRecipes
};
