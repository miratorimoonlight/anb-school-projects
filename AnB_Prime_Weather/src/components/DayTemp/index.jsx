import "./DayTemp.css";
import { chooseIcon } from "../../utils/utils";
import { useSpring, animated } from "@react-spring/web";
import AnimatedNum from "../AnimatedNum";
import useWeatherStore from "../../store";
import { useEffect } from "react";
import PropTypes from "prop-types";

const DayTemp = ({ day, icon, temp }) => {
  const isLoading = useWeatherStore((state) => state.isLoading);
  const [scaleAnime, api] = useSpring(() => ({
    from: { scale: 0 },
  }));

  useEffect(() => {
    if (isLoading)
      api.start({
        to: { scale: 0 },
      });
    else
      api.start({
        to: { scale: 1 },
      });
  }, [isLoading]);

  return (
    <animated.div className="day-temp-wrapper" style={scaleAnime}>
      <div className="day">{day}</div>
      <img
        width="52px"
        height="52px"
        src={chooseIcon(icon)}
        alt="overcast-day"
        style={scaleAnime}
      />
      <div className="temp">
        <AnimatedNum n={temp} />
      </div>
    </animated.div>
  );
};

DayTemp.propTypes = {
  day: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
};

export default DayTemp;
