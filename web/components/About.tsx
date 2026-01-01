'use client';

import { frameworks, languages } from '@Constants/constants';

const About = () => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="flex-shrink-0">
          <img
            src="/avatar.jpeg"
            alt="Milan Bako"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              About
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
              An experienced full-stack software engineer, all about getting
              things done effectively and efficiently. Being highly
              detail-oriented, I bring reliability to every project. I'm
              flexible, consistently seeking ways to enhance my skills and adapt
              to new technologies, to ensure that I deliver exceptional results.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <span
                    key={language}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full font-light"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Frameworks & Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {frameworks.map((framework) => (
                  <span
                    key={framework}
                    className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-full font-light"
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
