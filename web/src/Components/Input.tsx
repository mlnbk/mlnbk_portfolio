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
    w-full
    px-4 py-3
    bg-white border border-gray-300 text-gray-900
    placeholder-gray-400
    focus:outline-none focus:border-gray-900
    transition-colors duration-200
    font-light
    ${error && 'border-red-500'}
    ${textarea ? 'min-h-[120px] resize-y' : ''}
  `;

  return (
    <div className="flex flex-col gap-2">
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
      {error && (
        <span className="text-sm text-red-600 font-light">{error}</span>
      )}
    </div>
  );
};

export default Input;
