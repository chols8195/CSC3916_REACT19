import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../actions/authActions';

function Register() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (!name || !username || !email || !password) {
            setMessage('Please fill in all fields');
            setIsError(true);
            return;
        }

        dispatch(register({ name, username, email, password }))
            .then((res) => {
                if (res && res.success) {
                    setMessage('Account created! Please sign in.');
                    setIsError(false);
                    setName('');
                    setUsername('');
                    setEmail('');
                    setPassword('');
                } else {
                    setMessage(res?.message || 'Registration failed');
                    setIsError(true);
                }
            })
            .catch(() => {
                setMessage('Registration failed. Please try again.');
                setIsError(true);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            {message && (
                <div style={{ 
                    color: isError ? '#ff6b6b' : '#4dabf7', 
                    marginBottom: '15px', 
                    textAlign: 'center' 
                }}>
                    {message}
                </div>
            )}

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button type="submit" className="btn-auth">
                Create Account
            </button>
        </form>
    );
}

export default Register;