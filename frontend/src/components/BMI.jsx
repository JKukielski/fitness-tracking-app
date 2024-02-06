import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../state/userSlice';
import '../styles/BmiBmr.css';
import { IoIosInformationCircleOutline } from 'react-icons/io';

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [displayBmi, setDisplayBmi] = useState('');

  const bmiDisplayColor = (bmiResult) => {
    if (bmiResult >= 25 && bmiResult <= 29.9) {
      return 'overweight';
    } else if (bmiResult < 18.5) {
      return 'underweight';
    } else if (bmiResult >= 30) {
      return 'obesity';
    } else return 'healthy';
  };

  const handleSubmitBMI = async (e) => {
    e.preventDefault();
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    try {
      const response = await axios.patch(
        `http://localhost:3001/api/users/${user._id}`,
        {
          bmi,
        }
      );
      if (response) {
        dispatch(updateUser({ user: response.data }));
      }
      setDisplayBmi(bmi);
      setSuccess('BMI updated successfully!');
      setHeight('');
      setWeight('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="bmi-container" onSubmit={handleSubmitBMI}>
      <IoIosInformationCircleOutline className="information-icon" />
      <p className="measurement-heading">
        Enter your weight and height to calculate BMI
      </p>
      <label htmlFor="weight" className="measurement-label">
        Current weight (kg)
        <input
          type="number"
          name="weight"
          id="weight"
          value={weight}
          className="measurement-input"
          onChange={(e) => setWeight(e.target.value)}
        />
      </label>
      <label htmlFor="height" className="measurement-label">
        Current height (cm)
        <input
          type="number"
          name="height"
          id="height"
          value={height}
          className="measurement-input"
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
      <div className="form-result-container">
        <p className={bmiDisplayColor(displayBmi)}>
          {displayBmi && `${displayBmi}kcal`}
        </p>
      </div>
      <div className="measurement-button-container">
        <button type="submit" className="primary-button primary-button-bm">
          Calculate BMI
        </button>
      </div>
      <p className="bmi-success">{success}</p>
    </form>
  );
};

export default BMI;
