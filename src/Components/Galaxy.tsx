import { FC, useRef } from 'react';

import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

import { Planet, Star } from '../types';
import { useGalaxyRotation } from '../Hooks/useGalaxyRotation';
import { useGalaxy } from '../Hooks/useGalaxy';
import { useThree } from '@react-three/fiber';

interface GalaxyProps {
  position: { x: number; y: number; z: number };
  planets: (Star | Planet)[];
  radius?: number;
  speed?: number;
  index: number;
  starColor: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
}

const Galaxy: FC<GalaxyProps> = ({
  planets,
  position,
  radius = 1,
  speed = 1,
  index,
  starColor,
  isHovered,
  onHover,
  onUnhover,
}) => {
  const { size } = useThree();
  const navigate = useNavigate();
  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const starsContainer = useRef<THREE.Group>(new THREE.Group());

  const handleGalaxyClick = () => {
    const galaxyId = 'statistics';
    navigate(`/${galaxyId}`, { state: { index } });
  };

  useGalaxy({
    planetContainer,
    starsContainer,
    planets,
    starColor,
    position,
    scale: size.width < 768 ? 1.1 : 1,
  });

  useGalaxyRotation({
    planetContainer,
    starsContainer,
    position,
    speed,
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
