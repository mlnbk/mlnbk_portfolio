import { useState, useEffect } from 'react';

import { GithubProject } from '../types';

const useGithubProjects = (projectNames: string[]) => {
  const [projects, setProjects] = useState<GithubProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsDataResponse = await Promise.all(
          projectNames.map((name) =>
            fetch(`https://api.github.com/repos/mlnbk/${name}`),
          ),
        );

        const responseError = projectsDataResponse.find((resp) => !resp.ok);
        if (responseError) {
          throw new Error(`HTTP error! status: ${responseError.status}`);
        }
        const data = [];
        for await (const response of projectsDataResponse) {
          data.push(await response.json());
        }
        setProjects(
          data.map((d) => ({
            name: d.name,
            html_url: d.html_url,
            description: d.description,
          })),
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [projectNames]);

  return { projects, loading };
};

export default useGithubProjects;
