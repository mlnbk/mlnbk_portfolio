import { FC } from 'react';

interface LabelProperties {
  text: string;
  icon?: JSX.Element;
  colorScheme?: 'default' | 'secondary';
}

const Label: FC<LabelProperties> = ({ colorScheme, text, icon }) => {
  const colors = colorScheme === 'secondary' ? 'bg-sky-900' : 'bg-blue-900';

  return (
    <div
      className={`
        flex gap-2 items-center w-min
        ${colors}
        text-sm md:text-base
        py-1 px-2 md:px-3 
        rounded-lg shadow-lg
        border-2 border-transparent
      `}
    >
      {text}
      {icon}
    </div>
  );
};

export default Label;
