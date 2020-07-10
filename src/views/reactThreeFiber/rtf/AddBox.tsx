import React, { useRef, useState, useEffect } from 'react';
import { generateHash } from '@/utils';

const RTFAddBox: React.FC = () => {
  const box = useRef();
  const [boxList, setBoxList] = useState<any[]>([]);

  function addBox() {
    setBoxList([
      ...boxList,
      {
        cubeSize: [
          Math.ceil(Math.random() * 3),
          Math.ceil(Math.random() * 3),
          Math.ceil(Math.random() * 3),
        ],
        cubePosition: [
          -25 + Math.round(Math.random() * 50),
          -15 + Math.round(Math.random() * 30),
          Math.round(Math.random()),
        ],
      },
    ]);
  }

  useEffect(() => {
    setBoxList([
      {
        cubeSize: [
          Math.ceil(Math.random() * 3),
          Math.ceil(Math.random() * 3),
          Math.ceil(Math.random() * 3),
        ],
        cubePosition: [-4, 3, 0],
      },
    ]);
  }, []);

  return (
    <>
      <mesh position={[15, 0, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
        <planeGeometry attach='geometry' args={[50, 30, 1, 1]} />
        <meshBasicMaterial attach='material' color='rgb(127, 255, 212)' />
      </mesh>
      {boxList.map((item) => (
        <mesh
          key={generateHash()}
          ref={box}
          position={item.cubePosition}
          onClick={addBox}
        >
          <boxBufferGeometry attach='geometry' args={item.cubeSize} />
          <meshBasicMaterial attach='material' color='orange' />
        </mesh>
      ))}
    </>
  );
};

export default RTFAddBox;
