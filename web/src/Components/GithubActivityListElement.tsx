import dayjs from 'dayjs';
import { FC } from 'react';
import { DisplayedActivity } from '../types';

interface GithubActivityListElementProps {
  activity: DisplayedActivity;
  index: number;
}

const GithubActivityListElement: FC<GithubActivityListElementProps> = ({
  activity,
  index,
}) => {
  return (
    <div>
      <div key={index} className="py-4 rounded-lg">
        <div className="flex justify-between">
          <h3 className="text-base md:text-lg font-semibold capitalize text-left">
            {activity.emoji} {activity.title}
          </h3>
          <p className="text-sm text-gray-500 text-right self-center">
            {dayjs(activity.created_at).format('DD MMM YYYY, HH[h]')}
          </p>
        </div>
        <p className="text-gray-500 mt-2 first-letter:uppercase text-sm md:text-base">
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
  );
};

export default GithubActivityListElement;
