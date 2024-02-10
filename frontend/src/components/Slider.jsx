/* eslint-disable react/prop-types */
import '../styles/Slider.css';
import sliderImage from '../assets/sliderImage.png';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { useRef, useState } from 'react';

const item_width = 200;

const Slider = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const containerRef = useRef();

  const handleScroll = (scrollAmount) => {
    const newScrollPosition = scrollPosition + scrollAmount;

    setScrollPosition(newScrollPosition);

    containerRef.current.scrollLeft = newScrollPosition;
  };
  return (
    <div className="slider-container">
      <div ref={containerRef} className="slider-inner-container">
        <div className="slider-content-box">
          {data.map((item) => (
            <div
              className="slider-element"
              key={item.id}
              onClick={() => setBodyPart(item)}
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
