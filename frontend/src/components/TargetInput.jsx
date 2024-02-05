import { useState } from 'react';
import '../styles/TargetInput.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../state/userSlice';

const TargetInput = () => {
  const [targetWeight, setTargetWeight] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/users/${user._id}`,
        {
          targetWeight,
        }
      );
      if (response) {
        dispatch(
          updateUser({
            user: response.data,
          })
        );
      }
      setSuccess('Target updated successfully!');
      setTargetWeight('');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <form className="target-container" onSubmit={handleSubmit}>
      <p className="measurement-heading">Enter your target weight</p>
      <label htmlFor="weight" className="measurement-label">
        Target weight
        <input
          type="number"
          name="target"
          id="target"
          value={targetWeight}
          className="measurement-input"
          onChange={(e) => setTargetWeight(e.target.value)}
        />
      </label>
      <div className="measurement-button-container">
        <button type="submit" className="primary-button primary-button-bm">
          Submit target
        </button>
      </div>
      <p className="target-success">{success}</p>
    </form>
  );
};

export default TargetInput;
