// customHooks/useGalaxyGeneration.js
import { useThree } from '@react-three/fiber';
import { useEffect, MutableRefObject } from 'react';
import * as THREE from 'three';

import {
  maxPlanetRadius,
  maxStarRadius,
  numOfStars,
  planetPositions,
  planetScreenFactor,
} from '../constans';
import { Planet, Star } from '../types';

interface UseGalaxyProperties {
  planetContainer: MutableRefObject<THREE.Group>;
  starsContainer: MutableRefObject<THREE.Group>;
  planets: (Star | Planet)[];
  starColor: number;
  position: { x: number; y: number; z: number };
  scale?: number;
}

export const useGalaxy = ({
  planetContainer,
  starsContainer,
  planets,
  starColor,
  position,
  scale = 1,
}: UseGalaxyProperties) => {
  const { size } = useThree();
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  const textureLoader = new THREE.TextureLoader();
  const customTexture = textureLoader.load('/textures/mars.jpeg');

  useEffect(() => {
    const generatePlanets = () => {
      planetContainer.current.clear();
      const planetGroup = new THREE.Object3D();

      for (let i = 0; i < planets.length; i++) {
        const planetRadius = (0.95 + Math.random() * 0.95) * maxPlanetRadius;

        const screenFactor =
          Math.min(size.width, size.height) * planetScreenFactor * scale;
        const { x, y, z } = planetPositions[i];
        const planetPosition = new THREE.Vector3(
          x * screenFactor,
          y * screenFactor,
          z * screenFactor,
        );

        const planetGeometry = new THREE.SphereGeometry(planetRadius, 64, 64);

        const planetMaterial = new THREE.MeshPhongMaterial({
          map: customTexture,
        });

        const overlayMesh = new THREE.Mesh(planetGeometry);
        overlayMesh.position.copy(planetPosition);
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
        const starMaterial = new THREE.MeshBasicMaterial({
          color: starColor,
        });
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);

        const screenFactor =
          Math.min(size.width, size.height) * planetScreenFactor;
        const radius = Math.random() * screenFactor * scale * 0.4;
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
      starsContainer.current.add(ambientLight);
    };

    generatePlanets();
    generateStars();
  }, [size.height, size.width]);
};
