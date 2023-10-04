import { FC, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Galaxy from '../Components/Galaxy';

const Universe: FC = () => {
  const dof = useRef();

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="text-white">Welcome to My Coding Universe!</div>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={2}
          reverseOrbit
          zoomSpeed={0.75}
        />
        <Galaxy dof={dof} />
      </Canvas>
    </div>
  );
};

export default Universe;
