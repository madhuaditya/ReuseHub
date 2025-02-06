import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import serive from "../appwrite/manage"
import { useNavigate } from "react-router-dom"
import profileManage from "../appwrite/profile"
import request from "../appwrite/reqest"
import { profileIn } from "../stores/AuthSlice"


function Slider({show=false}) {
    const navigate = useNavigate()
    const[pageLoading, setPageLoading]= useState(true);
    const [loading , setLoading] = useState(true)
    const [stateChange , setStatechate ]= useState(false);
    const [userItems , setData ]= useState([])
    const [profile ,setProFile] = useState(null)
    const useData = useSelector(state=> state.auth.userData)
    const [visibleItems, setVisibleItems] = useState({}); // Track visibility for each item


    const accept = async (item,itm)=>{
   
      
      const res = await serive.sold(item.$id,itm.userId )
      await request.updateRequest(itm.$id,itm.userId);
       if(res.succes)
             alert(`Acepted successfully`)
        else {
          alert("Somthig Error")
        }
        setStatechate((prev)=>(!prev))
     }

     const reject=async( itm)=>{
           await request.deleteOneRequest(itm.$id)
          alert("Item Rejected")
          setStatechate((prev)=>(!prev))
     }

   
      const toggleItem = (id) => {
        setVisibleItems((prev) => ({
          ...prev,
          [id]: !prev[id], // Toggle the clicked item's visibility
        }));
      };

    const featch = async()=>{
      setLoading(()=> (true))
        const res = await serive.getItemsByUserId(useData?.$id)
 
        if(res.succes){
          const newArray = await Promise.all(res.data.map(async (itm) => {
            const obj = itm;
            if(itm.status === "Sold") 
              return {...obj,yourReqest: [] }

            try {
                const res = await request.getReqestByItemId(obj.$id)
                let arr = res.success?res.data:[];
                return {...obj , yourReqest:arr}
            } catch (error) {
                console.error("Error fetching document:", error);
                return {...obj,yourReqest: [] }
            }
        }));  

            setData(newArray)
        }
        setLoading(()=>(false))
    }
    const dispach = useDispatch()
    const featchProfile= async ()=>{
        const res = await profileManage.getProfile(useData.$id)
        if(res.success){
          dispach(profileIn(res.data.documents[0]))
          setProFile(res.data.documents[0])
        }
    }

    useEffect(()=>{
      if(!show)
        featch()

      if(pageLoading){
        featchProfile()
      }

      setPageLoading(()=>(false))

    },[stateChange])
  return (
       <>
        <aside className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
       {!pageLoading?(
        <div>
             <img
         src={profile?profile.featuredImage:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
         alt="Profile"
         className="rounded-full w-30 h-30 mx-auto mb-4"
       />
       <p className="text-center text-gray-700">{useData? useData.name : "Your Name"} </p>
       <p className="text-center text-gray-500 text-sm">{useData? useData.email : "Example@gmail.com"}</p>
       <button onClick={()=>(navigate("/change-password"))} className="w-full mt-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 ">change Password</button>
       {!show?<div className="w-full h-[400px] mt-2 rounded-lg border-2">
           <h2 className="text-center text-amber-950">
           your items 
           </h2>
       
          {loading?(<h1  className="text-center"> Loading Contest please Wait</h1>): (<div className=" flex-col flex-grow overflow-y-auto max-h-[370px] px-4 py-2">
              {userItems[0]?userItems.map((item)=>(
                   <div key ={item.itemId} className="bg-gray-300  hover:bg-gray-200 rounded-2xl flex-col p-2 my-2" > 
                    <div> <p  className="p-1.5">Name : {item.name}</p> 

                    </div>
                   {item.status === 'Available'?<div>
                      <button onClick={()=>{
                    //  console.log("chicked button")
                    navigate(`/edit-item/${item.itemId}`)
                   }} className="px-3 mx-1 py-1.5 bg-blue-500 rounded-lg hover:bg-blue-600">edit</button> 
                   <button key={item.itemId} onClick={async()=>{
                    alert("item is Deleting")
                     await serive.deleteItem(item.itemId)
                     setStatechate((pre)=>(!pre))
                    }} className={` mx-1 px-2 py-1.5 bg-red-500 rounded-lg hover:bg-red-600`}> Delete</button> 
                    
                   <var  onClick={() => toggleItem(item.itemId)}
                    className={"mx-1 px-2 py-1.5 bg-green-500 rounded-lg hover:bg-green-600 "}>Reqests</var><sup className="text-2xl mx-1 bg-amber-700 rounded-4xl ">{item.yourReqest.length} </sup>   
             
                   </div>:(< > 
                    <div>
                      <p className="text-blue-500 text-center">Sold</p>
                    </div>
                    </>)}
                   <div>
                   {visibleItems[item.itemId] && (
                        <ul className="mt-4 border p-3 rounded-lg">
                          {item.yourReqest.map((itm) => (
                            <li key={item.$id} className="p-2 border-b last:border-none">
                             <p> sended by : {itm?.requester}  </p> 
                             <p>Contect : {itm?.requesterContect}</p>
                             <p> <button
                             onClick={async ()=>(accept(item, itm))} className="bg-green-400 hover:bg-green-500 px-2 rounded-2xl mt-1.5"> Accept</button>  
                             <button onClick={async()=>(reject ( itm))}
                             className="bg-red-400 hover:bg-red-500 px-2 rounded-2xl mt-1.5" >Reject</button>   </p>
                            </li>
                          ))}
                        </ul>
                      )}
                   </div>
                    </div>
               ) ):(<h1 className="text-center text-blue-600"> No item Added Yet</h1>)}
           </div>)}
       </div>:null}
        </div>
       ) :(<h1 className="text-2xl  text-center ">Loading</h1>)}
      </aside>
        </>
  )
}

export default Slider


