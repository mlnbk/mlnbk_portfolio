import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

import { galaxyData } from '../constans';
import { useGalaxyRotation } from '../Hooks/useGalaxyRotation';

const GalaxyDetails: FC = () => {
  const location = useLocation();
  const { galaxyName } = useParams<{ galaxyName: string }>();
  const { planetContainer, starsContainer, speed } = location.state;

  const galaxyDetails = galaxyData.find((galaxy) => galaxy.name === galaxyName);

  if (!galaxyDetails) {
    return (
      <div className="w-full pt-4 text-white text-center font-futurism">
        <Link to="/">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold">
            Cosmic Odyssey
          </h1>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen grid grid-flow-row grid-rows-[auto_1fr_1fr]">
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
            planetContainer={planetContainer}
            starsContainer={starsContainer}
            speed={speed}
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
              className="py-2 hover:shadow-lg transition duration-300"
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
  planetContainer: THREE.Group;
  starsContainer: THREE.Group;
  speed: number;
}> = ({ planetContainer, starsContainer, speed }) => {
  const planetGroup = new THREE.Group();
  planetGroup.position.set(0, 0, 0);
  const starsGroup = new THREE.Group();
  starsGroup.position.set(0, 0, 0);
  const loader = new THREE.ObjectLoader();
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);

  loader.parse(planetContainer, (object) => {
    planetGroup.add(object);
  });
  loader.parse(starsContainer, (object) => {
    starsGroup.add(object);
  });

  planetGroup.children[0].position.set(0, 0, 0);
  starsGroup.children[0].position.set(0, 0, 0);

  useGalaxyRotation({
    planetContainer: planetGroup,
    starsContainer: starsGroup,
    position: { x: 0, y: 0, z: 0 },
    speed,
  });

  return (
    <>
      <group position={[0, 0, 0]} scale={2}>
        <primitive object={planetGroup} />
      </group>
      <group position={[0, 0, 0]} scale={2}>
        <primitive object={starsGroup} />
      </group>
      <primitive object={ambientLight} />
    </>
  );
};

export default GalaxyDetails;
