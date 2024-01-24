import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { isChrome } from 'react-device-detect';

import { galaxyData, galaxyOrbitSpeeds } from '../constans';
import { useGalaxyPositions } from '../Hooks/useGalaxyPositions';

import ActivityList from '../Components/ActivityList';
import Footer from '../Components/Footer';
import Galaxy from '../Components/Galaxy';
import InfoTitle from '../Components/InfoTitle';

// See issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1093055
const getUnit = () =>
  isChrome
    ? { width: 'w-screen', height: 'h-screen' }
    : { width: 'w-[100dvw]', height: 'h-[100dvh]' };

const Universe: FC = () => {
  const galaxyPositions = useGalaxyPositions();
  const { width, height } = getUnit();

  return (
    <div className={`relative ${width} ${height} overflow-x-hidden`}>
      <InfoTitle />
      <div className="w-full h-[85vh]">
        <Canvas id="galaxy-canvas" camera={{ position: [0, 0, 1] }}>
          <ambientLight color={0xffffff} intensity={1} />
          {galaxyData.map((galaxy, index) => (
            <Galaxy
              key={index}
              id={galaxy.name}
              index={index}
              position={galaxyPositions[index]}
              galaxyData={galaxy}
              speed={galaxyOrbitSpeeds[index]}
              starColor={galaxy.color.colorRep}
            />
          ))}
        </Canvas>
      </div>
      <ActivityList>
        <Footer />
      </ActivityList>
    </div>
  );
};

export default Universe;
