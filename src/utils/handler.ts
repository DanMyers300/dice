import { setupCamera } from "./camera";
import { setupRenderer } from "./renderer";
import { createCube } from "./cube";
import { setupLights } from "./light";
import { setupResize } from "./resize";
import { handleMouseMovement } from "./handleMouseMovement";
import { orderOfCubes, scene } from "./const";
import { roll } from "./roll";

export const handler = () => {
  setupCamera();
  setupLights();

  let cubes = [createCube(0, 0, 0)]

  document.querySelector(".add")?.addEventListener("click", () => {
    const pos = orderOfCubes[cubes.length];
    if (pos) {
      cubes.push(createCube(pos[0], pos[1], 0));
    }
  });

  document.querySelector(".remove")?.addEventListener("click", () => {
    if (cubes.length > 1) {
      const cube = cubes.pop()!;
      scene.remove(cube);
    };
  });

  document.querySelector(".roll")?.addEventListener("click", () => {
    roll(cubes);
  });

  setupRenderer(cubes);
  handleMouseMovement(cubes);

  setupResize();
}
