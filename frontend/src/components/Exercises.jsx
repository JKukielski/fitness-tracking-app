import { useEffect, useState } from 'react';
import '../styles/Exercises.css';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';
import Slider from './Slider';
import Pagination from '@mui/material/Pagination';

const Exercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      );

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExerciseData();
  }, []);

  const handleSubmit = async () => {
    if (search) {
      const exerciseData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      );

      const searchedExercises = exerciseData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      );

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  return (
    <div className="exercises-container">
      <div className="exercises-search-container">
        <input
          type="text"
          className="exercises-search-input"
          placeholder="Search for an exercise or choose body part below..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button className="exercises-button" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <Slider
        data={bodyParts}
        bodyParts
        setBodyPart={setBodyPart}
        bodyPart={bodyPart}
        setExercises={setExercises}
        exercises={exercises}
      />
      <div className="exercises-card-container">
        {exercises.slice(0, 6).map((item) => (
          <div className="exercise-card" key={item.id}>
            <img src={item.gifUrl} alt="" className="exercise-image" />
            <div className="exercise-card-inner-container">
              <p className="exercise-detail primary">{item.bodyPart}</p>
              <p className="exercise-detail">{item.target}</p>
            </div>
            <p className="exercise-name">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
