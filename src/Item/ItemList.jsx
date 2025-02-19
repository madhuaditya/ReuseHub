import React, { useEffect, useState ,useRef } from "react";
import service from "../appwrite/manage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import { FaFilter } from "react-icons/fa";
import Select from "./Select";
const ItemList = () => {

const ref = useRef(); 
const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);


  const [filter, setFilter] = useState({
    category: [
      "textbooks", "notebooks", "reference-books", "research-papers", "stationery",
      "laptops", "mobile-phones", "headphones", "smartwatches", "chargers-cables",
      "furniture", "kitchen-utensils", "room-decor", "storage-boxes",
      "jackets-hoodies", "shoes-footwear", "bags-backpacks", "watches-jewelry",
      "musical-instruments", "gaming-consoles", "board-games", "cameras",
      "bicycles", "dumbbells-weights", "sports-kits", "yoga-mats",
      "helmets", "travel-bags", "raincoats", "sleeping-bags"
    ],
    price: "5000",
  });
  const [stateChange, setStateChange] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [toggle , setToggle]= useState(false);
  const changeToggle =()=>{
    setToggle((prev)=>(!prev))
  }
  const isFetching = useRef(false); // Prevent multiple requests
  
  function setValues   (data)  {
    console.log(data);
    setItems([])
    setPage(0)
    setHasMore(true)

    setFilter({
      category: JSON.parse(data.category),
      price: data.price,
    });

    setStateChange((prev) => !prev);
  };
  
  useEffect(() => {
  
    if (!isFetching.current) {
      fetchItems();
    }
  }, [stateChange]);
  
  const fetchItems = async () => {
    if (loading || !hasMore) return;
  
    isFetching.current = true; // Mark as fetching
    setLoading(true);
    try {
      const response = await service.getAllItemNotUser(userData.$id, page, filter.category, filter.price);
      if (response.success) {
        setItems((prevItems) => [...prevItems, ...response.data]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.length === 10);
      } else {
        console.error("Error fetching items:", response.error);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setLoading(false);
    isFetching.current = false; // Mark as done fetching
  };
  


  return (
   <>
   <main className="flex-1  md:mx-4 2xl:mx-6 bg-white p-6 rounded-lg shadow-lg">
        
        <h2 className="text-xl font-bold mb-4">Your Listed Items  </h2>
        {/* Scrollable Container */}
        {
     !loading? 

          <div className="container p-4"><div
     className="flex-col flex-grow overflow-y-auto max-h-[600px] p-2"
   >


     {items.length > 0 ? (
       
       items.map((item) => (
         <div key={item.$id} className="p-4 m-4 border rounded-lg">
           <img
             src={item.featuredImage}
             alt="Item"
             className="w-full h-32 object-cover rounded-lg"
           />
           <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
           <p className="text-gray-600">Category: {item.category}</p>
           <button
             onClick={() => navigate(`/item/${item.$id}`)}
             className="mt-2 py-1 px-4 text-white bg-green-500 rounded-lg hover:bg-green-600"
           >
             View
           </button>
         </div>
       ))

     ) : (
       <>
           <div className="flex flex-col items-center justify-center h-64 text-gray-500">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-16 h-16 mb-4"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M12 4.5v15m7.5-7.5h-15"
               />
             </svg>
             <h2 className="text-lg font-semibold">No Items Found</h2>
             <p className="text-sm">Try adjusting your filters or check back later.</p>
           </div>
       </>
     )}
      
   </div>
  
   </div>
     
     :<Loading/>   }
      </main>

        {/*  filter form */}

      <aside className="w-1/4 hidden 2xl:block bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filter Items</h2>
          <Select setValues={setValues} ref={ref} loading={loading}></Select>
      </aside>
      <div className="2xl:hidden z-1 flex items-center justify-center fixed right-2 bottom-6 rounded-full h-12 w-12 bg-blue-200">
      <div className="" onClick={()=>(changeToggle())}>
      <FaFilter size={20} />
      </div>
      <div className={`2xl:hidden  ${toggle? "block": "hidden"}   z-20 flex p-4 justify-center fixed right-0 top-0 rounded-l-2xl h-screen w-[60%] md:w-[30%] bg-white`}>
      <Select setValues={setValues} ref={ref} loading={loading} changeToggle={changeToggle}></Select>
      </div>
      </div>
   </>
  );
};

export default ItemList;
