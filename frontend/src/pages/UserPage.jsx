import { useSelector } from 'react-redux';
import images from '../constants/images';
import '../styles/UserPage.css';
import { GoPencil } from 'react-icons/go';

import UserLink from '../components/UserLink';
import { useState } from 'react';

const UserPage = () => {
  const { user } = useSelector((state) => state.user.user);
  const [isEditable, setIsEditable] = useState(false);
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
            <GoPencil className="user-edit-icon" />
          </div>
          <form className="user-info-form">
            <label htmlFor="name" className="form-label">
              Name
              <input
                className={isEditable ? 'form-input' : 'form-input disabled'}
                type="text"
                id="name"
                name="name"
                disabled={!isEditable}
              />
            </label>
            <label htmlFor="email" className="form-label">
              Email
              <input
                className="form-input disabled"
                type="email"
                id="email"
                name="email"
                placeholder={user.email}
                disabled
              />
            </label>
            <label htmlFor="age" className="form-label">
              Age
              <input
                className="form-input disabled"
                type="text"
                id="age"
                name="age"
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
                disabled={!isEditable}
              />
            </label>
            <div className="user-button-container">
              <button className="secondary-button" onClick={handleEditClick}>
                Edit information
              </button>
              <button
                className="primary-button user-primary-button"
                type="submit"
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
