import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  exerciseOptions,
  fetchData,
  youtubeOptions,
} from '../utils/fetchExerciseData';
import Navbar from '../components/Navbar';
import { CgGym } from 'react-icons/cg';
import { BiBody, BiTargetLock } from 'react-icons/bi';
import '../styles/ExerciseDetail.css';
import Slider from '../components/Slider';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [similarMuscle, setSimilarMuscle] = useState([]);
  const [similarEquipment, setSimilarEquipment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      const exerciseDetailData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        exerciseOptions
      );
      setExerciseDetail(exerciseDetailData);

      // const exerciseVideosData = await fetchData(
      //   `https://youtube-search-and-download.p.rapidapi.com/search?query=${exerciseDetailData.name}`,
      //   youtubeOptions
      // );
      // setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      setSimilarMuscle(targetMuscleExercisesData);

      const equimentExercisesData = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );
      setSimilarEquipment(equimentExercisesData);
    };

    fetchExerciseDetail();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="detail-container">
        <div className="detail-inner-container">
          <img src={exerciseDetail.gifUrl} alt="" className="detail-image" />
          <div className="detail-content">
            <p className="detail-desc">
              The <span>{exerciseDetail.name}</span> is one of the best
              exercises to target your {exerciseDetail.target}. It will help you
              improve your mood and gain energy.
            </p>
            <div className="detail-element">
              <div className="detail-icon-container">
                <BiBody className="detail-icon" />
              </div>
              <p className="detail-element-text">{exerciseDetail.bodyPart}</p>
            </div>
            <div className="detail-element">
              <div className="detail-icon-container">
                <BiTargetLock className="detail-icon" />
              </div>
              <p className="detail-element-text">{exerciseDetail.target}</p>
            </div>
            <div className="detail-element">
              <div className="detail-icon-container">
                <CgGym className="detail-icon" />
              </div>
              <p className="detail-element-text">{exerciseDetail.equipment}</p>
            </div>
          </div>
        </div>
        <div className="secondary-container">
          {/* <Slider data={similarEquipment} />
          <Slider data={similarMuscle} /> */}
        </div>
      </div>
    </>
  );
};

export default ExerciseDetail;
