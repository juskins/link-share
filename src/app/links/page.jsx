'use client'
import React, { useContext, useEffect, useState } from 'react'
import Home from '../page'
import linkshare from '../../../public/Group 273.png'
import Image from 'next/image'
import { TfiLineDouble } from 'react-icons/tfi'
import SingleLink from '@/components/layouts/singleLink/SingleLink'
import SocialSelect from '@/components/layouts/selectInputs/SelectInputs'
import { GlobalContextProvider, useGlobalContext } from '../contexts/stateContext'
import { db } from '../../../firebase/clientApp'
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'

const page = () => {
   const [savedLinks, setSavedLinks] = useState([])
   const {linkState,setLinkState,etsavedLinks,selectedOption,setSelectedOption} = useGlobalContext();

   const handleRemove = async(id)=>{
      const userDoc = doc(db, 'userLinks', id);
      await deleteDoc(userDoc)
   }



   useEffect(() => {
      // const fetchUserData = async () => {
      //   try {
      //     const q = (collection(db, 'userLinks'));
      //     const data = await getDocs(q);
      //     setSavedLinks(data.docs.map((doc)=> ({...doc.data(),id:doc.id})))
      //     console.log(savedLinks)
      //   } catch (error) {
      //     console.error('Error fetching user data:', error);
      //   }
      // };
      // fetchUserData();

      const unsub = onSnapshot(collection(db, 'userLinks'), (snapShot)=>{
         let list = [];
         snapShot.docs.forEach(doc=>{
            list.push({ id: doc.id, ...doc.data()})
         })
         setSavedLinks(list);
      },(error)=>{
         console.log(error)
      });

      return ()=>{
         unsub()
      }
    }, []);



   
  return (
   <Home>
      <div className='bg-white flex flex-col rounded-[12px] text-[#737373]'>
         <div className='flex flex-col gap-10 p-10'>
            <div className='flex flex-col gap-2'>
               <h1 className='text-[32px] font-bold text-heading'>Customize your links</h1>
               <p className=''>Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>

            <div className='flex flex-col gap-6'>
               <button onClick={()=>setLinkState(true)} className='outline-none focus:bg-lightPurple py-[11px] px-[27px] rounded-lg border-btn border font-semibold text-btn'>
                  <span>+ Add new link</span>
               </button>

               <div className=' bg-white flex flex-col gap-6'>
                  {savedLinks.map((link,index)=>(
                     <div key={link.id} className='rounded-xl bg-lightBg p-5 flex flex-col'>
                        <div className='flex-center justify-between'>
                           <div className='text-[#737373] flex-center gap-2'>
                              <TfiLineDouble/> <span className='font-bold'>Link #{savedLinks.indexOf(link)+1}</span>
                           </div>
                           <button onClick={()=>handleRemove(link.id)}>Remove</button>
                        </div>
                        <div className='my-3'>
                           <SingleLink platform={link.platform} url={link.link} savedLinks={savedLinks} id={link.id} setSavedLinks={setSavedLinks}/>
                        </div>
                  </div>
                  ))}



                  {linkState &&
                  (<div className='rounded-xl bg-lightBg p-5 flex flex-col'>
                     <div className='flex-center justify-between'>
                        <div className='text-[#737373] flex-center gap-2'>
                           <TfiLineDouble/> <span className='font-bold'>Link #{savedLinks.length+1}</span>
                        </div>
                        <p>Remove</p>
                     </div>
                     <div className='my-3'>
                        <SocialSelect/>
                     </div>
                  </div>)}
                  

                  {savedLinks.length === 0 && !linkState && 
                  (<div className='bg-lightBg p-5 flex flex-col gap-10'>
                     <Image src={linkshare} className='m-auto' alt='linkshare'/>
                     <div className='flex flex-col gap-6 w-[488px] m-auto text-center'>
                        <h1 className='font-bold text-[32px] text-heading'>Let’s get you started</h1>
                        <p className='text-[#737373]'>Use the “Add new link” button to get started. Once you have more 
                        than one link, you can reorder and edit them. 
                        We’re here to help you share your profiles with everyone!</p>
                     </div>
                  </div>) 
                  }
                     
               </div>
            </div>


         </div>
         {/* <div className='border-t flex-col flex border-border py-6 px-10'>
               <button onClick={addLinktoArr} className='self-end flex  
               rounded-lg text-white py-[11px] px-[27px] bg-btn'
               style={{opacity:!linkState && '50%'}}>Save</button>
         </div> */}
      </div>
   </Home>
    
  )
}

export default page