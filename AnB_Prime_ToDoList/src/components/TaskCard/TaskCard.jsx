import { useStore } from "../../store";
import "./TaskCard.css";

const TaskCard = ({ id, title, isDone }) => {
  const { toggleDoneTask, toggleDetailModal, toggleDeleteModal } = useStore();
  const truncatedText = title.length > 40 ? title.slice(0, 40) + "..." : title;

  const handleDetailView = () => {
    toggleDetailModal(id);
  };

  const handleDoneTask = (e) => {
    e.stopPropagation();
    toggleDoneTask(id);
  };

  const handleDelView = (e) => {
    e.stopPropagation();
    toggleDeleteModal(id);
  };

  return (
    <div
      onClick={handleDetailView}
      className={`task-card ${isDone ? "active" : ""}`}
    >
      <p>{truncatedText}</p>
      <div className="task-btn-group">
        <button
          id="done-btn"
          className={`action-btn ${isDone ? "active" : ""}`}
          onClick={handleDoneTask}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button id="del-btn" onClick={handleDelView} className="action-btn">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
