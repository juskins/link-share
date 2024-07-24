import { useGlobalContext } from '@/app/contexts/stateContext';
import React, { useState } from 'react';
import { AiTwotonlink } from 'react-icons/ai';
import { FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { PiGithubLogoFill } from 'react-icons/pi';
import { SiFrontendmentor } from 'react-icons/si';

const options = [
  { value: 'GitHub', label: 'GitHub', icon: <PiGithubLogoFill /> },
  { value: 'YouTube', label: 'YouTube', icon: <FaYoutube /> },
  { value: 'LinkedIn', label: 'LinkedIn', icon: <FaLinkedin /> },
  { value: 'Facebook', label: 'Facebook', icon: <FaFacebook /> },
  { value: 'Frontend Mentor', label: 'Frontend Mentor', icon: <SiFrontendmentor /> }
];

const SocialSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState('');
  const [link, setLink] = useState('');
  const {editIndex,setEditIndex,linkState,setLinkState,savedLinks,setSavedLinks,selectedOption, setSelectedOption} = useGlobalContext();



  const validatelink = (link) => {
   if (!link) {
     return 'Can\'t be empty';
   }
   return '';
 };

  const handlelinkChange = (e) => {
   const value = e.target.value;
   setLink(value)
   setErrors(validatelink(value));
 };


  const handleSelect = (value) => {
    setSelectedOption(value);
    console.log(selectedOption)
   //  console.log(savedLinks)
    setIsOpen(false);
  };

  const handleSave = ()=>{
    if (selectedOption && link) {
      if (editIndex !== null) {
        const updatedLinks = savedLinks.map((item, index) =>
          index === editIndex ? { platform: selectedOption, url: link } : item
        );
        setSavedLinks(updatedLinks);
        setEditIndex(null);
      } else {
        setSavedLinks([...savedLinks, {platform: selectedOption, url: link }]);
        setLinkState(false);
      }
      console.log(savedLinks)

      // setSelectedOption('');
      setLink('');

    }

  //  setsavedLinks([...savedLinks, {
  //     id:Date.now(),
  //     platform:selectedOption,
  //     url:link,
  //  }]);
   // console.log(savedLinks)
  }

  

  const getSelectedOption = () => {
   return options.find(option => option.value === selectedOption);
 };

  return (
    <div className='w-full relative flex flex-col gap-3'>
      <div>
         <small>Platform</small>
         <div className='border-border border outline-none hover:border-btn hover:shadow-myShadow 
                        rounded-radius w-full py-3 px-4 placeholder:text-border justify-between flex cursor-pointer items-center' onClick={() => setIsOpen(!isOpen)}>
         <span>{selectedOption ? (
               <div className='flex gap-3 items-center'>
               {getSelectedOption()?.icon}
               <span style={{ marginLeft: '10px' }}>{getSelectedOption()?.label}</span>
               </div>
            ) : (
               'Select an option'
            )}</span>
         {isOpen ? <FaChevronUp className='text-btn'/> : <FaChevronDown className='text-btn'/>}
         </div>
         {isOpen && (
         <ul className='bg-white flex flex-col gap-3 py-3 px-4 mt-3 text-heading border-border absolute w-full rounded-lg border' style={{ listStyleType: 'none',zIndex: 1 }}>
            {options.map(option => (
               <li className='gap-3 border-b pb-3 border-border cursor-pointer 
               active:text-btn flex items-center' key={option.value} style={{color: selectedOption === option.value ? '#633CFF' : '',}}
               value={selectedOption} onClick={() => handleSelect(option.value)}>
               {option.icon}
               <span style={{ marginLeft: '10px' }}>{option.label}</span>
               </li>
            ))}
         </ul>
         )}
      </div>

      <div className='gap-1 flex flex-col'>
         <label style={{ color: errors && '#FF3939'}}
         htmlFor="link" className='text-[12px]'>link address</label>
         <div className='relative'>
            <input type="text" value={link}
            className='border-border border outline-none  focus:border-btn focus:shadow-myShadow 
            rounded-radius w-full py-3 px-11 placeholder:text-border'
            placeholder='e.g. https://www.github.com/johnappleseed' onChange={handlelinkChange}
            style={{ borderColor: errors && '#FF3939'}}/>
            <FiLink className='absolute left-4 top-1/2 transform -translate-y-1/2'/>
            {errors && <small className='text-[12px] text-error absolute right-4 top-1/2 transform -translate-y-1/2'>{errors}</small>}
         </div>
               </div>
      <div>

      </div>
      <div className='border-t flex-col flex border-border py-6 px-10'>
               <button onClick={handleSave} className='self-end flex  
               rounded-lg text-white py-[11px] px-[27px] bg-btn'
               style={{opacity:!linkState && '50%'}}>Save</button>
      </div>
    </div>
  );
};

export default SocialSelect;
