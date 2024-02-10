/* eslint-disable react/prop-types */
import '../styles/Slider.css';
import sliderImage from '../assets/sliderImage.png';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';

const item_width = 200;
const dummyData = [
  'all',
  'back',
  'cardio',
  'chest',
  'lower arms',
  'lower legs',
  'neck',
  'shoulders',
  'upper arms',
  'upper legs',
  'waist',
];

const Slider = ({
  data,
  bodyParts,
  setBodyPart,
  bodyPart,
  setExercises,
  exercises,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;

    setScrollPosition(newScrollPosition);

    containerRef.current.scrollLeft = newScrollPosition;
  };

  const handleItemClick = (item) => {
    setBodyPart(item);
  };

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
      console.log(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  return (
    <div className="slider-container">
      <div ref={containerRef} className="slider-inner-container">
        <div className="slider-content-box">
          {dummyData.map((item) => (
            <div
              className="slider-element"
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              <img src={sliderImage} alt="" className="slider-element-image" />
              <p className="slider-element-text">{item.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="slider-arrows">
        <IoIosArrowRoundBack
          onClick={() => {
            handleScroll(-item_width);
          }}
        />
        <IoIosArrowRoundForward
          onClick={() => {
            handleScroll(item_width);
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
