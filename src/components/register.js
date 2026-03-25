import React, { useState } from 'react';
import { submitRegister } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [details, setDetails] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDetails = (event) => {
    setDetails({
      ...details,
      [event.target.id]: event.target.value
    });
  };

  const register = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      await dispatch(submitRegister(details));
      navigate('/movielist');
    } catch (e) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={register}>
      {error && (
        <p style={{ color: '#e50914', marginBottom: '15px', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={details.name}
          onChange={updateDetails}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Choose a username"
          value={details.username}
          onChange={updateDetails}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={details.email}
          onChange={updateDetails}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Create a password"
          value={details.password}
          onChange={updateDetails}
          required
        />
      </div>

      <button type="submit" className="btn-auth">
        Create Account
      </button>
    </form>
  );
}

export default Register;