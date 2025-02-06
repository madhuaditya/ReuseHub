import React from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit( (data) => {
          const res =  authService.createAccount(data);
          if (res) {
            console.log("Signup successful");
          } else {
            console.log("Signup failed");
          }
        })}
        className="bg-white shadow-lg rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Sign Up
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your Email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
