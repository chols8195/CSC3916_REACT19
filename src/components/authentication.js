import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from './login';
import Register from './register';
import { logoutUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const username = useSelector((state) => state.auth.username);

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (loggedIn) {
    return (
      <div className="auth-page">
        <div className="auth-container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#e50914', marginBottom: '20px' }}>
            Welcome, {username}!
          </h2>
          <p style={{ color: '#888', marginBottom: '30px' }}>
            You are signed in and ready to book tickets and write reviews.
          </p>
          <button className="btn-auth" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">CinemaSeats</h1>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {activeTab === 'register' ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default Authentication;