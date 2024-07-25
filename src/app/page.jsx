'use client'
import Image from "next/image";
import Navbar from '../components/layouts/navbar/Navbar'
import Outer from '../../public/OuterRectangle.png'
import Inner from '../../public/InnerRectangle.png'
import { FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { PiGithubLogoFill } from 'react-icons/pi';
import { SiFrontendmentor } from 'react-icons/si';
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";
import { useGlobalContext } from "./contexts/stateContext";
import { db } from "../../firebase/clientApp";
import { collection, onSnapshot } from "firebase/firestore";
import { TiArrowRight } from "react-icons/ti";


const options = [
  { value: 'GitHub', label: 'GitHub', icon: <PiGithubLogoFill /> },
  { value: 'YouTube', label: 'YouTube', icon: <FaYoutube /> },
  { value: 'LinkedIn', label: 'LinkedIn', icon: <FaLinkedin /> },
  { value: 'Facebook', label: 'Facebook', icon: <FaFacebook /> },
  { value: 'Frontend Mentor', label: 'Frontend Mentor', icon: <SiFrontendmentor /> }
];

export default function Home({children}) {
  const router = useRouter();
  const {currentUser} = useGlobalContext()
  const [savedLinks, setSavedLinks] = useState([])
  const [images, setImages] = useState([])


  const RequireAuth = ({children})=>{
    return currentUser ? (children) : router.push('/login') 
  }

  const getSelectedOption = (platform) => {
    return options.find(option => option.value === platform);
  };

  const checkLink = (value)=>{
    if(value === 'GitHub'){
      return '#1A1A1A';
    }
    else if(value === 'Facebook'){
      return 'blue';
    }
    else if(value === 'LinkedIn'){
      return '#2D68FF'
    }
    else if(value === 'YouTube'){
      return '#EE3939'
    }
  }
  
  useEffect(() => {
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


  useEffect(()=>{
    const unsub = onSnapshot(collection(db, 'images'), (snapShot)=>{
      let list = [];
      snapShot.docs.forEach(doc=>{
         list.push({ id: doc.id, ...doc.data()})
      })
      setImages(list);
      console.log(images)
   },(error)=>{
      console.log(error)
   });

   return ()=>{
      unsub()
   }
 }, []);


  return (
     <div className="bg-background max-w-[1440px] m-auto min-h-screen">
      <Navbar/>
      <main className="flex-center gap-6 p-6 pt-0">
        <div className="w-[560px] m-auto flex-center">
          <Image src={Outer} className="relative" alt="mobileimage"/>
          <Image src={Inner} className="absolute" alt="mobileImage"/>
          <div className="absolute flex self-start mt-[56px] flex-col gap-[56px]">
            <div className=" flex-center flex-col gap-[25px]">
              <div className="border bg-[#EEEEEE] rounded-full w-[96px] h-[96px]">
                <img src={images[0]?.imageUrl} width={96} height={100} className="rounded-full"/>
              </div>
              <div className="flex-center flex-col gap-[13px]">
                <div className="border rounded-[104px] bg-[#EEEEEE] h-4 w-40"></div>
                <div className="border rounded-[104px] bg-[#EEEEEE] h-2 w-[72px]"></div>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-[237px]">
              {savedLinks?.map(link=>(
                <div className="rounded-lg flex-center justify-between p-4" key={link.id} 
                style={{backgroundColor:savedLinks ? checkLink(link.platform) : '#EEEEEE'}}>
                  <div className='gap-1 text-white flex-center '>
                     {getSelectedOption(link.platform).icon}
                     <p>{link.platform}</p>
                  </div>
                  <TiArrowRight className='text-white '/>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[808px]">
          <RequireAuth>
            {children}
          </RequireAuth>
        </div>
      </main>
    </div>
  );
}
