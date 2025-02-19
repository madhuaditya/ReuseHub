import { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, profileOut } from "../../stores/AuthSlice";
import requests from "../../appwrite/reqest";
import authService from "../../appwrite/auth";
const StyledHeader = styled.header`
  background-color: #1F2937;
  width: 100%;
  padding: 10px 2px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav_logo {
    padding: 0 12px;
    .nav-logo-link {
      text-decoration: none;
      font-size: 24px;
      color: #fab005;
      font-weight: bold;
    }
  }
  .menuToggleBtn {
    display: none;
    color: white;
    font-size: 24px;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    .menuToggleBtn {
      display: block;
    }
  }
`;
const NavManu = styled.ul`
  list-style: none;
  display: flex;

  li {
    &:hover {
      cursor: pointer;
      background: #44a8f4;
      border-radius: 4px;
    }
  }
  .nav-menu-list {
    text-decoration: none;
    color: white;
    display: block;
    padding: 10px 10px;
  }
  @media screen and (max-width: 768px) {
    display: ${(props) => (props.isToggleOpen ? "block" : "none")};
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 5px;
  }
`;

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
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

  const curr = String(window.location.pathname)

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };
  return (
    <>
      <StyledHeader>
        <div className="nav_logo">
            <Link to="/" className="flex text-white text-2xl font-semibold">
              ReuseHub
            <img src="./ReuseHub.jpg" alt="" className="ml-3 w-10 rounded-md" />
            </Link>
        </div>

        <NavManu isToggleOpen={isToggleOpen}>

          {isAuthenticated ? (
            <>
              <button
                onClick={async () => {
                  const response = await requests.getReqestByUserId(userData.$id);
                  if (response.success) setYourItems(response.data);
                  setIsOpen(true);
                }}
               className="nav-menu-list"
              >
                Your Requests
              </button>
              {curr === "/user"?
            null  :
            <Link to="/user" className="nav-menu-list">
            User Page
          </Link>
            }

           {window.location.pathname==="/add-item" ?null:   <Link to="/add-item" className="nav-menu-list">
                Add Item
              </Link>}

            {window.location.pathname=== "/profile"?null:  <Link to="/profile" className="nav-menu-list">
                Profile
              </Link>}

              <button
                onClick={handleLogout}
               className="  nav-menu-list"
             
              >
                {changing ? <span className="inline-block w-6 h-6 border-4 border-white border-dotted rounded-full animate-spin"></span> : "Logout"}
              </button>
            </>
             ) : (
                          <>
                            <Link to="/login" className="nav-menu-list">
                              Login
                            </Link>
                            <Link to="/signup" className="nav-menu-list">
                              Signup
                            </Link>
                          </>
                        )}
        </NavManu>
        <FaBars className="menuToggleBtn" onClick={handleToggleOpen} />

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
      </StyledHeader>
    </>
  );
};

export default Header;
