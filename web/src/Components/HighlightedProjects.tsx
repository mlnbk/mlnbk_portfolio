import { FC } from 'react';
import Card from './Card';

type Project = {
  name: string;
  link: string;
  technologies: string[];
};

type HighlightedProjectsProps = {
  projects: Project[];
};

const HighlightedProjects: FC<HighlightedProjectsProps> = ({ projects }) => {
  return (
    <div className="px-4 md:p-0 select-none">
      <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold mb-4 text-white text-start">
        Highlighted Projects
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            name={project.name}
            link={project.link}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
};

export default HighlightedProjects;
