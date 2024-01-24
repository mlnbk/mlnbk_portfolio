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
          flex gap-1 px-2 py-1 items-center
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          cursor-pointer z-50
        "
      >
        {selected}
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </button>
      {isOpen && (
        <ul
          className="
          absolute w-full mt-1
          bg-gray-700 border-gray-300 rounded-md 
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
          cursor-pointer z-50
          "
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleChange(option)}
              className={`
              rounded-md px-2 py-1
              ${selected === option ? 'bg-indigo-500' : 'hover:bg-gray-600'}`}
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
