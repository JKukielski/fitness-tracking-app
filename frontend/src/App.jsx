import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPage from './pages/UserPage';
import Test from './pages/Test';

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
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
