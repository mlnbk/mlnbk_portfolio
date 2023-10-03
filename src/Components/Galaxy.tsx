import { CSSProperties, FC, useRef, useEffect, MutableRefObject } from 'react';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// import Planet from './Planet';

interface GalaxyProps {
  dof: MutableRefObject<any>;
}

const Galaxy: FC<GalaxyProps> = ({ dof }) => {
  const parameters = {
    count: 1,
    size: 0.4,
    radius: 2,
    branches: 4,
    spin: -1.25,
    randomness: 0.3,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
    animate: true,
    mouse: false,
    opacity: 1,
    focusDistance: 0.5,
    focalLength: 0.5,
    width: 1000,
    height: 1000,
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
  });

  useFrame((state) => {
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

    if (parameters.mouse) {
      planetContainer.current.rotation.x = THREE.MathUtils.lerp(
        planetContainer.current.rotation.x,
        state.mouse.y / 10,
        0.2,
      );
      planetContainer.current.rotation.y = THREE.MathUtils.lerp(
        planetContainer.current.rotation.y,
        -state.mouse.x / 2,
        0.2,
      );
    }

    if (parameters.animate) {
      const elapsedTime = state.clock.getElapsedTime();
      planetContainer.current.rotation.y = -0.02 * elapsedTime;
    }
  });

  const generatePlanets = () => {
    const planetGroup = new THREE.Object3D();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(1.0, 0.3765, 0.1882);
    const colorOutside = new THREE.Color(0.10588, 0.22353, 0.51765);
    const maxPlanetRadius = 0.01;

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const planetColors = ['#FF5733', '#44D3A5', '#D144A5'];
      const planetRadius = (0.9 + Math.random() * 0.9) * maxPlanetRadius;

      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      const planetGeometry = new THREE.SphereGeometry(planetRadius, 32, 32);
      const planetMaterial = new THREE.MeshPhongMaterial({
        color: planetColors[Math.floor(Math.random() * planetColors.length)],
      });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
      planetMesh.position.set(randomX, randomY, randomZ);
      planetGroup.add(planetMesh);
    }

    planetContainer.current.add(planetGroup);
  };

  return (
    <group>
      <primitive object={planetContainer.current} />
    </group>
  );
};

export default Galaxy;
