'use client';

import { useEffect, useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface DropdownProps {
  selected: number;
  options: number[];
  onChange: (newValue: number) => void;
}

const Dropdown = ({ selected, options, onChange }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleChange = (newValue: number) => {
    onChange(newValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='
          z-50 flex cursor-pointer items-center gap-2
          border border-gray-300 bg-white
          px-4 py-2
          text-sm font-light
          transition-colors hover:border-gray-400
          focus:border-gray-900
          focus:outline-none
          dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:focus:border-gray-500
        '
      >
        <span>Show {selected}</span>
        {isOpen ? <BsChevronUp size={14} /> : <BsChevronDown size={14} />}
      </button>
      {isOpen && (
        <ul
          className='
          absolute right-0 z-50 mt-1
          w-32 cursor-pointer border
          border-gray-300
          bg-white shadow-lg
          dark:border-gray-700 dark:bg-gray-800
          '
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleChange(option)}
              className={`
              px-4 py-2
              text-sm font-light
              transition-colors
              ${
                selected === option
                  ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
