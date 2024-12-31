import { useEffect, useState } from "react";
import "../components/Form/form.css";
import CreatableSelect from "react-select/creatable";
import { Navigate } from "react-router";

export default function NewRecipePage() {
  const [formData, setFormData] = useState({});
  const [ingredientFields, setIngredientFields] = useState([
    { pavadinimas: "", kiekis: "", kiekioTipas: "" },
  ]);
  const [stepFields, setStepFields] = useState([""]);
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
  ]);
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(() => {
    fetch("http://localhost:4000/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories((data || []).map((category) => ({ value: category.id, label: category.name })));
      }
      );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // const { description, title, cook_time, servings, notes, ingredients } = req.body;
    const data = new FormData();
    data.append("title", formData.pavadinimas);
    data.append("description", formData.aprašymas);
    data.append("cook_time", formData.laikas);
    data.append("servings", formData.porcijos);
    data.append("image", image);
    data.append("notes", formData.pastabos);
    data.append("steps", JSON.stringify(stepFields));
    data.append("links", formData.nuorodos);
    data.append("ingredients", JSON.stringify(ingredientFields));
    data.append("categories", JSON.stringify(selectedCategories));
    // data.append("paskutinisAtnaujinimas", new Date().toISOString());

    const response = await fetch(`http://localhost:4000/new-recipe`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={`/`} />;
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
      { pavadinimas: "", kiekis: "", kiekioTipas: "" },
    ]);
  };

  const addStepField = (e) => {
    e.preventDefault();
    setStepFields([...stepFields, ""]);
  };

  const removeIngredientField = (index) => {
    const newFields = [...ingredientFields];
    newFields.splice(index, 1);
    setIngredientFields(newFields);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the file selected by the user
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image as data URL for preview
      };
      reader.readAsDataURL(file);
    }
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

        <label htmlFor="tagai" className="mb-sm">
          Kategorijos
        <CreatableSelect
          isMulti
          options={categories}
          onChange={(selectedOptions) => {
            setSelectedCategories(selectedOptions.map(option => ({ label: option.label, value: typeof option.value === 'string' ? null : option.value })));
          }}
        />
        </label>

        <label htmlFor="nuotrauka" className="field-title mb-sm">
          Nuotrauka
          <input
            type="file"
            id="nuotrauka"
            name="nuotrauka"
            onChange={handleImageChange}
            placeholder="Įveskite recepto nuotrauką"
            accept="image/*"
          ></input>
          <div id="previewContainer" className="image-preview">
            <img src={imagePreview} alt="" />
          </div>
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
                  onChange={(e) =>
                    handleIngredientChange(index, "pavadinimas", e.target.value)
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
                  value={field.kiekis}
                  onChange={(e) =>
                    handleIngredientChange(index, "kiekis", e.target.value)
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
                  value={field.kiekioTipas}
                  onChange={(e) =>
                    handleIngredientChange(index, "kiekioTipas", e.target.value)
                  }
                  required
                  maxLength={20}
                />
              </label>
              <button
                style={{ backgroundColor: "red", "margin-bottom": "5px" }}
                onClick={(e) => {
                  e.preventDefault();
                  removeIngredientField(index);
                }}
              >
                -
              </button>
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
