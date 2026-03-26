import React, { useState } from 'react';
import Login from './login';
import Register from './register';

function Authentication() {
    const [activeTab, setActiveTab] = useState('login');

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
                        Sign Up
                    </button>
                </div>

                {activeTab === 'login' ? <Login /> : <Register />}
            </div>
        </div>
    );
}

export default Authentication;