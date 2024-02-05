/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  DisplayedActivity,
  getGithubActivityDetails,
  GithubActivityResponse,
} from '../types';

export const useGithubActivity = (limit = 20) => {
  const [data, setData] = useState<DisplayedActivity[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/github-activities?limit=${limit}`,
        );
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Too many requests. Please try again later.');
          }
          throw new Error(
            `Failed to fetch activities. Please try again later.`,
          );
        }
        const data: GithubActivityResponse = await response.json();
        setData(
          data.map((activity) => ({
            created_at: activity.created_at,
            repoName: activity.repo.name.split('/')[1],
            repoUrl: activity.repo.url,
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
  }, [limit]);

  return { data, isLoading, error };
};
