import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { exerciseOptions, fetchData } from '../utils/fetchExerciseData';
import Navbar from '../components/Navbar';
import { CgGym } from 'react-icons/cg';
import { BiBody, BiTargetLock } from 'react-icons/bi';
const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
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
    };

    fetchExerciseDetail();
    console.log(exerciseDetail);
  }, [id]);

  return (
    <div>
      <Navbar />
      <img src={exerciseDetail.gifUrl} alt="" />
      <p className="detail-desc">
        The <span>{exerciseDetail.name}</span> is one of the best exercises to
        target your {exerciseDetail.target}. It will help you improve your mood
        and gain energy.
      </p>
      <div className="detail-element">
        <BiBody />
        <p className="detail-element-text">{exerciseDetail.bodyPart}</p>
      </div>
      <div className="detail-element">
        <BiTargetLock />
        <p className="detail-element-text">{exerciseDetail.target}</p>
      </div>
      <div className="detail-element">
        <CgGym />
        <p className="detail-element-text">{exerciseDetail.equipment}</p>
      </div>
    </div>
  );
};

export default ExerciseDetail;
