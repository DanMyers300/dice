import * as THREE from "three";
import type { Cube } from "./types";

const faceTargets: Record<number, THREE.Quaternion> = {
  1: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    -Math.PI / 2,
  ),
  6: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2,
  ),
  2: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2,
  ),
  5: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -Math.PI / 2,
  ),
  3: new THREE.Quaternion(),
  4: new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI,
  ),
};

export const roll = (cubes: Cube[]) => {
  for (let cube of cubes) {
    const face = Math.floor(Math.random() * 6) + 1;

    if (!faceTargets[face]) {
      throw new Error("No face chosen");
    }

    cube.userData.targetQuaternion = faceTargets[face].clone();
  }
};
