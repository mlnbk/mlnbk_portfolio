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
    <div key={index} className="py-6 md:py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
        <div className="flex-1">
          <h3 className="text-base md:text-lg font-light text-gray-900 capitalize mb-2">
            {activity.emoji} {activity.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 font-light first-letter:uppercase">
            {activity.description} the{' '}
            <a
              href={activity.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-900 transition-colors"
            >
              {activity.repoName}
            </a>{' '}
            repository.
          </p>
        </div>
        <p className="text-sm text-gray-500 font-light whitespace-nowrap">
          {dayjs(activity.created_at).format('MMM DD, YYYY')}
        </p>
      </div>
    </div>
  );
};

export default GithubActivityListElement;
