import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { Itodo } from "../../interface/data";
import "./Task.css";
import Timer from "../Timer/Timer";

interface ITaskProps extends Itodo {
  deleteItem: React.MouseEventHandler<HTMLButtonElement>;
  onToggelDone: React.ChangeEventHandler<HTMLInputElement>;
  onEdit: React.MouseEventHandler<HTMLButtonElement>;
  editTask: (id: string, label: string) => void;
  updateTimer: (seconds: number, id: string) => void;
}

const Task = (props: ITaskProps) => {
  const [lableInput, setLableInput] = useState(props.lable);

  const { lable, seconds, completed, id, edit, deleteItem, onToggelDone, onEdit, editTask, updateTimer, date } = props;

  const onLableChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setLableInput(event.target.value);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    editTask(id, lableInput);
    setLableInput("");
  };

  if (edit) {
    return (
      <form onSubmit={onSubmit}>
        <input
          required
          autoFocus
          className="edit"
          type="text"
          onChange={onLableChange}
          value={lableInput}
          pattern="^[^\s]+(\s.*)?$"
          title="Can't create empty task"
        ></input>
      </form>
    );
  } else {
    let classNames = "description ";
    if (completed) {
      classNames += "  completed";
    }

    const dateCreation = formatDistanceToNow(date, { includeSeconds: true });

    return (
      <div>
        <input className="toggle" type="checkbox" onChange={onToggelDone} checked={completed} id={id}></input>
        <label htmlFor={id}>
          <span className={classNames}>{lable}</span>
          <Timer seconds={seconds} completed={completed} updateTimer={(seconds: number) => updateTimer(seconds, id)} />
          <span className="created">created {dateCreation} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={deleteItem}></button>
      </div>
    );
  }
};

export default Task;
