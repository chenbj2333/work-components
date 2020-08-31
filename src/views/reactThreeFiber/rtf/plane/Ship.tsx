import React, { useRef } from 'react';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';

export interface IRTFShipType {
  position: [number, number, number];
  rotation: [number, number, number];
}

const RTFShip: React.FC<IRTFShipType> = ({ position, rotation }) => {
  const mainRef = useRef();
  // const shipRef: any = useRef();
  const exhaustRef: any = useRef();

  const fbx: any = useLoader(FBXLoader, './zsj.fbx');
  const texture = useLoader(THREE.TextureLoader, '/ship.png');
  // const [mixer] = useState(() => new THREE.AnimationMixer());
  console.log(fbx);
  console.log(texture);
  // const gltf: any = useLoader(GLTFLoader, './shipold.gltf');

  useFrame(() => {
    if (exhaustRef && exhaustRef.current) {
      exhaustRef.current.scale.x = 1 + Math.random();
      exhaustRef.current.scale.y = 1 + Math.random();
    }
  });

  return (
    <group ref={mainRef}>
      {/* <pointLight distance={100} intensity={0} color='lightgreen' /> */}
      <ambientLight intensity={1} color='#384575' />
      {/* <scene position={position} scale={[0.1, 0.1, 0.1]}>
        <primitive object={fbx} material={material}>
          <texture {...texture} />
          <meshPhongMaterial
            attach='material'
            map={texture}
            map-flipY={false}
            skinning
          />
        </primitive>
      </scene> */}
      <mesh
        position={position}
        scale={[0.1, 0.1, 0.1]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <primitive object={fbx} attach='geometry' />
        <meshPhongMaterial attach='material' map={texture} />
      </mesh>
      {/* <group
        rotation={rotation}
        // rotation={[0, 0, 0]}
        ref={shipRef}
        position={position}
        // scale={[0.05, 0.05, 0.05]}
        attachObject={fbx}
      > */}
      {/* <mesh name='Renault_(S,_T1)_0' castShadow>
          <bufferGeometry attach='geometry' {...fbx.children.geometry} />
          <meshStandardMaterial attach='material' {...fbx.children.material} />
        </mesh> */}
      {/* <mesh name='Renault_(S,_T1)_0' castShadow>
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
        </mesh> */}
      {/* </group> */}
      {/* <mesh
        ref={exhaustRef}
        scale={[1, 1, 30]}
        position={[position[0], position[1] + 0.2, position[2] + 10]}
      >
        <dodecahedronGeometry attach='geometry' args={[0.5, 1]} />
        <meshBasicMaterial attach='material' color='lightblue' />
      </mesh> */}
    </group>
  );
};

export default RTFShip;
