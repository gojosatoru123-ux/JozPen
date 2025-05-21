// components/ConfirmModal.tsx
import React from "react";

const Modal=({ message, onConfirm, onCancel })=>{
  return (
    <div className="fixed inset-0 bg-white/60 backdrop-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">{message}</h2>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
export default Modal;
