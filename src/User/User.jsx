import React from "react";
import Slider from "../profile/Slider";
import ItemList from "../Item/ItemList";
import Loading from "../Loading";

const UserPage = () => {

  return (
   true? 
    <div className="flex min-h-screen p-6 bg-gray-900">
      {/* Left Sidebar - Profile Overview */}
      <Slider  key={"new new "} />
   
      <ItemList key={"item list page"} />

    </div>:<Loading/>
  );
};

export default UserPage;
