import { useState, useEffect } from 'react';

import {
  dynamicGalaxyPositions,
  galaxyData,
  galaxyScreenFactor,
} from '../constants';

type GalaxyPosition = { x: number; y: number; z: number };

export const useGalaxyPositions = () => {
  const [galaxyPositions, setGalaxyPositions] = useState<GalaxyPosition[]>([]);
  const widthFactor =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 0.9 : 0.7;

  const updateGalaxyPositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenFactor = Math.min(width, height) * galaxyScreenFactor;
    const screenFactorX = width * widthFactor * galaxyScreenFactor;
    const screenFactorY = height * 0.8 * galaxyScreenFactor;

    const positions = dynamicGalaxyPositions(galaxyData.length);
    setGalaxyPositions(
      positions.map((position) => ({
        x: position.x * screenFactorX,
        y: position.y * screenFactorY,
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
