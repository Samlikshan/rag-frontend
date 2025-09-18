import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export const ErrorToast: React.FC<ErrorToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
      <AlertCircle size={20} />
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={onClose}
        className="hover:bg-red-600 rounded p-1 transition-colors duration-200"
      >
        <X size={16} />
      </button>
    </div>
  );
};
