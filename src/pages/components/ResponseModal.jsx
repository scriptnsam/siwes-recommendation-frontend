import React from "react";

const ResponseModal = ({ isOpen, onClose, type, message }) => {
  if (!isOpen) return null;

  // Determine modal styles based on the response type
  const modalStyles =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-800"
      : "bg-red-100 border-red-500 text-red-800";

  const icon =
    type === "success" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`w-full max-w-md mx-4 bg-white border-l-4 rounded-lg shadow-lg ${modalStyles}`}
      >
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b">
          {icon}
          <h2 className="ml-2 font-bold text-lg capitalize">
            {type === "success" ? "Success" : "Error"}
          </h2>
          <button
            onClick={onClose}
            className="ml-auto text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-sm">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-4 py-3 border-t">
          <button
            onClick={onClose}
            autoFocus
            className={`px-4 py-2 text-white font-bold rounded-lg ${type === "success"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
              }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
