import { FC, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { isChrome } from 'react-device-detect';

import { galaxyData, galaxyOrbitSpeeds } from '../constans';
import Galaxy from '../Components/Galaxy';
import { useGalaxyPositions } from '../Hooks/useGalaxyPositions';

// See issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1093055
const getUnit = () =>
  isChrome ? { unitX: 'vw', unitY: 'vh' } : { unitX: 'dvw', unitY: 'dvh' };

const Universe: FC = () => {
  const [hoveredGalaxy, setHoveredGalaxy] = useState<number | null>(null);
  const [showText, setShowText] = useState(false);
  const galaxyPositions = useGalaxyPositions();
  const { unitX, unitY } = getUnit();

  const handleGalaxyHover = (index: number | null) => {
    setHoveredGalaxy(index);
  };

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className={`relative w-[100${unitX}] h-[100${unitY}] overflow-hidden`}>
      <div
        className={`absolute transform h-full w-full ${
          showText ? 'translate-y-4 opacity-100' : 'translate-y-1/2 opacity-0'
        } text-white text-center transition-all duration-3000 ease-in-out font-futurism`}
      >
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
          Cosmic Odyssey
        </h1>
        <p className="text-md md:text-lg lg:text-xl xl:text-2xl mt-4">
          Journey Through My Interests and Projects
        </p>
      </div>
      <Canvas id="galaxy-canvas" camera={{ position: [0, 0, 1] }}>
        <ambientLight color={0xffffff} intensity={1} />
        {galaxyData.map((galaxy, index) => (
          <Galaxy
            key={index}
            id={galaxy.name}
            index={index}
            position={galaxyPositions[index]}
            galaxyData={galaxy}
            radius={0.1}
            speed={galaxyOrbitSpeeds[index]}
            starColor={galaxy.color.colorRep}
            isHovered={hoveredGalaxy === index}
            onHover={() => handleGalaxyHover(index)}
            onUnhover={() => handleGalaxyHover(null)}
          />
        ))}
      </Canvas>
      <footer className="absolute bottom-0 left-0 w-full text-sm text-gray-500 text-center p-4">
        <p>
          © 2023
          {' | '}
          <a
            href="https://github.com/mlnbk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            mlnbk
          </a>
        </p>
        <div className="flex items-center justify-center">
          This project is available on
          <Link to="https://github.com/mlnbk/mlnbk_portfolio">
            <BsGithub size={20} className="ml-2" />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Universe;
