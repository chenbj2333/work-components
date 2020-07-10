import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from 'react-three-fiber';

const RTFShip = () => {
  const gltf = useLoader(GLTFLoader, './ship.json');
  console.log(gltf);
  return (
    <group rotation={[Math.PI / 2, Math.PI, 0]}>
      <mesh name='Renault_(S,_T1)_0'>
        <bufferGeometry attach='geometry' {...gltf.__$[5].geometry} />
        <meshStandardMaterial attach='material' color='#070707' />
      </mesh>
      <mesh name='Renault_(S,_T1)_1'>
        <bufferGeometry attach='geometry' {...gltf.__$[6].geometry} />
        <meshStandardMaterial attach='material' color='black' />
      </mesh>
      <mesh name='Renault_(S,_T1)_2'>
        <bufferGeometry attach='geometry' {...gltf.__$[7].geometry} />
        <meshStandardMaterial attach='material' color='#070707' />
      </mesh>
      <mesh name='Renault_(S,_T1)_3'>
        <bufferGeometry attach='geometry' {...gltf.__$[8].geometry} />
        <meshBasicMaterial attach='material' color='lightblue' />
      </mesh>
      <mesh name='Renault_(S,_T1)_4'>
        <bufferGeometry attach='geometry' {...gltf.__$[9].geometry} />
        <meshBasicMaterial attach='material' color='white' />
      </mesh>
      <mesh name='Renault_(S,_T1)_5'>
        <bufferGeometry attach='geometry' {...gltf.__$[10].geometry} />
        <meshBasicMaterial attach='material' color='teal' />
      </mesh>
    </group>
  );
};

export default RTFShip;
