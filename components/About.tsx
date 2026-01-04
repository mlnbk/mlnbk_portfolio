'use client';

import { frameworks, languages } from '@Constants/constants';

const About = () => {
  return (
    <section className='space-y-8'>
      <div className='flex flex-col items-start gap-8 md:flex-row md:gap-12'>
        <div className='flex-shrink-0'>
          <img
            src='/avatar.jpeg'
            alt='Milan Bako'
            className='h-32 w-32 rounded-full object-cover md:h-40 md:w-40'
          />
        </div>
        <div className='flex-1 space-y-6'>
          <div>
            <h2 className='mb-4 text-3xl font-light text-gray-900 dark:text-gray-100 md:text-4xl'>
              About
            </h2>
            <p className='text-base font-light leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg'>
              Senior software engineer and team lead based in Austria. I focus on building scalable
              platforms and shipping products that solve real business problems. Whether it's
              designing data layers, building scalable architectures or creating mobile apps from
              scratch, I enjoy turning technical challenges into practical solutions that deliver
              value. I believe in writing clean, maintainable code as the foundation for building
              things that last.
            </p>
          </div>
          <div className='space-y-4'>
            <div>
              <h3 className='mb-3 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500'>
                Languages
              </h3>
              <div className='flex flex-wrap gap-2'>
                {languages.map((language) => (
                  <span
                    key={language}
                    className='rounded-full bg-gray-100 px-4 py-2 text-sm font-light text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className='mb-3 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-500'>
                Frameworks & Technologies
              </h3>
              <div className='flex flex-wrap gap-2'>
                {frameworks.map((framework) => (
                  <span
                    key={framework}
                    className='rounded-full bg-gray-100 px-4 py-2 text-sm font-light text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
