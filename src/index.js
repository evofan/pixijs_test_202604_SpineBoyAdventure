import { Application, Assets } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

// Asynchronous IIFE
(async () => {
  // PixiJSのアプリケーションを作成する
  const app = new Application();

  // アプリケーションの初期化
  await app.init({ background: "#1099bb", resizeTo: window });

  // アプリケーションをDOMのcanvasに追加
  document.body.appendChild(app.canvas);

  // アセットをロード
  await Assets.load([
    {
      alias: "spineSkeleton",
      src: "https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pro.skel",
    },
    {
      alias: "spineAtlas",
      src: "https://raw.githubusercontent.com/pixijs/spine-v8/main/examples/assets/spineboy-pma.atlas",
    },
    {
      alias: "sky",
      src: "https://pixijs.com/assets/tutorials/spineboy-adventure/sky.png",
    },
    {
      alias: "background",
      src: "https://pixijs.com/assets/tutorials/spineboy-adventure/background.png",
    },
    {
      alias: "midground",
      src: "https://pixijs.com/assets/tutorials/spineboy-adventure/midground.png",
    },
    {
      alias: "platform",
      src: "https://pixijs.com/assets/tutorials/spineboy-adventure/platform.png",
    },
  ]);
})();
