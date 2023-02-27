import React from "react";

import "./TaskFilter.css";

interface ITaskFilter {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilter = (props: ITaskFilter) => {
  const buttonsData = [
    { name: "all", label: "all" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];

  const { filter, onFilterChange } = props;

  const buttons = buttonsData.map(({ name, label }) => {
    const isActive = filter === name;
    const clazz = isActive ? "selected" : "";
    return (
      <li key={name}>
        <button type="button" className={clazz} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

export default TaskFilter;
