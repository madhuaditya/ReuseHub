import React, { useState } from "react";
import Loading from "../Loading";
import serive from "../appwrite/manage";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    enrol: "",
    content: "",
  });
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false);
  const [loading , setLoading] = useState(false)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    setLoading(true)
    e.preventDefault();

    const res = serive.sendFeedBack(formData)
    setSubmitted(true)
    if(res){
        alert("Feedback submited successfully")
        
    }else {
        alert("Feedback unable to send please try after some time")
        navigate('/')
    }
   
    setLoading(false)
  };

  return ( loading? <Loading/>:
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-600">
            {submitted ? "Thank You for Your Feedback! 🎉" : "We Value Your Feedback 😊"}
            
          </h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your name"
                />
              </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Enrollment Number</label>
              <input
                type="text"
                name="enrol"
                value={formData.enrollment}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your enrollment number"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Your Feedback</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Write your feedback here..."
              />
            </div>

            <button
            disabled={loading}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-200"
            >
             {!loading? "Submit Feedback": "sending feedback"}
            </button>

            <h1 className="text-center text-1.5xl py-1.5 text-blue-500 underline hover:text-blue-700">
            <Link to={'/'}>
                Go to Home
            </Link>
          </h1>
          </form>
        ) : (
          <><p className="text-center text-gray-600 mt-4">
            We appreciate your effort in helping us improve! 🚀
          </p>
          <h1 className="text-center text-1.5xl py-1.5 text-blue-500 underline hover:text-blue-700">
            <Link to={'/'}>
                Go to Home
            </Link>
          </h1>
          </>
          
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
