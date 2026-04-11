import { Application, Assets } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";

// Asynchronous IIFE（非同期の即時実行関数）
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
      src: "./assets/images/spineboy-pro.skel",
    },
    {
      alias: "spineAtlas",
      src: "./assets/images/spineboy-pma.atlas",
    },
    {
      alias: "sky",
      src: "./assets/images/sky.png",
    },
    {
      alias: "background",
      src: "./assets/images/background.png",
    },
    {
      alias: "midground",
      src: "./assets/images/midground.png",
    },
    {
      alias: "platform",
      src: "./assets/images/platform.png",
    },
  ]);
})();
