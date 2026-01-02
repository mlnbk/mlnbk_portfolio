'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface DropdownProps {
  selected: number;
  options: number[];
  onChange: (newValue: number) => void;
}

const Dropdown: FC<DropdownProps> = ({ selected, options, onChange }) => {
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex gap-2 px-4 py-2 items-center
          border border-gray-300 bg-white
          focus:outline-none focus:border-gray-900
          cursor-pointer z-50
          text-sm font-light
          transition-colors
          hover:border-gray-400
        "
      >
        <span>Show {selected}</span>
        {isOpen ? <BsChevronUp size={14} /> : <BsChevronDown size={14} />}
      </button>
      {isOpen && (
        <ul
          className="
          absolute right-0 mt-1 w-32
          bg-white border border-gray-300
          shadow-lg
          cursor-pointer z-50
          "
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
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
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
