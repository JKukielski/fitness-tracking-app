import { useSelector, useDispatch } from 'react-redux';
import images from '../constants/images';
import '../styles/UserPage.css';
import { GoPencil } from 'react-icons/go';
import UserLink from '../components/UserLink';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { updateUser } from '../state/userSlice.js';

const UserPage = () => {
  const { user } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || '');
  const [weight, setWeight] = useState(user?.weight || '');
  const [height, setHeight] = useState(user?.height || '');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3001/api/users/${user._id}`
      );
      if (response) {
        dispatch(
          updateUser({
            user: response.data,
          })
        );
      }
    };

    fetchUser();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  const submitUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/users/${user._id}`,
        {
          name,
          dateOfBirth,
          weight,
          height,
        }
      );

      if (response) {
        dispatch(
          updateUser({
            user: response.data,
          })
        );
        setSuccess('Personal information updated successfully!');
      }

      setIsEditable(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
  };

  return (
    <div className="user-container">
      <div className="user-inner-container">
        <div className="user-page-info-container">
          <UserLink />
          <div className="user-info-heading-container">
            <h1 className="user-info-heading">PERSONAL INFORMATION</h1>
            <div className="user-info-underline"></div>
          </div>
          <form className="user-info-form" onSubmit={submitUpdateUser}>
            <label htmlFor="name" className="form-label">
              Name
              <input
                className={isEditable ? 'form-input' : 'form-input disabled'}
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder={user?.name}
                disabled={!isEditable}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email
              <input
                className="form-input disabled"
                type="email"
                id="email"
                name="email"
                placeholder={user?.email}
                disabled
              />
            </label>
            <label htmlFor="dob" className="form-label">
              Date of Birth
              <input
                className={isEditable ? 'form-input' : 'form-input disabled'}
                type="text"
                id="dob"
                name="dob"
                value={formatDate(dateOfBirth)}
                disabled={!isEditable}
                placeholder={user?.dateOfBirth}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </label>
            <label htmlFor="name" className="form-label">
              Gender
              <input
                className="form-input disabled"
                type="text"
                id="gender"
                name="gender"
                placeholder={`${user?.gender
                  .charAt(0)
                  .toUpperCase()}${user?.gender.substring(1)}`}
                disabled
              />
            </label>
            <label htmlFor="weight" className="form-label">
              Weight
              <input
                className={isEditable ? 'form-input' : 'form-input disabled'}
                type="text"
                id="weight"
                name="weight"
                value={weight}
                placeholder={user?.weight}
                onChange={(e) => setWeight(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <label htmlFor="height" className="form-label">
              Height
              <input
                className={isEditable ? 'form-input' : 'form-input disabled'}
                type="text"
                id="height"
                name="name"
                value={height}
                placeholder={user?.height}
                onChange={(e) => setHeight(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <p className="success">{success}</p>
            <div className="user-button-container">
              <button className="secondary-button" onClick={handleEditClick}>
                Edit information
              </button>
              <button
                className="primary-button user-primary-button"
                type="submit"
                disabled={!isEditable}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="user-page-image-container">
          {user.gender === 'male' ? (
            <img className="user-page-image" src={images.male_user} />
          ) : (
            <img className="user-page-image" src={images.female_user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
