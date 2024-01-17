import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const isPasswordValid = (password) => {
    return (
      password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        {
          email,
          username,
          password,
        }
      );

      if (!isPasswordValid(password)) {
        setErrors({
          ...errors,
          password:
            'Password must be at least 8 characters long and include letters and numbers',
        });
      }
      if (response) {
        navigate('/login');
      }
    } catch (err) {
      if (err.response) {
        console.error('Registration failed with status:', err.response.status);

        setErrors({
          email: err.response.data.errors?.email || '',
          username: err.response.data.errors?.username || '',
          password: '',
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
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <p>{errors.username}</p>

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
