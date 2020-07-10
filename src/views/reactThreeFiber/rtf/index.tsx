import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import RTFRocks from './Ship.jsx';

const RTFDemo: React.FC = () => {
  return (
    <Canvas
      concurrent
      style={{ height: '100vh' }}
      gl={{ antialias: true }}
      camera={{ fov: 45, position: [-30, 40, 30], near: 0.1, far: 1000 }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(new THREE.Color('#eee'));
        // gl.shadowMapEnabled = true;
      }}
    >
      <fog color={new THREE.Color('#fff')} near={0.015} far={100} />
      <spotLight position={[-40, 60, -10]} color='#ffffff' />
      <Suspense fallback={null}>
        <RTFRocks />
      </Suspense>
    </Canvas>
  );
};

export default RTFDemo;
