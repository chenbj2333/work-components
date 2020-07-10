import React, { useEffect } from 'react';
import * as THREE from 'three';

interface IProps {
  count?: number;
}

const ThreeDemo1: React.FC<IProps> = ({ count = 2000 }) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true }); // 渲染器 antialias抗锯齿

  function init() {
    renderer.setClearColor(new THREE.Color(0xeeeeee)); // 背景颜色
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器场景的大小
    document.getElementById('demo1')?.appendChild(renderer.domElement); // 添加到页面上

    // const axes = new THREE.AxesHelper(20);
    // scene.add(axes);

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1); // 创建基础几何模型
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
    }); // 创建材质
    const plane = new THREE.Mesh(planeGeometry, planeMaterial); // 创建网格对象（把材质结合到几何体上）
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    camera.position.z = 30; // 设置摄像机距离物体的位置
    camera.position.y = 40;
    camera.position.x = -30;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }

  function reStart() {
    // 初始化摄像机
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // 初始化渲染尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  useEffect(() => {
    init();
    window.addEventListener('resize', reStart);

    return () => window.removeEventListener('resize', reStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id='demo1' style={{ height: '100vh' }}></div>;
};

export default ThreeDemo1;
