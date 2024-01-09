import "./MainTemp.css";
import useWeatherStore from "../../store";
import { chooseIcon, titleCase } from "../../utils/utils";
import { useSpring, animated } from "@react-spring/web";
import AnimatedNum from "../AnimatedNum";

const MainTemp = () => {
  const mainWeather = useWeatherStore((state) => state.mainWeather);
  const scaleAnime = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  });

  return (
    <animated.main className="main-temp-wrapper" style={scaleAnime}>
      {mainWeather && (
        <>
          <img
            width="140px"
            height="140px"
            src={chooseIcon(mainWeather.icon)}
          />
          <div className="main-temp-detail">
            <h2>Today</h2>
            <h1>
              <AnimatedNum n={mainWeather.temp} />
            </h1>
            <p>{titleCase(mainWeather.description)}</p>
          </div>
          <div className="info-wrapper">
            <div className="feels-like-wrapper">
              <i className="fa-regular fa-face-smile"></i>
              <div className="feels-like">
                <div>{mainWeather.feelsLike} °c</div>
                <div>Feels Like</div>
              </div>
            </div>

            <div className="feels-like-wrapper">
              <i className="fa-solid fa-wind"></i>
              <div className="feels-like">
                <div>{mainWeather.windSpeed} Km/h</div>
                <div>Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      )}
    </animated.main>
  );
};

export default MainTemp;
