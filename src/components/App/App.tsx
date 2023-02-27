import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import { Itodo } from "../../Type/data";

const App = () => {
  const createTodoItem = (label: string, seconds: number) => {
    return {
      lable: label,
      completed: false,
      id: uuidv4(),
      date: new Date(),
      edit: false,
      seconds: seconds || 3600,
    };
  };

  const [data, setData] = useState([
    createTodoItem("task", 3600),
    createTodoItem("task", 3600),
    createTodoItem("task", 3600),
  ]);

  const [filter, setFilter] = useState("all");

  const changeFilter = (items: Itodo[], filter: string) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  const onFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const onToggelDone = (id: string) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const onEdit = (id: string) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };

      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const editTask = (id: string, label: string) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, lable: label, edit: !oldItem.edit };

      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const newTaskAdd = (lable: string, seconds: number) => {
    const newItem = createTodoItem(lable, seconds);
    setData((data) => {
      return [...data, newItem];
    });
  };

  const deleteItem = (id: string) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      return [...data.slice(0, idx), ...data.slice(idx + 1)];
    });
  };

  const clearCompleted = () => {
    setData((data) => {
      return data.filter((el) => !el.completed);
    });
  };

  const updateTimer = (seconds: number, id: string) => {
    setData((data) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, seconds: seconds };

      return [...data.slice(0, idx), newItem, ...data.slice(idx + 1)];
    });
  };

  const doneCount = data.filter((el) => el.completed).length;
  const todoCount = data.length - doneCount;
  const visibleItems = changeFilter(data, filter);

  return (
    <div>
      <header>
        <h1>TODO</h1>
        <NewTaskForm createTodoItem={createTodoItem} newTaskAdd={newTaskAdd} />
      </header>
      <TaskList
        items={visibleItems}
        deleteItem={deleteItem}
        onToggelDone={onToggelDone}
        onEdit={onEdit}
        editTask={editTask}
        updateTimer={updateTimer}
      />
      <Footer todoCount={todoCount} onFilterChange={onFilterChange} clearCompleted={clearCompleted} />
    </div>
  );
};

export default App;
