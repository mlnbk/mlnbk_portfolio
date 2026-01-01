import { FC, ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  rightElement?: JSX.Element;
  isLoading?: boolean;
  error?: string;
  title: string;
  description?: string;
}

const List: FC<ListProps> = ({
  children,
  rightElement,
  isLoading,
  error,
  title,
  description,
}) => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
            {title}
          </h2>
          {description && (
            <p className="text-base md:text-lg text-gray-600 font-light">
              {description}
            </p>
          )}
        </div>
        {rightElement}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center text-gray-400 py-12">
          <span className="font-light">Loading...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-gray-400 py-12">
          <span className="font-light">{error}</span>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-gray-200">{children}</div>
      )}
    </section>
  );
};

export default List;
