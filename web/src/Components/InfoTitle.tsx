import { FC } from 'react';
import { TypeAnimation } from 'react-type-animation';

const InfoTitle: FC = () => {
  return (
    <div
      className={`
        absolute
        font-voyager
        text-white text-left
        border-l-2
        px-2 mx-4 md:mx-6 lg:mx-8 mt-4 md:mt-8 lg:mt-16
      `}
    >
      <TypeAnimation
        wrapper={'h1'}
        className="text-sm lg:text-lg xl:text-xl font-extrabold"
        cursor={false}
        omitDeletionAnimation
        sequence={[2000, 'Milan Bako']}
        speed={2}
      />
      <TypeAnimation
        wrapper={'p'}
        className="text-sm lg:text-lg xl:text-xl"
        cursor={false}
        omitDeletionAnimation
        sequence={[3000, 'Software Engineer']}
        speed={2}
      />
    </div>
  );
};

export default InfoTitle;
