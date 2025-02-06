import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, profileOut } from "../../stores/AuthSlice";
import requests from "../../appwrite/reqest";
import authService from "../../appwrite/auth";
import { HiMenu, HiX } from "react-icons/hi";


export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [changing, setChanging] = useState(false);
  const [yourItems, setYourItems] = useState([]);

  const handleLogout = async () => {
    setChanging(true);
    await authService.deleteSession();
    dispatch(logout());
    dispatch(profileOut());
    setChanging(false);
    navigate("/login");
  };

  //   console.log(window.location.pathname); //yields: "/js" (where snippets run)
  // console.log(window.location.href); 
  const curr = String(window.location.pathname)
  // console.log(curr)
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex text-white text-2xl font-semibold">
          ReuseHub
          <img src="./ReuseHub.jpg" alt="" className="ml-3 w-10 rounded-md" />
        </Link>

        {/* Mobile Menu Button */}
        <button className="text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {/* Navigation Links */}
        <div className={`md:flex md:items-center space-x-4 ${menuOpen ? "block" : "hidden"} absolute md:static top-16 right-0 bg-gray-800 w-full md:w-auto md:bg-transparent z-10`}> 
          {isAuthenticated ? (
            <>
              <button
                onClick={async () => {
                  const response = await requests.getReqestByUserId(userData.$id);
                  if (response.success) setYourItems(response.data);
                  setIsOpen(true);
                }}
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
              >
                Your Requests
              </button>
              {curr === "/user"?
            null  :
            <Link to="/user" className="text-white bg-purple-600 hover:bg-purple-800 px-4 py-2 rounded">
            User Page
          </Link>
            }

           {window.location.pathname==="/add-item" ?null:   <Link to="/add-item" className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded">
                Add Item
              </Link>}

            {window.location.pathname=== "/profile"?null:  <Link to="/profile" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Profile
              </Link>}

              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                {changing ? <span className="inline-block w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"></span> : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Login
              </Link>
              <Link to="/signup" className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Requests Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20" onClick={() => setIsOpen(false)}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500" onClick={() => setIsOpen(false)}>
              ❌
            </button>
            <h2 className="text-lg font-bold text-gray-800">Your Requested Items</h2>
            <div className="overflow-y-auto max-h-[400px]">
              {yourItems.length > 0 ? (
                yourItems.map((item) => (
                  <div key={item.$id} className="border-b p-3 flex justify-between items-center">
                    <div>
                      <p><b>Item:</b> {item.itemName}</p>
                      <p><b>Owner:</b> {item.ownerName}</p>
                      <p className="text-green-600"><b>Price:</b> ₹{item.price}</p>
                      <p><b>Category:</b> {item.category}</p>
                      <p><b>Contact:</b> {item.ownerContect}</p>
                    </div>
                    {!item.takenBy && (
                      <button className="bg-blue-600 hover:bg-blue-800 rounded p-1.5" onClick={() => navigate(`/item/${item.itemId}`)}>View</button>
                    )}
                    <span className={`px-3 py-1 rounded ${item.takenBy === userData.$id ? "bg-green-500" : "bg-yellow-500"}`}>
                      {item.takenBy === userData.$id ? "Accepted" : "Pending"}
                    </span>
                  </div>
                ))
              ) : (
                <h1 className="p-2">You have no requested items yet</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
