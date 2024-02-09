import { useEffect, useState } from 'react';
import '../styles/Exercises.css';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';
import Slider from './Slider';

const Exercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

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
      console.log(bodyParts);
    }
  };

  return (
    <div className="exercises-container">
      <div className="exercises-search-container">
        <input
          type="text"
          className="exercises-search-input"
          placeholder="Search for an exercise..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button className="exercises-button" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <Slider data={bodyParts} />
    </div>
  );
};

export default Exercises;
