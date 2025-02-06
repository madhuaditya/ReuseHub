import React, { useEffect, useState ,useRef } from "react";
import service from "../appwrite/manage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import {  useForm } from "react-hook-form";

const ItemList = () => {
 

const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const [value , setValue]= useState("10000")

  const {register ,handleSubmit }= useForm()

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
  
  const isFetching = useRef(false); // Prevent multiple requests
  
  const fileterData = async (data) => {
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

    // console.log("Laoded again")


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


   <main className="flex-1 mx-6 bg-white p-6 rounded-lg shadow-lg">
        
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

      <aside className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Filter Items</h2>
          <form onSubmit={handleSubmit(fileterData)}>
          <label className="block mb-2">Category</label>
          <select {...register("category")} className="w-full p-2 border rounded-lg">
            <option value={JSON.stringify([
              "textbooks", "notebooks", "reference-books", "research-papers", "stationery",
              "laptops", "mobile-phones", "headphones", "smartwatches", "chargers-cables",
              "furniture", "kitchen-utensils", "room-decor", "storage-boxes",
              "jackets-hoodies", "shoes-footwear", "bags-backpacks", "watches-jewelry",
              "musical-instruments", "gaming-consoles", "board-games", "cameras",
              "bicycles", "dumbbells-weights", "sports-kits", "yoga-mats",
              "helmets", "travel-bags", "raincoats", "sleeping-bags"
            ])}>All</option>

            <optgroup label="📚 Books & Study Material">
              <option value={JSON.stringify(["textbooks"])}>Textbooks</option>
              <option value={JSON.stringify(["notebooks"])}>Notebooks</option>
              <option value={JSON.stringify(["question-paper"])}>Question Paper</option>
              <option value={JSON.stringify(["reference-books"])}>Reference Books</option>
              <option value={JSON.stringify(["research-papers"])}>Research Papers</option>
              <option value={JSON.stringify(["stationery"])}>Stationery Items</option>
            </optgroup>

            <optgroup label="💻 Electronics & Gadgets">
              <option value={JSON.stringify(["laptops"])}>Laptops</option>
              <option value={JSON.stringify(["mobile-phones"])}>Mobile Phones</option>
              <option value={JSON.stringify(["headphones"])}>Headphones</option>
              <option value={JSON.stringify(["smartwatches"])}>Smartwatches</option>
              <option value={JSON.stringify(["chargers-cables"])}>Chargers & Cables</option>
            </optgroup>

            <optgroup label="🏠 Household & Essentials">
              <option value={JSON.stringify(["furniture"])}>Furniture (Chairs, Tables, Beds)</option>
              <option value={JSON.stringify(["kitchen-utensils"])}>Kitchen Utensils</option>
              <option value={JSON.stringify(["room-decor"])}>Room Decor</option>
              <option value={JSON.stringify(["storage-boxes"])}>Storage Boxes</option>
            </optgroup>

            <optgroup label="👕 Clothing & Accessories">
              <option value={JSON.stringify(["jackets-hoodies"])}>Jackets & Hoodies</option>
              <option value={JSON.stringify(["shoes-footwear"])}>Shoes & Footwear</option>
              <option value={JSON.stringify(["bags-backpacks"])}>Bags & Backpacks</option>
              <option value={JSON.stringify(["watches-jewelry"])}>Watches & Jewelry</option>
            </optgroup>

            <optgroup label="🎮 Entertainment & Hobbies">
              <option value={JSON.stringify(["musical-instruments"])}>Musical Instruments</option>
              <option value={JSON.stringify(["gaming-consoles"])}>Gaming Consoles</option>
              <option value={JSON.stringify(["board-games"])}>Board Games</option>
              <option value={JSON.stringify(["cameras"])}>Cameras</option>
            </optgroup>

            <optgroup label="🚴 Sports & Fitness">
              <option value={JSON.stringify(["bicycles"])}>Bicycles</option>
              <option value={JSON.stringify(["dumbbells-weights"])}>Dumbbells & Weights</option>
              <option value={JSON.stringify(["sports-kits"])}>Badminton & Cricket Kits</option>
              <option value={JSON.stringify(["yoga-mats"])}>Yoga Mats</option>
            </optgroup>

            <optgroup label="🚗 Travel & Commuting">
              <option value={JSON.stringify(["helmets"])}>Helmets</option>
              <option value={JSON.stringify(["travel-bags"])}>Travel Bags</option>
              <option value={JSON.stringify(["raincoats"])}>Raincoats</option>
              <option value={JSON.stringify(["sleeping-bags"])}>Sleeping Bags</option>
            </optgroup>
          </select>

     
        <label className="block mt-4 mb-2">Price Range</label>
        <input {...register ("price")} type="range" onChange={(e)=>(setValue(e.target.value))} className="w-full" min="0" max="5000" defaultValue={"5000"} />
          <span> value : {value}</span>
        <button disabled={loading} type="submit" className="w-full mt-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">{loading?"Loading...":"Apply Filters"}</button>
          </form>
         
      </aside>
   </>
  );
};

export default ItemList;
