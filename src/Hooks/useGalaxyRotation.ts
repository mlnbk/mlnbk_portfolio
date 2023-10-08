import { MutableRefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface GalaxyRotationProps {
  planetContainer: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  starsContainer: MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  position: { x: number; y: number; z: number };
  speed: number;
}

export const useGalaxyRotation = ({
  planetContainer,
  starsContainer,
  position,
  speed,
}: GalaxyRotationProps) => {
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const positionVector = new THREE.Vector3(
      position.x,
      position.y,
      position.z,
    );
    const rotationAxisStart = new THREE.Vector3(2, 4, 3);
    const rotationAxisEnd = new THREE.Vector3(-2, -4, -3);
    const rotationMatrix = new THREE.Matrix4();

    if (planetContainer) {
      rotationMatrix.makeRotationAxis(
        new THREE.Vector3()
          .subVectors(rotationAxisEnd, rotationAxisStart)
          .normalize(),
        speed * elapsedTime,
      );

      planetContainer.current.setRotationFromMatrix(rotationMatrix);
    }

    if (starsContainer) {
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
};
