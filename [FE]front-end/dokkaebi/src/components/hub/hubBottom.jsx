import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./carousel.module.css";
import { motion, AnimatePresence } from 'framer-motion';
import LeftA from '../../images/hub/leftA.png';
import LeftB from '../../images/hub/leftB.png';
import RightA from '../../images/hub/rightA.png';
import RightB from '../../images/hub/rightB.png';
import GameIMG from '../../images/hub/game.png';
import ProfileIMG from '../../images/hub/profile.png';
import RankIMG from '../../images/hub/rank.png';
import { useSelector } from "react-redux";

export default function hubBottom() {
  const navigate = useNavigate();
  const initialSlides = [
    { name: "Profile", image: ProfileIMG },
    { name: "Game", image: GameIMG },
    { name: "Rank", image: RankIMG },
  ];
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(slides[1]);
  const [prevButtonImage, setPrevButtonImage] = useState(LeftB);
  const [nextButtonImage, setNextButtonImage] = useState(RightB);
  const userNickname = useSelector((state) => state.auth.userNickname);
  // 마우스 클릭 이벤트 핸들러
  const handleSlideClick = (slide) => {
    if (slide === currentSlide) {
      navigateToSlide(slide.name);
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
        path = `/profile/${userNickname}`;
        break;
      case 'Game':
        path = `/channel`;
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
    <div className={Styles.carouselContainer}>
      <div className="w-full mx-auto flex justify-between items-center">        
        {/* 캐러셀 */}
        <div className="flex justify-center items-center w-full gap-4">
          <AnimatePresence>
            {slides.map((slide, index) => (
              <motion.div
                key={slide.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: slide === currentSlide ? 1 : 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "linear" }}
                className={`${Styles.card} ${slide === currentSlide ? Styles.active : Styles.unactivate}`}
                onClick={() => handleSlideClick(slide)}
              >
                <h1 className={Styles.cardHeader}>{slide.name}</h1>
                <img src={slide.image} alt={slide.name} className={`${Styles.cardImage}`} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div> 
      </div >
      <div className={Styles.buttonContainer}>
        {/* 이전 슬라이드 버튼 */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setPrevButtonImage(LeftA)}
          onMouseLeave={() => setPrevButtonImage(LeftB)}
          className={Styles.buttonStyle}
          style={{ backgroundImage: `url(${prevButtonImage})` }}
        >
        </button>
        {/* 다음 슬라이드 버튼 */}
        <button
          onClick={nextSlide}
          onMouseEnter={() => setNextButtonImage(RightA)}
          onMouseLeave={() => setNextButtonImage(RightB)}
          className={Styles.buttonStyle}
          style={{ backgroundImage: `url(${nextButtonImage})` }}
        >
        </button>
      </div>
    </div>
  );
}
