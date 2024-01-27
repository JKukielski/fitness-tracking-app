import { useState } from 'react';
import '../styles/CarouselComponent.css';

const CarouselComponent = () => {
  const items = ['item1', 'item2', 'item3', 'item4', 'item5'];
  const [currentElement, setCurrentElement] = useState(0);

  return (
    <div className="carousel-container">
      {items.map((item, index) => (
        <div key={index} className="carousel-item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default CarouselComponent;
