import { useSpring, animated } from "@react-spring/web";
import PropTypes from "prop-types";

const AnimatedNum = ({ n }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    config: {
      mas: 1,
      tension: 20,
      friction: 10,
    },
  });

  return <animated.div>{number.to((x) => x.toFixed() + " °c")}</animated.div>;
};

AnimatedNum.propTypes = {
  n: PropTypes.number.isRequired,
};

export default AnimatedNum;
