import { FC } from 'react';

import { HighlightedProject } from '@Types/types';

const Card: FC<HighlightedProject> = ({ name, link, technologies }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div
        className="
          p-6 md:p-8
          border border-gray-200
          hover:border-gray-400
          transition-all duration-300 ease-in-out
          h-full
          flex flex-col justify-between
        "
      >
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
            {name}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span key={index} className="text-xs text-gray-500 font-light">
              {tech}
              {index < technologies.length - 1 && (
                <span className="mx-1.5">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Card;
