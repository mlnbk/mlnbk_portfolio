import { FC, ReactNode } from 'react';
import dayjs from 'dayjs';

import { DisplayedActivity } from '../types';
import LimitDropdown from './LimitDropdown';

interface ActivityListProps {
  limit: number;
  setLimit: (limit: number) => void;
  isLoading: boolean;
  error: any;
  data?: DisplayedActivity[];
  children: ReactNode;
}

const ActivityList: FC<ActivityListProps> = ({
  limit,
  setLimit,
  isLoading,
  error,
  data,
  children,
}) => {
  return (
    <div
      className="
          sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]
          mx-auto px-4 pt-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8 xl:px-10 xl:pt-10
          rounded-t-lg
          bg-gray-900
          text-left text-gray-100
        "
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Cosmic Activities</h2>
        <LimitDropdown
          selectedLimit={limit}
          limits={[10, 20, 50, 100]}
          onChange={(newLimit) => setLimit(newLimit)}
        />
      </div>
      <p className="text-lg text-gray-400 mb-8">
        Witness how the universe unfolds its wonders with amazing events
        happening regularly.
      </p>
      {isLoading ? (
        <div className="flex justify-center items-center text-gray-500">
          Loading...
        </div>
      ) : error ? (
        <div className="flex justify-center items-center text-gray-500">
          Error: {String(error)}
        </div>
      ) : (
        <div className="grid grid-flow-row divide-y">
          {data?.map((activity, index) => (
            <div>
              <div key={index} className="py-4 px-2 rounded-lg">
                <div className="flex justify-between text-center">
                  <h3 className="text-xl font-semibold capitalize">
                    {activity.emoji} {activity.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {dayjs(activity.created_at).format('DD MMM YYYY, HH[h]')}
                  </p>
                </div>
                <p className="text-gray-500 mt-2 first-letter:uppercase">
                  {activity.description} the{' '}
                  <a
                    href={activity.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    {activity.repoName}
                  </a>{' '}
                  repository.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};

export default ActivityList;
