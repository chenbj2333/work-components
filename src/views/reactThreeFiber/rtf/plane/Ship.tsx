import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from 'react-three-fiber';

export interface IRTFShipType {
  position: [number, number, number];
  rotation: [number, number, number];
}

const RTFShip: React.FC<IRTFShipType> = ({ position, rotation }) => {
  const gltf: any = useLoader(GLTFLoader, './ship.gltf');
  const shipRef: any = useRef();

  return (
    <>
      <pointLight distance={100} intensity={0} color='lightgreen' />
      <group rotation={rotation} ref={shipRef} position={position}>
        <mesh name='Renault_(S,_T1)_0' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[5].geometry} />
          <meshStandardMaterial attach='material' color='#070707' />
        </mesh>
        <mesh name='Renault_(S,_T1)_1' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[6].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_2' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[7].geometry} />
          <meshStandardMaterial attach='material' color='#070707' />
        </mesh>
        <mesh name='Renault_(S,_T1)_3' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[8].geometry} />
          <meshBasicMaterial attach='material' color='lightblue' />
        </mesh>
        <mesh name='Renault_(S,_T1)_4' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[9].geometry} />
          <meshBasicMaterial attach='material' color='white' />
        </mesh>
        <mesh name='Renault_(S,_T1)_5' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[10].geometry} />
          <meshBasicMaterial attach='material' color='red' />
        </mesh>
      </group>
      {/* <mesh scale={[1, 1, 30]} position={[0, 0, 1930]}>
        <dodecahedronBufferGeometry attach='geometry' args={[1.5, 0]} />
        <meshBasicMaterial attach='material' color='lightblue' />
      </mesh> */}
    </>
  );
};

export default RTFShip;
