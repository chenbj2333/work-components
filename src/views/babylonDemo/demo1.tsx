import React, { useEffect } from 'react';
// import * as BABYLON from '@babylonjs/core/Legacy/legacy'; //全部引入
import {
  Engine,
  Scene,
  Vector3,
  FreeCamera,
  Mesh,
  HemisphericLight,
} from '@babylonjs/core'; //只引入使用到的类

const Demo1: React.FC = () => {
  // 创建三维场景
  const createScence = (engine: Engine, canvas: HTMLCanvasElement) => {
    const scene = new Scene(engine);
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    var sphere = Mesh.CreateSphere('sphere1', 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
    var ground = Mesh.CreateGround('ground1', 6, 6, 2, scene);

    return scene;
  };

  useEffect(() => {
    const canvas = document.getElementById('babylon-demo') as HTMLCanvasElement;
    const engine = new Engine(canvas, true);
    createScence(engine, canvas);
  }, []);

  return <div id='babylon-demo' style={{ height: '100vh', width: '100%' }} />;
};

export default Demo1;
