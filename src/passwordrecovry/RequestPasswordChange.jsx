import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";
const RequestPasswordChange = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    // Simulate API call for requesting password change
    try {
      // Replace this with actual API call for password change request
      

          await authService.passwordChange(email)
          

      setMessage("Password change request sent to your email.");
      
    } catch (error) {
      setMessage("Failed to send request. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container h-screen w-full flex items-center justify-center">
     <div className="bg-white h-80 rounded-2xl w-200 px-6 py-10">
     <h1 className="text-2xl font-bold mb-4">Request Password Change</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div>
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Enter your email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="your-email@example.com"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500"
          }`}
          disabled={loading}
        >
          {loading ? "Sending Request..." : "Send Password Reset Request"}
        </button>
      </form>
      <h1 className="text-center text-1.5xl py-1.5 text-blue-500 underline hover:text-blue-700">
            <Link to={'/'}>
                Go to Home
            </Link>
     </h1>
      {message && <p className="mt-4 text-center">{message}</p>}

     </div>
     
    </div>
  );
};

export default RequestPasswordChange;
