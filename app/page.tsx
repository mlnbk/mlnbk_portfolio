'use client';

import { useState } from 'react';

import { landingHighlightProjects as highlightedProjects } from '@Constants/constants';

import About from '@Components/About';
import Contact from '@Components/Contact';
import Dropdown from '@Components/Dropdown';
import Footer from '@Components/Footer';
import GithubActivityListElement from '@Components/GithubActivityListElement';
import HighlightedProjects from '@Components/HighlightedProjects';
import List from '@Components/List';
import Navigation from '@Components/Navigation';
import { useGithubActivity } from '@Hooks/useGithubActivities';

export default function Home() {
  const dropdownOptions = [10, 20, 50, 100];
  const [limit, setLimit] = useState(dropdownOptions[0]);
  const { data, isLoading, error } = useGithubActivity(limit);

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      <Navigation />

      {/* Hero Section */}
      <section className='mx-auto max-w-6xl px-6 pb-20 pt-24 md:px-12 md:pb-32 md:pt-32 lg:px-16'>
        <h1 className='mb-4 text-5xl font-light tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl lg:text-7xl'>
          Milan Bako
        </h1>
        <p className='text-xl font-light text-gray-600 dark:text-gray-400 md:text-2xl'>
          Software Engineer
        </p>
      </section>

      {/* Main Content */}
      <div className='mx-auto max-w-6xl space-y-24 px-6 pb-24 md:space-y-32 md:px-12 lg:px-16'>
        <div id='projects'>
          <HighlightedProjects projects={highlightedProjects} />
        </div>
        <div id='about'>
          <About />
        </div>
        <div id='contact'>
          <Contact />
        </div>
        <div id='activity'>
          <List
            isLoading={isLoading}
            error={error}
            title='Recent Activity'
            description='Latest updates from my GitHub repositories.'
            rightElement={
              <Dropdown selected={limit} options={dropdownOptions} onChange={setLimit} />
            }
          >
            {data?.map((activity, index) => (
              <GithubActivityListElement key={index} activity={activity} />
            ))}
          </List>
        </div>
      </div>

      <Footer />
    </div>
  );
}
