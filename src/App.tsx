import { useEffect } from "react";

import { SceneInit } from "./lib/SceneInit";

import "./index.css";
import { createBall } from "./lib/createBall";

function App() {
  useEffect(() => {
    const test = new SceneInit();
    test.animate();

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        for (let z = 0; z < 10; z++) {
          const ball = createBall(0.2 * x - 1, 0.2 * y - 1, 0.2 * z - 1);
          test.scene.add(ball);
        }
      }
    }
  }, []);

  return <></>;
}

export default App;
