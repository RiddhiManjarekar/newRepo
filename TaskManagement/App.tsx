import React, { useReducer, useMemo, useCallback, useContext, createContext, useState } from "react";


type Task = {
  id: number;
  text: string;
  completed: boolean;
};


type TaskAction =
  | { type: "ADD_TASK"; content: string }
  | { type: "REMOVE_TASK"; content: number }
  | { type: "TOGGLE_TASK"; content: number };


const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, { id: Date.now(), text: action.content, completed: false }];
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.content);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.content ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};


const TaskContext = createContext<{
  tasks: Task[];
  addTask: (text: string) => void;
  removeTask: (id: number) => void;
  toggleTask: (id: number) => void;
  completedCount: number;
} | null>(null);


const TaskManager: React.FC = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [taskText, setTaskText] = useState("");

  
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);


  const addTask = useCallback((text: string) => dispatch({ type: "ADD_TASK", content: text }), []);
  const removeTask = useCallback((id: number) => dispatch({ type: "REMOVE_TASK", content: id }), []);
  const toggleTask = useCallback((id: number) => dispatch({ type: "TOGGLE_TASK", content: id }), []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, toggleTask, completedCount }}>
      <div>
        <h1>Task Manager</h1>

      
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (taskText.trim()) {
              addTask(taskText);
              setTaskText("");
            }
          }}
        >
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter task"
          />
          <button type="submit">Add Task</button>
        </form>

       
        <p>Completed Tasks: {completedCount}</p>

      
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>
                {task.completed ? "✅" : "⬜"} 
                {task.text}
              </span>
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => removeTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </TaskContext.Provider>
  );
};


const App: React.FC = () => {
  return <TaskManager />;
};

export default App;
