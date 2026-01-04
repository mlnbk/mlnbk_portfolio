import { HighlightedProject } from '@Types/types';

const Card = ({ name, link, technologies }: HighlightedProject) => {
  return (
    <a href={link} target='_blank' rel='noopener noreferrer' className='group block'>
      <div
        className='
          flex h-full
          flex-col justify-between
          border
          border-gray-200 p-6 transition-all
          duration-300
          ease-in-out hover:border-gray-400 
          dark:border-gray-800 dark:hover:border-gray-700 md:p-8
        '
      >
        <div className='mb-6'>
          <h3 className='mb-2 text-xl font-light text-gray-900 transition-colors group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300 md:text-2xl'>
            {name}
          </h3>
        </div>
        <div className='flex flex-wrap gap-2'>
          {technologies.map((tech, index) => (
            <span key={index} className='text-xs font-light text-gray-500 dark:text-gray-400'>
              {tech}
              {index < technologies.length - 1 && <span className='mx-1.5'>·</span>}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default Card;
