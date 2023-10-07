import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

const GalaxyDetails: FC = () => {
  const { galaxyName } = useParams<{ galaxyName: string }>();

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute w-full pt-4 text-white text-center font-futurism">
        <Link to="/">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
            Cosmic Odyssey
          </h1>
        </Link>
      </div>
      {/* <h2>{selectedGalaxy.name}</h2>
      <p>{selectedGalaxy.description}</p> */}
    </div>
  );
};

export default GalaxyDetails;
