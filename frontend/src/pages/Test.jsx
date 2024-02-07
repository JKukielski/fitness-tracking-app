import { useEffect } from 'react';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';

const Test = () => {
  const handleClick = async (e) => {
    e.preventDefault();
    const exerciseData = await fetchData(
      'https://exercisedb.p.rapidapi.com/exercises',
      exerciseOptions
    );
    console.log(exerciseData);
  };
  return (
    <div>
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Test;
