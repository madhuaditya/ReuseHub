import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        status : false,
        userData : null,
        profile :null,
        items : [],
}

export  const AuthSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        login: (state, action)=>{
                state.status= true;
                // console.log(action.payload)
                state.userData= action.payload
        },
        logout: (state)=>{
            state.status = false 
           state.userData= null
        },
        profileIn: (state, action )=>{
            // console.log("profile data ")
            // console.log(action.payload);
            state.profile= action.payload
        },
        profileOut : (state)=>{
            state.profile= null
        },
        itemsInsert: (state, action)=>{
            state.items= action
        },
        itemsOut:(state)=>{
            state.items=[]
        } ,

    }
}
)

export default AuthSlice.reducer 

export const {login, logout,profileIn,profileOut,itemsInsert,itemsOut} =AuthSlice.actions;