import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import RTFShip from './plane/Ship';
import RTFGround from './plane/Ground';
import Stars from './plane/Stars';
import RTFRadar from './plane/Radar';

const RTFDemo: React.FC = () => {
  // const handleKeyPress = (e: any) => {
  //   console.log(134);
  //   console.log(e);
  // };
  return (
    <Canvas
      concurrent
      style={{ height: '100vh' }}
      gl={{ antialias: true }}
      camera={{ fov: 70, position: [0, 40, 2100], near: 0.01, far: 10000 }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(new THREE.Color('#020209'));
      }}
      onPointerDown={(e) => console.log('down')}
      // updateDefaultCamera={true}
      onKeyDown={(e) => console.log('keydown')}
    >
      {/* <fog color={new THREE.Color('#fff')} near={0.015} far={100} /> */}
      {/* <spotLight position={[-40, 60, -10]} color='#ffffff' /> */}
      <fog attach='fog' args={['#070710', 100, 700]} />
      <ambientLight intensity={0.7} />
      <Stars />
      <RTFRadar />
      <RTFGround />
      <Suspense fallback={null}>
        <RTFShip
          position={[0, -5, 1930]}
          rotation={[Math.PI / 1.9, Math.PI, 0]}
        />
      </Suspense>
      {/* <Suspense fallback={null}>
        <RTFShip
          position={[-20, -10, 1940]}
          rotation={[Math.PI / 2, (Math.PI * 4.5) / 5, 0]}
        />
      </Suspense>
      <Suspense fallback={null}>
        <RTFShip
          position={[20, -10, 1940]}
          rotation={[Math.PI / 2, -(Math.PI * 4.5) / 5, 0]}
        />
      </Suspense> */}
    </Canvas>
  );
};

export default RTFDemo;
