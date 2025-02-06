// import React, { useState } from "react";

// const TransparentModal = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       {/* Button to Open Modal */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//       >
//         Open Modal
//       </button>

//       {/* Transparent Overlay + Modal */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center"
//           onClick={() => setIsOpen(false)} // Close when clicking outside
//         >
//           <div
//             className="bg-white p-6 rounded-lg shadow-lg w-80 relative"
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//               onClick={() => setIsOpen(false)}
//             >
//               ❌
//             </button>
//             <h2 className="text-lg font-bold text-gray-800">Modal Content</h2>
//             <p className="text-gray-600 mt-2">This is a transparent modal. Click outside or the ❌ to close.</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TransparentModal;

// import React, { useState } from "react";
// import authService from "../appwrite/auth";
// import { Link } from "react-router-dom";
// const SetNewPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//     const urlParams = new URLSearchParams(window.location.search);
//     const secret = urlParams.get('secret');
//     const userId = urlParams.get('userId');

   
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match!");
//       return;
//     }

//     setLoading(true);
//     // Simulate API call for setting new password
//     try {
//       // Replace this with actual API call for setting the new password
//      const res= await authService.changeChage(userId, secret, password)
//         if(res.succes){
//           setMessage("Password has been updated successfully.");
//         }
//         else {
//           setMessage("Failed to update password. Please try again.");
//         }
      
//     } catch (error) {
//       setMessage("Failed to update password. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container h-screen bg-gray-600 w-full flex items-center justify-center">
      
//      <div className="bg-white h-100 rounded-2xl w-200 px-6 py-10">
      
//      <h1 className="text-2xl font-bold mb-4">Set New Password </h1> 
     
//      <h1 className="text-center text-red-700">Password must Have at least 8 digit one lower Case  one upper Case   numbers  and unique character</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="password" className="block text-lg font-medium mb-2">
//             New Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             placeholder="New Password"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="confirmPassword"
//             className="block text-lg font-medium mb-2"
//           >
//             Confirm New Password:
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             placeholder="Confirm Password"
//             required
//           />
//         </div>
//         <button
//           type="submit"

          

//           className={`w-full p-2 text-white rounded-lg ${
//             loading ? "bg-gray-400" : "bg-blue-500"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Setting Password..." : "Set New Password"}
//         </button>

//       </form>
//       <h1 className="text-center text-1.5xl py-1.5 text-blue-500 underline hover:text-blue-700">
//             <Link to={'/'}>
//                 Go to Home
//             </Link>
//      </h1>
//       {message && <p className="mt-4 text-center">{message}</p>}

//      </div>
     
//     </div>
//   );
// };

// export default SetNewPassword;

// /*
// <h1 className="text-2xl font-bold mb-4">Set New Password</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="password" className="block text-lg font-medium mb-2">
//             New Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             placeholder="New Password"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="confirmPassword"
//             className="block text-lg font-medium mb-2"
//           >
//             Confirm New Password:
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full p-2 border rounded-lg"
//             placeholder="Confirm Password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className={`w-full p-2 text-white rounded-lg ${
//             loading ? "bg-gray-400" : "bg-blue-500"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Setting Password..." : "Set New Password"}
//         </button>
//       </form>

//       {message && <p className="mt-4 text-center">{message}</p>}
// */


// import React, {  useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import authService from "../../appwrite/auth"; // Appwrite auth service
// import { useDispatch, useSelector } from "react-redux";
// import { logout, profileOut } from "../../stores/AuthSlice";
// import service from '../../appwrite/manage'
// import profileManage from '../../appwrite/profile'
// import requests from '../../appwrite/reqest'
// import {ID} from 'appwrite'
// export default function Header() {
//    const navigate = useNavigate();
//    const [isOpen, setIsOpen] = useState(false);
//    const isAuthenticated = useSelector((state)=>(state.auth.status))
//   const userData= useSelector(state=> state.auth.userData)
//   const [changing , setChangeing] = useState(false)
//    const [yourItems, setYourItem]= useState([])



 


//  const dispatch = useDispatch()
//   const handleLogout = async () => {
//     setChangeing(()=> (true))
//     await authService.deleteSession();
//     dispatch(logout());
//     dispatch(profileOut());
//     setChangeing(()=>(false))
//     navigate("/login");
//   };

  

//   return (
//   <nav className="bg-gray-800 p-4 shadow-md">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className=" flex text-white text-2xl font-semibold">
//           ReuseHub
//           <img src="./ReuseHub.jpg" alt=""  className=" ml-3 w-10 rounded-[5px]"/>
//         </Link>

//         {/* Navigation Links */}
//         <div className="flex items-center space-x-4">
//           {isAuthenticated ? (
//             <>
//              <button onClick={async()=>{
              
//               const responce  = await requests.getReqestByUserId(userData.$id)
//               console.log(responce)
//             if(responce.success) {
//                 setYourItem(responce.data)
//            }
//               setIsOpen(true)
//             }
//           }   className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
//                 yours
//               </button> 

//             <Link to ={'/add-item'} className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
//                 add Item
//             </Link>
//              <Link  to="/profile" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
//                 Profile
//               </Link> 
//              <button
//               onClick={handleLogout}
//               className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
//             >
//              {!changing? "Logout"   : <span className="inline-block w-6 h-6 border-4 border-blue-500 border-dotted rounded-full animate-spin"></span>}
//             </button></>
           
//           ) : (
//             <>
               
//               <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
//                 Login
//               </Link>
//               <Link to="/signup" className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>

//               {/* popup page here is  */}
//         {isOpen && (
//         <div
//           className="fixed z-1 inset-0 bg-black bg-opacity-100 flex items-center justify-center"
//           onClick={() => setIsOpen(false)} // Close when clicking outside
//         >
//           <div
//             className="bg-white p-6 rounded-lg shadow-lg w-160  relative "
//             onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
//           >
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
//               onClick={() => setIsOpen(false)}
//             >
//               ❌
//             </button>
//             <h2 className="text-lg font-bold text-gray-800">Your Requested Items List</h2>
//             <div className=" flex flex-col overflow-y-auto max-h-[500px]">
//                 {yourItems.length>0?(
//                   yourItems.map((item )=>(
//                     <div  key={item.$id}  className="flex border-black border mb-3 items-center p-3" >
//                     <div className="flex-col px-2">
//                      <p> <b>item name</b>  : {item?.itemName}  </p>
//                       <p><b>Owner</b>  : {item?.ownerName}</p>
//                       <p className="text-green-600"> <b>item price </b> : ₹ {item?.price}</p>
//                       <p><b> item category </b>:  {item?.category}</p>
//                       <p><b>Contect</b>  :  {item?.ownerContect}</p>
//                     </div>
//                       <p className="px-2 ">  {item.takenBy?null:<button className={"bg-blue-600 hover:bg-blue-800 w-18 rounded-2xl p-1.5 mx-3"} onClick={()=>{
//                         navigate(`/item/${item.itemId}`)

//                       }} >View</button>}

//                        <var className={'bg-violet-600 rounded-2xl w-24 p-2 '}> {item.takenBy===userData.$id ?"Accepted" :"Pending" } </var>
//                        </p>
//                     </div>
//                   ))
//                 ):(<h1 className="p-2">
//                               you have no item yet
//                           </h1>)}
//             </div>
         
            
//           </div>
//         </div>
//       )}
      
//     </nav>
   
//   );
// }


// useEffect(() => {
  //   fetchItems();
  // }, [statechange]);

  // // Fetch items from Appwrite
  // const fetchItems = async () => {
  //   if (loading || !hasMore) return; // Avoid multiple requests
  //   setLoading(true);

  //   if(count === 1) return;

  //   setCount((pre)=>(pre+1))
  
    
  //   try {
  //     const response = await service.getAllItemNotUser(userData.$id, page, cat, value);
  //     console.log(  "item list ", response)
  //     if (response.success) {
  //       setItems((prevItems) => [...prevItems, ...response.data]);
  //       setPage((prevPage) => prevPage + 1);
  //       setHasMore(response.data.length === 10);
  //     }
  //     else {
  //       console.error("Error fetching items:", error);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching items:", error);
  //   }
  //   setLoading(false);
  // };

    //  const [cat , setCat] = useState([
  //   "textbooks", "notebooks", "reference-books", "research-papers", "stationery",
  //   "laptops", "mobile-phones", "headphones", "smartwatches", "chargers-cables",
  //   "furniture", "kitchen-utensils", "room-decor", "storage-boxes",
  //   "jackets-hoodies", "shoes-footwear", "bags-backpacks", "watches-jewelry",
  //   "musical-instruments", "gaming-consoles", "board-games", "cameras",
  //   "bicycles", "dumbbells-weights", "sports-kits", "yoga-mats",
  //   "helmets", "travel-bags", "raincoats", "sleeping-bags"
  // ])

  // const [statechange, setStateChange]= useState(false)
  
 
  // const [items, setItems] = useState([]); // Store items
  // const [page, setPage] = useState(0); // Track page count
  // const [loading, setLoading] = useState(false); // Track loading
  // const [hasMore, setHasMore] = useState(true); // Check if more data available
  // const  [count , setCount ] = useState (0)
  

  // const fileterData =(data)=>{
  //       setValue(()=>(data.price))
  //       setCat(()=> JSON.parse(data.category) )
  //       setStateChange((prev)=>(!prev))
  // }

// chatgpt code

import { useState } from "react";

const ImagePreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="flex flex-col items-center">
    //   <img
    //     src={"./ReuseHub.jpg"}
    //     alt="Preview"
    //     className="w-32 h-32 object-cover rounded cursor-pointer hover:opacity-75"
    //     onClick={() => setIsOpen(true)}
    //   />

    //   {isOpen && (
    //     <div
    //       className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    //       onClick={() => setIsOpen(false)}
    //     >
    //       <div className="relative max-w-4xl max-h-3/4 overflow-hidden p-2 bg-white rounded shadow-lg">
    //         <button
    //           className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
    //           onClick={() => setIsOpen(false)}
    //         >
    //           ✕
    //         </button>
    //         <img
    //           src={"./ReuseHub.jpg"}
    //           alt="Full Preview"
    //           className="max-w-full max-h-[80vh] object-contain"
    //         />
    //       </div>
    //     </div>
    //   )}
    // </div>
    <>
    test page
    </>
  );
};

export default ImagePreview;



/*  {Items.map((item) => (
        <div key={item.id} className="mb-4 border p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <button
              onClick={() => toggleItem(item.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg"
            >
              {visibleItems[item.id] ? "Hide Details" : "Show Details"}
            </button>
          </div>

          {/* Item Details (Conditionally Rendered) }
          {visibleItems[item.id] && (
            <p className="mt-2 text-gray-600">{item.details}</p>
          )}
        </div>
      ))}
             
*/



/// chat gpt code

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { profileIn } from "../stores/AuthSlice";
// import serive from "../appwrite/manage";
// import request from "../appwrite/reqest";
// import profileManage from "../appwrite/profile";
// import { IoMdClose, IoMdPerson } from "react-icons/io";

// function Slider() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const useData = useSelector((state) => state.auth.userData);

//   const [isOpen, setIsOpen] = useState(false);
//   const [userItems, setUserItems] = useState([]);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [visibleItems, setVisibleItems] = useState({});

//   useEffect(() => {
//     if (isOpen) {
//       fetchProfile();
//       fetchUserItems();
//     }
//   }, [isOpen]);

//   const fetchProfile = async () => {
//     const res = await profileManage.getProfile(useData?.$id);
//     if (res.success) {
//       dispatch(profileIn(res.data.documents[0]));
//       setProfile(res.data.documents[0]);
//     }
//   };

//   const fetchUserItems = async () => {
//     setLoading(true);
//     const res = await serive.getItemsByUserId(useData?.$id);
//     if (res.succes) {
//       setUserItems(res.data);
//     }
//     setLoading(false);
//   };

//   const toggleItemVisibility = (id) => {
//     setVisibleItems((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
//       >
//         <IoMdPerson size={28} />
//       </button>

//       {/* Sliding Sidebar */}
//       <aside
//         className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 z-50 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => setIsOpen(false)}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
//         >
//           <IoMdClose size={24} />
//         </button>

//         <h2 className="text-xl font-bold mb-4">Profile Overview</h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           <div className="text-center">
//             <img
//               src={profile?.featuredImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//               alt="Profile"
//               className="rounded-full w-30 h-30 mx-auto mb-4"
//             />
//             <p className="text-gray-700">{useData?.name || "Your Name"}</p>
//             <p className="text-gray-500 text-sm">{useData?.email || "example@gmail.com"}</p>
//             <button
//               onClick={() => navigate("/change-password")}
//               className="mt-4 py-2 w-full text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//             >
//               Change Password
//             </button>

//             <h3 className="mt-6 text-lg font-semibold">Your Items</h3>
//             <div className="max-h-60 overflow-y-auto mt-2">
//               {userItems.length > 0 ? (
//                 userItems.map((item) => (
//                   <div key={item.itemId} className="bg-gray-100 p-3 my-2 rounded-lg">
//                     <p>Name: {item.name}</p>
//                     <button
//                       onClick={() => toggleItemVisibility(item.itemId)}
//                       className="mt-2 text-sm text-blue-500 underline"
//                     >
//                       {visibleItems[item.itemId] ? "Hide Requests" : "Show Requests"}
//                     </button>

//                     {visibleItems[item.itemId] && (
//                       <ul className="mt-2 bg-white p-2 rounded-md shadow">
//                         {item.yourReqest.length > 0 ? (
//                           item.yourReqest.map((itm) => (
//                             <li key={itm.$id} className="border-b p-2 last:border-none">
//                               <p>Requested by: {itm.requester}</p>
//                               <p>Contact: {itm.requesterContect}</p>
//                               <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
//                                 Accept
//                               </button>
//                               <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-red-600">
//                                 Reject
//                               </button>
//                             </li>
//                           ))
//                         ) : (
//                           <p className="text-gray-500">No requests</p>
//                         )}
//                       </ul>
//                     )}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No items added yet.</p>
//               )}
//             </div>
//           </div>
//         )}
//       </aside>
//     </>
//   );
// }

// export default Slider;