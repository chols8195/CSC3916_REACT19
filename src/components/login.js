import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/authActions';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please enter username and password');
            return;
        }

        dispatch(login({ username, password }))
            .then((res) => {
                if (res && res.success) {
                    navigate('/movielist');
                } else {
                    setError('Invalid username or password');
                }
            })
            .catch(() => {
                setError('Login failed. Please try again.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: '#ff6b6b', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
            
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn-auth">
                Sign In
            </button>
        </form>
    );
}

export default Login;