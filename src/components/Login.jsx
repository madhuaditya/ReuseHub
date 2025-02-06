import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth"; // Appwrite auth service
import {Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, profileIn } from "../stores/AuthSlice";
import Loading from "../Loading";
import profileManage from "../appwrite/profile";

export default function Login() {
  const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const session = await authService.createSession(data.email, data.password);
      
      if (session.succes) {
        const create = await authService.currentUser();
        if(create.succes)
        {

          dispatch(login(create.data))
        // console.log("session data ", create.data)

        const prof = await profileManage.getProfile(create.data.$id)
          if(prof.success)
         { 
          // console.log(prof.data.documents[0])
           dispatch(profileIn(prof.data))
        navigate("/"); 
      }
    }// Redirect on successful login
      
  }
      else {
        alert(session.message)
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    setLoading(false);
  };

  return (
   !loading?( <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" ,
                  validate: {
                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
                })}
                className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                placeholder="name@company.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required",
                  validate: {
                    matchPatern: (value) => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value) ||
                    "Passowrd  must have greater then 7 character and must have at least one upper and lower case letter and unique characaters and Number",
                }
                 })}
                className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </label>
              </div>
              <Link to="/change-password" className="text-sm text-white hover:underline dark:text-blue-500">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
            disabled={loading}
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
            >
              Sign in
            </button>

            {/* Signup Redirect */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Don’t have an account yet?{" "}
              <Link to="/signup" className="text-primary-600 underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>): (<Loading/>)
  );
}
