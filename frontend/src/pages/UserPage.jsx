import { useSelector } from 'react-redux';
import images from '../constants/images';
import '../styles/UserPage.css';

import UserLink from '../components/UserLink';

const UserPage = () => {
  const { user } = useSelector((state) => state.user.user);

  return (
    <div className="user-container">
      <div className="user-inner-container">
        <div className="user-page-info-container">
          <UserLink />
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
