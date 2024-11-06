import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    //   fetchAllRecipes().then(data => setRecipes(data));
  }, []);

  return (
    <>
      <div>HOME PAGE</div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
