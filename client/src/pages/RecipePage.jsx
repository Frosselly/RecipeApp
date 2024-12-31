import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { format, addHours  } from "date-fns";
import { UserContext } from "../UserContext";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/recipe/${id}`)
      .then((response) => response.json())
      .then((recipe) => {
        // Parse steps if they are stored as a JSON string
        const parsedSteps = Array.isArray(recipe.steps)
          ? recipe.steps
          : JSON.parse(recipe.steps || "[]");

        // Include parsed steps in the recipe state
        setRecipe({ ...recipe, steps: parsedSteps });
      });
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }


  return (
    <div className="post-page">
      <h1>{recipe.title}</h1>
      <time>{format( addHours(new Date(recipe.update_date), 2), "yyyy-MM-dd HH:mm:ss")}</time>
      <div className="author">by @{recipe.fk_user}</div>
      {userInfo && userInfo.username === recipe.fk_user && (
        <>
          <div className="edit-row">
            <Link className="edit-btn" to={`/edit/${id}/`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Redaguoti
            </Link>
          </div>
        </>
      )}
      <div className="image">
        {recipe.imagePath ? (
          <img src={`http://localhost:4000/${recipe.imagePath}`} alt="" />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="content">
        <h3>Description</h3>
        <p>{recipe.description}</p>
        <h3>Cook Time</h3>
        <p>{recipe.cook_time} minutes</p>
        <h3>Servings</h3>
        <p>{recipe.servings}</p>
        <h3>Notes</h3>
        <p>{recipe.notes}</p>
        <h3>Steps</h3>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};


export default RecipePage;
