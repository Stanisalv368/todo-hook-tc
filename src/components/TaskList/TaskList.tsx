import React from "react";

import { Itodo } from "../../interface/data";
import Task from "../Task/Task";

interface ItodoList {
  items: Itodo[];
  deleteItem: (id: string) => void;
  onToggelDone: (id: string) => void;
  onEdit: (id: string) => void;
  editTask: (id: string, label: string) => void;
  updateTimer: (seconds: number, id: string) => void;
}

const TaskList = (props: ItodoList) => {
  const { deleteItem, onToggelDone, onEdit, editTask, updateTimer } = props;
  return (
    <section className="main">
      <ul className="todo-list">
        {props.items.map((item: Itodo) => {
          return (
            <li key={item.id}>
              <Task
                {...item}
                deleteItem={() => deleteItem(item.id)}
                onToggelDone={() => onToggelDone(item.id)}
                onEdit={() => onEdit(item.id)}
                editTask={editTask}
                updateTimer={updateTimer}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TaskList;
