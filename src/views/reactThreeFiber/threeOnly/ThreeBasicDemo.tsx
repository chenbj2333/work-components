import React, { useEffect } from 'react';
// import { Canvas } from 'react-three-fiber';
// import Demo3D from './demo';

// function ThreeD() {
//   return (
//     <Canvas colorManagement>
//       <Demo3D position={[1, 1, 1]} />
//     </Canvas>
//   );
// }

// export default ThreeD;

import * as THREE from 'three';

const ThreeBasicDemo: React.FC = () => {
  const scene = new THREE.Scene(); // 场景
  const camera = new THREE.PerspectiveCamera(
    75, // 视角 游戏中通常设置60-90
    window.innerWidth / window.innerHeight, // 窗口投影的长宽比
    0.1, // 表示从距离摄像机多元的位置开始渲染
    1000 // 表示从距离摄像机多元的位置结束渲染
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true }); // 渲染器 antialias抗锯齿
  renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器场景的大小
  document.body.appendChild(renderer.domElement); // 添加到页面上
  var geometry = new THREE.BoxGeometry(1, 1, 1); // 创建基础几何模型 new THREE.BoxGeometry(x轴的长, y轴的长, z轴的长)
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 创建材质
  var cube = new THREE.Mesh(geometry, material); // 创建网格对象（把材质结合到几何体上）
  scene.add(cube); // 把网格对象放到场景中去

  camera.position.z = 5; // 设置摄像机距离物体的位置

  const animate = () => {
    requestAnimationFrame(animate);
    // 网格对象自旋转
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  };

  // 窗口改变时响应式
  const init = () => {
    // 初始化摄像机
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // 初始化渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  useEffect(() => {
    animate();
    window.addEventListener('resize', init);

    return () => window.removeEventListener('resize', init);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default ThreeBasicDemo;
