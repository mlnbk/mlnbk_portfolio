import { useState, useEffect } from 'react';

import {
  dynamicGalaxyPositions,
  galaxyData,
  galaxyScreenFactor,
} from '../constans';

type GalaxyPosition = { x: number; y: number; z: number };

export const useGalaxyPositions = () => {
  const [galaxyPositions, setGalaxyPositions] = useState<GalaxyPosition[]>([]);

  const updateGalaxyPositions = () => {
    const screenFactor =
      Math.min(window.innerWidth, window.innerHeight) * galaxyScreenFactor;
    const positions = dynamicGalaxyPositions(galaxyData.length);
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
  }, [galaxyData.length, galaxyScreenFactor]);

  return galaxyPositions;
};
