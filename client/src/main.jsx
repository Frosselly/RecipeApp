import { Route, Routes } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from 'react-router'
import { UserContextProvider } from "./UserContext.jsx";

import Root from "./components/root";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from './pages/LoginPage';
import NewRecipePage from "./pages/NewRecipePage.jsx";
import AllRecipePage from "./pages/AllRecipePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import EditPage from "./pages/EditPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";



const routes = (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/add-recipe" element={<NewRecipePage />} />
      <Route path="/recipe" element={<AllRecipePage />} />
      <Route path="/recipes/:id" element={<RecipePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Route>
  </Routes>
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
    <UserContextProvider>
      {routes}
    </UserContextProvider>
    </Router>
    
  </StrictMode>
);
