import React from "react";
import Slider from "../profile/Slider";
import ItemList from "../Item/ItemList";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { openChange } from "../stores/AuthSlice";


const UserPage = () => {

  const isOpen = useSelector(state=> state.auth.open);
  const dispach = useDispatch()
  return (
   true? 
    <div className="flex min-h-screen p-6 bg-gray-900">
      {/* Left Sidebar - Profile Overview */}
      <div className="hidden md:block w-1/3 2xl:w-1/4">
      <Slider></Slider>
      </div>
      <div   className=" fixed h-12 w-12 bg-blue-200  bottom-4 z-10 rounded-full md:hidden text-2xl p-1.5 shadow-gray-100" onClick={()=>{
        dispach(openChange())
      }}>👤</div>
    
    {isOpen ?
    <div className=" w-[50%] z-20 top-0 left-0 fixed" >
      <Slider  /> 
    </div>
    :null}
   
      <ItemList key={"item list page"} />
     
      

    </div>:<Loading/>
  );
};

export default UserPage;
