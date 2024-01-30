import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/CarouselComponent';
import BMI from '../components/BMI';
import BMR from '../components/BMR';

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <CarouselComponent />
      <div className="home-inner-container">
        <BMI />
        <BMR />
      </div>
    </div>
  );
};

export default HomePage;
