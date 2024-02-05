import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/CarouselComponent';
import BMI from '../components/BMI';
import BMR from '../components/BMR';
import TargetInput from '../components/TargetInput';
import Stats from '../components/Stats';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <CarouselComponent />
        <TargetInput />
        <BMI />
        <BMR />
        <Stats />
      </div>
    </>
  );
};

export default HomePage;
