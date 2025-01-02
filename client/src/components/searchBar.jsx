import { useState } from 'react';
import './searchBar.css';
import MagnifyGlass from '../assets/MagnifyGlass.svg';
import RecipeCard from '../components/RecipeCard';

const SearchBar = () => {
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
        <>
        
        <form onSubmit={handleSearch} className="search-container">
            <div className="search-wrapper">
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search..."
                    className="search-input"
                    />
                <button type="submit" className="search-button">
                    <img src={MagnifyGlass} alt="search" className="search-icon" />
                </button>
            </div>
        </form>

            <div className="recipe-grid">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            </div>
            </>
    );
};

export default SearchBar;