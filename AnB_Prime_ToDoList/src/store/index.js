import { create } from "zustand";

const getTasksFromLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
};

export const useStore = create((set) => ({
  tasks: getTasksFromLocalStorage(),
  addNewTask: (newTask) =>
    set((state) => {
      const tasksData = [...state.tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      return {
        tasks: tasksData,
      };
    }),
  toggleDoneTask: (taskID) => {
    set((state) => {
      const tasksData = state.tasks.map((item) => {
        if (item.id == taskID) item.isDone = !item.isDone;
        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(tasksData));
      return {
        tasks: tasksData,
      };
    });
  },
  editTask: (taskID, updatedTask) => {
    set((state) => {
      const updatedTasks = state.tasks.map((item) => {
        if (item.id == taskID) {
          return { ...item, task: updatedTask };
        }
        return item;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return {
        tasks: updatedTasks,
      };
    });
  },

  showAddModal: false,
  toggleAddModal: () => set((state) => ({ showAddModal: !state.showAddModal })),

  detailTaskID: "",
  toggleDetailModal: (taskID) =>
    set((state) => ({
      detailTaskID: state.detailTaskID ? "" : taskID,
    })),

  taskIDToBeDel: "",
  toggleDeleteModal: (taskID) => {
    set((state) => ({ taskIDToBeDel: state.taskIDToBeDel ? "" : taskID }));
  },
  deleteTask: () => {
    set((state) => {
      if (state.taskIDToBeDel) {
        const updatedTasks = state.tasks.filter(
          (task) => task.id != state.taskIDToBeDel
        );

        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return {
          tasks: updatedTasks,
          taskIDToBeDel: "",
          detailTaskID:
            state.detailTaskID == state.taskIDToBeDel ? "" : state.detailTaskID,
        };
      }
    });
  },
}));
