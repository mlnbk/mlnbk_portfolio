import { FC } from 'react';
import Card from './Card';
import { HighlightedProject } from '../types';

type HighlightedProjectsProps = {
  projects: HighlightedProject[];
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
        {projects.length % 2 !== 0 && (
          <div
            className="
              p-4 md:p-6 lg:p-8
              rounded-lg shadow-lg
              text-white text-left
              w-full min-h-[10rem] md:min-h-[12rem] lg:min-h-[14rem]
              flex flex-col
              justify-center
              text-xs 2xl:text-base font-medium
              block md:hidden
            "
          >
            And many more to find under the specific galaxies...
          </div>
        )}
      </div>
    </div>
  );
};

export default HighlightedProjects;
