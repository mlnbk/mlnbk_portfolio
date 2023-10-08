import { Galaxy } from './types';

export const dynamicGalaxyPositions = (arrayLength: number) => {
  const positions = [];
  let radius = 0.3;
  let angleIncrement = (2.1 * Math.PI) / arrayLength;

  if (arrayLength === 1) {
    positions.push({ x: 0, y: 0, z: 0 });
    return positions;
  }

  if (arrayLength > 4) {
    radius = 0.35;
    angleIncrement = (2.15 * Math.PI) / (arrayLength - 1);
    positions.push({ x: 0, y: 0, z: 0 });
  }

  for (let i = 0; i < arrayLength; i++) {
    const angle = i * angleIncrement;

    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    positions.push({ x, y, z: 0 });
  }

  return positions;
};

export const galaxyOrbitSpeeds = [0.3, 0.25, 0.2, 0.3, 0.1];

export const galaxyScreenFactor = 0.0015;

export const planetPositions = [
  { x: 0.0369, y: 0.1368, z: -0.2367 },
  { x: -0.0963, y: 0.1962, z: 0.2961 },
  { x: 0.1701, y: -0.1962, z: 0.0369 },
  { x: -0.1296, y: 0.2367, z: -0.1962 },
  { x: 0.2367, y: -0.0369, z: 0.0963 },
];

export const planetScreenFactor = 0.0005;

export const maxPlanetRadius = 0.015;
export const maxStarRadius = 0.0015;

export const numOfStars = 80;

export const galaxyData: Galaxy[] = [
  {
    name: 'statistics',
    title: 'Statistics',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget turpis vel turpis efficitur bibendum. Proin viverra libero vitae suscipit.',
    projects: [
      {
        title: 'Project 1',
        description: 'Lorem ipsum dolor sit amet.',
      },
      {
        title: 'Project 2',
        description: 'Consectetur adipiscing elit.',
      },
    ],
  },
];
