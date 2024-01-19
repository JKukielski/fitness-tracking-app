import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../state/userSlice';
import { IoIosLogOut } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [userIconOpen, setUserIconOpen] = useState(false);
  const dispatch = useDispatch();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  return (
    <div className="navbar-container">
      <Link className="navbar-main-link" to="/">
        FITNESS TRACKING
      </Link>
      <div className="navbar-additional-links">
        <Link className="additional-link-user" to="/">
          USER PROFILE
        </Link>
        <div className="additonal-link-container">
          <IoIosLogOut />
          <p className="additional-link-logout" onClick={logoutUser}>
            LOGOUT
          </p>
        </div>
      </div>
      <div
        className="small-device-container"
        onClick={() => setUserIconOpen(!userIconOpen)}
      >
        <FaUserAlt className="small-device-user" />
        {userIconOpen && (
          <div className="options-container">
            <Link className="options-link-user" to="/">
              USER PROFILE
            </Link>
            <div className="options-split"></div>
            <div className="options-link-container">
              <IoIosLogOut />
              <p className="options-link-logout" onClick={logoutUser}>
                LOGOUT
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
