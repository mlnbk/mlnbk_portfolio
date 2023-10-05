import './App.css';

import { useCallback } from 'react';

import type { Engine } from 'tsparticles-engine';
import Particles from 'react-particles';
import { loadStarsPreset } from 'tsparticles-preset-stars';

import Universe from './Pages/Universe';

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
      <Universe />
    </div>
  );
}

export default App;
