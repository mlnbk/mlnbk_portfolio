import { FC, useRef, useState } from 'react';
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
  speed: number;
  index: number;
  starColor: number;
}

const Galaxy: FC<GalaxyProps> = ({
  id,
  galaxyData,
  position,
  speed,
  index,
  starColor,
}) => {
  const { camera, size } = useThree();
  const navigate = useNavigate();
  const planetContainer = useRef<THREE.Group>(new THREE.Group());
  const starsContainer = useRef<THREE.Group>(new THREE.Group());
  const [isHovered, setIsHovered] = useState<boolean>();
  const textPosition = new THREE.Vector3(
    position.x,
    position.y - (size.width < 640 ? 0.16 : 0.26),
    position.z,
  );

  const handleGalaxyClick = () => {
    navigate(`/${id}`, { state: { index } });
  };

  useGalaxy({
    planetContainer,
    starsContainer,
    planets: galaxyData.projects,
    starColor,
    position,
  });

  useGalaxyRotation({
    planetContainer,
    starsContainer,
    position,
    speed,
  });

  return (
    <>
      <Text
        position={textPosition}
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
      {/* NOTE: controlls hover behavior */}
      <mesh
        onClick={handleGalaxyClick}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = 'auto';
        }}
        position={[position.x, position.y, position.z]}
      >
        <planeGeometry args={[0.3, 0.3]} />
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
