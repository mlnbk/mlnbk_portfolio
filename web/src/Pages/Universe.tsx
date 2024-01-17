import { FC, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { isChrome } from 'react-device-detect';
import dayjs from 'dayjs';

import { galaxyData, galaxyOrbitSpeeds } from '../constans';
import Galaxy from '../Components/Galaxy';
import { useGalaxyPositions } from '../Hooks/useGalaxyPositions';
import { useGithubActivity } from '../Hooks/useGithubActivities';

// See issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1093055
const getUnit = () =>
  isChrome
    ? { width: 'w-screen', height: 'h-screen' }
    : { width: 'w-[100dvw]', height: 'h-[100dvh]' };

const Universe: FC = () => {
  const [hoveredGalaxy, setHoveredGalaxy] = useState<number | null>(null);
  const [showText, setShowText] = useState(false);
  const galaxyPositions = useGalaxyPositions();
  const { width, height } = getUnit();
  const { data, isLoading, error } = useGithubActivity();

  const handleGalaxyHover = (index: number | null) => {
    setHoveredGalaxy(index);
  };

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className={`relative ${width} ${height} overflow-x-hidden`}>
      <div
        className={`absolute transform h-full w-full ${
          showText ? 'translate-y-4 opacity-100' : 'translate-y-1/2 opacity-0'
        } text-white text-center transition-all duration-3000 ease-in-out font-voyager`}
      >
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold">
          Cosmic Odyssey
        </h1>
        <p className="text-md md:text-lg lg:text-xl xl:text-2xl mt-4">
          Journey Through My Interests and Projects
        </p>
      </div>
      <div className="w-full h-[90vh]">
        <Canvas id="galaxy-canvas" camera={{ position: [0, 0, 1] }}>
          <ambientLight color={0xffffff} intensity={1} />
          {galaxyData.map((galaxy, index) => (
            <Galaxy
              key={index}
              id={galaxy.name}
              index={index}
              position={galaxyPositions[index]}
              galaxyData={galaxy}
              radius={0.1}
              speed={galaxyOrbitSpeeds[index]}
              starColor={galaxy.color.colorRep}
              isHovered={hoveredGalaxy === index}
              onHover={() => handleGalaxyHover(index)}
              onUnhover={() => handleGalaxyHover(null)}
            />
          ))}
        </Canvas>
      </div>
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
        <footer className="bottom-0 left-0 w-full text-sm text-gray-500 text-center p-4 pt-6">
          <p>
            2024
            {' | '}
            <a
              href="https://github.com/mlnbk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              mlnbk
            </a>
          </p>
          <div className="flex items-center justify-center">
            This project is available on
            <Link to="https://github.com/mlnbk/mlnbk_portfolio">
              <BsGithub size={20} className="ml-2" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Universe;
