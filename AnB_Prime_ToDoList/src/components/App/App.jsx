import "./App.css";
import AddButton from "../AddButton/AddButton";
import TaskList from "../TaskList/TaskList";
import AddField from "../AddField/AddField";
import DetailField from "../DetailField/DetailField";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  return (
    <>
      <div className="container">
        <AddField />
        <DetailField />
        <DeleteModal />

        <h1 className="title">Just do it!</h1>
        <TaskList />
        <AddButton />
      </div>
    </>
  );
}

export default App;
