import { Canvas } from '@react-three/fiber';
import { FC, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

import { galaxyData, galaxyOrbitSpeeds } from '../constans';
import { useGalaxy } from '../Hooks/useGalaxy';
import { useGalaxyRotation } from '../Hooks/useGalaxyRotation';
import { Planet, Star } from '../types';

const GalaxyDetails: FC = () => {
  const location = useLocation();
  const { galaxyName } = useParams<{ galaxyName: string }>();
  const index = location.state?.index ?? 0;
  const galaxyDetails = galaxyData.find((galaxy) => galaxy.name === galaxyName);

  if (!galaxyDetails) {
    return (
      <div className="relative w-screen h-screen font-futurism text-white grid grid-flow-row grid-rows-[auto_1fr]">
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
      className="
        relative w-screen h-screen
        grid grid-flow-row grid-rows-[auto_1fr_1fr]
        overflow-y-auto overflow-x-hidden
      "
    >
      <div className="w-full pt-4 text-white text-center font-futurism">
        <Link to="/">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
            Cosmic Odyssey
          </h1>
        </Link>
      </div>
      <div className="w-full h-[50vh]">
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
          sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]
          mx-auto p-4 md:p-6 lg:p-8 xl:p-10
          rounded-t-lg
          bg-gray-900
          text-left text-gray-100
        "
      >
        <h2 className="text-2xl font-semibold mb-4">{galaxyDetails.title}</h2>
        <p className="text-lg text-gray-400 mb-8">
          {galaxyDetails.description}
        </p>
        <div className="grid grid-flow-row divide-y">
          {galaxyDetails.projects.map((project, index) => (
            <div
              key={index}
              className="py-4 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-500 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GalaxyScene: FC<{
  planets: (Star | Planet)[];
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
