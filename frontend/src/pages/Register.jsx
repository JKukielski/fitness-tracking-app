import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/LoginRegister.css';
import images from '../constants/images';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
    gender: '',
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

    if (name.length < 2) {
      initialErrors.name = 'Name must be at least 2 characters long';
    }

    if (email.length === 0 || !emailRegex.test(email)) {
      initialErrors.email = 'Please enter a valid email address';
    }

    if (gender === '') {
      initialErrors.gender = 'Please choose your gender';
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
          name,
          username,
          gender,
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
        <label htmlFor="name" className="form-label">
          Name
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {initialErrors.name && (
          <p className="form-error">{initialErrors.name}</p>
        )}
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
        {errors.email && <p className="form-error">{errors.email}</p>}
        {initialErrors.email && (
          <p className="form-error">{initialErrors.email}</p>
        )}
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
        {errors.username && <p className="form-error">{errors.username}</p>}
        {initialErrors.username && (
          <p className="form-error">{initialErrors.username}</p>
        )}
        <label htmlFor="gender" className="form-label">
          Gender
          <select
            name="gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Choose your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        {initialErrors.gender && (
          <p className="form-error">{initialErrors.gender}</p>
        )}
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
        {errors.password && <p className="form-error">{errors.password}</p>}
        {initialErrors.password && (
          <p className="form-error">{initialErrors.password}</p>
        )}

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
