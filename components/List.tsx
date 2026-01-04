import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  rightElement?: JSX.Element;
  isLoading?: boolean;
  error?: string;
  title: string;
  description?: string;
}

const List = ({ children, rightElement, isLoading, error, title, description }: ListProps) => {
  return (
    <section className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='mb-2 text-3xl font-light text-gray-900 md:text-4xl dark:text-gray-100'>
            {title}
          </h2>
          {description && (
            <p className='text-base font-light text-gray-600 md:text-lg dark:text-gray-400'>
              {description}
            </p>
          )}
        </div>
        {rightElement}
      </div>
      {isLoading ? (
        <div className='flex items-center justify-center py-12 text-gray-400 dark:text-gray-500'>
          <span className='font-light'>Loading...</span>
        </div>
      ) : error ? (
        <div className='flex items-center justify-center py-12 text-gray-400 dark:text-gray-500'>
          <span className='font-light'>{error}</span>
        </div>
      ) : (
        <div className='space-y-0 divide-y divide-gray-200 dark:divide-gray-800'>{children}</div>
      )}
    </section>
  );
};

export default List;
