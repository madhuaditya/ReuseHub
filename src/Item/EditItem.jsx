import React ,{useState} from 'react'
import serive from '../appwrite/manage'
import {useForm} from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../profile/Slider';
import Loading from '../Loading'
import { openChange } from '../stores/AuthSlice';
function EditItem() {

    const {itemId} = useParams()
     const [loading, setLoading] = useState(false);
     const [featching , setFeactching]= useState(false)
    const navigate =     useNavigate();
    const [ doc , setDoc] = useState(null)

    const { register, handleSubmit } = useForm(
        {defaultValues : async ()=>{
          setFeactching(true)
          setLoading((pre)=>(!pre))
            const res = await serive.getItemById(itemId)
            setFeactching(false)
            if(res.succes){
                setDoc(res.data.documents[0])
                setLoading((pre)=>(!pre))
                return {...res.data.documents[0]}
            }else {
                alert(res.message)
                setLoading((pre)=>(!pre))
                return {}
            }
          
        }
    });
    const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    setFeactching(true)
    setLoading((pre)=>(!pre))
    // console.log("Form Data:", data);
    
    if(data.image[0]){
      const upload = await serive.uploadFile(data.image[0])
        const resposnce = await serive.updateItem(data.itemId, {...data , featuredImage: upload.data});
        setFeactching(false)
        if(resposnce.succes){
            navigate("/user")
        }else {
          
            alert(resposnce.message)
        }
    }
    else {
      setLoading((pre)=>(!pre))
      const resposnce= await serive.updateItem(data.itemId, {...data , featuredImage: doc.featuredImage});
      setFeactching(false)
      if(resposnce.succes){
        navigate("/user")
    }else {
      
        alert(resposnce.message)
    }
    setLoading((pre)=>(!pre))
    }
    setLoading((pre)=>(!pre))
    setFeactching(false)
  }
    const handleImageChange = (e) => {
      setLoading((pre)=>(!pre))
        const file = e.target.files[0];
        if (file) {
          setImagePreview(URL.createObjectURL(file));
        }
        setLoading((pre)=>(!pre))
      };

    const dispach = useDispatch()
    const isOpen = useSelector(state=> state.auth.open);
  return (
    <div className="flex min-h-screen p-6 bg-gray-900">
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
          
         


    <main className="flex-1 mx-6 bg-white p-6 rounded-lg shadow-lg flex-col flex-grow overflow-y-auto max-h-[100vh] ">
    <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      { featching?  <Loading></Loading> :  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("userId",{ required: true }  )}  readOnly placeholder="User ID" className="w-full p-2 border rounded" />
        <input {...register("name" ,{ required: true })} placeholder="Item Name" className="w-full p-2 border rounded" />
        {/* <input {...register("category")} placeholder="Category"  /> */}
        <select {...register ("category", { required: true })}  id="cat" className="border border-gray-300 rounded-lg p-2 w-full">
          <option value="">Select Category</option>

          <optgroup label="📚 Books & Study Material">
            <option value="textbooks">Textbooks</option>
            <option value="notebooks">Notebooks</option>
            <option value="question-paper">Question Paper</option>
            <option value="reference-books">Reference Books</option>
            <option value="research-papers">Research Papers</option>
            <option value="stationery">Stationery Items</option>
          </optgroup>

          <optgroup label="💻 Electronics & Gadgets">
            <option value="laptops">Laptops</option>
            <option value="mobile-phones">Mobile Phones</option>
            <option value="headphones">Headphones</option>
            <option value="smartwatches">Smartwatches</option>
            <option value="chargers-cables">Chargers & Cables</option>
          </optgroup>

          <optgroup label="🏠 Household & Essentials">
            <option value="furniture">Furniture (Chairs, Tables, Beds)</option>
            <option value="kitchen-utensils">Kitchen Utensils</option>
            <option value="room-decor">Room Decor</option>
            <option value="storage-boxes">Storage Boxes</option>
          </optgroup>

          <optgroup label="👕 Clothing & Accessories">
            <option value="jackets-hoodies">Jackets & Hoodies</option>
            <option value="shoes-footwear">Shoes & Footwear</option>
            <option value="bags-backpacks">Bags & Backpacks</option>
            <option value="watches-jewelry">Watches & Jewelry</option>
          </optgroup>

          <optgroup label="🎮 Entertainment & Hobbies">
            <option value="musical-instruments">Musical Instruments</option>
            <option value="gaming-consoles">Gaming Consoles</option>
            <option value="board-games">Board Games</option>
            <option value="cameras">Cameras</option>
          </optgroup>

          <optgroup label="🚴 Sports & Fitness">
            <option value="bicycles">Bicycles</option>
            <option value="dumbbells-weights">Dumbbells & Weights</option>
            <option value="sports-kits">Badminton & Cricket Kits</option>
            <option value="yoga-mats">Yoga Mats</option>
          </optgroup>

          <optgroup label="🚗 Travel & Commuting">
            <option value="helmets">Helmets</option>
            <option value="travel-bags">Travel Bags</option>
            <option value="raincoats">Raincoats</option>
            <option value="sleeping-bags">Sleeping Bags</option>
          </optgroup>
        </select>
        <textarea {...register("description" ,{ required: true })} placeholder="Description" className="w-full p-2 border rounded" />
        <input {...register("condition" ,{ required: true })} placeholder="Condition - new,used " className="w-full p-2 border rounded" />
        {/* <input {...register("" ,{ required: true })} placeholder="Specification " className="w-full p-2 border rounded" /> */}
        <select {...register("spacification", { required: true })} id="space" className="w-full p-2 border rounded">
  <option value="">--Please choose an option--</option>

  <optgroup label="📖 Academic & Study">
    <option value="Textbooks">Textbooks</option>
    <option value="Notebooks">Notebooks</option>
    <option value="question-paper">Question Paper</option>
    <option value="Stationery">Stationery</option>
    <option value="Research Papers">Research Papers</option>
    <option value="Exam Guides">Exam Guides</option>
  </optgroup>

  <optgroup label="🏡 Home & Decoration">
    <option value="Furniture">Furniture</option>
    <option value="Wall Decor">Wall Decor</option>
    <option value="Lamps & Lighting">Lamps & Lighting</option>
    <option value="Curtains & Carpets">Curtains & Carpets</option>
    <option value="Kitchen Utensils">Kitchen Utensils</option>
  </optgroup>

  <optgroup label="📱 Gadgets & Accessories">
    <option value="Laptops">Laptops</option>
    <option value="Smartphones">Smartphones</option>
    <option value="Headphones">Headphones</option>
    <option value="Smartwatches">Smartwatches</option>
    <option value="Chargers & Cables">Chargers & Cables</option>
  </optgroup>

  <optgroup label="🍕 Food & Beverages">
    <option value="Snacks">Snacks</option>
    <option value="Beverages">Beverages</option>
    <option value="Instant Food">Instant Food</option>
    <option value="Spices & Condiments">Spices & Condiments</option>
    <option value="Dry Fruits">Dry Fruits</option>
  </optgroup>

  <optgroup label="👕 Clothing & Fashion">
    <option value="Jackets & Hoodies">Jackets & Hoodies</option>
    <option value="Shoes & Footwear">Shoes & Footwear</option>
    <option value="Bags & Backpacks">Bags & Backpacks</option>
    <option value="Watches & Jewelry">Watches & Jewelry</option>
    <option value="Ethnic Wear">Ethnic Wear</option>
  </optgroup>

  <optgroup label="🎮 Entertainment & Hobbies">
    <option value="Musical Instruments">Musical Instruments</option>
    <option value="Gaming Consoles">Gaming Consoles</option>
    <option value="Board Games">Board Games</option>
    <option value="Cameras">Cameras</option>
    <option value="Art Supplies">Art Supplies</option>
  </optgroup>

  <optgroup label="🚴 Sports & Fitness">
    <option value="Bicycles">Bicycles</option>
    <option value="Dumbbells & Weights">Dumbbells & Weights</option>
    <option value="Badminton & Cricket Kits">Badminton & Cricket Kits</option>
    <option value="Yoga Mats">Yoga Mats</option>
    <option value="Sportswear">Sportswear</option>
  </optgroup>

  <optgroup label="🚗 Travel & Outdoor">
    <option value="Helmets">Helmets</option>
    <option value="Travel Bags">Travel Bags</option>
    <option value="Raincoats">Raincoats</option>
    <option value="Sleeping Bags">Sleeping Bags</option>
    <option value="Tents & Camping Gear">Tents & Camping Gear</option>
  </optgroup>

  <optgroup label="🔧 Tools & Equipment">
    <option value="Power Tools">Power Tools</option>
    <option value="Hand Tools">Hand Tools</option>
    <option value="Electrical Supplies">Electrical Supplies</option>
    <option value="Gardening Tools">Gardening Tools</option>
    <option value="Automobile Accessories">Automobile Accessories</option>
  </optgroup>

</select>
        <input {...register("price" ,{ required: true })}  placeholder="Price" className="w-full p-2 border rounded" />
        <input {...register("owner",{ required: true })} placeholder="Owner Name" className="w-full p-2 border rounded" />
        {/* <input {...register("status" ,{ required: true })} placeholder="Status" className="w-full p-2 border rounded" /> */}
        <select {...register ("status", { required: true })}  id="status" className="w-full p-2 border rounded" >
        <option value="Available">Available</option> 
         
        </select>
        <input {...register("location" ,{ required: true })} placeholder="Location" className="w-full p-2 border rounded" />
        <input {...register("contect" ,{ required: true })} placeholder="Contact Info - 0000000000" className="w-full p-2 border rounded" />
        
        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />

        {/* Image Preview */}
        { imagePreview ? (
          <img src={imagePreview} alt="Preview" className="max-h-[400px] h-auto object-cover rounded" />
        ):
        (<img src={doc?doc.featuredImage:""} alt="Preview" className="max-h-[400px] object-cover rounded" /> )}

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          {loading?"Loading..." : "update Item"}
        </button>
      </form>}
    </main>
     
    </div>
  )
}

export default EditItem
