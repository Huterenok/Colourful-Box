import { MouseEvent } from "react";

import * as THREE from "three";
//@ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { randomColor } from "./randomColor";

interface ISceneInit {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  raycaster: THREE.Raycaster;
  pointer: THREE.Vector2;
  orbit: OrbitControls;

  animate(): void;
  render(): void;
}

export class SceneInit implements ISceneInit {
  renderer;
  scene;
  camera;
  raycaster;
  pointer;
  orbit;
  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    this.camera.position.set(5, 5, 5);

    this.raycaster = new THREE.Raycaster();

    this.pointer = new THREE.Vector2();

    this.orbit = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbit.enableDamping = true;
    this.orbit.enableZoom = true;
    this.orbit.enablePan = true;

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x888888);
    hemisphereLight.position.set(0, 1, 0);
    this.scene.add(hemisphereLight);

    // const axesHelper = new THREE.AxesHelper(3);
    // this.scene.add(axesHelper);

    const onMouseMove = (event: MouseEvent) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0) {
        if (
          //@ts-ignore
          intersects[0].object.material.color.r == 1 &&
          //@ts-ignore
          intersects[0].object.material.color.g == 1 &&
          //@ts-ignore
          intersects[0].object.material.color.b == 1
        ) {
          //@ts-ignore
          intersects[0].object.material.color.setHex(randomColor());
        }
      }
    };

    //@ts-ignore
    window.addEventListener("mousemove", onMouseMove.bind(this));
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.orbit.update();
    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
