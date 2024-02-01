import { FC, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { isChrome } from 'react-device-detect';

import {
  galaxyData,
  galaxyOrbitSpeeds,
  landingHighlightProjects as highlightedProjects,
} from '../constans';
import { useGalaxyPositions } from '../Hooks/useGalaxyPositions';
import { useGithubActivity } from '../Hooks/useGithubActivities';

import List from '../Components/List';
import Footer from '../Components/Footer';
import Galaxy from '../Components/Galaxy';
import InfoTitle from '../Components/InfoTitle';
import GithubActivityListElement from '../Components/GithubActivityListElement';
import Dropdown from '../Components/Dropdown';
import HighlightedProjects from '../Components/HighlightedProjects';
import Contact from '../Components/Contact';

// See issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1093055
const getUnit = () =>
  isChrome
    ? { width: 'w-screen', height: 'h-screen' }
    : { width: 'w-[100dvw]', height: 'h-[100dvh]' };

const Universe: FC = () => {
  const galaxyPositions = useGalaxyPositions();
  const { width, height } = getUnit();
  const dropdownOptions = [10, 20, 50, 100];
  const [limit, setLimit] = useState(20);
  const { data, isLoading, error } = useGithubActivity(limit);

  return (
    <div className={`relative ${width} ${height} overflow-x-hidden`}>
      <InfoTitle title="Milan Bako" details={['Software Engineer']} />
      <div className="w-full h-[85vh]">
        <Canvas id="galaxy-canvas" camera={{ position: [0, 0, 1] }}>
          <ambientLight color={0xffffff} intensity={1} />
          {galaxyData.map((galaxy, index) => (
            <Galaxy
              key={index}
              id={galaxy.name}
              index={index}
              position={galaxyPositions[index]}
              galaxyData={galaxy}
              speed={galaxyOrbitSpeeds[index]}
              starColor={galaxy.color.colorRep}
            />
          ))}
        </Canvas>
      </div>
      <div
        className="
          sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]
          mx-auto
          grid gap-16 md:gap-32
          mt-14
        "
      >
        <HighlightedProjects projects={highlightedProjects} />
        <Contact />
        <List
          isLoading={isLoading}
          error={error}
          title="Cosmic Activities"
          description="Witness how the universe unfolds its wonders with amazing events
        happening regularly."
          rightElement={
            <Dropdown
              selected={limit}
              options={dropdownOptions}
              onChange={setLimit}
            />
          }
        >
          {data?.map((activity, index) => (
            <GithubActivityListElement activity={activity} index={index} />
          ))}
          <Footer />
        </List>
      </div>
    </div>
  );
};

export default Universe;
