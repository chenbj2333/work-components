import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const RTFRadar = () => {
  const radarRef: any = useRef();

  const radarX = () => {
    return Math.round(Math.random() * 200 - 100);
  };

  useFrame(() => {
    if (radarRef && radarRef.current) {
      (radarRef.current as any).position.z += 0.5;
      if ((radarRef.current as any).position.z > 2100) {
        (radarRef.current as any).position.z = 1400;
        (radarRef.current as any).position.x = radarX();
      }
    }
  });

  return (
    <mesh ref={radarRef} position={[30, -15, 1700]}>
      <sphereBufferGeometry
        attach='geometry'
        args={[70, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]}
      />
      <meshLambertMaterial
        attach='material'
        color='red'
        opacity={0.4}
        transparent
      />
    </mesh>
  );
};

export default RTFRadar;
