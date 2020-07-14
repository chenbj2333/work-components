import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from 'react-three-fiber';

export interface IRTFShipType {
  position: [number, number, number];
  rotation: [number, number, number];
}

const RTFShip: React.FC<IRTFShipType> = ({ position, rotation }) => {
  // const gltf: any = useLoader(GLTFLoader, './ship.gltf');
  const gltf: any = useLoader(GLTFLoader, './shipold.gltf');
  const mainRef = useRef();
  const shipRef: any = useRef();
  const exhaustRef: any = useRef();

  useFrame(() => {
    if (exhaustRef && exhaustRef.current) {
      exhaustRef.current.scale.x = 1 + Math.random();
      exhaustRef.current.scale.y = 1 + Math.random();
    }
  });

  return (
    <group ref={mainRef}>
      <pointLight distance={100} intensity={0} color='lightgreen' />
      <group
        rotation={rotation}
        // rotation={[0, 0, 0]}
        ref={shipRef}
        position={position}
        // scale={[0.05, 0.05, 0.05]}
      >
        {/* <mesh name='Renault_(S,_T1)_0' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[0].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_1' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[1].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_2' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[2].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_3' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[3].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_4' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[4].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_5' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[5].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_6' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[6].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_7' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[7].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_8' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[8].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_9' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[9].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_10' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[10].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_11' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[11].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_12' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[12].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_13' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[13].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_14' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[14].geometry} />
          <meshStandardMaterial attach='material' color='red' />
        </mesh>
        <mesh name='Renault_(S,_T1)_15' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[15].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_16' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[16].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_17' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[17].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_18' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[18].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh>
        <mesh name='Renault_(S,_T1)_19' castShadow>
          <bufferGeometry attach='geometry' {...gltf.__$[19].geometry} />
          <meshStandardMaterial attach='material' color='green' />
        </mesh> */}
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
      <mesh
        ref={exhaustRef}
        scale={[1, 1, 30]}
        position={[position[0], position[1] + 0.2, position[2] + 10]}
      >
        <dodecahedronGeometry attach='geometry' args={[0.5, 1]} />
        <meshBasicMaterial attach='material' color='lightblue' />
      </mesh>
    </group>
  );
};

export default RTFShip;
