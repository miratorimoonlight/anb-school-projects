import DotLoader from "react-spinners/DotLoader";
import "./OtherLoadingSpinner.css";

const cssOverride = {
  margin: "0 auto",
};

const OtherLoadingSpinner = () => {
  return (
    <div className="other-spinner-container">
      <DotLoader
        loading={true}
        color="#3b6379aa"
        cssOverride={cssOverride}
        size={50}
      />
    </div>
  );
};

export default OtherLoadingSpinner;
