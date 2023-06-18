import * as THREE from "three";

export const createBall = (x: number, y: number, z: number) => {
  const ballGeo = new THREE.SphereGeometry(0.1, 32, 32);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const ball = new THREE.Mesh(ballGeo, ballMat);
  ball.position.set(x, y, z);

  return ball;
};
