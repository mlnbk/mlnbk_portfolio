import { FC } from 'react';

import Star from './Star';
// import Planet from './Planet';

interface GalaxyProps {
  name: string;
}

const Galaxy: FC<GalaxyProps> = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h3>Stars:</h3>
      <Star name={'Project 1'} description={'Description 1'} />
      <Star name={'Project 2'} description={'Description 2'} />
      {/* <h3>Planets:</h3>
      <Planet name={'Project 3'} description={'Description 3'} />
      <Planet name={'Project 4'} description={'Description 4'} /> */}
    </div>
  );
};

export default Galaxy;
