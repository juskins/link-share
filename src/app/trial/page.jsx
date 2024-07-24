'use client'
import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaTrash } from 'react-icons/fa';

const options = [
  { value: 'GitHub', label: 'GitHub', icon: <FaGithub /> },
  { value: 'LinkedIn', label: 'LinkedIn', icon: <FaLinkedin /> },
  { value: 'Facebook', label: 'Facebook', icon: <FaFacebook /> }
];

const Trial = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [link, setLink] = useState('');
  const [savedLinks, setSavedLinks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (selectedOption && link) {
      if (editIndex !== null) {
        const updatedLinks = savedLinks.map((item, index) =>
          index === editIndex ? { platform: selectedOption, url: link } : item
        );
        setSavedLinks(updatedLinks);
        setEditIndex(null);
      } else {
        setSavedLinks([...savedLinks, { platform: selectedOption, url: link }]);
      }
      setSelectedOption('');
      setLink('');
    }
  };

  const handleEdit = (index) => {
    const item = savedLinks[index];
    setSelectedOption(item.platform);
    setLink(item.url);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    setSavedLinks(savedLinks.filter((_, i) => i !== index));
    if (editIndex === index) {
      setSelectedOption('');
      setLink('');
      setEditIndex(null);
    }
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = savedLinks.map((item, i) =>
      i === index ? { ...item, url: value } : item
    );
    setSavedLinks(updatedLinks);
  };

  const handlePlatformChange = (index, value) => {
    const updatedLinks = savedLinks.map((item, i) =>
      i === index ? { ...item, platform: value } : item
    );
    setSavedLinks(updatedLinks);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        >
          <option value="">Select a platform</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button onClick={handleSave} style={{ padding: '10px' }}>
          {editIndex !== null ? 'Update' : 'Save'}
        </button>
      </div>

      <div>
        {savedLinks.map((item, index) => {
          const option = options.find(opt => opt.value === item.platform);
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <button onClick={() => handleRemove(index)} style={{ marginRight: '10px' }}>
                <FaTrash />
              </button>
              <select
                value={item.platform}
                onChange={(e) => handlePlatformChange(index, e.target.value)}
                style={{ padding: '10px', marginRight: '10px' }}
              >
                <option value="">Select a platform</option>
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={item.url}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                style={{ padding: '10px', marginRight: '10px' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trial;
