
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { Link } from "react-router-dom";

const SetNewPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const res = await authService.changeChage(userId, secret, data.password);
      if (res.succes) {
        setMessage("Password has been updated successfully.");
      } else {
        setMessage("Failed to update password. Please try again.");
      }
    } catch (error) {
      setMessage("Failed to update password. Please try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="container h-screen bg-gray-600 w-full flex items-center justify-center">
      <div className="bg-white rounded-2xl px-6 py-10 shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Set New Password</h1>
        <p className="text-center text-red-700 text-sm mb-4">
          Password must have at least 8 characters, one lowercase, one uppercase, one number, and one special character.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* New Password Input */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium mb-1">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  message: "Must contain uppercase, lowercase, number & special character",
                },
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="New Password"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-1">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full p-2 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500"}`}
            disabled={loading}
          >
            {loading ? "Setting Password..." : "Set New Password"}
          </button>
        </form>

        {/* Success/Error Message */}
        {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}

        {/* Home Link */}
        <h1 className="text-center text-blue-500 underline mt-4 hover:text-blue-700">
          <Link to={"/"}>Go to Home</Link>
        </h1>
      </div>
    </div>
  );
};

export default SetNewPassword;
