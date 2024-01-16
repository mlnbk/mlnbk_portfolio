import { useState, useEffect } from 'react';
import {
  DisplayedActivity,
  getGithubActivityDetails,
  GithubActivityResponse,
} from '../types';

export const useGithubActivity = () => {
  const [data, setData] = useState<DisplayedActivity[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log(`${process.env.REACT_APP_API_BASE_URL}/github-activities`);
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/github-activities`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GithubActivityResponse = await response.json();
        setData(
          data.map((activity) => ({
            created_at: activity.created_at,
            repoName: activity.repo.name,
            ...getGithubActivityDetails(activity.type, activity.payload.action),
          })),
        );
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
