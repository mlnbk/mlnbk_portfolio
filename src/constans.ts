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
    name: 'machine_learning',
    title: 'Machine Learning',
    description: 'Projects related to machine learning and data science.',
    projects: [
      {
        title: 'bulldozer_price',
        description:
          "Bulldozer price supervised learning time series data project based on the Complete Machine Learning & Data Science Bootcamp Udemy course's related section.",
      },
      {
        title: 'heart_disease',
        description:
          "Heart disease supervised learning classification project based on the Complete Machine Learning & Data Science Bootcamp Udemy course's related section.",
      },
      {
        title: 'neural_networks',
        description:
          "Neural networks (deep learning, transfer learning, TensorFlow 2) practice project based on the Complete Machine Learning & Data Science Bootcamp Udemy course's related section.",
      },
    ],
    color: { colorRep: 0xbeadfa }, // pastel purple
  },
  {
    name: 'lifestyle_travel',
    title: 'Lifestyle / Travel',
    description: 'Projects related to lifestyle and traveling.',
    projects: [
      {
        title: 'getaway-plan-react-client',
        description:
          'A React-based frontend for the GetawayPlan app, which allows users to plan their trips easily.',
      },
      {
        title: 'getaway-plan-api',
        description:
          'A Node.js-based API for the GetawayPlan app, which provides endpoints for user authentication, trip planning, and more.',
      },
      {
        title: 'getaway-plan-infrastructure',
        description:
          'Infrastructure for the getaway-plan-react-client and getaway-plan-api applications.',
      },
    ],
    color: { colorRep: 0x94a684 }, // green
  },
  {
    name: 'data_analysis',
    title: 'Data Analysis',
    description: 'Projects related to data analysis and data science.',
    projects: [
      {
        title: 'numpy_exercise',
        description:
          "Numpy exercise project based on the Complete Machine Learning & Data Science Bootcamp Udemy course's related section.",
      },
      {
        title: 'matplotlib_exercise',
        description:
          "Matplotlib exercise project based on the Complete Machine Learning & Data Science Bootcamp Udemy course's related section.",
      },
      {
        title: 'scikit_learn_exercise',
        description:
          "Scikit-Learn exercise project based on the Complete Machine Learning & Data Science Bootcamp Udemy course's related section.",
      },
    ],
    color: { colorRep: 0xea907a }, // pastel orange/red
  },
  {
    name: 'mobile_apps',
    title: 'Mobile Apps',
    description: 'Mobile app projects developed using Flutter & Dart.',
    projects: [
      {
        title: 'chat_app',
        description:
          "Chat app based on the Flutter & Dart - The Complete Guide Udemy course's related section.",
      },
      {
        title: 'favorite_places',
        description:
          "Favorite Places app based on the Flutter & Dart - The Complete Guide Udemy course's related section.",
      },
      {
        title: 'shopping_list',
        description:
          "Shopping list app based on the Flutter & Dart - The Complete Guide Udemy course's related section.",
      },
      {
        title: 'meals_app',
        description:
          "Meals app based on the Flutter & Dart - The Complete Guide Udemy course's related section.",
      },
      {
        title: 'expense_tracker',
        description:
          "Expense Tracker project based on the Flutter & Dart - The Complete Guide Udemy course's related section.",
      },
    ],
    color: { colorRep: 0x6096b4 }, // pastel blue
  },
];
