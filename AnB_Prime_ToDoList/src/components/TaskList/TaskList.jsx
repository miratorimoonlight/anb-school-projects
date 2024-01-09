import "./TaskList.css";
import TaskCard from "../TaskCard/TaskCard";
import { useStore } from "../../store";
import { useEffect, useState, useRef } from "react";

const TaskList = () => {
  const tasks = useStore((state) => state.tasks);
  const toggleAddModal = useStore((state) => state.toggleAddModal);
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState();

  useEffect(() => {
    setFilteredTasks(tasks);
    if (tasks.length == 0) setSearch("");
  }, [tasks]);

  useEffect(() => {
    if (search)
      setFilteredTasks(
        tasks.filter((item) =>
          item.task.toLowerCase().includes(search.toLowerCase())
        )
      );
    else setFilteredTasks(tasks);
  }, [search, tasks]);

  return (
    <main className="task-list">
      {tasks.length ? (
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      ) : (
        <></>
      )}

      {search ? (
        <div className="search-result">Search results for "{search}"</div>
      ) : (
        <></>
      )}

      {search && filteredTasks?.length == 0 ? (
        <div className="no-result">No results</div>
      ) : (
        <></>
      )}

      {tasks.length ? (
        <></>
      ) : (
        <div className="no-todo" onClick={toggleAddModal}>
          <p>Nothing to do...</p>
          <i className="fa-regular fa-face-smile"></i>
        </div>
      )}

      {filteredTasks?.map((item) => (
        <TaskCard
          id={item.id}
          key={item.id}
          title={item.task}
          isDone={item.isDone}
        />
      ))}
    </main>
  );
};

export default TaskList;
