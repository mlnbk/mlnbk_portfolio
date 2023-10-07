import { FC, useRef, useEffect } from 'react';

import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';

import {
  maxPlanetRadius,
  maxStarRadius,
  numOfStars,
  planetPositions,
  planetScreenFactor,
} from '../constans';

interface GalaxyProps {
  position: { x: number; y: number; z: number };
  planets: any; // TODO: array of projects
  radius?: number;
  speed?: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

const Galaxy: FC<GalaxyProps> = ({
  planets,
  position,
  radius = 1,
  speed = 1,
  isHovered,
  onHover,
  onUnhover,
}) => {
  const navigate = useNavigate();
  const { size } = useThree();
  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const starsContainer = useRef<THREE.Group>(new THREE.Group());
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  const generatePlanets = () => {
    planetContainer.current.clear();
    const planetGroup = new THREE.Object3D();

    for (let i = 0; i < planets.length; i++) {
      const planetColors = ['#FF5733', '#44D3A5', '#D144A5'];
      const planetRadius = (0.95 + Math.random() * 0.95) * maxPlanetRadius;

      const screenFactor =
        Math.min(size.width, size.height) * planetScreenFactor;
      const { x, y, z } = planetPositions[i];
      const planetPosition = new THREE.Vector3(
        x * screenFactor,
        y * screenFactor,
        z * screenFactor,
      );

      const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: planetColors[i],
      });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

      planetMesh.position.copy(planetPosition);
      planetGroup.add(planetMesh);
    }

    planetContainer.current.add(planetGroup);
    planetContainer.current.add(ambientLight);
  };

  const generateStars = () => {
    starsContainer.current.clear();

    const starsGroup = new THREE.Object3D();

    for (let i = 0; i < numOfStars; i++) {
      const starRadius = (0.95 + Math.random() * 0.95) * maxStarRadius;
      const starGeometry = new THREE.SphereGeometry(starRadius, 16, 16);
      const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const starMesh = new THREE.Mesh(starGeometry, starMaterial);

      const radius = Math.random() * 0.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI - Math.PI / 2;
      starMesh.position.set(
        radius * Math.cos(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        radius * Math.sin(theta) * Math.cos(phi),
      );
      if (position.x <= 0) {
        starMesh.rotateX(Math.PI / 3);
      } else {
        starMesh.rotateX(-Math.PI / 3);
      }

      starsGroup.add(starMesh);
    }
    starsContainer.current.add(starsGroup);
  };

  const handleGalaxyClick = () => {
    const galaxyId = 'statistics';
    navigate(`/${galaxyId}`);
  };

  useEffect(() => {
    generatePlanets();
    generateStars();
  }, [size.height, size.width]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const positionVector = new THREE.Vector3(
      position.x,
      position.y,
      position.z,
    );
    const rotationAxisStart = new THREE.Vector3(3, 3, 2);
    const rotationAxisEnd = new THREE.Vector3(-3, -3, -2);
    const rotationMatrix = new THREE.Matrix4();

    if (planetContainer.current) {
      rotationMatrix.makeRotationAxis(
        new THREE.Vector3()
          .subVectors(rotationAxisEnd, rotationAxisStart)
          .normalize(),
        speed * elapsedTime,
      );

      planetContainer.current.setRotationFromMatrix(rotationMatrix);
      planetContainer.current.position.copy(positionVector);
    }
    if (starsContainer.current) {
      rotationMatrix.makeRotationAxis(
        new THREE.Vector3()
          .subVectors(rotationAxisEnd, rotationAxisStart)
          .normalize(),
        speed * elapsedTime,
      );

      starsContainer.current.setRotationFromMatrix(rotationMatrix);
      starsContainer.current.position.copy(positionVector);
    }
  });

  return (
    <>
      <mesh
        onClick={handleGalaxyClick}
        onPointerOver={onHover}
        onPointerOut={onUnhover}
        position={[position.x, position.y, position.z]}
      >
        <planeGeometry args={[3 * radius, 3 * radius]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <group
        ref={planetContainer}
        position={[position.x, position.y, position.z]}
        scale={isHovered ? 1.5 : 1}
      >
        <primitive object={planetContainer.current} />
      </group>
      <group
        ref={starsContainer}
        position={[position.x, position.y, position.z]}
        scale={isHovered ? 1.5 : 1}
      >
        <primitive object={starsContainer.current} />
      </group>
    </>
  );
};

export default Galaxy;
