import { IoIosLogOut } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../state/userSlice';
import { GoArrowLeft } from 'react-icons/go';
import { useDispatch } from 'react-redux';

const UserLink = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="user-links-container">
      <div className="user-link-inner-container">
        <GoArrowLeft />
        <Link className="user-link-home" to="/">
          BACK TO HOME PAGE
        </Link>
      </div>
      <div className="user-link-inner-container logout">
        <IoIosLogOut />
        <p className="user-link-logout" onClick={logoutUser}>
          LOGOUT
        </p>
      </div>
    </div>
  );
};

export default UserLink;
