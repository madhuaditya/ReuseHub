import React from "react";
import {  useForm } from "react-hook-form";


function Select({setValues, loading, ref, changeToggle}){
    const fileterData = ( data)=>{

        setValues(data)
    }

  
    
    
      const {register ,handleSubmit , watch}= useForm()
      const value = watch("price")|| "5000";
    return (
        <form ref={ref} onSubmit={handleSubmit(fileterData)}>
        <label className="2xl:bolck mb-2 flex justify-between  "><h2>Category</h2>   <span className="2xl:hidden right-0" onClick={()=>{
          changeToggle()
        }}>❌</span></label>
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
      <input {...register ("price")} type="range"  className="w-full" min="0" max="5000" defaultValue={"5000"}  />
        <span> value : {
          value
      }</span>
      <button disabled={loading} type="submit" className="w-full mt-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">{loading?"Loading...":"Apply Filters"}</button>
        </form>


    );

}
export default Select
