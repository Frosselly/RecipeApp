import { useState } from "react";
import "./form.css";

function AddRecipeForm() {
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    servings: "",
    image: "",
    description: "",
    notes: "",
    links: "",
    lastUpdated: new Date().toISOString(),
  });

  const [ingredientFields, setIngredientFields] = useState([{ name: '', amount: '', amountType: '' }]);
  const [stepFields, setStepFields] = useState(['']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ingredients = ingredientFields
      .filter(field => field.name && field.amount)
      .map(field => ({
        name: field.name,
        amount: field.amount,
        amountType: field.amountType || 'units'
      }));

    const steps = stepFields.filter(step => step.trim());
    
    const updatedRecipe = {
      ...formData,
      ingredients,
      steps,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    };

    onSaveRecipe(updatedRecipe);
    
    setFormData({
      name: '',
      description: '',
      time: '',
      servings: '',
      notes: '',
      links: '',
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
    <>
    <h2 className="form-title">Add Recipe</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="field-title mb-sm">
        Recipe Name
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Recipe Name"
          required
          maxLength={50}
        />
      </label>

      <label htmlFor="description" className="field-title mb-sm">
        Description
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          maxLength={500}
        />
      </label>

      <div className="form-group mb-sm">
        <label htmlFor="time" className="field-title">
          Cooking Time
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Cooking time"
            maxLength={20}
          />
        </label>
        <label htmlFor="servings" className="field-title">
          Servings
          <input
            type="text"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            placeholder="Servings"
            maxLength={10}
          />
        </label>
      </div>

      <label htmlFor="image" className="field-title mb-sm">
        Image URL
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          maxLength={255}
        />
      </label>

      <div className="ingredient-group mb-sm">
        <div className="field-title mb-sm">Ingredients</div>
        {ingredientFields.map((field, index) => (
          <div className="ingredient-input" key={index}>
            <label htmlFor={`ingredient-name-${index}`}>
              Name
              <input
                type="text"
                id={`ingredient-name-${index}`}
                placeholder="Ingredient name"
                value={field.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                required
                maxLength={50}
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
                max={999}
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
                maxLength={20}
              />
            </label>
          </div>
        ))}
        <button className="mt-sm" onClick={addIngredientField}>Add Ingredient</button>
      </div>

      <div className="mb-sm">
        <div className="field-title mb-sm">Steps</div>
        {stepFields.map((step, index) => (
          <label className="cooking-step-input" htmlFor={`step-${index}`} key={index}>
            Step {index + 1}
            <textarea
              id={`step-${index}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              required
              maxLength={500}
            />
          </label>
        ))}
        <button className="mt-sm" onClick={addStepField}>Add Step</button>
      </div>

      <label htmlFor="notes" className="field-title mb-sm">
        Notes
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
          maxLength={1000}
        />
      </label>

      <label htmlFor="links" className="field-title mb-sm">
        Links
        <textarea
          id="links"
          name="links"
          value={formData.links}
          onChange={handleChange}
          placeholder="Links"
          maxLength={500}
        />
      </label>

      <button type="submit" className="submit-btn mt-sm">Add Recipe</button>
    </form>
    </>
  );
}

export default AddRecipeForm;

function onSaveRecipe(recipe) {
  console.log(recipe);
}