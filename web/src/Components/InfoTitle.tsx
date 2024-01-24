import { FC } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface InfoTitleProps {
  title?: string;
  details?: string[];
}

const InfoTitle: FC<InfoTitleProps> = ({ details, title }) => {
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
      {title && (
        <TypeAnimation
          wrapper={'h1'}
          className="text-sm lg:text-lg xl:text-xl font-extrabold"
          cursor={false}
          omitDeletionAnimation
          sequence={[1500, `${title}`]}
          speed={2}
        />
      )}
      {details &&
        details.map((detail) => (
          <TypeAnimation
            wrapper={'p'}
            className="text-sm lg:text-lg xl:text-xl"
            cursor={false}
            omitDeletionAnimation
            sequence={[2500, `${detail}`]}
            speed={2}
          />
        ))}
    </div>
  );
};

export default InfoTitle;
