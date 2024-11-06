import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import SearchBar from "./searchBar";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
      fetchAllRecipes().then(data => setRecipes(data));
  
  }, []);

  return (
    <>
      <h1>Mamos receptai</h1>
      <p>Visi mamos receptai vienoje vietoje!</p>
      <p>Spausk ant recepto, kad pamatytum daugiau informacijos</p>
      <hr />
      <h2>Rask šiandienos gardumyną</h2>
      <SearchBar onSearch={(searchTerm) => console.log(searchTerm)} />

      <hr />
      <div className="recipe-grid">
      <h2>Rinkis ką nori</h2>
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
        { id: 1, name: "Spaghetti Bolognese", ingredients: ["spaghetti", "meat", "tomato sauce"], image: "spaghetti.jpg" },
        { id: 2, name: "Chicken Curry", ingredients: ["chicken", "curry powder", "coconut milk"], image: "chicken_curry.jpg" },
        { id: 3, name: "Beef Tacos", ingredients: ["beef", "taco shells", "lettuce", "cheese"], image: "beef_tacos.jpg" },
      ]);
    }, 1000);
  });
};