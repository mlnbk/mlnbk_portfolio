import { FC } from 'react';

interface PlanetProps {
  name: string;
  description: string;
}

const Planet: FC<PlanetProps> = ({ name, description }) => {
  return (
    <div>
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
};

export default Planet;
