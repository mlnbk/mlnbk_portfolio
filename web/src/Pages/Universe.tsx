import { FC, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { isChrome } from 'react-device-detect';

import { galaxyData, galaxyOrbitSpeeds } from '../constans';
import { useGalaxyPositions } from '../Hooks/useGalaxyPositions';
import { useGithubActivity } from '../Hooks/useGithubActivities';

import ActivityList from '../Components/ActivityList';
import Footer from '../Components/Footer';
import Galaxy from '../Components/Galaxy';

// See issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1093055
const getUnit = () =>
  isChrome
    ? { width: 'w-screen', height: 'h-screen' }
    : { width: 'w-[100dvw]', height: 'h-[100dvh]' };

const Universe: FC = () => {
  const [limit, setLimit] = useState(20);
  const [hoveredGalaxy, setHoveredGalaxy] = useState<number | null>(null);
  const [showText, setShowText] = useState(false);
  const galaxyPositions = useGalaxyPositions();
  const { width, height } = getUnit();
  const { data, isLoading, error } = useGithubActivity(limit);

  const handleGalaxyHover = (index: number | null) => {
    setHoveredGalaxy(index);
  };

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className={`relative ${width} ${height} overflow-x-hidden`}>
      <div
        className={`absolute transform h-full w-full ${
          showText ? 'translate-y-4 opacity-100' : 'translate-y-1/2 opacity-0'
        } text-white text-center transition-all duration-3000 ease-in-out font-voyager`}
      >
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
          Cosmic Odyssey
        </h1>
        <p className="text-md md:text-lg lg:text-xl xl:text-2xl mt-4">
          Journey Through My Interests and Projects
        </p>
      </div>
      <div className="w-full h-[90vh]">
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
      </div>
      <ActivityList
        limit={limit}
        setLimit={setLimit}
        isLoading={isLoading}
        error={error}
        data={data}
      >
        <Footer />
      </ActivityList>
    </div>
  );
};

export default Universe;
