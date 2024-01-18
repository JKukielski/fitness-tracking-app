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
        <p>{initialErrors.email}</p>
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
        <p>{initialErrors.username}</p>
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
        <p>{initialErrors.password}</p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
