import "./AddField.css";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../../store";
import { CSSTransition } from "react-transition-group";

const AddField = () => {
  const { addNewTask, showAddModal, toggleAddModal } = useStore();
  const txtAreaRef = useRef();
  const txtAreaElement = txtAreaRef.current;
  const [inputVal, setInputVal] = useState("");
  const [isStartTransition, setIsStartTransition] = useState(false);

  useEffect(() => {
    setIsStartTransition(!isStartTransition);
  }, [showAddModal]);

  const handleAddTask = () => {
    if (txtAreaElement?.value.trim()) {
      const newTask = {
        id: uuidv4(),
        task: txtAreaElement?.value.trim(),
        isDone: false,
      };

      addNewTask(newTask);
    }
    toggleAddModal();
  };

  // Handle submit key press (shift enter == new line)
  // link: https://www.geeksforgeeks.org/how-to-detect-shiftenter-and-generate-a-new-line-in-textarea/
  const handleSubmitKeyPress = (e) => {
    if (e.key == "Enter" && !e.shiftKey) handleAddTask();
  };
  useEffect(() => {
    if (txtAreaElement) {
      txtAreaElement.addEventListener("keydown", handleSubmitKeyPress);
    }
    return () => {
      txtAreaElement?.removeEventListener("keydown", handleSubmitKeyPress);
    };
  }, [txtAreaElement]);

  // Close modal and add new task
  // link: https://stackoverflow.com/a/70612838
  const closeModal = () => {
    if (txtAreaElement) handleAddTask();
    else toggleAddModal();
  };

  // resize field based on input
  useEffect(() => {
    if (txtAreaRef && txtAreaRef.current) {
      txtAreaRef.current.style.height = "0px";
      const taHeight = txtAreaRef.current.scrollHeight;
      txtAreaRef.current.style.height = taHeight + "px";
    }
  }, [inputVal]);

  return (
    <>
      {showAddModal ? (
        <div className="modal-container" onClick={closeModal}>
          <CSSTransition
            in={isStartTransition}
            timeout={0}
            classNames="addtxtarea"
          >
            <textarea
              id="add-field"
              ref={txtAreaRef}
              placeholder="Write a new todo..."
              rows={1}
              autoFocus
              onChange={(e) => setInputVal(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            ></textarea>
          </CSSTransition>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddField;
