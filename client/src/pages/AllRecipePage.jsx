import { useEffect, useState } from "react";


const AllRecipePage = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/recipes")
            .then((response) => response.json())
            .then((data) => setRecipes(data));
    }, [])

    return (
        <div>
            <h1>Visi receptai</h1>
            {recipes.map((recipe) => (
                <div key={recipe.id}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                </div>
            ))}
        </div>
    );
};

export default AllRecipePage;