import * as THREE from "three";
import { camera } from "./const";
import type { Cube } from "./types";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let startMouse = { x: 0, y: 0 };
let startQuaternion = new THREE.Quaternion();

export let draggedCube: Cube | null = null;

export const handleMouseMovement = (cubes: Cube[]) => {
  let activeCube: Cube | null = null;

  onmousedown = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
      if (!intersects[0]) {
        throw new Error("No object on intersects");
      }
      activeCube = intersects[0].object as Cube;
      draggedCube = activeCube;
      startMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      startMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      startQuaternion.copy(activeCube.quaternion);
    }
  };

  onmouseup = () => {
    if (activeCube) {
      activeCube.userData.targetQuaternion = null;
    }
    activeCube = null;
    draggedCube = null;
  };

  onmousemove = (event) => {
    if (activeCube) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const deltaX = (mouse.x - startMouse.x) * Math.PI;
      const deltaY = -(mouse.y - startMouse.y) * Math.PI;

      const qX = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        deltaY,
      );
      const qY = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        deltaX,
      );

      activeCube.quaternion.copy(startQuaternion).premultiply(qX).premultiply(qY);
    }
  };
};
