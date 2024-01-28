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

export const galaxyScreenFactor = 0.0017;

export const planetPositions = [
  { x: 0.0369, y: 0.1368, z: -0.2367 },
  { x: -0.0963, y: 0.1962, z: 0.2961 },
  { x: 0.1701, y: -0.1962, z: 0.0369 },
  { x: -0.1296, y: 0.2367, z: -0.1962 },
  { x: 0.2367, y: -0.0369, z: 0.0963 },
];

export const planetScreenFactor = 0.0005;

export const maxPlanetRadius = 0.02;
export const maxStarRadius = 0.001;

export const numOfStars = 350;

export const galaxyData: Galaxy[] = [
  {
    name: 'machine-learning',
    title: 'Machine Learning',
    description: 'Projects related to machine learning and data science.',
    projects: ['bulldozer_price', 'heart_disease', 'neural_networks'],
    color: { colorRep: 0xbeadfa }, // pastel purple
  },
  {
    name: 'lifestyle-travel',
    title: 'Lifestyle',
    description: 'Projects related to lifestyle and traveling.',
    projects: [
      'getaway-plan-react-client',
      'getaway-plan-api',
      'getaway-plan-infrastructure',
    ],
    color: { colorRep: 0x94a684 }, // green
  },
  {
    name: 'data-analysis',
    title: 'Data Analysis',
    description: 'Projects related to data analysis and data science.',
    projects: [
      'numpy_exercise',
      'matplotlib_exercise',
      'scikit_learn_exercise',
    ],
    color: { colorRep: 0xea907a }, // pastel orange/red
  },
  {
    name: 'mobile-apps',
    title: 'Mobile Apps',
    description: 'Mobile app projects developed using Flutter & Dart.',
    projects: [
      'chat_app',
      'favorite_places',
      'shopping_list',
      'meals_app',
      'expense_tracker',
    ],
    color: { colorRep: 0x6096b4 }, // pastel blue
  },
];
