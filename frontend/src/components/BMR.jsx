import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../state/userSlice';
import '../styles/BmiBmr.css';

const BMR = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('male');
  const [success, setSuccess] = useState('');
  const { user } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const calculateBMRforMen = () => {
    const heightInCentimeters = height;
    const bmr = 10 * weight + 6.25 * heightInCentimeters - 5 * age + 5;
    const roundedBMR = parseFloat(bmr.toFixed(2));
    return roundedBMR;
  };

  const calculateBMRforWomen = () => {
    const heightInCentimeters = height;
    const bmr = 10 * weight + 6.25 * heightInCentimeters - 5 * age - 161;
    const roundedBMR = parseFloat(bmr.toFixed(2));
    return roundedBMR;
  };

  const handleSubmitBMR = async (e) => {
    e.preventDefault();
    let bmr;

    if (gender === 'male') {
      bmr = calculateBMRforMen();
    } else if (gender === 'female') {
      bmr = calculateBMRforWomen();
    } else {
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3001/api/users/${user._id}`,
        {
          bmr,
        }
      );
      if (response) {
        dispatch(updateUser({ user: response.data }));
      }
      setSuccess('BMR updated successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="bmr-container" onSubmit={handleSubmitBMR}>
      <p className="measurement-heading">
        Enter your weight, height and age to calculate BMR
      </p>
      <div className="radio-container">
        <label htmlFor="">
          Male
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Female
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
      </div>

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
      <label htmlFor="age" className="measurement-label">
        Age
        <input
          type="number"
          name="age"
          id="age"
          value={age}
          className="measurement-input"
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <div className="measurement-button-container">
        <button type="submit" className="primary-button primary-button-bm">
          Calculate BMR
        </button>
      </div>
      <p className="bmi-success">{success}</p>
    </form>
  );
};

export default BMR;
