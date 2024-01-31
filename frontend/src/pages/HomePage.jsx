import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/CarouselComponent';
import BMI from '../components/BMI';
import BMR from '../components/BMR';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <CarouselComponent />
        <div className="home-inner-container">
          <BMI />
          <BMR />
        </div>
      </div>
    </>
  );
};

export default HomePage;
