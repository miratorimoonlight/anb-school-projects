import "./DeleteModal.css";
import { useStore } from "../../store";
import { CSSTransition } from "react-transition-group";
import { useState, useEffect } from "react";

const DeleteModal = () => {
  const { taskIDToBeDel, toggleDeleteModal, deleteTask, tasks } = useStore();
  const [isStartTransition, setIsStartTransition] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  // Set up transition and task title
  useEffect(() => {
    setIsStartTransition(!isStartTransition);

    const foundTask = tasks.filter((item) => item.id == taskIDToBeDel)[0];
    if (foundTask) {
      const truncatedText =
        foundTask?.task.length > 60
          ? foundTask.task.slice(0, 60) + "..."
          : foundTask.task;
      setTaskTitle(truncatedText || "");
    }
  }, [taskIDToBeDel]);

  const handleCloseModal = () => {
    toggleDeleteModal(taskIDToBeDel);
  };

  const handleConfirmDelete = () => {
    deleteTask(taskIDToBeDel);
  };

  return (
    <>
      {taskIDToBeDel ? (
        <div className="modal-container" onClick={handleCloseModal}>
          <CSSTransition
            in={isStartTransition}
            timeout={0}
            classNames="modalcard"
          >
            <div
              className="modal-card-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-detail-view">
                Are you sure u want to delete &quot;{taskTitle}&quot; task?
              </div>
              <div className="task-btn-group modal-btn-group">
                <button className="no-del-btn" onClick={handleCloseModal}>
                  No, don&apos;t delete 🙏
                </button>
                <button className="yes-del-btn" onClick={handleConfirmDelete}>
                  Yes
                </button>
              </div>
            </div>
          </CSSTransition>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteModal;
