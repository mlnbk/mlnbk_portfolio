import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface GalaxyRotationProps {
  planetContainer: THREE.Group;
  starsContainer: THREE.Group;
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
    const rotationAxisStart = new THREE.Vector3(3, 3, 2);
    const rotationAxisEnd = new THREE.Vector3(-3, -3, -2);
    const rotationMatrix = new THREE.Matrix4();

    if (planetContainer) {
      rotationMatrix.makeRotationAxis(
        new THREE.Vector3()
          .subVectors(rotationAxisEnd, rotationAxisStart)
          .normalize(),
        speed * elapsedTime,
      );

      planetContainer.setRotationFromMatrix(rotationMatrix);
    }

    if (starsContainer) {
      rotationMatrix.makeRotationAxis(
        new THREE.Vector3()
          .subVectors(rotationAxisEnd, rotationAxisStart)
          .normalize(),
        speed * elapsedTime,
      );

      starsContainer.setRotationFromMatrix(rotationMatrix);
      starsContainer.position.copy(positionVector);
    }
  });
};
