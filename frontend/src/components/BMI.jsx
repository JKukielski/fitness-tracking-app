import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../state/userSlice';
import '../styles/BmiBmr.css';

const BMI = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [success, setSuccess] = useState('');
  const { user } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

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
      setSuccess('BMI updated successfully!');
      setHeight(0);
      setWeight(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="bmi-container" onSubmit={handleSubmitBMI}>
      <p className="measurement-heading">
        Enter your weight and height to calculate BMI
      </p>
      <label htmlFor="weight" className="measurement-label">
        Current weight
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
        Current height
        <input
          type="number"
          name="height"
          id="height"
          value={height}
          className="measurement-input"
          onChange={(e) => setHeight(e.target.value)}
        />
      </label>
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
