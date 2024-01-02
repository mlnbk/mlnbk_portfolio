import { FC, useRef } from 'react';

import * as THREE from 'three';

import { useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import { Galaxy as GalaxyType } from '../types';
import { useGalaxyRotation } from '../Hooks/useGalaxyRotation';
import { useGalaxy } from '../Hooks/useGalaxy';

interface GalaxyProps {
  id: string;
  position: { x: number; y: number; z: number };
  galaxyData: GalaxyType;
  radius?: number;
  speed?: number;
  index: number;
  starColor: number;
  isHovered: boolean;
  onHover: () => void;
  onUnhover: () => void;
  showTitle?: boolean;
}

const Galaxy: FC<GalaxyProps> = ({
  id,
  galaxyData,
  position,
  radius = 1,
  speed = 1,
  index,
  starColor,
  isHovered,
  onHover,
  onUnhover,
  showTitle = true,
}) => {
  const { camera, size } = useThree();
  const navigate = useNavigate();
  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const starsContainer = useRef<THREE.Group>(new THREE.Group());

  const handleGalaxyClick = () => {
    navigate(`/${id}`, { state: { index } });
  };

  useGalaxy({
    planetContainer,
    starsContainer,
    planets: galaxyData.projects,
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
      {showTitle && (
        <Text
          position={[position.x, position.y - 0.18, position.z]} // TODO make dependent on screen size
          rotation={camera.rotation}
          color="white"
          fontSize={0.025}
          anchorX="center"
          anchorY="middle"
          scale={isHovered ? 1.5 : 1}
          // TODO fontWeight
          font="/fonts/Voyager.otf"
        >
          {galaxyData.title}
        </Text>
      )}
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
