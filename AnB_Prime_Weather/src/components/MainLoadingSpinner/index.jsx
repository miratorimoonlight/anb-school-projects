import "./MainLoadingSpinner.css";
import ClockLoader from "react-spinners/ClockLoader";
import { useSpring, animated } from "@react-spring/web";

const cssOverride = {
  margin: "0 auto",
};

const MainLoadingSpinner = () => {
  const opacityAnime = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });
  return (
    <animated.div className="spinner-container" style={opacityAnime}>
      <ClockLoader
        loading={true}
        color="#3b6379aa"
        cssOverride={cssOverride}
        size={100}
      />
      <div>Hang in there...</div>
    </animated.div>
  );
};

export default MainLoadingSpinner;
