import { FC, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { BsChevronLeft } from 'react-icons/bs';
import { isChrome } from 'react-device-detect';

import {
  galaxyData,
  galaxyOrbitSpeeds,
  highlightedProjects,
} from '../constans';
import { useGalaxy } from '../Hooks/useGalaxy';
import { useGalaxyRotation } from '../Hooks/useGalaxyRotation';

import List from '../Components/List';
import InfoTitle from '../Components/InfoTitle';
import useGithubProjects from '../Hooks/useGithubProjects';
import HighlightedProjects from '../Components/HighlightedProjects';

// See issue: https://bugs.chromium.org/p/chromium/issues/detail?id=1093055
const getUnit = () =>
  isChrome
    ? { width: 'w-screen', height: 'h-screen' }
    : { width: 'w-[100dvw]', height: 'h-[100dvh]' };

const GalaxyDetails: FC = () => {
  const location = useLocation();
  const { galaxyName } = useParams<{ galaxyName: string }>();
  const index = location.state?.index ?? 0;
  const galaxyDetails = galaxyData.find((galaxy) => galaxy.name === galaxyName);
  const { width, height } = getUnit();
  const { projects, isLoading, error } = useGithubProjects(
    galaxyDetails?.projects ?? [],
  );

  if (!galaxyDetails) {
    return (
      <div className="relative w-[100dvw] h-[100dvh] font-voyager text-white grid grid-flow-row grid-rows-[auto_1fr]">
        <div className="w-full pt-4 text-center">
          <Link to="/">
            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
              Cosmic Odyssey
            </h1>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          404 | Galaxy not found
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative ${width} ${height} overflow-x-hidden cursor-default`}
    >
      <InfoTitle title={galaxyDetails.title} details={['Projects']} />
      <div className={`w-full h-[50vh]`}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <GalaxyScene
            planets={galaxyDetails.projects}
            starColor={galaxyDetails.color.colorRep}
            speed={galaxyOrbitSpeeds[index]}
          />
        </Canvas>
      </div>
      <div
        className="
        sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]
        mx-auto
        grid gap-16
        mt-14
        "
      >
        <HighlightedProjects
          projects={highlightedProjects[galaxyDetails.name]}
        />
        {isLoading ? (
          <div
            className="
              flex justify-center justify-self-center items-center
              text-gray-500 bg-gray-900 
              w-max h-min p-4 
              rounded-lg
            "
          >
            Loading projects...
          </div>
        ) : error || !projects || projects.length === 0 ? (
          <div
            className="
              flex justify-center justify-self-center items-center
              text-gray-500 bg-gray-900 
              w-max h-min p-4 
              rounded-lg
            "
          >
            Failed to fetch projects. Please try again later.
          </div>
        ) : (
          <List
            title={galaxyDetails.title}
            description={galaxyDetails.description}
            rightElement={
              <Link to="/">
                <BsChevronLeft size={20} />
              </Link>
            }
          >
            {projects.map((project, index) => (
              <Link
                key={index}
                to={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="-mx-2 px-2 py-4 hover:bg-gray-800 rounded-lg transition duration-100">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold">
                    {project.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 mt-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </List>
        )}
      </div>
    </div>
  );
};

const GalaxyScene: FC<{
  planets: string[];
  starColor: number;
  speed: number;
}> = ({ planets, speed, starColor }) => {
  const position = { x: 0, y: 0, z: 0 };
  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const starsContainer = useRef<THREE.Group>(new THREE.Group());
  planetContainer.current.position.set(0, 0, 0);
  starsContainer.current.position.set(0, 0, 0);

  useGalaxy({
    planetContainer,
    starsContainer,
    planets,
    starColor,
    position,
    scale: 2,
  });

  useGalaxyRotation({
    planetContainer,
    starsContainer,
    position,
    speed,
  });

  return (
    <group position={[position.x, position.y, position.z]} scale={2}>
      <ambientLight color={0xffffff} intensity={1} />
      <group ref={planetContainer}>
        <primitive object={planetContainer.current} />
      </group>
      <group ref={starsContainer}>
        <primitive object={starsContainer.current} />
      </group>
    </group>
  );
};

export default GalaxyDetails;
