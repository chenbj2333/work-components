import React, { useRef } from 'react';

const RTFBox: React.FC = () => {
  const mesh = useRef();
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='orange' />
    </mesh>
  );
};

export default RTFBox;
