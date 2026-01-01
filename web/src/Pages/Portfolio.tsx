import { FC, useState } from 'react';

import { landingHighlightProjects as highlightedProjects } from '../constants';
import { useGithubActivity } from '../Hooks/useGithubActivities';

import List from '../Components/List';
import Footer from '../Components/Footer';
import GithubActivityListElement from '../Components/GithubActivityListElement';
import Dropdown from '../Components/Dropdown';
import HighlightedProjects from '../Components/HighlightedProjects';
import Contact from '../Components/Contact';
import About from '../Components/About';

const Portfolio: FC = () => {
  const dropdownOptions = [10, 20, 50, 100];
  const [limit, setLimit] = useState(dropdownOptions[0]);
  const { data, isLoading, error } = useGithubActivity(limit);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pb-20 md:pb-32">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-4">
          Milan Bako
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light">
          Software Engineer
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 space-y-24 md:space-y-32 pb-24">
        <HighlightedProjects projects={highlightedProjects} />
        <About />
        <Contact />
        <List
          isLoading={isLoading}
          error={error}
          title="Recent Activity"
          description="Latest updates from my GitHub repositories."
          rightElement={
            <Dropdown
              selected={limit}
              options={dropdownOptions}
              onChange={setLimit}
            />
          }
        >
          {data?.map((activity, index) => (
            <GithubActivityListElement
              key={index}
              activity={activity}
              index={index}
            />
          ))}
        </List>
      </div>

      <Footer />
    </div>
  );
};

export default Portfolio;
