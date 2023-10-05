import { FC, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import {
  galaxyOrbitSpeeds,
  galaxyScreenFactor,
  galaxyPositions as positions,
} from '../constans';
import Galaxy from '../Components/Galaxy';

type GalaxyPosition = { x: number; y: number; z: number };

const Universe: FC = () => {
  const [galaxyPositions, setGalaxyPositions] = useState<GalaxyPosition[]>([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  const updateGalaxyPositions = () => {
    const screenFactor =
      Math.min(window.innerWidth, window.innerHeight) * galaxyScreenFactor;
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
      <div
        className={`absolute transform h-full w-full ${
          showText ? 'translate-y-4 opacity-100' : 'translate-y-1/2 opacity-0'
        } text-white text-center transition-all duration-3000 ease-in-out`}
      >
        <h1 className="text-5xl font-extrabold">Cosmic Odyssey</h1>
        <p className="text-xl mt-4">
          Journey Through My Interests and Projects
        </p>
      </div>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <group>
          {galaxyPositions.map((position, index) => (
            <Galaxy
              key={index}
              position={position}
              planets={Array.from({ length: 5 })}
              radius={0.1}
              speed={galaxyOrbitSpeeds[index]}
            />
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default Universe;
