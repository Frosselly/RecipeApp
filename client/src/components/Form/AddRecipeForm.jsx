import { useState } from 'react';
import "./form.css";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    pavadinimas: "",
    laikas: "",
    porcijos: "",
    paveikslėlis: "",
    aprašymas: "",
    pastabos: "",
    nuorodos: "",
    paskutinisAtnaujinimas: new Date().toISOString(),
  });

  const [ingredientFields, setIngredientFields] = useState([{ pavadinimas: '', kiekis: '', kiekioTipas: '' }]);
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
      .filter(field => field.pavadinimas && field.kiekis)
      .map(field => ({
        pavadinimas: field.pavadinimas,
        kiekis: field.kiekis,
        kiekioTipas: field.kiekioTipas
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
      pavadinimas: '',
      aprašymas: '',
      laikas: '',
      porcijos: '',
      pastabos: '',
      nuorodos: '',
    });
    
    setIngredientFields([{ pavadinimas: '', kiekis: '', kiekioTipas: '' }]);
    setStepFields(['']);
  };

  const addIngredientField = (e) => {
    e.preventDefault();
    setIngredientFields([...ingredientFields, { pavadinimas: '', kiekis: '', kiekioTipas: '' }]);
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
    <div className="hero"> <h2 className="form-title">Kurti receptą</h2></div>
   
    <form onSubmit={handleSubmit}>
      <label htmlFor="pavadinimas" className="field-title mb-sm">
        Pavadinimas
        <input
          type="text"
          id="pavadinimas"
          name="pavadinimas"
          value={formData.pavadinimas}
          onChange={handleChange}
          placeholder="Įveskite recepto pavadinimą"
          required
          maxLength={50}
        />
      </label>

      <label htmlFor="aprašymas" className="field-title mb-sm">
        Aprašymas
        <textarea
          id="aprašymas"
          name="aprašymas"
          value={formData.aprašymas}
          onChange={handleChange}
          placeholder="Įveskite recepto aprašymą"
          maxLength={500}
        />
      </label>

      <div className="form-group mb-sm">
        <label htmlFor="laikas" className="field-title">
          Laikas
          <input
            type="text"
            id="laikas"
            name="laikas"
            value={formData.laikas}
            onChange={handleChange}
            placeholder="Įveskite paruošimo laiką"
            maxLength={20}
          />
        </label>
        <label htmlFor="porcijos" className="field-title">
          Porcijos
          <input
            type="text"
            id="porcijos"
            name="porcijos"
            value={formData.porcijos}
            onChange={handleChange}
            placeholder="Įveskite porcijų skaičių"
            maxLength={10}
          />
        </label>
      </div>

      <label htmlFor="paveikslėlis" className="field-title mb-sm">
        Paveikslėlis
        <input
          type="text"
          id="paveikslėlis"
          name="paveikslėlis"
          value={formData.paveikslėlis}
          onChange={handleChange}
          placeholder="Įveskite paveikslėlio URL"
          maxLength={255}
        />
      </label>

      <div className="ingredient-group mb-sm">
        <div className="field-title mb-sm">Ingredientai</div>
        {ingredientFields.map((field, index) => (
          <div className="ingredient-input" key={index}>
            <label htmlFor={`ingredient-name-${index}`}>
              
              <input
                type="text"
                id={`ingredient-name-${index}`}
                placeholder="Ingrediento pavadinimas"
                value={field.pavadinimas}
                onChange={(e) => handleIngredientChange(index, 'pavadinimas', e.target.value)}
                required
                maxLength={50}
              />
            </label>
            <label htmlFor={`ingredient-amount-${index}`}>
              
              <input
                type="number"
                id={`ingredient-amount-${index}`}
                placeholder="Kiekis"
                value={field.kiekis}
                onChange={(e) => handleIngredientChange(index, 'kiekis', e.target.value)}
                required
                max={999}
              />
            </label>
            <label htmlFor={`ingredient-type-${index}`}>
              
              <input
                type="text"
                id={`ingredient-type-${index}`}
                placeholder="Vienetas"
                value={field.kiekioTipas}
                onChange={(e) => handleIngredientChange(index, 'kiekioTipas', e.target.value)}
                required
                maxLength={20}
              />
            </label>
          </div>
        ))}
        <button className="mt-sm" onClick={addIngredientField}>Pridėti ingredientą</button>
      </div>

      <div className="mb-sm ingredient-group">
        <div className="field-title mb-sm">Gaminimo eiga</div>
        {stepFields.map((step, index) => (
          <label className="cooking-step-input" htmlFor={`step-${index}`} key={index}>
            
            <textarea
              id={`step-${index}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Žingsnis ${index + 1}`}
              required
              maxLength={500}
            />
          </label>
        ))}
        <button className="mt-sm" onClick={addStepField}>Prindėti žingsnį</button>
      </div>

      <label htmlFor="pastabos" className="field-title mb-sm">
        Pastabos
        <textarea
          id="pastabos"
          name="pastabos"
          value={formData.pastabos}
          onChange={handleChange}
          placeholder="Įveskite pastabas"
          maxLength={1000}
        />
      </label>

      <label htmlFor="nuorodos" className="field-title mb-sm">
        Nuorodos
        <textarea
          id="nuorodos"
          name="nuorodos"
          value={formData.nuorodos}
          onChange={handleChange}
          placeholder="Įveskite nuorodas"
          maxLength={500}
        />
      </label>

      <button type="submit" className="submit-btn mt-sm">Pateikti</button>
    </form>
    </>
  );
};

export default AddRecipeForm;

function onSaveRecipe(recipe) {
  console.log(recipe);
}