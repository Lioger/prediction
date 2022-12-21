import { useRef, useState } from "react";

const getRandomNumber = () => {
  return urls[Math.floor(Math.random() * urls.length)];
};

const urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const App = () => {
  const predictionRef = useRef();
  const [isButtonAvailable, setIsButtonAvailable] = useState(false);

  const activateButton = () => setIsButtonAvailable(true);

  const makePrediction = () => {
    if (!isButtonAvailable) return;
    predictionRef.current.classList.remove('hidden');
    predictionRef.current.classList.add('invisible');
    predictionRef.current.scrollIntoView({ 
      block: 'nearest',
      behavior: 'smooth', 
    })
    let lastRandomNumber = 1;
    const interval = setInterval(() => {
      lastRandomNumber = getRandomNumber(12);
      predictionRef.current.src = `/prediction/predictions/${lastRandomNumber}.jpg`;
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      predictionRef.current.classList.remove('invisible');
      urls.splice(urls.indexOf(lastRandomNumber), 1);
    }, 3000);
  };

  return (
    <div className="App">
      <video
        className="page-block main-video"
        src="https://res.cloudinary.com/dsfviqefi/video/upload/v1671613384/gadalka_htdj1b.mp4"
        controls
        preload="auto"
        onPause={activateButton}
        onEnded={activateButton}
      />
      <div className={`page-block predict-btn ${isButtonAvailable ? '' : 'disabled'}`} onClick={makePrediction}>
        Получить новогоднее предсказание
      </div>
      <img
        ref={predictionRef}
        src="/prediction/predictions/1.jpg"
        className="page-block hidden prediction-image"
        alt="Предсказание"
      />
    </div>
  );
}

export default App;
