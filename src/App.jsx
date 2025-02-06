import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useDispatch } from "react-redux";
import { useEffect ,useState } from "react";
import authService from "./appwrite/auth";
import { login,logout ,profileIn,profileOut} from "./stores/AuthSlice";
import Loading from './Loading'
import profileManage from './appwrite/profile'
export default function App() {
  const dispatch = useDispatch()
  const [loading , setLoading] = useState(true);

  const reloard = async ()=>{
    const res =await authService.currentUser().then(res=> res)
    
    if(res.succes){
      const result = await profileManage.getProfile(res.data.$id)
    dispatch(login(res.data));
    if(result.success){
      dispatch(profileIn(result.data.documents[0]))
    }
    }
    else {
    dispatch(logout());
    dispatch(profileOut());
    }
    setLoading(false)
 }
  useEffect(() => {
   
   reloard()
  }, []);

  // watch input value by passing the name of it

  return (
     loading?(<Loading/>):( <>
      <Header/>
      <div className="bg-gray-900">
      <Outlet/>
      </div>
      </>)
   
  );
}