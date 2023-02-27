import React, { useState } from "react";
import "./NewTaskForm.css";

interface INewTaskForm {
  createTodoItem: (label: string, seconds: number) => void;
  newTaskAdd: (lable: string, seconds: number) => void;
}

const NewTaskForm = (props: INewTaskForm) => {
  const [newTask, setNewTask] = useState({
    label: "",
    min: "",
    sec: "",
  });

  const onLableChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTask({ ...newTask, label: event.target.value });
  };

  const onMinChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTask({ ...newTask, min: event.target.value });
  };

  const onSecChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTask({ ...newTask, sec: event.target.value });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const { label, min, sec } = newTask;
    const seconds = Number(min) * 60 + Number(sec);
    props.newTaskAdd(label, seconds);
    setNewTask({
      label: "",
      min: "",
      sec: "",
    });
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        required
        type="text"
        className="new-todo"
        placeholder="What needs to de done?"
        pattern="^[^\s]+(\s.*)?$"
        title="Нельзя создать пустую задачу"
        onChange={onLableChange}
        value={newTask.label}
      ></input>
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinChange}
        pattern="^[^\s]+(\s.*)?$"
        title="Нельзя создать пустую задачу"
        value={newTask.min}
      ></input>
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecChange}
        value={newTask.sec}
      ></input>
      <input style={{ display: "none" }} type="submit"></input>
    </form>
  );
};

export default NewTaskForm;
