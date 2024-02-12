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
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

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

  //Pagination

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event, value) => {
    setCurrentPage(value);
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
        setExercises={setExercises}
        exercises={exercises}
      />
      <div className="exercises-card-container">
        {currentExercises.map((item) => (
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
      <div className="exercise-pagination">
        {exercises.length > 9 && (
          <Pagination
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default Exercises;
