import Link from 'next/link';

import { PhysicalDevelopment } from '@Types/types';

const PhysicalDevelopmentCard = ({
  slug,
  title,
  description,
  tags,
  imageSrc,
}: PhysicalDevelopment) => {
  return (
    <Link
      href={`/developments/${slug}`}
      className='
        group flex h-full flex-col border border-gray-200 transition-colors
        duration-300 ease-in-out hover:border-gray-400
        dark:border-gray-800 dark:hover:border-gray-700
      '
    >
      {imageSrc ? (
        <div className='flex h-36 w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800 md:h-40'>
          <img
            src={imageSrc}
            alt={title}
            className='max-h-full w-full object-cover object-center'
          />
        </div>
      ) : null}
      <div className='flex flex-1 flex-col justify-between p-6 md:p-8'>
        <div className='mb-6'>
          <h3 className='mb-3 text-xl font-light text-gray-900 transition-colors group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300 md:text-2xl'>
            {title}
          </h3>
          <p className='text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400 md:text-base'>
            {description}
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          {tags.map((tag, index) => (
            <span key={index} className='text-xs font-light text-gray-500 dark:text-gray-400'>
              {tag}
              {index < tags.length - 1 && <span className='mx-1.5'>·</span>}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PhysicalDevelopmentCard;
