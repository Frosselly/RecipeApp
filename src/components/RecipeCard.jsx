import { Link } from "react-router-dom";
import defaultRecipeImage from "../assets/png-transparent-computer-icons-salad-food-food-icon-food-heart-tomato 1.png"; // Adjust the path as needed

export default function RecipeCard({ recipe }) {
  const handleImageError = (e) => {
    e.target.src = defaultRecipeImage;
  };

  return (
    <div className="recipe-card">
      <div 
        style={{ 
          backgroundColor: "#F7F7F8",
          width: "300px",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img 
          src={recipe.image || defaultRecipeImage}
          alt={recipe.name}
          onError={handleImageError}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain"
          }}
        />
      </div>
      <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
    </div>
  );
}
