import React from "react";

interface LoadingSpinnerProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      {/* 旋轉圓圈 */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-primary border-gray-300" />
      {/* Loading 文字 */}
      <p className="text-lg font-medium text-muted-foreground">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
