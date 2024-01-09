import "./DetailField.css";
import { useStore } from "../../store";
import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

const DetailField = () => {
  const {
    detailTaskID,
    tasks,
    toggleDetailModal,
    toggleDoneTask,
    editTask,
    toggleDeleteModal,
  } = useStore();
  const [detailViewMode, setDetailViewMode] = useState(true);
  const txtAreaRef = useRef();
  const txtAreaElement = txtAreaRef.current;
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState();
  const [isStartTransition, setIsStartTransition] = useState(false);

  // Set up transition
  useEffect(() => {
    setIsStartTransition(!isStartTransition);
  }, [detailTaskID]);

  // Set task detail data
  useEffect(() => {
    const foundTask = tasks.filter((item) => item.id == detailTaskID)[0];
    setTask(foundTask);
    setInputValue(foundTask?.task);
  }, [detailTaskID, task]);

  const handleCloseModal = () => {
    setDetailViewMode(true);
    toggleDetailModal(detailTaskID);
  };

  const handleDoneEdit = () => {
    const updatedTaskTitle = txtAreaElement?.value.trim();

    if (updatedTaskTitle && task?.task != updatedTaskTitle) {
      editTask(detailTaskID, updatedTaskTitle);
      setTask({ ...task, task: updatedTaskTitle });
    }
    // update new txt input after edit and go back to DETAIL view
    setInputValue(task.task);
    setDetailViewMode(!detailViewMode);
  };

  // Shift and Enter pressed => new line
  const handleDoneEditKeyPress = (e) => {
    if (e.key == "Enter" && !e.shiftKey) handleDoneEdit();
  };

  const handleDelView = () => {
    toggleDeleteModal(detailTaskID);
  };

  // resize field based on input
  useEffect(() => {
    if (txtAreaRef && txtAreaRef.current) {
      txtAreaRef.current.style.height = "0px";
      const taHeight = txtAreaRef.current.scrollHeight;
      txtAreaRef.current.style.height = taHeight + "px";
    }
  }, [inputValue]);

  return (
    <>
      {detailTaskID ? (
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
              {detailViewMode ? (
                <div
                  className={`modal-detail-view ${
                    task?.isDone ? "active" : ""
                  }`}
                  onClick={() => setDetailViewMode(!detailViewMode)}
                >
                  {task?.task}
                </div>
              ) : (
                <textarea
                  ref={txtAreaRef}
                  className="edit-view"
                  placeholder="Update todo..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleDoneEditKeyPress}
                  autoFocus
                ></textarea>
              )}

              <div className="task-btn-group modal-btn-group">
                {detailViewMode ? (
                  <>
                    <button
                      id="done-btn"
                      className={`action-btn ${task?.isDone ? "active" : ""}`}
                      onClick={() => {
                        toggleDoneTask(detailTaskID);
                      }}
                    >
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button
                      id="del-btn"
                      className="action-btn"
                      onClick={handleDelView}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </>
                ) : (
                  <button id="done-edit-btn" onClick={handleDoneEdit}>
                    Done
                  </button>
                )}
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

export default DetailField;
