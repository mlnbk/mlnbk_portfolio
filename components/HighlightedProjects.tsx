import { FC } from 'react';
import Card from './Card';
import { HighlightedProject } from '@Types/types';

type HighlightedProjectsProps = {
  projects: HighlightedProject[];
};

const HighlightedProjects: FC<HighlightedProjectsProps> = ({ projects }) => {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl md:text-4xl font-light text-gray-900">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
