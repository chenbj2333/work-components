import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const RTFThreeDemo: React.FC = () => {
  const box = useRef();
  const sphere = useRef();
  let step = 0;

  useFrame(() => {
    if (box && box.current) {
      (box.current as any).rotation.x += 0.01;
      (box.current as any).rotation.y += 0.01;
    }
    if (sphere && sphere.current) {
      step = step + 0.04;
      (sphere.current as any).position.x = 20 + 10 * Math.cos(step);
      (sphere.current as any).position.y = 2 + 10 * Math.abs(Math.sin(step));
    }
  });

  return (
    <>
      {/* <mesh>
        <axesHelper scale={[20, 20, 20]} />
      </mesh> */}
      <mesh
        position={[15, 0, 0]}
        rotation={[-0.5 * Math.PI, 0, 0]}
        receiveShadow
      >
        <planeGeometry attach='geometry' args={[60, 20, 1, 1]} />
        <meshLambertMaterial attach='material' color='hotpink' />
      </mesh>
      <mesh ref={box} position={[-4, 3, 0]} castShadow>
        <boxBufferGeometry attach='geometry' args={[4, 4, 4]} />
        <meshLambertMaterial
          attach='material'
          color='rgb(127, 255, 212)'
          wireframe
        />
      </mesh>
      <mesh ref={sphere} position={[20, 4, 2]} castShadow>
        <sphereBufferGeometry attach='geometry' args={[4, 20, 20]} />
        <meshLambertMaterial attach='material' color='orange' wireframe />
      </mesh>
    </>
  );
};

export default RTFThreeDemo;
