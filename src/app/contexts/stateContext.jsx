'use client'
import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'




export const GlobalContext = createContext(null);


export const GlobalContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
   const [linkState, setLinkState] = useState(false);
  //  const [savedLinks, setSavedLinks] = useState([])
   const [selectedOption, setSelectedOption] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(currentUser))
  },[currentUser])


   const handleRemove = (index) => {
    setSavedLinks(savedLinks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setSelectedOption('');
      setLink('');
      setEditIndex(null);
    }
  };
   
  return (
    <GlobalContext.Provider value={{
      linkState,setLinkState,
      // savedLinks, setSavedLinks,
      selectedOption, setSelectedOption,
      handleRemove,editIndex, setEditIndex,
      currentUser, setCurrentUser,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}


export function useGlobalContext(){
  return useContext(GlobalContext)
}
