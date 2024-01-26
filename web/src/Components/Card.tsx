import { FC } from 'react';

interface CardProps {
  name: string;
  link: string;
  technologies: string[];
}

const Card: FC<CardProps> = ({ name, link, technologies }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div
        className="
          bg-gradient-to-br
          from-gray-900
          via-gray-800
          to-gray-900
          p-4 md:p-6 lg:p-8
          rounded-lg shadow-lg
          text-white text-left
          w-full min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem]
          flex flex-col justify-between
          transition-all duration-100 ease-in-out
          border-2 border-transparent
          hover:from-gray-800 hover:via-gray-900 hover:to-gray-800 hover:border-blue-500 hover cursor-pointer
        "
      >
        <div className="flex flex-col justify-center h-full">
          <div className="text-2xl md:text-3xl lg:text-4xl font-bold justify-center">
            {name}
          </div>
        </div>
        <div
          className="
            flex flex-col md:flex-row
            justify-center
            text-xs 2xl:text-base
          "
        >
          {technologies.map((tech, index) => (
            <span key={index} className="md:flex">
              {tech}
              <span
                className={`${
                  index < technologies.length - 1 && `mx-1`
                } hidden md:block`}
              >
                {index < technologies.length - 1 && <>•</>}
              </span>
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Card;
