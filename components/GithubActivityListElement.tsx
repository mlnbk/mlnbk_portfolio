import { FC } from 'react';

import { DisplayedActivity } from '@Types/types';
import dayjs from 'dayjs';

interface GithubActivityListElementProps {
  activity: DisplayedActivity;
}

const GithubActivityListElement: FC<GithubActivityListElementProps> = ({ activity }) => {
  return (
    <div className='py-6 md:py-8'>
      <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
        <div className='flex-1'>
          <h3 className='mb-2 text-base font-light capitalize text-gray-900 md:text-lg'>
            {activity.emoji} {activity.title}
          </h3>
          <p className='text-sm font-light text-gray-600 first-letter:uppercase md:text-base'>
            {activity.description} the{' '}
            <a
              href={activity.repoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='underline transition-colors hover:text-gray-900'
            >
              {activity.repoName}
            </a>{' '}
            repository.
          </p>
        </div>
        <p className='whitespace-nowrap text-sm font-light text-gray-500'>
          {dayjs(activity.created_at).format('MMM DD, YYYY, HH:mm')}
        </p>
      </div>
    </div>
  );
};

export default GithubActivityListElement;
