import React from "react";
import { ButtonProps } from ".";

export const Button: React.FC<ButtonProps> = ({ onClick, tag }) => (
  <button onClick={onClick} className="btn">
    {tag}
  </button>
);
