import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ExerciseDetail from './pages/ExerciseDetail';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPage from './pages/UserPage';

const App = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route path="/user" element={user && <UserPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
