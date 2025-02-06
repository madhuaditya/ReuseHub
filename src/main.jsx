import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import Store from './stores/Store'
import { Provider ,useDispatch } from 'react-redux'
 import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignupMod from './components/SignupMod'
import Login from './components/Login'
import Home from './page/Home'
import Footer from './components/Footer/Footer'
import AuthLayout from './AuthLayout'
import User from './User/User'
import EditProfile from './profile/EditProfile'
import Item from './Item/Item'
import EditItem from './Item/EditItem'
import ItemDetail from './Item/ItemDetail'
import FeedbackForm from './page/Feedback'
import {PrivacyPolicy} from './page/MaintenancePage'
import {TermsAndConditions} from './page/MaintenancePage'
import SetNewPassword from './passwordrecovry/SetNewPassword'
import RequestPasswordChange from './passwordrecovry/RequestPasswordChange'

const router = createBrowserRouter(
  [{
      path: '/',
      element : <App/>,
      children:[
        {
          path: '/',
          element:
          // <AuthLayout authentication > 
                   <><Home   />
                     <Footer />
                     </>   
                  // </AuthLayout>
        },
        {
          path: '/signup',
          element: 
           <AuthLayout authentication ={false}> 
                        <SignupMod/>
                    </AuthLayout>
        },{
          path: '/login',
          element: 
          <AuthLayout authentication ={false}> 
                        <Login/>
                    </AuthLayout>
        },{
          path:'/user',
          element : 
                    <AuthLayout authentication>
                      <User/>,
                      </AuthLayout>
        },{
          path:'/profile',
          element: <AuthLayout authentication>
            <EditProfile/>
          </AuthLayout> 
        },
        {
          path: "/add-item",
          element : <AuthLayout authentication>
            <Item/>
          </AuthLayout> 
        },
        {
          path : "/edit-item/:itemId",
          element :<AuthLayout authentication><EditItem/></AuthLayout> 
        },{
          path: "/item/:itemId",
          element: <AuthLayout authentication> <ItemDetail/></AuthLayout> 
        },
        {
          path:'/feedback',
          element: <FeedbackForm/>
        },{
          path: '/change-password',
          element :
            <RequestPasswordChange/>
        }
        ,
        
      ]
  },
  {
    path:'/privacy',
    element:<>
    {PrivacyPolicy()}
    </>
  },
  {
    path:'/terms',
    element:<>
    {TermsAndConditions()}
    </>
  },
  {
    path: '/recovery',
    element:
      <SetNewPassword/ >
  },
  // {
  //   path : '/test',
  //   element: <Test/>,
    
  // }
 
 ]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
