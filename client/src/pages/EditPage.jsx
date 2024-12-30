import { useEffect, useState } from "react";
import "../components/Form/form.css";
import { useParams, Navigate } from "react-router";

export default function EditPage() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [ingredientFields, setIngredientFields] = useState([
    { id: null, name: "", amount: "", amount_type: "" },
  ]);
  const [stepFields, setStepFields] = useState([""]);
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/recipe/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          pavadinimas: data.title,
          aprašymas: data.description,
          laikas: data.cook_time,
          porcijos: data.servings,
          paveikslėlis: data.file,
          pastabos: data.notes,
          nuorodos: data.links,
          
          // Set other form fields as needed
        });

        if (data.ingredients) {
          setIngredientFields(
            data.ingredients.map((ingredient) => ({
              id: ingredient.id,
              name: ingredient.name,
              amount: ingredient.amount,
              amount_type: ingredient.amount_type,
            }))
          );
        }

        if (data.steps) {
          setStepFields(JSON.parse(data.steps));
        }


      });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    // const { description, title, cook_time, servings, notes, ingredients } = req.body;
    const data = new FormData();
    data.set("recipeId", id);
    data.set("title", formData.pavadinimas);
    data.set("description", formData.aprašymas);
    data.set("cook_time", formData.laikas);
    data.set("servings", formData.porcijos);
    data.set("notes", formData.pastabos);
    data.set("steps", JSON.stringify(stepFields));
    data.set("links", formData.nuorodos);
    data.set("ingredients", JSON.stringify(ingredientFields));
    // data.append("paskutinisAtnaujinimas", new Date().toISOString());
    if (image?.[0]) {
      data.set("image", image?.[0]);
    }

    const response = await fetch(`http://localhost:4000/recipe`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    
    // Redirect to the recipe page
    if (response.ok) {
      setRedirect(true);
    }
    
  }

  if(redirect) {
    return <Navigate to={`/recipes/${id}`} />;
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

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

  const addIngredientField = (e) => {
    e.preventDefault();
    setIngredientFields([
      ...ingredientFields,
      { id: null, name: "", amount: "", amount_type: "" },
    ]);
  };

  const addStepField = (e) => {
    e.preventDefault();
    setStepFields([...stepFields, ""]);
  };

  return (
    <>
      <div className="hero">
        {" "}
        <h2 className="form-title">Kurti receptą</h2>
      </div>

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
            type="file"
            id="paveikslėlis"
            name="paveikslėlis"
            onChange={(e) => setImage(e.target.files)}
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
                  value={field.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  required
                  maxLength={50}
                />
              </label>
              <label htmlFor={`ingredient-amount-${index}`}>
                <input
                  type="number"
                  id={`ingredient-amount-${index}`}
                  placeholder="Kiekis"
                  value={field.amount}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount", e.target.value)
                  }
                  required
                  max={999}
                />
              </label>
              <label htmlFor={`ingredient-type-${index}`}>
                <input
                  type="text"
                  id={`ingredient-type-${index}`}
                  placeholder="Vienetas"
                  value={field.amount_type}
                  onChange={(e) =>
                    handleIngredientChange(index, "amount_type", e.target.value)
                  }
                  required
                  maxLength={20}
                />
              </label>
            </div>
          ))}
          <button className="mt-sm" onClick={addIngredientField}>
            Pridėti ingredientą
          </button>
        </div>

        <div className="mb-sm ingredient-group">
          <div className="field-title mb-sm">Gaminimo eiga</div>
          {stepFields.map((step, index) => (
            <label
              className="cooking-step-input"
              htmlFor={`step-${index}`}
              key={index}
            >
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
          <button className="mt-sm" onClick={addStepField}>
            Prindėti žingsnį
          </button>
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

        <button type="submit" className="submit-btn mt-sm">
          Pateikti
        </button>
      </form>
    </>
  );
}
