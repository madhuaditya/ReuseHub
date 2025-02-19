import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth"; // Import Appwrite auth service
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, profileIn } from "../stores/AuthSlice";
import profileManage from "../appwrite/profile";
import Loading from "../Loading";
export default function SignupMod() {
  const [loading , setLoading ]= useState(false)
    const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit =  async(data) => {
    setLoading(()=> (true))
     
    try {
      const res = await authService.createAccount(data); // Call Appwrite service
      if (res.succes) {
        const userData = await authService.currentUser()
       
        if(userData.succes)
        {
          const prof = await profileManage.getProfile(userData.data.$id)

          dispatch(login(userData.data))
          if(prof.success)
            dispatch(profileIn(prof.data.documents[0]))

        }
          
       
        navigate("/");
      } else {
        console.error("Signup failed" );
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
    navigate('/')
    setLoading(()=>(false))
  };

  return (
  !loading?  <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Create an Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" ,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
              },
                
              )}
              className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Enrolment Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phoneNo", { required: "Phone number is required" ,
                
              },
                
              )}
              className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="0123456789"
            />
            {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>}
          </div>

          {/* enrolmet number */}


          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              Enrollment Number
            </label>
            <input
              type="text"
              {...register("enrollmentNo", { required: "enrollmentNo is required" ,
               
              },
                
              )}
              className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
              placeholder="33UUUU000"
            />
            {errors.enrollmentNo && <p className="text-red-500 text-sm">{errors.enrollmentNo.message}</p>}
          </div>



          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
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
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <input
              type="checkbox"
              {...register("terms", { required: "You must accept the terms" })}
              className="mr-2"
            />
            <label className="text-sm text-gray-600 dark:text-gray-400">
              I accept the <Link href="/terms" className="text-primary-600 underline">Terms and Conditions</Link>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

          {/* Submit Button */}
          <button
           disabled={loading}
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700"
          >
           {loading?"Updating....": "Create Account"}
          </button>

          {/* Already have an account? */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account? <Link to="/login" className="text-primary-600 underline">Login here</Link>
          </p>
        </form>
      </div>
    </section>: <Loading />
  );
}
