'use client'
import { useGlobalContext } from '@/app/contexts/stateContext';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaYoutube, FaFacebook, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';
import { PiGithubLogoFill } from 'react-icons/pi';
import { SiFrontendmentor } from 'react-icons/si';
import { db } from '../../../../firebase/clientApp';

const options = [
  { value: 'GitHub', label: 'GitHub', icon: <PiGithubLogoFill /> },
  { value: 'YouTube', label: 'YouTube', icon: <FaYoutube /> },
  { value: 'LinkedIn', label: 'LinkedIn', icon: <FaLinkedin /> },
  { value: 'Facebook', label: 'Facebook', icon: <FaFacebook /> },
  { value: 'Frontend Mentor', label: 'Frontend Mentor', icon: <SiFrontendmentor /> }
];

const SingleLink = ({ platform, url, id,setSavedLinks,savedLinks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState('');
  // const { savedLinks, setSavedLinks } = useGlobalContext();

const updateUser = async (id, platform ,url) =>{
  const userDoc = doc(db, 'userLinks', id);
  const newField = { platform, url };
  await updateDoc(userDoc, newField);
}





  const handlePlatformChange = async(index, value) => {
    const updatedLinks = savedLinks?.map((item, i) =>
      i === index ? { ...item, platform: value } : item
    );
    setSavedLinks(updatedLinks);
    await updateUser(id, value, url);
    setIsOpen(false);
  };

  const handleLinkChange = async (index, value) => {
    const updatedLinks = savedLinks?.map((item, i) =>
      i === index ? { ...item, url: value } : item
    );
    setSavedLinks(updatedLinks);
    await updateUser(id, platform, value);
    setErrors(validatelink(value));
  };

  const validatelink = (url) => {
    if (!url) {
      return 'Can\'t be empty';
    }
    return '';
  };

  const getSelectedOption = (platform) => {
    return options.find(option => option.value === platform);
  };

  const currentOption = getSelectedOption(platform);

  return (
    <div className='w-full relative flex flex-col gap-3'>
      <div>
        <small>Platform</small>
        <div className='border-border border outline-none hover:border-btn hover:shadow-myShadow 
                        rounded-radius w-full py-3 px-4 placeholder:text-border justify-between flex cursor-pointer items-center' onClick={() => setIsOpen(!isOpen)}>
          <span>
            {currentOption ? (
              <div className='flex gap-3 items-center'>
                {currentOption.icon}
                <span style={{ marginLeft: '10px' }}>{currentOption.label}</span>
              </div>
            ) : (
              'Select an option'
            )}
          </span>
          {isOpen ? <FaChevronUp className='text-btn' /> : <FaChevronDown className='text-btn' />}
        </div>
        {isOpen && (
          <ul className='bg-white flex flex-col gap-3 py-3 px-4 mt-3 text-heading border-border absolute w-full rounded-lg border' style={{ listStyleType: 'none', zIndex: 1 }}>
            {options.map(option => (
              <li className='gap-3 border-b pb-3 border-border cursor-pointer 
                  active:text-btn flex items-center' key={option.value} style={{ color: platform === option.value ? '#633CFF' : '' }}
                onClick={() => handlePlatformChange(id, option.value)}>
                {option.icon}
                <span style={{ marginLeft: '10px' }}>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='gap-1 flex flex-col'>
        <label style={{ color: errors && '#FF3939' }}
          htmlFor="link" className='text-[12px]'>Link</label>
        <div className='relative'>
          <input type="text" value={url} onChange={(e) => handleLinkChange(id, e.target.value)}
            className='border-border border outline-none  focus:border-btn focus:shadow-myShadow 
            rounded-radius w-full py-3 px-11 placeholder:text-border'
            placeholder="Enter link"
            style={{ borderColor: errors && '#FF3939' }} />
          <FiLink className='absolute left-4 top-1/2 transform -translate-y-1/2' />
          {errors && <small className='text-[12px] text-error absolute right-4 top-1/2 transform -translate-y-1/2'>{errors}</small>}
        </div>
      </div>

    </div>
  );
};

export default SingleLink;
