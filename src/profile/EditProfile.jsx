import {  useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { profileIn } from "../stores/AuthSlice";
import profileManage from "../appwrite/profile";
import { useNavigate } from "react-router-dom";
import serive from "../appwrite/manage";
import Slider from '../profile/Slider'
import Loading from '../Loading'
import { openChange } from "../stores/AuthSlice";
const EditProfile = () => {
   const dispach = useDispatch()
   const [featching , setFeactching]= useState(false)
   const [loading, setLoading] = useState(false);
  const  useData = useSelector(state=>(state.auth.userData));
  const [prof , setProf ] = useState (null)
  const navigate = useNavigate();
  const { register, handleSubmit,
   
   } = useForm({
    defaultValues: async()=> {
      setFeactching(true)
    const data =  await profileManage.getProfile(useData.$id)
    if(data.success){
      setFeactching(false)
      if( data.data.total==1){
        setProf(data.data.documents[0])
        return  data.data.documents[0]
      }
      else {
        return {userId : useData.$id}
      }
    }else {
     alert( data.message)
     
    }

    setFeactching(false)

    }
    
   });





   const onSubmit = async (data) => {
    setFeactching(true)
    setLoading(true);
    try {
        let featuredImage = null;

        if (data.image && data.image[0]) {
            const res = await serive.uploadFile(data.image[0]);
          

            if (res.succes) {
                featuredImage = res.data;
            } else {
                alert("Image upload failed.");
                return;
            }
        }

        let result;
        if (prof) {
            result = await profileManage.updateProfile(data.$id, {
                userId: data.userId,
                featuredImage,
                enrollmentNo: data.enrollmentNo,
                name: data.name,
                phone: data.phone,
                school: data.school,
                address: data.address,
                year: data.year,
                course: data.course,
                degree: data.degree,
                email:data.email
            });
        } else {
       
            result = await profileManage.createProfile({
               userId:data.userId,
               name:data.name,
               enrollmentNo: data.enrollmentNo,
               phone : data.phone,
               email:data.email
            });
        }

        if (result.success) {
            const pf = await profileManage.getProfile(data.$id)
            dispach(profileIn(pf.data.documents[0]))
           
        } else {
            alert(result.message);
        }
        navigate("/user");

    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
        setFeactching(false)
    }
};

const [isprevier , setimg] = useState(null);

    const handleImageChange = (e) => {
      setLoading((pre)=>(!pre))
    const file = e.target.files[0];
    if (file) {
      setimg(URL.createObjectURL(file));
    }
    setLoading((pre)=>(!pre))
    };
      const isOpen = useSelector(state=> state.auth.open);
      

  return (
    <div className="flex min-h-screen p-6 bg-gray-900">
    <div className="hidden md:block w-1/3 2xl:w-1/4">
      <Slider key={"edit items set"} show={true}></Slider>
      </div>
      <div   className=" fixed h-12 w-12 bg-blue-200  bottom-4 z-10 rounded-full text-2xl p-1.5 shadow-gray-100" onClick={()=>{
        dispach(openChange())
      }}>👤</div>
    
    {isOpen ?
    <div className=" w-[50%] z-20 top-0 left-0 fixed" >
      <Slider  /> 
    </div>
    :null}
      


      <main className="flex-col max-h-screen flex-grow overflow-y-auto mx-6 bg-gray-200 p-6 rounded-lg shadow-lg">
               
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
   { featching? <Loading></Loading> :  <div className="flex justify-between">
      <div className=" w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">User ID</label>
          <input {...register("userId",{required: true}) } className="input-field rounded-2xl bg-gray-300  p-2" readOnly />
        </div>
        
        <div>
          <label className="block font-medium">Name</label>
          <input {...register("name" ,{required: true})} className="input-field w-60 bg-white rounded-2xl p-2" />
        </div>
        
        <div>
          <label className="block font-medium">Enrollment No</label>
          <input {...register("enrollmentNo" ,{required: true})} className="input-field bg-white rounded-2xl  p-2" />
        </div>
        
        <div>
          <label className="block font-medium">Email</label>
          <input {...register("email" ,{required: true})} className="input-field bg-white rounded-2xl  p-2" />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input {...register("phone" ,{required: true})} className="input-field bg-white rounded-2xl p-2" type="tel" />
        </div>
        
        <div>
          <label className="block font-medium">School</label>
          <input {...register("school" ,{required: true})} className="input-field bg-white rounded-2xl p-2" />
        </div>
        
        <div>
          <label className="block font-medium">Address</label>
          <input {...register("address" ,{required: true})} className="input-field bg-white rounded-2xl p-2" />
        </div>
        
        <div>
          <label className="block font-medium">Featured Image</label>
          <input {...register("image" )}  onChange={handleImageChange} type="file" accept="image/*" className="input-field bg-white  rounded-2xl p-2" />
        </div>
      
        
        <div>
          <label className="block font-medium">Year</label>
          <input {...register("year" ,{required: true})} type="number" className="input-field bg-white rounded-2xl p-2" />
        </div>
        
        <div>
          <label className="block font-medium">Course</label>
          <input {...register("course" ,{required: true})} className="input-field bg-white rounded-2xl p-2" />
        </div>
        
        <div>
          <label className="block font-medium">Degree</label>
          <input {...register("degree" ,{required: true})} className="input-field bg-white rounded-2xl p-2" />
        </div>
        
        <button disabled={loading} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
        {loading?"loading...":  "Update Profile"}
        </button>
      </form>
      </div>
      {isprevier? (<div  className=" max-w-[400px] " >
        <img  src={isprevier}    alt="profile vier" className=" w-full rounded-2xl p-1" />
         </div>) :null}
      </div>}
    </main>
    </div>
  );
};

export default EditProfile;
