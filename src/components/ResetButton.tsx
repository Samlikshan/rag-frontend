import React from "react";
import { RefreshCw } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void;
  disabled: boolean;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  disabled,
}) => {
  return (
    <button
      onClick={onReset}
      disabled={disabled}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RefreshCw size={16} />
      Reset Chat
    </button>
  );
};
