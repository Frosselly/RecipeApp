import { useState } from "react";
import "./form.css";

function AddRecipeForm() {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    time: "",
    servings: "",
    image: "",
    description: "",
    ingredients: [],
    steps: [],
    notes: "",
    links: "",
    lastUpdated: new Date().toISOString(),
  });

  const [ingredientFields, setIngredientFields] = useState([{ name: '', amount: '', amountType: '' }]);
  const [stepFields, setStepFields] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Gather ingredients and steps from fields
    const ingredients = ingredientFields
      .filter(field => field.name && field.amount) // Skip empty fields
      .map(field => ({
        name: field.name,
        amount: field.amount,
        amountType: field.amountType || 'units' // Default unit
      }));

    const steps = stepFields.filter(step => step.trim()); // Skip empty steps

    // Update recipe with all form data
    const updatedRecipe = {
      ...newRecipe,
      ingredients,
      steps,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(), // Generate unique ID
    };

    // Save recipe (assuming there's a save function passed as prop)
    onSaveRecipe(updatedRecipe);

    // Reset form
    setNewRecipe({
      name: '',
      description: '',
      time: '',
      servings: '',
      notes: '',
      links: '',
      ingredients: [],
      steps: []
    });
    setIngredientFields([{ name: '', amount: '', amountType: '' }]);
    setStepFields(['']);
  };

  const addIngredientField = (e) => {
    e.preventDefault();
    setIngredientFields([...ingredientFields, { name: '', amount: '', amountType: '' }]);
  };

  const addStepField = (e) => {
    e.preventDefault();
    setStepFields([...stepFields, '']);
  };

  const handleIngredientChange = (index, field, value) => {
    const newFields = [...ingredientFields];
    newFields[index][field] = value;
    setIngredientFields(newFields);
  };

  const handleStepChange = (index, value) => {
    const newFields = [...stepFields];
    newFields[index] = value;
    setStepFields(newFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="form-title mb-sm">
        Recipe Name
        <input
          type="text"
          id="name"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
          placeholder="Recipe Name"
          required
        />
      </label>

      <label htmlFor="description" className="form-title mb-sm">
        Description
        <textarea
          id="description"
          value={newRecipe.description}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, description: e.target.value })
          }
          placeholder="Description"
        />
      </label>

      <div className="form-group mb-sm">
        <label htmlFor="time" className="form-title">
          Cooking Time
          <input
            type="text"
            id="time"
            value={newRecipe.time}
            onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
            placeholder="Cooking time"
          />
        </label>
        <label htmlFor="servings" className="form-title">
          Servings
          <input
            type="text"
            id="servings"
            value={newRecipe.servings}
            onChange={(e) =>
              setNewRecipe({ ...newRecipe, servings: e.target.value })
            }
            placeholder="Servings"
          />
        </label>
      </div>

      <label htmlFor="image" className="form-title mb-sm">
        Image URL
        <input
          type="text"
          id="image"
          value={newRecipe.image}
          onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
          placeholder="Image URL"
        />
      </label>

      <div className="mb-sm">
        <div className="form-title mb-sm">Ingredients</div>
        {ingredientFields.map((field, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`ingredient-name-${index}`}>
              Name
              <input
                type="text"
                id={`ingredient-name-${index}`}
                placeholder="Ingredient name"
                value={field.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                required
              />
            </label>
            <label htmlFor={`ingredient-amount-${index}`}>
              Amount
              <input
                type="number"
                id={`ingredient-amount-${index}`}
                placeholder="Amount"
                value={field.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                required
              />
            </label>
            <label htmlFor={`ingredient-type-${index}`}>
              Amount Type
              <input
                type="text"
                id={`ingredient-type-${index}`}
                placeholder="Amount type"
                value={field.amountType}
                onChange={(e) => handleIngredientChange(index, 'amountType', e.target.value)}
                required
              />
            </label>
          </div>
        ))}
        <button className="mt-sm" onClick={addIngredientField}>Add Ingredient</button>
      </div>

      <div className="mb-sm">
        <div className="form-title mb-sm">Steps</div>
        {stepFields.map((step, index) => (
          <label htmlFor={`step-${index}`} key={index}>
            Step {index + 1}
            <textarea
              id={`step-${index}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              required
            />
          </label>
        ))}
        <button className="mt-sm" onClick={addStepField}>Add Step</button>
      </div>

      <label htmlFor="notes" className="form-title mb-sm">
        Notes
        <textarea
          id="notes"
          value={newRecipe.notes}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, notes: e.target.value })
          }
          placeholder="Notes"
        />
      </label>

      <label htmlFor="links" className="form-title mb-sm">
        Links
        <textarea
          id="links"
          value={newRecipe.links}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, links: e.target.value })
          }
          placeholder="Links"
        />
      </label>

      <button type="submit" className="mt-sm">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;

function onSaveRecipe(recipe) {
  console.log(recipe);
}