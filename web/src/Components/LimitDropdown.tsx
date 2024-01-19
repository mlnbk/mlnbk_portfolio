import { FC, useEffect, useRef, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

interface LimitDropdownProps {
  selectedLimit: number;
  limits: number[];
  onChange: (limit: number) => void;
}

const LimitDropdown: FC<LimitDropdownProps> = ({
  selectedLimit,
  limits,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleLimitChange = (limit: number) => {
    onChange(limit);
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
        {selectedLimit}
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
          {limits.map((limit) => (
            <li
              key={limit}
              onClick={() => handleLimitChange(limit)}
              className={`
              rounded-md px-2 py-1
              ${
                selectedLimit === limit ? 'bg-indigo-500' : 'hover:bg-gray-600'
              }`}
            >
              {limit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LimitDropdown;
