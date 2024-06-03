import { GiRank1, GiRank2, GiRank3 } from 'react-icons/gi';

import { Galaxy, HighlightedProject } from './types';

export const dynamicGalaxyPositions = (arrayLength: number) => {
  const positions = [];
  let radius = 0.37;
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

export const planetScreenFactor = 0.00075;

export const maxPlanetRadius = 0.02;
export const maxStarRadius = 0.001;

export const numOfStars = 350;

export const galaxyData: Galaxy[] = [
  {
    name: 'ml-data-science',
    title: 'ML & Data Science',
    description: 'Projects related to data data science and machine learning.',
    projects: ['bulldozer_price', 'heart_disease', 'neural_networks'],
    color: { colorRep: 0xea907a }, // pastel orange/red
  },
  {
    name: 'lifestyle-travel',
    title: 'Lifestyle',
    description: 'Projects related to lifestyle and traveling.',
    projects: [
      'mlnbk_portfolio',
      'getaway-plan-react-client',
      'getaway-plan-api',
      'getaway-plan-infrastructure',
    ],
    color: { colorRep: 0x94a684 }, // green
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

export const landingHighlightProjects: HighlightedProject[] = [
  {
    name: 'Portfolio Project',
    link: 'https://github.com/mlnbk/mlnbk_portfolio',
    technologies: ['React', 'Three.js', 'TypeScript'],
  },
  {
    name: 'Property Analyzer',
    link: 'https://property.mlnbk.com',
    technologies: ['React', 'NestJS', 'Python'],
  },
];

export const highlightedProjects: { [key: string]: HighlightedProject[] } = {
  'ml-data-science': [
    {
      name: 'Farming Data Analysis',
      link: 'https://github.com/balazs-szabo99/farming-climate-change',
      technologies: ['React', 'Chart.js', 'Python'],
    },
    {
      name: 'Bulldozer Price',
      link: 'https://github.com/mlnbk/bulldozer_price',
      technologies: ['Regression', 'SKLearn', 'Pandas'],
    },
    {
      name: 'Heart Disease',
      link: 'https://github.com/mlnbk/heart_disease',
      technologies: ['Classification', 'SKLearn', 'Pandas'],
    },
  ],
  'lifestyle-travel': [landingHighlightProjects[0]],
  'mobile-apps': [
    landingHighlightProjects[2],
    {
      name: 'Favourite Places',
      link: 'https://github.com/mlnbk/favorite_places',
      technologies: ['Flutter', 'Google Maps', 'SQLite'],
    },
  ],
};

export const languages = [
  { name: 'TypeScript', icon: <GiRank3 /> },
  { name: 'JavaScript', icon: <GiRank3 /> },
  { name: 'Python', icon: <GiRank2 /> },
  { name: 'Dart', icon: <GiRank1 /> },
];
export const frameworks = [
  { name: 'React', icon: <GiRank3 /> },
  { name: 'Next.js', icon: <GiRank3 /> },
  { name: 'NestJS', icon: <GiRank3 /> },
  { name: 'Node.js', icon: <GiRank3 /> },
  { name: 'Flask', icon: <GiRank2 /> },
  { name: 'Flutter', icon: <GiRank1 /> },
];
