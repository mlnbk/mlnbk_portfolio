import { HighlightedProject } from '@Types/types';

export const landingHighlightProjects: HighlightedProject[] = [
  {
    name: 'Property Analyzer',
    link: 'https://property.mlnbk.com',
    technologies: ['React', 'NestJS', 'Python'],
  },
];

export const languages = ['TypeScript', 'JavaScript', 'Python', 'Dart'];

export const frameworks = [
  'React',
  'React Native',
  'Next.js',
  'NestJS',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Stripe',
  'Firebase',
  'Google Maps API',
  'AWS',
];

// Structured data for SEO
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Milan Bako',
  jobTitle: 'Senior Software Engineer & Team Lead',
  url: 'https://mlnbk.com',
  sameAs: ['https://www.linkedin.com/in/milan-bako', 'https://github.com/mlnbk'],
  email: 'dev.milan.bako@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vienna',
    addressCountry: 'AT',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'corplife GmbH',
  },
  knowsAbout: [
    'TypeScript',
    'JavaScript',
    'React',
    'React Native',
    'Next.js',
    'NestJS',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'Software Engineering',
    'Team Leadership',
  ],
};
