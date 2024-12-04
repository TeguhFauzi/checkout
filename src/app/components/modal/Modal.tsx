import React from "react";
import { ModalProps } from ".";

const Modal: React.FC<ModalProps> = ({ isOpen, children }) =>
  isOpen ? (
    <div className="modal">
      <div className="modal-content">{children}</div>
    </div>
  ) : null;

export default Modal;
