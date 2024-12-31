import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./searchBar";
import { Link } from "react-router";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      // fetchAllRecipes().then(data => setRecipes(data));
    fetch("http://localhost:4000/recipe")
    .then((response) => response.json())
    .then((data) => {
      setRecipes(data);
    })
  
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
      <SearchBar onSearch={(searchTerm) => {
        // Handle navigation here

      }} />
      </div>
      <div className="hero">
      <h2>Rinkis ką nori</h2>
      </div>
      <div className="recipe-grid">
      <br />
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}


const fetchAllRecipes = async () => {
  // Simulate fetching data from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Varškėčiai", ingredients: ["spaghetti", "meat", "tomato sauce"], image: "spaghetti.jpg" },
        { id: 2, name: "Keksiukai", ingredients: ["chicken", "curry powder", "coconut milk"], image: "chicken_curry.jpg" },
        { id: 3, name: "Varškės apkepas", ingredients: ["beef", "taco shells", "lettuce", "cheese"], image: "beef_tacos.jpg" },
      ]);
    }, 1000);
  });
};