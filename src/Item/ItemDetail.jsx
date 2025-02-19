import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import serive from '../appwrite/manage';
import Loading from '../Loading';
import { useSelector } from 'react-redux';
import requests from '../appwrite/reqest'
function ItemDetail() {
    const navigate = useNavigate();
    const [previwe , setImagePreview] = useState(false)
    const[loading , setLoading] = useState(true);
    const [isSended , setIsSended] = useState(false) 
    const {itemId} = useParams()
    const[item , setData] = useState(null);
    const [pageLoading, setPageLoading]= useState(true)
    const userData = useSelector(state=> state.auth.userData)
    const profile = useSelector(state=> state.auth.profile)
    const featch =async()=>{

        setLoading(true)
        const res = await serive.getItemById(itemId);
      
        if(res.succes){
               setData(res.data.documents[0])
               if(item){
      
                if(item?.status === "Sold"){
                  navigate('/user')
                }
               }
               const res2 = await requests.isSended(userData.$id, itemId)
              
            setIsSended(res2.succes)
         
        }else {
            alert(res.message)
        }
       
        setPageLoading(false)
    }

        useEffect(()=>{
            featch()
            setLoading(()=>(false))
        },[])


    const handleRequest = async () => {

        const res = await requests.createRequest(itemId, userData.$id ,{
            itemName : item.name,
            address : item.address,
            price: String(item.price),
            ownerContect : item.contect,
            category: item.category,
            ownerName : item.owner,
            requester: profile.name,
            enrollmentNo: profile.enrollmentNo,
            requesterContect : profile.phone,
        })
        // console.log(res)
       if(res.success){
        alert("Request sended successfully")
        navigate('/user');
       }else {
        alert(res.message)
       }
    };

    return (
        item?(<div className="max-w-2xl mx-auto h-screen   bg-gray-900 shadow-lg rounded-lg overflow-auto p-2">
        
       {  !previwe ? 
       <div className='my-6  bg-white p-4 rounded-2xl py-6 '>
          <div className="flex justify-center items-center">
           <img 
           onClick={()=>{
            setImagePreview(true)
           }}
                src={item.featuredImage } 
                alt={item.name} 
                className=" max-h-[600px] object-cover rounded-md" 
            />
          </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-4"><strong>Category:</strong> {item.category}</p>
                <p className="text-gray-700 mb-2"><strong>Description:</strong> {item.description}</p>
                <p className="text-gray-700 mb-2"><strong>Condition:</strong> {item.condition}</p>
                <p className="text-gray-700 mb-2"><strong>Specifications:</strong> {item.spacification}</p>
                <p className="text-gray-700 mb-2"><strong>Condition:</strong> {item.condition}</p>
                <p className="text-green-600 text-lg font-semibold">Price: {item.price?`₹ ${item.price}`:"Free"}</p>
                <p className="text-gray-700 mb-2"><strong>Owner:</strong> {item.owner}</p>
                <p className="text-gray-700 mb-2"><strong>Location:</strong> {item.location}</p>
                <p className="text-gray-700 mb-4"><strong>Contact:</strong> {item.contect}</p>
                {isSended ? (<p className='text-red-500'> You sended Reqest already for this item</p>):<button 
                    disabled={loading}
                    onClick={handleRequest} 
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    {loading?"....Loading......":"Send Request to Owner"}
                </button>}
               
                { item.request.length>0? <p className='text-red-300 mt-4    '> {item.request.length} persons sended request for this Item </p>: null}
            </div> 
           </div>: (
              
                <div
                  className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                  onClick={() => setImagePreview(false)}
                >
                  <div className="relative max-w-4xl max-h-3/4 overflow-hidden p-2 bg-white rounded shadow-lg">
                    <button
                      className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                      onClick={() => setImagePreview(false)}
                    >
                      ✕
                    </button>
                    <img
                      src={item.featuredImage}
                      alt={item.name} 
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                  </div>
                </div>
           )}
        </div>):(<Loading/>)
    );
}

export default ItemDetail;


