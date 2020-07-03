import React, { useEffect } from 'react';
import { Scene } from 'spritejs';
import { Mesh3d, shaders } from '../../../plugins/sprite-extend-3d';

const SpriteDemo = () => {
  useEffect(() => {
    const container = document.getElementById('container');
    const scene = new Scene({
      container,
      displayRatio: 2,
    });
    const layer = scene.layer3d('fglayer', {
      camera: {
        fov: 35,
      },
      directionalLight: [0.5, 1.0, -0.3],
      directionalLightColor: [1, 1, 1, 0.15],
    });

    layer.camera.attributes.pos = [8, 5, 15];
    layer.camera.lookAt([0, 1.5, 0]);

    const texture = layer.createTexture(
      'https://p3.ssl.qhimg.com/t01d6c6c93fdddf1e42.jpg'
    );
    const program = layer.createProgram({
      ...shaders.NORMAL_TEXTURE,
      texture,
    });

    const model = layer.loadModel(
      'https://s5.ssl.qhres.com/static/1eb3e9b91a296abd.json'
    );
    const fox = new Mesh3d(program, { model });
    layer.append(fox);
    layer.setOrbit();
  }, []);
  return <div id='container' style={{ height: '100vh' }}></div>;
};

export default SpriteDemo;
