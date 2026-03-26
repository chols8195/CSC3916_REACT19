import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link, useNavigate } from 'react-router-dom';
import { BsStarFill, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function MovieList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const movies = useSelector(state => state.movie.movies);
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('now_playing');

    useEffect(() => {
        if (loggedIn) {
            dispatch(fetchMovies(activeTab));
        }
    }, [dispatch, activeTab, loggedIn]);

    useEffect(() => {
        if (movies && movies.length > 0) {
            setFeaturedIndex(0);
            const interval = setInterval(() => {
                setFeaturedIndex((prev) => (prev + 1) % Math.min(movies.length, 5));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [movies]);

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFeaturedIndex(0);
    };

    const nextFeatured = () => {
        if (movies && movies.length > 0) {
            setFeaturedIndex((prev) => (prev + 1) % Math.min(movies.length, 5));
        }
    };

    const prevFeatured = () => {
        if (movies && movies.length > 0) {
            setFeaturedIndex((prev) => (prev - 1 + Math.min(movies.length, 5)) % Math.min(movies.length, 5));
        }
    };

    // If not logged in, show login prompt
    if (!loggedIn) {
        return (
            <div className="auth-page">
                <div className="auth-container" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '20px' }}>Welcome to Cinema Seats</h2>
                    <p style={{ color: '#888', marginBottom: '30px' }}>
                        Please sign in to view movies and submit reviews.
                    </p>
                    <button 
                        className="btn-auth" 
                        onClick={() => navigate('/signin')}
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <span>Loading movies...</span>
            </div>
        );
    }

    const featuredMovies = movies.slice(0, 5);
    const featuredMovie = featuredMovies[featuredIndex];

    return (
        <div>
            {/* Tab Navigation */}
            <div className="tab-nav">
                <button 
                    className={`tab-btn ${activeTab === 'now_playing' ? 'active' : ''}`}
                    onClick={() => handleTabChange('now_playing')}
                >
                    Now Playing
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'coming_soon' ? 'active' : ''}`}
                    onClick={() => handleTabChange('coming_soon')}
                >
                    Coming Soon
                </button>
            </div>

            {/* Featured Movie Carousel */}
            {featuredMovie && (
                <>
                    <div className="featured-section">
                        <div className="featured-movie">
                            <img src={featuredMovie.imageUrl} alt={featuredMovie.title} />
                            <div className="featured-overlay">
                                <h1 className="featured-title">{featuredMovie.title}</h1>
                                <div className="featured-info">
                                    <span className="rating-badge">
                                        <BsStarFill /> {featuredMovie.avgRating ? featuredMovie.avgRating.toFixed(1) : 'N/A'}
                                    </span>
                                    <span>{featuredMovie.releaseDate}</span>
                                    <span>{featuredMovie.genre}</span>
                                </div>
                                <Link to={`/movie/${featuredMovie._id}`} onClick={() => handleClick(featuredMovie)}>
                                    <button className="btn-get-tickets">
                                        {activeTab === 'now_playing' ? 'Get Tickets' : 'Notify Me'}
                                    </button>
                                </Link>
                            </div>
                        </div>
                        
                        <button className="carousel-nav prev" onClick={prevFeatured}>
                            <BsChevronLeft />
                        </button>
                        <button className="carousel-nav next" onClick={nextFeatured}>
                            <BsChevronRight />
                        </button>
                    </div>

                    {/* Carousel Indicators */}
                    <div className="carousel-indicators">
                        {featuredMovies.map((_, index) => (
                            <div 
                                key={index} 
                                className={`indicator ${index === featuredIndex ? 'active' : ''}`}
                                onClick={() => setFeaturedIndex(index)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Movie Grid */}
            <div className="movies-section">
                <h2 className="section-title">
                    {activeTab === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
                </h2>
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <Link 
                            key={movie._id}
                            to={`/movie/${movie._id}`} 
                            onClick={() => handleClick(movie)}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="movie-card">
                                <img src={movie.imageUrl} alt={movie.title} />
                                <div className="movie-card-info">
                                    <div className="movie-card-title">{movie.title}</div>
                                    <div className="movie-card-meta">
                                        <span className="movie-card-rating">
                                            <BsStarFill /> {movie.avgRating ? movie.avgRating.toFixed(1) : 'N/A'}
                                        </span>
                                        <span>{movie.releaseDate}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MovieList;