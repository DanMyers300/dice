import * as THREE from "three";
import { scene } from "./const";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import type { Cube } from "./types";

export const createCube = (x: number, y: number, z: number) => {
  const geometry = new RoundedBoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  
  const cube = new THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[]
  >(geometry, material);

  setupCube(cube, x, y, z);

  return cube;
}

export const setupCube = (cube: Cube, x: number, y: number, z: number) => {
  scene.add(cube);
  cube.position.set(x, y, z);
  cube.rotation.x += 0.5;
  cube.rotation.y += 0.5;
  cube.material = fillPips();
};

const fillPips = () => {
  let pips = [];
  const pipPositions = {
    oneDot: [[128, 128]], // Right
    sixDots: [
      [64, 64],
      [64, 192],
      [64, 128],
      [192, 192],
      [192, 128],
      [192, 64],
    ], //Left
    twoDots: [
      [64, 64],
      [192, 192],
    ], // Top
    fiveDots: [
      [64, 64],
      [64, 192],
      [192, 192],
      [192, 64],
      [128, 128],
    ], // Bottom
    threeDots: [
      [64, 64],
      [128, 128],
      [192, 192],
    ], // Front
    fourDots: [
      [64, 64],
      [64, 192],
      [192, 192],
      [192, 64],
    ], // Back
  };

  for (const positions of Object.values(pipPositions)) {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No canvas");
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = "black";

    for (const [x, y] of positions) {
      ctx.beginPath();
      ctx.arc(x || 0, y || 0, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    pips.push(material);
  }

  return pips;
};
