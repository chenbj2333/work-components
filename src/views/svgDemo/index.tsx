import React from 'react';
import LinkLine from './Line';

const SvgDemo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <LinkLine type='dash' points={[100, 100, 500, 500]} way='two-way' />
    </div>
  );
};

export default SvgDemo;
