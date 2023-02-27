import React from "react";
import "./Footer.css";

import TaskFilter from "../TaskFilter/TaskFilter";

interface IfooterProps {
  todoCount: number;
  onFilterChange: (filter: string) => void;
  clearCompleted: any;
}

const Footer = (props: IfooterProps) => {
  const { todoCount, onFilterChange, clearCompleted } = props;
  return (
    <footer className="footer">
      <span> {todoCount} items left</span>
      <TaskFilter filter={"All"} onFilterChange={onFilterChange} />
      <button onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
};

export default Footer;
