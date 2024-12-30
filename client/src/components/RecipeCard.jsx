import { Link } from "react-router";
import defaultRecipeImage from "../assets/png-transparent-computer-icons-salad-food-food-icon-food-heart-tomato 1.png"; // Adjust the path as needed
import "./card.css";

export default function RecipeCard({ recipe }) {
  const handleImageError = (e) => {
    e.target.src = defaultRecipeImage;
  };

  return (
    <div className="recipe-card">
      <div className="recipe-image"
        
      >

        
        <img 
          src={`http://localhost:4000/${recipe.imagePath}`}
          alt={recipe.title}
          onError={handleImageError}
        />
      </div>
      <Link className="card-link" to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
    </div>
  );
}
