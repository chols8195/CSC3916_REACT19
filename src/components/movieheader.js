import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { searchMovies, fetchMovies } from '../actions/movieActions';
import { BsFilm, BsPersonCircle, BsSearch, BsX, BsTicketPerforated, BsHeart, BsGear, BsBoxArrowRight, BsChevronDown, BsCameraReels } from 'react-icons/bs';

function MovieHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const username = useSelector(state => state.auth.username);
    const movies = useSelector(state => state.movie.movies);
    
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target) && !event.target.closest('.search-toggle')) {
                setShowSearch(false);
                setSuggestions([]);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Autocomplete suggestions based on current movies
    useEffect(() => {
        if (searchQuery.trim().length > 0 && movies && movies.length > 0) {
            const query = searchQuery.toLowerCase();
            const filtered = movies.filter(movie => 
                movie.title.toLowerCase().includes(query) ||
                movie.genre.toLowerCase().includes(query) ||
                movie.actors.some(actor => 
                    actor.actorName.toLowerCase().includes(query) ||
                    actor.characterName.toLowerCase().includes(query)
                )
            ).slice(0, 5); // Limit to 5 suggestions
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, movies]);

    const handleLogout = () => {
        dispatch(logout());
        setShowDropdown(false);
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            dispatch(searchMovies(searchQuery));
            navigate('/movielist');
            setShowSearch(false);
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (movie) => {
        navigate(`/movie/${movie._id}`);
        setShowSearch(false);
        setSearchQuery('');
        setSuggestions([]);
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleDropdown = () => {
        console.log('Dropdown toggled, current state:', showDropdown);
        setShowDropdown(!showDropdown);
    };

    return (
        <header className="cinema-header">
            <Link to="/" className="cinema-logo">
                <BsFilm /> CinemaSeats
            </Link>

            <div className="header-actions">
                {loggedIn ? (
                    <>
                        {/* Search Toggle */}
                        <button 
                            className={`icon-btn search-toggle ${showSearch ? 'active' : ''}`}
                            onClick={() => setShowSearch(!showSearch)}
                            title="Search"
                        >
                            <BsSearch />
                        </button>

                        {/* Now Playing Button */}
                        <Link to="/movielist" className="nav-btn">
                            Now Playing
                        </Link>

                        {/* User Profile Dropdown */}
                        <div className="user-menu" ref={dropdownRef}>
                            <button 
                                className="user-btn"
                                onClick={toggleDropdown}
                                type="button"
                            >
                                <BsPersonCircle className="user-icon" />
                                <span className="user-name">{username || 'User'}</span>
                                <BsChevronDown className={`chevron ${showDropdown ? 'rotate' : ''}`} />
                            </button>

                            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
                                <div className="dropdown-header">
                                    <BsPersonCircle className="dropdown-avatar" />
                                    <div>
                                        <div className="dropdown-username">{username || 'User'}</div>
                                        <div className="dropdown-email">Welcome back!</div>
                                    </div>
                                </div>
                                <div className="dropdown-divider"></div>
                                <Link to="/tickets" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                    <BsTicketPerforated /> My Tickets
                                </Link>
                                <Link to="/movielist" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                    <BsCameraReels /> Book Tickets
                                </Link>
                                <Link to="/watchlist" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                    <BsHeart /> Watchlist
                                </Link>
                                <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                    <BsGear /> Settings
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout" onClick={handleLogout} type="button">
                                    <BsBoxArrowRight /> Logout
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Link to="/signin" className="nav-btn filled">
                        Sign In
                    </Link>
                )}
            </div>

            {/* Expandable Search Bar with Autocomplete */}
            {showSearch && (
                <div className="search-overlay" ref={searchRef}>
                    <form onSubmit={handleSearch} className="header-search-form">
                        <div className="search-input-container">
                            <BsSearch className="header-search-icon" />
                            <input
                                type="text"
                                placeholder="Search movies, actors, genres..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                className="header-search-input"
                                autoFocus
                            />
                            {searchQuery && (
                                <button 
                                    type="button" 
                                    className="search-clear-btn" 
                                    onClick={() => { setSearchQuery(''); setSuggestions([]); }}
                                >
                                    <BsX />
                                </button>
                            )}
                            
                            {/* Autocomplete Suggestions */}
                            {suggestions.length > 0 && (
                                <div className="search-suggestions">
                                    {suggestions.map((movie) => (
                                        <div 
                                            key={movie._id} 
                                            className="suggestion-item"
                                            onClick={() => handleSuggestionClick(movie)}
                                        >
                                            <img src={movie.imageUrl} alt={movie.title} className="suggestion-poster" />
                                            <div className="suggestion-info">
                                                <div className="suggestion-title">{movie.title}</div>
                                                <div className="suggestion-meta">{movie.releaseDate} • {movie.genre}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="header-search-btn">Search</button>
                        <button type="button" className="search-close" onClick={() => { setShowSearch(false); setSuggestions([]); }}>
                            <BsX />
                        </button>
                    </form>
                </div>
            )}
        </header>
    );
}

export default MovieHeader;