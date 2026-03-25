import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/authActions";
import { BsFilm, BsPersonCircle } from 'react-icons/bs';

function MovieHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const username = useSelector((state) => state.auth.username);
    
    const logout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <header className="cinema-header">
            <NavLink to="/" className="cinema-logo">
                <BsFilm /> CinemaSeats
            </NavLink>
            
            <div className="nav-buttons">
                <NavLink to="/movielist">
                    <button className="nav-btn">Now Playing</button>
                </NavLink>
                
                {loggedIn ? (
                    <>
                        <span style={{ color: '#888' }}>
                            <BsPersonCircle /> {username}
                        </span>
                        <button className="nav-btn" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink to="/signin">
                        <button className="nav-btn filled">Sign In</button>
                    </NavLink>
                )}
            </div>
        </header>
    );
}

export default MovieHeader;