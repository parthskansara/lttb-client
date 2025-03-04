import React from "react";
import ShareComponent from "./ShareComponent";

interface ModalProps {
  category: string;
  message: string;
  submessage: string;
  closeToast: () => void;
}

const Toast: React.FC<ModalProps> = ({
  category,
  message,
  submessage,
  closeToast,
}) => {
  const onClose = () => {
    const modal = document.querySelector(".modal-overlay") as HTMLElement;
    if (modal) {
      modal.style.display = "none";
    }
    closeToast();
  };
  return (
    <div
      className="modal-overlay fixed inset-0 flex items-center justify-center bg-red-200 border-2 border-red-600 mx-16 my-32 text-md rounded-lg shadow-xl shadow-white-700/50 text-red-600"
      onClick={onClose}
    >
      <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-xl bg-transparent hover:border-transparent"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-lg">{message}</h2>
        <p className="mt-4 text-md">{submessage}</p>

        {category === "user" && <ShareComponent />}

        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
};

export default Toast;
