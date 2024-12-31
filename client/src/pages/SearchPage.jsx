import { useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const SearchPage = () => {
    const [term, setTerm] = useState('');
    const [recipes, setRecipes] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!term) {
            console.error('Search term is empty!');
            return;
        }
        try {
            console.log(`/search?term=${encodeURIComponent(term)}`); 
            const response = await fetch(`http://localhost:4000/search?term=${encodeURIComponent(term)}`);
            const data = await response.json();
            setRecipes(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    

    return (
        <div>
            <h1>Search Page</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search..."
                />
                <button type="submit">Search</button>
            </form>

            <div className="recipe-grid">
                  <br />
                    {recipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
        </div>
    );
};

export default SearchPage;