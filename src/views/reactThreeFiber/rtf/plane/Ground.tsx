import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';
import * as THREE from 'three';

const RTFGround = () => {
  const gridRef: any = useRef();

  useFrame(() => {
    if (gridRef && gridRef.current) {
      (gridRef.current as any).position.z += 0.5;
      if ((gridRef.current as any).position.z > 250) {
        (gridRef.current as any).position.z = 0;
      }
    }
  });

  return (
    <mesh receiveShadow ref={gridRef}>
      <gridHelper
        {...new THREE.GridHelper(2000, 400, 0x888888)}
        position={[0, -15, 2000]}
      />
    </mesh>
  );
};

export default RTFGround;
