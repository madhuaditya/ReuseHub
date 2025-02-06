import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate()
  const[login , setLongin] = useState(false)
  const status = useSelector(state=>state.auth.status)
  
  useEffect(()=>{
    // console.log(status)
   if(status){
    setLongin(status)
  }
  },[])
  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-12">
       {login?(<button className="text-white bg-green-400 hover:bg-green-600 px-4 py-2 rounded"  onClick={()=>(
        navigate('/user')
      )} > Go to Main page </button>):null}
      <div className="max-w-4xl text-center">
    
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to ReuseHub</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          ReuseHub is a student-centric platform that promotes the <b>reuse and sharing</b>  of college resources
          such as books, notes, and other academic materials. Our goal is to <b>reduce waste</b>  and make resources
          more accessible to everyone.
        </p>
        <img
          src="./image.png"
          alt="ReuseHub Concept"
          className="w-full h-auto mt-6 rounded-lg shadow-lg"
        />
      </div>
      
      {/* Our Goals Section */}
      <div className="max-w-4xl mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Our Goals</h2>
        <ul className="mt-4 text-gray-700 dark:text-gray-300 text-lg space-y-2">
          <li>✅ Encourage sustainable practices in colleges</li>
          <li>✅ Provide an easy-to-use platform for item exchange</li>
          <li>✅ Help students save money by reusing materials</li>
          <li>✅ Reduce academic waste and promote a green campus</li>
        </ul>
      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl mt-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">How ReuseHub Works?</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
           <span className="flex-col">
           1️⃣ <b>Upload</b> an item you no longer need (e.g., books, notes, accessories).<br/>
          2️⃣ <b>Search</b> for available items that you need.<br/>
          3️⃣ <b>Connect</b>  with the owner to accept/reject requests.<br/>
          4️⃣ <b>Meet & Exchange</b>   the item in person on campus.
           </span>
        </p>
        <img
          src="./sharing.jpg"
          alt="How it works"
          className="w-full h-auto mt-6 rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default MainPage;
