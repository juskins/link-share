"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { AiTwotoneMail } from "react-icons/ai";
import { PiLockKeyFill } from 'react-icons/pi';
import Link from 'next/link';


const page = () => {
   const [errors, setErrors] = useState({email:"",password:''});
   const [inputs, setInputs] = useState({email:'',password:''})

   const validateEmail = (email) => {
      if (!email) {
        return 'Can\'t be empty';
      }
      return '';
    };

    const validatePassword = (password) => {
      if (!password || password.length <8) {
        return 'Please check again';
      }
      return '';
    };

    const handleEmailChange = (e) => {
      const value = e.target.value;
      setInputs({...inputs,email:value})
      // setEmail(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    };

    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setInputs({...inputs,password:value})
      // setPassword(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value),
      }));
    };
   const handleSubmit = (e) => {
      e.preventDefault();
      const emailError = validateEmail(inputs.email);
      const passwordError = validatePassword(inputs.password);
      setErrors({email: emailError, password: passwordError });
  
      if (!emailError && !passwordError) {
        // Submit form
        alert('Form submitted successfully!');
      }
    };
  return (
    <div className='max-w-[1440px] bg-background m-auto min-h-screen flex-center'>
      <div className='w-[476px] flex flex-col gap-[51px]'>
      <div className='flex-center gap-2'>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.61875 27.38C6.57341 29.3334 9.71475 29.3334 16.0001 29.3334C22.2854 29.3334 25.4281 29.3334 27.3801 27.38C29.3334 25.4294 29.3334 22.2854 29.3334 16C29.3334 9.71469 29.3334 6.57202 27.3801 4.61869C25.4294 2.66669 22.2854 2.66669 16.0001 2.66669C9.71475 2.66669 6.57208 2.66669 4.61875 4.61869C2.66675 6.57335 2.66675 9.71469 2.66675 16C2.66675 22.2854 2.66675 25.428 4.61875 27.38ZM12.6667 11.6667C11.8097 11.6667 10.9719 11.9208 10.2593 12.397C9.54666 12.8731 8.99125 13.5499 8.66327 14.3417C8.33529 15.1335 8.24948 16.0048 8.41668 16.8454C8.58388 17.686 8.99659 18.4581 9.60262 19.0641C10.2086 19.6702 10.9808 20.0829 11.8214 20.2501C12.6619 20.4173 13.5332 20.3315 14.325 20.0035C15.1169 19.6755 15.7936 19.1201 16.2698 18.4075C16.7459 17.6949 17.0001 16.8571 17.0001 16C17.0001 15.7348 17.1054 15.4804 17.293 15.2929C17.4805 15.1054 17.7349 15 18.0001 15C18.2653 15 18.5197 15.1054 18.7072 15.2929C18.8947 15.4804 19.0001 15.7348 19.0001 16C19.0001 17.2526 18.6286 18.4771 17.9327 19.5186C17.2368 20.5601 16.2477 21.3719 15.0904 21.8513C13.9331 22.3306 12.6597 22.456 11.4312 22.2117C10.2026 21.9673 9.07414 21.3641 8.18841 20.4784C7.30267 19.5926 6.69948 18.4641 6.45511 17.2356C6.21073 16.007 6.33616 14.7336 6.81551 13.5764C7.29487 12.4191 8.10663 11.43 9.14814 10.734C10.1896 10.0381 11.4141 9.66669 12.6667 9.66669C12.932 9.66669 13.1863 9.77204 13.3739 9.95958C13.5614 10.1471 13.6667 10.4015 13.6667 10.6667C13.6667 10.9319 13.5614 11.1863 13.3739 11.3738C13.1863 11.5613 12.932 11.6667 12.6667 11.6667ZM23.6667 16C23.6667 17.1493 23.2102 18.2515 22.3975 19.0641C21.5849 19.8768 20.4827 20.3334 19.3334 20.3334C19.0682 20.3334 18.8138 20.4387 18.6263 20.6262C18.4388 20.8138 18.3334 21.0681 18.3334 21.3334C18.3334 21.5986 18.4388 21.8529 18.6263 22.0405C18.8138 22.228 19.0682 22.3334 19.3334 22.3334C20.586 22.3334 21.8105 21.9619 22.852 21.266C23.8935 20.5701 24.7053 19.5809 25.1847 18.4237C25.664 17.2664 25.7894 15.993 25.5451 14.7644C25.3007 13.5359 24.6975 12.4074 23.8118 11.5217C22.926 10.6359 21.7975 10.0328 20.569 9.78838C19.3404 9.54401 18.067 9.66943 16.9098 10.1488C15.7525 10.6281 14.7634 11.4399 14.0674 12.4814C13.3715 13.5229 13.0001 14.7474 13.0001 16C13.0001 16.2652 13.1054 16.5196 13.293 16.7071C13.4805 16.8947 13.7349 17 14.0001 17C14.2653 17 14.5197 16.8947 14.7072 16.7071C14.8947 16.5196 15.0001 16.2652 15.0001 16C15.0001 14.8507 15.4566 13.7485 16.2693 12.9359C17.0819 12.1232 18.1841 11.6667 19.3334 11.6667C20.4827 11.6667 21.5849 12.1232 22.3975 12.9359C23.2102 13.7485 23.6667 14.8507 23.6667 16Z" fill="#633CFF"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="108" height="21" viewBox="0 0 108 21" fill="none">
            <path d="M10.9977 20.72V17.556L11.2748 17.612C11.0901 18.6387 10.536 19.46 9.61264 20.076C8.7077 20.692 7.61809 21 6.34379 21C5.05102 21 3.92447 20.7013 2.96413 20.104C2.02226 19.488 1.29277 18.6293 0.77566 17.528C0.258553 16.4267 0 15.1293 0 13.636C0 12.124 0.267787 10.808 0.803362 9.688C1.33894 8.568 2.08689 7.7 3.04723 7.084C4.02604 6.468 5.16183 6.16 6.4546 6.16C7.80277 6.16 8.89238 6.47733 9.72345 7.112C10.573 7.74667 11.0716 8.61467 11.2194 9.716L10.9146 9.744V0.559999H15.07V20.72H10.9977ZM7.67349 17.64C8.6523 17.64 9.44643 17.2947 10.0559 16.604C10.6653 15.8947 10.97 14.8867 10.97 13.58C10.97 12.2733 10.6561 11.2747 10.0282 10.584C9.41873 9.87467 8.61536 9.52 7.61809 9.52C6.65775 9.52 5.86362 9.87467 5.2357 10.584C4.62626 11.2933 4.32153 12.3013 4.32153 13.608C4.32153 14.9147 4.62626 15.9133 5.2357 16.604C5.86362 17.2947 6.67621 17.64 7.67349 17.64Z" fill="#333333"/>
            <path d="M25.0408 21C23.471 21 22.1044 20.692 20.9409 20.076C19.7774 19.4413 18.8724 18.564 18.2261 17.444C17.5981 16.324 17.2842 15.036 17.2842 13.58C17.2842 12.1053 17.5981 10.8173 18.2261 9.716C18.8724 8.596 19.7681 7.728 20.9132 7.112C22.0582 6.47733 23.3879 6.16 24.9023 6.16C26.3612 6.16 27.6263 6.45867 28.6975 7.056C29.7686 7.65333 30.5997 8.484 31.1907 9.548C31.7816 10.612 32.0771 11.8627 32.0771 13.3C32.0771 13.5987 32.0679 13.8787 32.0494 14.14C32.0309 14.3827 32.0032 14.616 31.9663 14.84H19.722V12.068H28.6144L27.8941 12.572C27.8941 11.4147 27.6171 10.5653 27.063 10.024C26.5275 9.464 25.7887 9.184 24.8469 9.184C23.7572 9.184 22.9077 9.55733 22.2983 10.304C21.7073 11.0507 21.4118 12.1707 21.4118 13.664C21.4118 15.12 21.7073 16.2027 22.2983 16.912C22.9077 17.6213 23.8127 17.976 25.0131 17.976C25.6779 17.976 26.2504 17.864 26.7306 17.64C27.2108 17.416 27.5709 17.052 27.811 16.548H31.717C31.2553 17.9293 30.4612 19.0213 29.3346 19.824C28.2265 20.608 26.7952 21 25.0408 21Z" fill="#333333"/>
            <path d="M37.7441 20.72L32.176 6.44H36.6361L40.9853 19.768H38.6583L42.9799 6.44H47.3291L41.761 20.72H37.7441Z" fill="#333333"/>
            <path d="M48.9349 20.72V0.559999H53.0903V20.72H48.9349Z" fill="#333333"/>
            <path d="M56.4015 20.72V6.44H60.5569V20.72H56.4015ZM56.263 4.536V0H60.6954V4.536H56.263Z" fill="#333333"/>
            <path d="M63.8681 20.72V6.44H67.9403V9.8H68.0234V20.72H63.8681ZM73.7024 20.72V11.872C73.7024 11.088 73.4992 10.5 73.0929 10.108C72.7051 9.716 72.1326 9.52 71.3754 9.52C70.729 9.52 70.1473 9.66933 69.6302 9.968C69.1315 10.2667 68.7345 10.6773 68.439 11.2C68.162 11.7227 68.0234 12.3387 68.0234 13.048L67.6633 9.604C68.125 8.55867 68.7991 7.728 69.6856 7.112C70.5905 6.47733 71.6986 6.16 73.0098 6.16C74.5796 6.16 75.78 6.608 76.6111 7.504C77.4422 8.38133 77.8577 9.56667 77.8577 11.06V20.72H73.7024Z" fill="#333333"/>
            <path d="M81.0196 20.72V0.559999H85.175V20.72H81.0196ZM90.0782 20.72L84.2054 13.3L89.9397 6.44H94.7322L88.0006 13.944L88.1945 12.628L95.0092 20.72H90.0782Z" fill="#333333"/>
            <path d="M101.795 21C99.7263 21 98.0826 20.58 96.8637 19.74C95.6449 18.9 94.98 17.7427 94.8692 16.268H98.5813C98.6736 16.9027 98.9876 17.388 99.5231 17.724C100.077 18.0413 100.834 18.2 101.795 18.2C102.663 18.2 103.291 18.0787 103.678 17.836C104.085 17.5747 104.288 17.2107 104.288 16.744C104.288 16.3893 104.168 16.1187 103.928 15.932C103.706 15.7267 103.291 15.5587 102.681 15.428L100.41 14.952C98.729 14.5973 97.4917 14.0653 96.6975 13.356C95.9034 12.628 95.5063 11.6947 95.5063 10.556C95.5063 9.17467 96.0327 8.10133 97.0854 7.336C98.138 6.552 99.6063 6.16 101.49 6.16C103.355 6.16 104.842 6.54267 105.95 7.308C107.058 8.05467 107.668 9.1 107.778 10.444H104.066C103.992 9.95867 103.734 9.59467 103.291 9.352C102.847 9.09067 102.219 8.96 101.407 8.96C100.668 8.96 100.114 9.072 99.7448 9.296C99.3939 9.50133 99.2184 9.8 99.2184 10.192C99.2184 10.528 99.3662 10.7987 99.6617 11.004C99.9572 11.1907 100.447 11.3587 101.13 11.508L103.678 12.04C105.101 12.3387 106.172 12.8987 106.892 13.72C107.631 14.5227 108 15.4747 108 16.576C108 17.976 107.455 19.068 106.366 19.852C105.294 20.6173 103.771 21 101.795 21Z" fill="#333333"/>
          </svg>
         </div>
         <div className='bg-white flex flex-col gap-10 p-10'>
            <div className='flex flex-col gap-2'>
               <h1 className='text-heading font-bold text-[32px]'>Create account</h1>
               <p className='text-primaryText'>Let’s get you started sharing your links!</p>
            </div>
            <form className='text-heading flex flex-col gap-6' onSubmit={handleSubmit}>
               <div className='gap-1 flex flex-col'>
                  <label htmlFor="email" className='text-[12px]'>Email address</label>
                  <div className='relative'>
                     <input type="text" value={inputs.email} onChange={handleEmailChange}
                     className='border-border border outline-none focus:border-btn focus:shadow-myShadow
                     rounded-radius w-full py-3 px-11 placeholder:text-border'
                     placeholder='e.g. alex@email.com' style={{ borderColor: errors.email && '#FF3939'}}/>
                     <AiTwotoneMail className='absolute left-4 top-1/2 transform -translate-y-1/2'/>
                     {errors.email && <small className='text-[12px] text-error absolute right-4 top-1/2 transform -translate-y-1/2'>{errors.email}</small>}
                  </div>
               </div>

               <div className='gap-1 flex flex-col'>
                  <label htmlFor="email" className='text-[12px]'>Create password</label>
                  <div className='relative'>
                     <input type="text" value={inputs.password} onChange={handlePasswordChange}
                     className='border-border border outline-none focus:border-btn focus:shadow-myShadow
                     rounded-radius w-full py-3 px-11 placeholder:text-border'
                     placeholder='At least 8 characters' style={{ borderColor: errors.password && '#FF3939'}}/>
                     <PiLockKeyFill className='absolute text-[#737373] left-4 top-1/2 transform -translate-y-1/2'/>
                     {errors.password && <small className='text-[12px] text-error absolute right-4 top-1/2 transform -translate-y-1/2'>{errors.password}</small>}
                  </div>
               </div>   

               <div className='gap-1 flex flex-col'>
                  <label htmlFor="email" className='text-[12px]'>Confirm password</label>
                  <div className='relative'>
                     <input type="text" 
                     className='border-border border outline-none focus:border-btn focus:shadow-myShadow 
                     rounded-radius w-full py-3 px-11 placeholder:text-border'
                     placeholder='At least 8 characters'/>
                     <PiLockKeyFill className='absolute text-[#737373] left-4 top-1/2 transform -translate-y-1/2'/>
                  </div>
               </div>

               <p className='text-[#737373] text-[12px]'>Password must contain at least 8 characters</p>
               <button className='bg-btn hover:bg-btn-hover py-[11px]
               rounded-lg text-white px-[27px]'>Create new account</button>
               <p className='text-[#737373] text-center'>Already have an account? <span className='text-btn'><Link href='/login'>Login</Link></span></p>
            </form>
         </div>
      </div>
    </div>
  )
}

export default page