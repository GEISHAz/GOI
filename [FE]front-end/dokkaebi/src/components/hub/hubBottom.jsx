import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./carousel.module.css";
import { motion, AnimatePresence } from 'framer-motion';
// import leftA from '../../images/hub/leftA.png';
// import leftB from '../../images/hub/left.png';
// import rightA from '../../images/hub/rightA.png';
// import rightB from '../../images/hub/rightB.png';

export default function hubBottom() {
  const navigate = useNavigate();
  const initialSlides = ["Profile", "Game", "Rank"];
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(slides[1]);

  // 마우스 클릭 이벤트 핸들러
  const handleSlideClick = (slide) => {
    if (slide === currentSlide) {
      navigateToSlide(slide);
    } else {
      // 슬라이드 배열을 조정하여 클릭된 슬라이드가 중앙에 오도록 계산
      let newSlides = [...slides];
      while (newSlides[1] !== slide) {
        if (newSlides.indexOf(slide) > 1) {
          newSlides.push(newSlides.shift());
        } else {
          newSlides.unshift(newSlides.pop());
        }
      }
      setSlides(newSlides);
      setCurrentSlide(slide);
    }
  };

  // 슬라이드 이동 후 한번 더 클릭하면 router 이동
  const navigateToSlide = (slideName) => {
    let path = '';
    switch(slideName) {
      case 'Profile':
        path = `/profile/userNickname`;
        break;
      case 'Game':
        path = `/channel/1`;
        break;
      case 'Rank':
        path = `/rank`;
        break;
      default:
        path = '/hub';
    }
    navigate(path);
  };

  // 슬라이드 Next 이동 
  const nextSlide = () => {
    const newSlides = [...slides.slice(1), slides[0]];
    setSlides(newSlides);
    setCurrentSlide(newSlides[1]);
  };

  // 슬라이드 Prev 이동
  const prevSlide = () => {
    const newSlides = [slides[slides.length - 1], ...slides.slice(0, slides.length - 1)];
    setSlides(newSlides);
    setCurrentSlide(newSlides[1]);
  };


  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [slides]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full mx-auto flex justify-between items-center">
        <button onClick={prevSlide}>{'<'}</button>
        <div className="flex justify-center items-center w-full gap-4">
          <AnimatePresence>
            {slides.map((slide, index) => (
              <motion.div
                key={slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: slide === currentSlide ? 1 : 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className={`${Styles.card} ${slide === currentSlide ? Styles.active : Styles.unactivate}`}
                onClick={() => handleSlideClick(slide)}
              >
                <h1 className={Styles.cardHeader}>{slide}</h1>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button onClick={nextSlide}>{'>'}</button>
      </div>
    </div>
  );
}
