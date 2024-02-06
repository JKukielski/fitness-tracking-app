import { useDispatch, useSelector } from 'react-redux';
import '../styles/CarouselComponent.css';
import axios from 'axios';
import { useEffect } from 'react';
import { updateUser } from '../state/userSlice';

const CarouselComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);

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

  const bmiDisplayColor = (bmiResult) => {
    if (bmiResult >= 25 && bmiResult <= 29.9) {
      return 'overweight';
    } else if (bmiResult < 18.5) {
      return 'underweight';
    } else if (bmiResult >= 30) {
      return 'obesity';
    } else return 'healthy';
  };

  return (
    <div className="carousel-container">
      <div className="carousel-item">
        <p className="carousel-item-heading">Latest weight entry</p>
        <p className="carousel-item-measurement custom">
          <span className="neutral-measurement">{user?.weight}kg</span>
        </p>
      </div>
      <div className="carousel-item">
        <p className="carousel-item-heading">Latest BMI score</p>
        <p className="carousel-item-measurement custom">
          <span className={bmiDisplayColor(user?.bmi)}>{user?.bmi}</span>
        </p>
      </div>
      <div className="carousel-item">
        <p className="carousel-item-heading">Latest BMR measurement</p>
        <p className="carousel-item-measurement custom">
          <span className="neutral-measurement">{user?.bmr}kcal</span>
        </p>
      </div>
      <div className="carousel-item">
        <p className="carousel-item-heading">
          {user?.bmi < 18.5
            ? 'To achieve your target weight you should gain weight.'
            : user?.bmi > 24.9
            ? 'To achieve your target weight you should lose weight.'
            : 'You have a healthy BMI!'}
        </p>
        <p className="carousel-item-measurement">
          Healthy BMI range:{' '}
          <span className="neutral-measurement">18.5 - 24.9</span>
        </p>
      </div>
      <div className="carousel-item">
        <p className="carousel-item-heading">
          {user?.targetWeight > user?.weight
            ? `To achieve your target you should gain ${
                user?.targetWeight - user?.weight
              }kg`
            : user?.targetWeight < user?.weight
            ? `To achieve your target you should lose ${
                user?.weight - user?.targetWeight
              }`
            : 'You have achieved your target weight!'}
        </p>
        <p className="carousel-item-measurement"></p>
      </div>
    </div>
  );
};

export default CarouselComponent;
