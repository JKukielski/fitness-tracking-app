import { useEffect, useState } from 'react';
import '../styles/Exercises.css';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';
import Slider from './Slider';

const Exercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState([]);

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

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }

      setExercises(exercisesData);
      console.log(exercises);
    };

    fetchExercisesData();
  }, [bodyPart]);

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
      />
    </div>
  );
};

export default Exercises;
