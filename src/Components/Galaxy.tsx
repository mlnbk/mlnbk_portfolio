import { FC, useRef, useEffect, MutableRefObject } from 'react';

import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const spaceVals = [
  { x: 0.0369, y: 0.1368, z: -0.2367 },
  { x: -0.0963, y: 0.1962, z: 0.2961 },
  { x: 0.1701, y: -0.267, z: 0.0369 },
  { x: -0.1296, y: 0.2367, z: -0.1962 },
  { x: 0.2367, y: -0.0369, z: 0.0963 },
  { x: 0.1035, y: -0.2034, z: -0.2703 },
  { x: -0.0702, y: 0.1701, z: 0.0036 },
  { x: 0.2703, y: -0.0702, z: -0.1701 },
  { x: -0.2367, y: 0.0036, z: 0.1035 },
  { x: 0.0702, y: -0.1701, z: 0.2367 },
];

interface GalaxyProps {
  dof: MutableRefObject<any>;
}

const Galaxy: FC<GalaxyProps> = ({ dof }) => {
  const { size } = useThree();

  const parameters = {
    count: 5,
    spin: -1.25,
    opacity: 1,
    focusDistance: 1,
    focalLength: 1,
    width: size.width,
    height: size.height,
    focusX: 0,
    focusY: 0,
    focusZ: 0,
  };
  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  planetContainer.current.add(ambientLight);
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

  useFrame(() => {
    if (dof.current) {
      dof.current.circleOfConfusionMaterial.uniforms.focusDistance.value =
        parameters.focusDistance;
      dof.current.circleOfConfusionMaterial.uniforms.focalLength.value =
        parameters.focalLength;
      dof.current.resolution.height = parameters.height;
      dof.current.resolution.width = parameters.width;
      dof.current.target = new THREE.Vector3(
        parameters.focusX,
        parameters.focusY,
        parameters.focusZ,
      );
      dof.current.blendMode.opacity.value = parameters.opacity;
    }
  });

  const generatePlanets = () => {
    planetContainer.current.clear();
    const planetGroup = new THREE.Object3D();
    const maxPlanetRadius = 0.02;

    for (let i = 0; i < parameters.count; i++) {
      const planetColors = ['#FF5733', '#44D3A5', '#D144A5'];
      const planetRadius = (0.9 + Math.random() * 0.9) * maxPlanetRadius;

      const screenFactor =
        Math.min(parameters.width, parameters.height) * 0.002;
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
    <group>
      <primitive object={planetContainer.current} />
    </group>
  );
};

export default Galaxy;
