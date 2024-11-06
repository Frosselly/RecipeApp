import { createBrowserRouter, RouterProvider} from'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Recipe from './components/Recipe';
// import HomePage from './components/HomePage';
// import Nav from './components/Nav';
import AddRecipeForm from './components/AddRecipeForm';
import Root from './components/root';
import HomePage from './components/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "recipes/:recipeId",
        element: <Recipe />,
        // loader: ({ params }) => fetchRecipeById(params.recipeId), // Implement fetchRecipeById in utils/api.js
      },
      {
        path: "add-recipe",
        element: <AddRecipeForm />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
