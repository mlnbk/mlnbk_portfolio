import { FC, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Galaxy from '../Components/Galaxy';

type GalaxyPosition = { x: number; y: number; z: number };

const Universe: FC = () => {
  const [galaxyPositions, setGalaxyPositions] = useState<GalaxyPosition[]>([]);

  const updateGalaxyPositions = () => {
    const screenFactor =
      Math.min(window.innerWidth, window.innerHeight) * 0.001;
    setGalaxyPositions([
      { x: -2 * screenFactor, y: 0, z: 0 },
      { x: 2 * screenFactor, y: 0, z: 0 },
    ]);
  };

  useEffect(() => {
    updateGalaxyPositions();

    window.addEventListener('resize', updateGalaxyPositions);

    return () => {
      window.removeEventListener('resize', updateGalaxyPositions);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="text-white">Welcome to My Coding Universe!</div>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <group>
          {galaxyPositions.map((position, index) => (
            <Galaxy key={index} position={position} />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default Universe;
