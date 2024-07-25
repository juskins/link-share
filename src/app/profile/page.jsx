'use client'
import React, { useEffect, useState } from 'react'
import Home from '../page'
import vector from '../../../public/Vector.png'
import phImage from '../../../public/ph_image.png'
import Image from 'next/image'
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useGlobalContext } from '../contexts/stateContext'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase/clientApp'

const page = () => {
  const {linkState,setLinkState} = useGlobalContext();
  const [errors, setErrors] = useState({firstName:"",lastName:''});
  const [inputs, setInputs] = useState({firstName:'',lastName:''})
  const [file, setFile] = useState(''); 
  const [data, setData] = useState(null)

  const storage = getStorage();

  const addImgToStore = async(value)=>{
    await addDoc(collection(db, 'images'),{imageUrl:value} )
  }

  useEffect(()=>{
    const uploadFile = ()=>{

      const name = new Date().getTime() + file
      console.log(name)
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        'state_changed',
        (snapshot) =>{
          const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('upload is' + progress + '% done')
          switch(snapshot.state){
            case 'paused':
              console.log('Upload is paused') ;
              break;
            case 'running':
              console.log('Upload is running') ;
              break;
            default:
              break;
          }
        },
        (error)=>{
          console.log(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            setData(downloadURL)
            addImgToStore(downloadURL)
          })
        }
      )
    }
    file && uploadFile();
    // addImgToStore()
    
  },[file])

const handleImageChange = (e)=>{
  const file = e.target.files[0];
  if(file){
    // const imageUrl = URL.createObjectURL(file);
    setFile(file);
  }
}

  const validatefirstName = (firstName) => {
    if (!firstName) {
      return 'Can\'t be empty';
    }
    return '';
  };

  const validatelastName = (lastName) => {
    if (!lastName) {
      return 'Can\'t be empty';
    }
    return '';
  };

  const handlefirstNameChange = (e) => {
    const value = e.target.value;
    setInputs({...inputs,firstName:value})
    // setfirstName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: validatefirstName(value),
    }));
  };

  const handlelastNameChange = (e) => {
    const value = e.target.value;
    setInputs({...inputs,lastName:value})
    // setlastName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: validatelastName(value),
    }));
  };

  return (
   <Home>
      <div className='bg-white flex flex-col rounded-[12px] text-[#737373]'>
         <div className='flex flex-col gap-10 p-10'>
            <div className='flex flex-col gap-2'>
               <h1 className='text-[32px] font-bold text-heading'>Profile Details</h1>
               <p className=''>Add your details to create a personal touch to your profile.</p>
            </div>

            <div className=' bg-white flex flex-col gap-6'>
              <div className='bg-lightBg p-5 rounded-[12px] flex flex-col'>
                <div className='flex-center justify-between gap-4'>
                  <p>Profile picture</p>
                 <div className='flex-center gap-6 w-[432px] h-[193px]'>
                    <div style={{backgroundImage:file ? `url(${file})` : 'none', filter:file ? 'blur()' :'none'}} className='bg-center bg-cover filter blur-lg rounded-xl relative w-1/2 h-full flex-center text-btn font-semibold flex-col m-auto bg-[#EFEBFF]'>
                        <Image src={file ?vector : phImage} className='' alt='vector'/>
                        <input type="file" onChange={handleImageChange} className=' cursor-pointer opacity-[0%] absolute top-10 left-10 right-10 bottom-10'/>
                        <p style={{color:file && 'white'}}>+ Upload Image</p>
                    </div>
                    <small className='text-[12px] w-1/2'>Image must be below 1024x1024px. Use PNG or JPG format.</small>
                 </div>
                </div>
              </div>

              <div className='bg-lightBg p-5 gap-3 rounded-[12px] flex flex-col'>
                <div className='text-[#737373] relative flex-center justify-between'>
                  <p className=''>First name*</p>
                  <input type="text" placeholder='e.g. John' value={inputs.firstName} onChange={handlefirstNameChange}
                  className='border-border text-heading border outline-none focus:border-btn focus:shadow-myShadow 
                  rounded-radius w-[63%] py-3 px-4 placeholder:text-border'/>
                  {errors.firstName && <small className='text-[12px] text-error absolute right-4 top-1/2 transform -translate-y-1/2'>{errors.firstName}</small>}
                </div>

                <div className='text-[#737373] relative flex-center justify-between'>
                  <p className=''>Last name*</p> 
                  <input type="text" placeholder='e.g. Appleseed' value={inputs.lastName} onChange={handlelastNameChange}
                  className='border-border text-heading border outline-none focus:border-btn focus:shadow-myShadow 
                  rounded-radius w-[63%] py-3 px-4 placeholder:text-border'/>
                  {errors.lastName && <small className='text-[12px] text-error absolute right-4 top-1/2 transform -translate-y-1/2'>{errors.lastName}</small>}

                </div>

                <div className='text-[#737373] flex-center justify-between'>
                  <p className=''>firstName</p>
                  <input type="firstName" placeholder='e.g. firstName@example.com'
                  className='border-border text-heading border outline-none focus:border-btn focus:shadow-myShadow 
                  rounded-radius w-[63%] py-3 px-4 placeholder:text-border'/>
                </div>
              </div>
            </div>
         </div>
         <div className='border-t flex-col flex border-border py-6 px-10'>
               <button onClick={()=>setLinkState(false)} className='self-end flex  
               rounded-lg text-white py-[11px] px-[27px] bg-btn'
               >Save</button>
            </div>
      </div>
   </Home>
  )
}

export default page