import { FC } from 'react';

interface StarProps {
  name: string;
  description: string;
}

const Star: FC<StarProps> = ({ name, description }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Star;
