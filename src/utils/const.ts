import * as THREE from "three";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

export const renderer = new THREE.WebGLRenderer();

export const light = new THREE.DirectionalLight(0xffffff, 1);

export const orderOfCubes: [number, number, number][] = [
  [0, 0, 0],
  [1, 0, 0],
  [-1, 0, 0],
  [-1, 1, 0],
  [0, 1, 0],
  [1, 1, 0],
  [-1, -1, 0],
  [0, -1, 0],
  [1, -1, 0],
];
