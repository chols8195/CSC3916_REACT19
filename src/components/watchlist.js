import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill, BsArrowLeft, BsStarFill, BsTrash, BsPlayFill } from 'react-icons/bs';

function Watchlist() {
    // Empty array - watchlist would be stored in backend/localStorage in a real app
    const [watchlist, setWatchlist] = useState([]);

    const removeFromWatchlist = (id) => {
        setWatchlist(watchlist.filter(movie => movie._id !== id));
    };

    return (
        <div className="page-container">
            <Link to="/movielist" className="btn-back">
                <BsArrowLeft /> Back to Movies
            </Link>
            
            <div className="page-header">
                <BsHeartFill className="page-icon" style={{ color: '#ff6b6b' }} />
                <h1>My Watchlist</h1>
                {watchlist.length > 0 && (
                    <span className="watchlist-count">{watchlist.length} movies</span>
                )}
            </div>
            
            {watchlist.length > 0 ? (
                <div className="watchlist-grid">
                    {watchlist.map((movie) => (
                        <div key={movie._id} className="watchlist-card">
                            <div className="watchlist-poster">
                                <img src={movie.imageUrl} alt={movie.title} />
                                <div className="watchlist-overlay">
                                    <Link to={`/movie/${movie._id}`} className="btn-play">
                                        <BsPlayFill />
                                    </Link>
                                </div>
                                <span className={`watchlist-badge ${movie.status}`}>
                                    {movie.status === 'now_playing' ? 'Now Playing' : 'Coming Soon'}
                                </span>
                            </div>
                            <div className="watchlist-info">
                                <h3 className="watchlist-title">{movie.title}</h3>
                                <div className="watchlist-meta">
                                    <span className="watchlist-year">{movie.releaseDate}</span>
                                    <span className="watchlist-genre">{movie.genre}</span>
                                    <span className="watchlist-rating">
                                        <BsStarFill /> {movie.avgRating?.toFixed(1) || 'N/A'}
                                    </span>
                                </div>
                                <div className="watchlist-actions">
                                    <Link to={`/movie/${movie._id}`} className="btn-details">
                                        View Details
                                    </Link>
                                    <button 
                                        className="btn-remove"
                                        onClick={() => removeFromWatchlist(movie._id)}
                                        title="Remove from watchlist"
                                    >
                                        <BsTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <BsHeart className="empty-icon" />
                    <h2>Your Watchlist is Empty</h2>
                    <p>Save movies you want to watch later by clicking the heart icon on any movie.</p>
                    <Link to="/movielist" className="btn-primary">
                        Discover Movies
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Watchlist;