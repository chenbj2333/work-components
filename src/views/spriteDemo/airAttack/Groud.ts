import { Sprite, Group } from 'spritejs';
import bg1 from '@/assets/bg1.png';
import bg2 from '@/assets/bg2.png';
import bg3 from '@/assets/bg3.png';

export function createGround(position: [number, number], bgImage: string) {
  const map = new Map().set('bg1', bg1).set('bg2', bg2).set('bg3', bg3);
  const ground = new Sprite(map.get(bgImage));
  ground.attr({
    anchor: [0, 0],
    pos: position,
    size: [window.innerWidth, window.innerHeight],
  });

  // bg1.animate(
  //   [
  //     { pos: position },
  //     { pos: [position[0], (position[0] + window.innerHeight) / 2] },
  //   ],
  //   {
  //     duration: 5000,
  //     iterations: Infinity,
  //     // direction: 'alternate', // normal默认值。动画应该正常播放。|alternate动画应该轮流反向播放。
  //   }
  // );

  return ground;
}

export function createGroup() {
  const group = new Group();
  group.attr({
    size: [window.innerWidth, window.innerHeight],
    pos: [0, 0],
    anchor: [0, 0],
  });
  group.append(createGround([0, 0], 'bg1'));
  group.append(createGround([0, -window.innerHeight], 'bg2'));
  group.append(createGround([0, -window.innerHeight * 2], 'bg3'));
  return group;
}
