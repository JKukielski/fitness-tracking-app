import { useEffect, useRef, useState } from 'react';
import '../styles/Exercises.css';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';
import Slider from './Slider';
import Pagination from '@mui/material/Pagination';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const Exercises = () => {
  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  const exerciseViewRef = useRef();

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

      if (exerciseViewRef.current) {
        exerciseViewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
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
    if (exerciseViewRef.current) {
      exerciseViewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // if (!currentExercises.length) return <CircularProgress />;

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
      <div className="exercises-card-container" ref={exerciseViewRef}>
        {currentExercises.map((item) => (
          <Link
            className="exercise-card"
            key={item.id}
            to={`/exercise/${item.id}`}
          >
            {item.gifUrl ? (
              <img src={item.gifUrl} alt="" className="exercise-image" />
            ) : (
              <CircularProgress />
            )}

            <div className="exercise-card-inner-container">
              <p className="exercise-detail primary">{item.bodyPart}</p>
              <p className="exercise-detail">{item.target}</p>
            </div>
            <p className="exercise-name">{item.name}</p>
          </Link>
        ))}
      </div>
      <div className="exercise-pagination">
        {exercises.length === 0 ? (
          <CircularProgress />
        ) : (
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
