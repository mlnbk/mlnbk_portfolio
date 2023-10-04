import { FC, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import Galaxy from '../Components/Galaxy';

type GalaxyPosition = { x: number; y: number; z: number };

const positions = [
  { x: -2, y: 1, z: 0 },
  { x: 2, y: 2, z: 0 },
  { x: -1.2, y: -2, z: 0 },
  { x: 1.8, y: -1, z: 0 },
  { x: 0, y: 0, z: 0 },
];
const Universe: FC = () => {
  const [galaxyPositions, setGalaxyPositions] = useState<GalaxyPosition[]>([]);

  const updateGalaxyPositions = () => {
    const screenFactor =
      Math.min(window.innerWidth, window.innerHeight) * 0.0015;
    setGalaxyPositions(
      positions.map((position) => ({
        x: position.x * screenFactor,
        y: position.y * screenFactor,
        z: position.z * screenFactor,
      })),
    );
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
            <Galaxy
              key={index}
              position={position}
              planets={Array.from({ length: 5 })}
              radius={0.45}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default Universe;
