import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative">
        {/* Spinning Circle */}
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>

        {/* Loading Text */}
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-bold text-lg">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
