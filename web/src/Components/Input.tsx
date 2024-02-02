import { FC } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputProps = {
  name: string;
  register: UseFormRegister<FieldValues>;
  registerOptions?: RegisterOptions;
  placeholder: string;
  error?: string;
  textarea?: boolean;
};

const Input: FC<InputProps> = ({
  register,
  registerOptions,
  name,
  placeholder,
  error,
  textarea,
}) => {
  const classNames = `
    px-4 py-2
    bg-gray-900 bg-opacity-80 border border-white rounded-lg text-white 
    hover:border-sky-900
    focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent
    transition-all duration-200 ease-in-out
    ${error && 'border-red-500'}
  `;

  return (
    <div className="flex flex-col gap-1">
      {textarea ? (
        <textarea
          {...register(name, registerOptions)}
          placeholder={placeholder}
          className={classNames}
        />
      ) : (
        <input
          {...register(name, registerOptions)}
          placeholder={placeholder}
          className={classNames}
        />
      )}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
