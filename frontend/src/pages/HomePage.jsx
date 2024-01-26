import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import CarouselComponent from '../components/CarouselComponent';

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <CarouselComponent />
    </div>
  );
};

export default HomePage;
