import useWeatherStore from "../../store";
import "./ErrorUI.css";

const ErrorUI = () => {
  const error = useWeatherStore((state) => state.error);

  return (
    <div className="main-404-wrapper">
      <img height="140px" src="./404.png" alt="404" />
      {error.code == 404 ? (
        <div className="error-404">{error.msg}</div>
      ) : (
        <p className="other-error">Error occurs. Let&apos;s try again!</p>
      )}
    </div>
  );
};

export default ErrorUI;
