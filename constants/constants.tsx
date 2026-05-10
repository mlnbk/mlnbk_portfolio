import { HighlightedProject, PhysicalDevelopment } from '@Types/types';

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
  jobTitle: 'Software Engineer',
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
  ],
};

const artaBase = '/developments/arta-terme';

/**
 * Physical project copy: never add exact street addresses, condominium names, or unit IDs.
 * Optional `imageSrc` on each entry is the home grid hero strip.
 */
export const physicalDevelopments: PhysicalDevelopment[] = [
  {
    slug: 'arta-terme-apartment',
    title: 'Apartment in the Carnic Alps, Italy',
    description:
      'A small studio above Arta Terme in the Carnia region, still wearing its 1980s shell, opened toward light and the ridge. Calm finishes that belong to this valley, not a catalogue, and a plan that keeps daily life simple while the mountains stay in frame.',
    // imageSrc: `${artaBase}/livingroom_during.png`, // optional strip above title on home card
    tags: ['Carnia', 'Arta Terme', 'Studio', 'Renovation', '1980s → today'],
    detail: {
      regionIntro: [
        'Carnia belongs to the upper valleys of Friuli Venezia Giulia, where Italy tilts toward the Julian Alps and the border softens into forest and pasture. Towns sit in folds of the land, often built tight for winter, with stone and timber repeating until they feel less like style and more like habit.',
        'Life here moves between village streets and quiet interiors very quickly. Homes are expected to feel practical and calm, especially through winter. Honest materials and a window that truly opens to the mountains matter more than decorative finishes.',
        'Arta Terme sits inside that world, known for the thermal landscape and for how green presses close to the built edge. Studio flats here are honest about scale. The brief was not to pretend the rooms are large, but to make them legible, calm, and turned toward the view when the weather clears. Monte Zoncolan is a short drive when the snow is good, the Adriatic coast sits about an hour away when you want sea air, and Austria is within an hour in the other direction, so ski slopes, salt water, and border hills all stay part of ordinary weekends.',
      ],
      processStory: [
        'The studio arrived as one room still speaking the 1980s. Patterned floor, wood panelling, and a layout that hoarded the best light. The first move was to clear the noise and see what the space wanted to say about the view outside.',
        'The goal was to keep the regional character without turning it into a theme. Calm surfaces in the wet areas, one quiet floor tone through the living space, simple hardware, and a kitchen sized honestly for a studio.',
        'The middle months were dust and noise, then slowly each choice settled. An old shell always keeps a few secrets; the answers that mattered were the ones that felt right when you stood in the doorway with coffee, not the ones that looked tidy on paper.',
        'What landed is a compact home that opens to the treeline and the ridge, keeps daily rhythms within reach, and still offers a corner that feels removed when you want the day to stop at the door. Privacy stays tangible even when the view is wide.',
      ],
      processImages: [
        {
          src: `${artaBase}/livingroom_before.png`,
          alt: 'Studio dining area with patterned floor tiles and wood stove',
          caption:
            'The main room before the calm came back. Patterned tile underfoot, wood panelling, and the stove that already held winter evenings.',
        },
        {
          src: `${artaBase}/window_before.png`,
          alt: 'Original timber-framed balcony glazing before renovation',
          caption:
            'The old opening to the terrace before the new frame. The view was always there, waiting for the room to catch up.',
        },
        {
          src: `${artaBase}/bathroom_during.png`,
          alt: 'Bathroom mid renovation with walls stripped back',
          caption:
            'The smallest room mid clearing. Dust, narrow walls, and the feeling that you were peeling years off before anything new could speak.',
        },
        {
          src: `${artaBase}/bathroom_during_1.png`,
          alt: 'Bathroom during renovation with partial tiling and membrane',
          caption:
            'A middle moment in the wet room, still raw but already moving toward a calmer rhythm.',
        },
        {
          src: `${artaBase}/livingroom_during.png`,
          alt: 'Empty room with new pale wood flooring and white walls',
          caption:
            'Pale floor across the studio, walls returned to white. The silhouette of the flat finally matches how you move through it.',
        },
        {
          src: `${artaBase}/kitchen_during.png`,
          alt: 'Kitchen area during installation with black cabinetry',
          caption:
            'The kitchen taking shape in a compact line, sized to the studio instead of pretending to be larger than it is.',
        },
        {
          src: `${artaBase}/window_during.png`,
          alt: 'Glass door to balcony with mountain view beyond',
          caption:
            'The opening toward the terrace. The frame still rough, but the mountain already reads through the glass. This was always the reason for the flat.',
        },
        {
          src: `${artaBase}/livingroom_during_1.png`,
          alt: 'Living room during late renovation with new flooring and daylight',
          caption:
            'Late in the process, light starts to settle into the room and the new proportions finally feel natural.',
        },
      ],
      finalIntro:
        'When the wet room finally felt like one quiet breath instead of a checklist, the studio felt whole. Still small, still honest about its size, but settled.',
      finalImages: [
        {
          src: `${artaBase}/bathroom_done.png`,
          alt: 'Completed wet room with large beige tiles and black fixtures',
          caption:
            'The wet room as completed, seen from two angles. Quiet tones, clear lines, and a compact layout that feels calm rather than cramped.',
        },
        {
          src: `${artaBase}/bathroom_done_1.png`,
          alt: 'Completed wet room from alternate angle with black fixtures',
        },
      ],
    },
  },
];

/** Home grid: same entries as `physicalDevelopments` by default; use `.slice(0, n)` or a hand picked list if the landing should show fewer cards than you maintain in data. */
export const landingPhysicalHighlights: PhysicalDevelopment[] = physicalDevelopments;

export function getPhysicalDevelopmentBySlug(slug: string): PhysicalDevelopment | undefined {
  return physicalDevelopments.find((p) => p.slug === slug);
}
