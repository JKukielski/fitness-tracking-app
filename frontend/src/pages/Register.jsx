import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginRegister.css';
import images from '../constants/images';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  let initialErrors = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

    if (password.length < 8) {
      initialErrors.password = 'Password must be at least 8 characters long';
    }

    if (username.length < 5) {
      initialErrors.username = 'Username must be at least 5 characters long';
    }

    if (email.length === 0 || !emailRegex.test(email)) {
      initialErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(initialErrors).length > 0) {
      setErrors(initialErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        {
          email,
          username,
          password,
        }
      );

      if (response) {
        navigate('/login');
      }
    } catch (err) {
      if (err.response) {
        console.error('Registration failed with status:', err.response.status);

        setErrors((prevErrors) => ({
          ...prevErrors,
          email: err.response.data.errors?.email || '',
          username: err.response.data.errors?.username || '',
        }));
      } else if (err.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', err.message);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <img src={images.loginRegister} alt="" className="form-image" />
        <p className="form-welcome">Sign up now and track your progress!</p>
        <label htmlFor="email" className="form-label">
          Email
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <p className="form-error">{errors.email}</p>
        <p className="form-error">{initialErrors.email}</p>
        <label htmlFor="username" className="form-label">
          Username
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <p className="form-error">{errors.username}</p>
        <p className="form-error">{initialErrors.username}</p>
        <label htmlFor="password" className="form-label">
          Password
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className="form-error">{errors.password}</p>
        <p className="form-error">{initialErrors.password}</p>

        <p className="form-redirect">
          Already a user? <Link to="/login">Sign in</Link>!
        </p>

        <button type="submit" className="form-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
