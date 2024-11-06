import { useState } from 'react';
import './searchBar.css';
import MagnifyGlass from '../assets/MagnifyGlass.svg';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="search-container">
            <div className="search-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="search-input"
                    />
                <button type="submit" className="search-button">
                    <img src={MagnifyGlass} alt="search" className="search-icon" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;