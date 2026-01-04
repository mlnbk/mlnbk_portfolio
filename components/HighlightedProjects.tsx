import { HighlightedProject } from '@Types/types';

import Card from './Card';

type HighlightedProjectsProps = {
  projects: HighlightedProject[];
};

const HighlightedProjects = ({ projects }: HighlightedProjectsProps) => {
  return (
    <section className='space-y-8'>
      <h2 className='text-3xl font-light text-gray-900 dark:text-gray-100 md:text-4xl'>
        Featured Projects
      </h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
        {projects.map((project, index) => (
          <Card
            key={index}
            name={project.name}
            link={project.link}
            technologies={project.technologies}
          />
        ))}
      </div>
    </section>
  );
};

export default HighlightedProjects;
