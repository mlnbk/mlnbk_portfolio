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
    <div
      className="
          px-4 pt-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8 xl:px-10 xl:pt-10
          rounded-t-lg
          bg-gray-900
          text-left text-gray-100
        "
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {title}
        </h2>
        {rightElement}
      </div>
      {description && (
        <p className="text-sm md:text-base lg:text-lg text-gray-400 mb-4 md:mb-6 lg:mb-8">
          {description}
        </p>
      )}
      {isLoading ? (
        <div className="flex justify-center items-center text-gray-500">
          Loading...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-gray-500">
          {error}
        </div>
      ) : (
        <div className="grid grid-flow-row divide-y">{children}</div>
      )}
    </div>
  );
};

export default List;
