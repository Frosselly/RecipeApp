import { useLoaderData } from "react-router";

export default function Recipe(){

    // Use the loader function from AppRouter to fetch recipe data
  // For demonstration, assume `recipe` object is available
  const recipe = useLoaderData(); // Adjust based on React Router version

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map(ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}