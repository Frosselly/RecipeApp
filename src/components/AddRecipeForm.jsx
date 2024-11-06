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
    <form className="form-group" onSubmit={handleSubmit}>
      <input
        type="text"
        value={newRecipe.name}
        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        placeholder="Recipe Name"
        required
      />
      <textarea
        value={newRecipe.description}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, description: e.target.value })
        }
        placeholder="Description"
      />

      <div className="input-container">
        <input
          type="text"
          value={newRecipe.time}
          onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
          placeholder="Cooking time"
        />
        <input
          type="text"
          value={newRecipe.servings}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, servings: e.target.value })
          }
          placeholder="Servings"
        />
      </div>

      <input
        type="text"
        value={newRecipe.image}
        onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
        placeholder="Image URL"
      />

      {ingredientFields.map((field, index) => (
        <div className="input-container" key={index}>
          <input
            type="text"
            placeholder="Ingredient name"
            value={field.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={field.amount}
            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Amount type"
            value={field.amountType}
            onChange={(e) => handleIngredientChange(index, 'amountType', e.target.value)}
            required
          />
        </div>
      ))}
      <button onClick={addIngredientField}>Add Ingredient</button>

      {stepFields.map((step, index) => (
        <textarea
          key={index}
          value={step}
          onChange={(e) => handleStepChange(index, e.target.value)}
          placeholder={`Step ${index + 1}`}
          required
        />
      ))}
      <button onClick={addStepField}>Add Step</button>

      <textarea
        type="text"
        value={newRecipe.notes}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, notes: e.target.value })
        }
        placeholder="Notes"
      />
      <textarea
        type="text"
        value={newRecipe.links}
        onChange={(e) =>
          setNewRecipe({ ...newRecipe, links: e.target.value })
        }
        placeholder="Links"
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;

function onSaveRecipe(recipe) {
  console.log(recipe);
}