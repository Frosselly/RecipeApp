import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.name} />
      <h2>{recipe.name}</h2>
      <Link to={`/recipes/${recipe.id}`}>View Recipe</Link>
    </div>
  );
}
