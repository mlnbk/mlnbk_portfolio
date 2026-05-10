import { PhysicalDevelopment } from '@Types/types';

import PhysicalDevelopmentCard from '@Components/PhysicalDevelopmentCard';

type HighlightedPhysicalProjectsProps = {
  projects: PhysicalDevelopment[];
};

const HighlightedPhysicalProjects = ({ projects }: HighlightedPhysicalProjectsProps) => {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className='space-y-8'>
      <h2 className='text-3xl font-light text-gray-900 dark:text-gray-100 md:text-4xl'>
        Renovations & build
      </h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
        {projects.map((project, index) => (
          <PhysicalDevelopmentCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default HighlightedPhysicalProjects;
