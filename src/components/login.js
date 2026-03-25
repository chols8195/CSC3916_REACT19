import React, { useState } from 'react';
import { submitLogin } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDetails = (event) => {
    setDetails({
      ...details,
      [event.target.id]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      await dispatch(submitLogin(details));
      navigate('/movielist');
    } catch (e) {
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={login}>
      {error && (
        <p style={{ color: '#e50914', marginBottom: '15px', textAlign: 'center' }}>
          {error}
        </p>
      )}
      
      <div className="form-group">
        <label htmlFor="username">Username or Email</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username or email"
          value={details.username}
          onChange={updateDetails}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={details.password}
          onChange={updateDetails}
          required
        />
      </div>

      <button type="submit" className="btn-auth">
        Sign In
      </button>
    </form>
  );
}

export default Login;