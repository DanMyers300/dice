import * as THREE from "three";
import { scene, light } from "./const";

export const setupLights = () => {
  light.position.set(5, 5, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));
};
