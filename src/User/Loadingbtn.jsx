import React, { useState } from "react";

function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // 2 सेकंड बाद लोडिंग हटेगा
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      disabled={loading}
    >
      {loading ? "Loading..." : "Click Me"}
    </button>
  );
}

export default LoadingButton;
