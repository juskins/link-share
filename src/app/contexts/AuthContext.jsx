'use client'
import { Children, createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer'

const INITIAL_STATE = {
  currentUser:null
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({Children}) =>{
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
   return(
      <AuthContext.Provider value={{currentUser:state.current, dispatch}}>
         {Children}
      </AuthContext.Provider>
   )
}