import "./AddButton.css";
import { useStore } from "../../store";

const AddButton = () => {
  const { toggleAddModal } = useStore();
  return (
    <div className="add-btn" onClick={toggleAddModal}>
      <i className="fa-solid fa-plus plus-icon"></i>
    </div>
  );
};

export default AddButton;
