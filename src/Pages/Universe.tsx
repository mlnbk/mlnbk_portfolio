import { FC } from 'react';

import Galaxy from '../Components/Galaxy';

const Universe: FC = () => {
  return (
    <div>
      <h1>Welcome to My Coding Universe!</h1>
      <Galaxy name="Galaxy 1" />
      {/* Add more galaxies as needed */}
    </div>
  );
};

export default Universe;
