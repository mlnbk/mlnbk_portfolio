import './App.css';

import { useCallback } from 'react';
import { Outlet } from 'react-router-dom';

import type { Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadStarsPreset(engine);
  }, []);

  const options = {
    preset: 'stars',
  };

  return (
    <div className="App">
      <Particles init={particlesInit} options={options} />
      <Outlet />
    </div>
  );
}

export default App;
