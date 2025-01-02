import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/searchBar";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/recipe")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      });
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Mamos receptai</h1>
        <p>Visi mamos receptai vienoje vietoje!</p>
      </div>
      <hr />
      <div className="hero">
        <h2>Rask šiandienos gardumyną</h2>
        <SearchBar/>
      </div>
      <hr />
      <div className="recipe-container">
        <div className="hero">
          <h2>Rinkis ką nori</h2>
        </div>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
}

