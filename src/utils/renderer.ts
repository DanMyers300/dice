import * as THREE from "three";
import { scene, camera, renderer } from "./const";
import { draggedCube } from "./handleMouseMovement";
import type { Cube } from "./types";

const rotX = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(1, 0, 0),
  0.01,
);
const rotY = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(0, 1, 0),
  0.01,
);

export const setupRenderer = (cubes: Cube[]) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const animate = () => {
    for (let cube of cubes) {
      if (cube.userData.targetQuaternion) {
        cube.quaternion.slerp(cube.userData.targetQuaternion, 0.1);

        // Resume animation
        //if (cube.quaternion.angleTo(cube.userData.targetQuaternion) < 0.00000001) {
        //  cube.userData.targetQuaternion = null;
        //}
      } else if (cube !== draggedCube) {
        cube.quaternion.premultiply(rotX).premultiply(rotY);
      };

    };
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();
};

