import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';
import { useGalaxyRotation } from '../Hooks/useGalaxyRotation';

const GalaxyDetails: FC = () => {
  const location = useLocation();
  const { galaxyName } = useParams<{ galaxyName: string }>();
  const { planetContainer, starsContainer, speed } = location.state;

  return (
    <div className="relative w-screen h-screen">
      <div className="w-full pt-4 text-white text-center font-futurism">
        <Link to="/">
          <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold z-100">
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
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

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
