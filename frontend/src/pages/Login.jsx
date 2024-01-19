import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../state/userSlice';
import '../styles/LoginRegister.css';
import images from '../constants/images';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: '', password: '' });
  let initialErrors = {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

    if (email.length === 0 || !emailRegex.test(email)) {
      initialErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(initialErrors).length > 0) {
      setErrors(initialErrors);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/login',
        {
          email,
          password,
        }
      );

      if (response) {
        dispatch(
          login({
            user: response.data,
            token: response.data.token,
          })
        );

        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        console.error('Login failed with status:', err.response.status);

        setErrors((prevErrros) => ({
          ...prevErrros,
          email: err.response.data.errors?.email || '',
          password: err.response.data.errors?.password || '',
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
        <p className="form-welcome">Welcome back!</p>
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

        <p className="form-redirect">
          Don't have an account yet? <Link to="/register">Sign up</Link>!
        </p>

        <button type="submit" className="form-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
