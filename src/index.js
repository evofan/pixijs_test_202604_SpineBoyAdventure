import { Application, Assets } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { SpineBoy } from "./SpineBoy";

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

  // キャラクターを作成
  const spineBoy = new SpineBoy();

  // キャラクターのサイズを変換して調整
  spineBoy.view.x = app.screen.width / 2;
  spineBoy.view.y = app.screen.height - 80;
  spineBoy.spine.scale.set(0.5);

  // キャラクターをステージに追加
  app.stage.addChild(spineBoy.view);
})();
