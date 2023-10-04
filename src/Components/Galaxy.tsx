import { FC, useRef, useEffect } from 'react';

import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const spaceVals = [
  { x: 0.0369, y: 0.1368, z: -0.2367 },
  { x: -0.0963, y: 0.1962, z: 0.2961 },
  { x: 0.1701, y: -0.267, z: 0.0369 },
  { x: -0.1296, y: 0.2367, z: -0.1962 },
  { x: 0.2367, y: -0.0369, z: 0.0963 },
];

interface GalaxyProps {
  position: { x: number; y: number; z: number };
  planets: any; // TODO: array of projects
  radius?: number;
  speed?: number;
}

const Galaxy: FC<GalaxyProps> = ({
  planets,
  position,
  radius = 1,
  speed = 1,
}) => {
  const { size } = useThree();

  useFrame(({ clock }) => {
    if (planetContainer.current) {
      const elapsedTime = clock.getElapsedTime();
      const x = position.x + radius * Math.cos(speed * elapsedTime);
      const z = position.z + radius * Math.sin(speed * elapsedTime);
      planetContainer.current.position.set(x, position.y, z);
    }
  });

  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  planetContainer.current.add(ambientLight);
  planetContainer.current.position.set(position.x, position.y, position.z);
  const planet = new THREE.Object3D();
  const geometry = new THREE.SphereGeometry(10, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0x343a40,
    wireframe: false,
    transparent: false,
  });

  const sphere = new THREE.Mesh(geometry, material);
  planet.add(sphere);

  useEffect(() => {
    generatePlanets();
  }, [size]);

  const generatePlanets = () => {
    planetContainer.current.clear();
    const planetGroup = new THREE.Object3D();
    const maxPlanetRadius = 0.02;

    for (let i = 0; i < planets.length; i++) {
      const planetColors = ['#FF5733', '#44D3A5', '#D144A5'];
      const planetRadius = (0.9 + Math.random() * 0.9) * maxPlanetRadius;

      const screenFactor = Math.min(size.width, size.height) * 0.001;
      const { x, y, z } = spaceVals[i];
      const planetPosition = new THREE.Vector3(
        x * screenFactor,
        y * screenFactor,
        z * screenFactor,
      );

      const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: planetColors[Math.floor(Math.random() * planetColors.length)],
      });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

      planetMesh.position.copy(planetPosition);
      planetGroup.add(planetMesh);
    }

    planetContainer.current.add(planetGroup);
    planetContainer.current.add(ambientLight);
  };

  return (
    <group
      ref={planetContainer}
      position={[position.x, position.y, position.z]}
    >
      <primitive object={planetContainer.current} />
    </group>
  );
};

export default Galaxy;
