import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../state/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

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

        setErrors({
          email: err.response.data.errors?.email || '',
          password: err.response.data.errors?.password || '',
        });
      } else if (err.request) {
        console.error('No response received');
      } else {
        console.error('Error setting up the request:', err.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <p>{errors.email}</p>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p>{errors.password}</p>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
