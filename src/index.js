import { Application, Assets } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import { SpineBoy } from "./SpineBoy";
import { Controller } from "./Keyboard";
import { Scene } from "./Scene";

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
  // app.stage.addChild(spineBoy.view);

  // シーンを作成
  const scene = new Scene(app.screen.width, app.screen.height);

  // ビューの変換を調整する
  scene.view.y = app.screen.height;
  spineBoy.view.x = app.screen.width / 2;
  spineBoy.view.y = app.screen.height - scene.floorHeight;
  spineBoy.spine.scale.set(scene.scale * 0.32);

  // シーンとSpineキャラクターをステージに追加
  app.stage.addChild(scene.view, spineBoy.view);

  // キーボードコントローラーを使用する
  const controller = new Controller();

  // アニメーション
  // let currentAnimation;

  // キャラクターのアニメーションを引き起こすトリガー
  // （出現アニメーションを再生）
  spineBoy.spawn();

  app.ticker.add((time) => {
    // const rightPressed = controller.keys.right.pressed;
    // const animationName = rightPressed ? "walk" : "idle"; // Spine内のアニメーション名
    // const loop = true;

    // if (currentAnimation !== animationName) {
    //   currentAnimation = animationName;
    //   spineBoy.spine.state.setAnimation(0, animationName, loop); // アニメーションさせる
    // }

    // キャラクターが生成アニメーションしている間はスキップ
    if (spineBoy.isSpawning()) return;

    // キーボードコントローラーの状態に基づいてキャラクターのステートを更新する
    spineBoy.state.walk =
      controller.keys.left.pressed || controller.keys.right.pressed;
    if (spineBoy.state.run && spineBoy.state.walk) spineBoy.state.run = true;
    else
      spineBoy.state.run =
        controller.keys.left.doubleTap || controller.keys.right.doubleTap;
    spineBoy.state.hover = controller.keys.down.pressed;
    if (controller.keys.left.pressed) spineBoy.direction = -1;
    else if (controller.keys.right.pressed) spineBoy.direction = 1;
    spineBoy.state.jump = controller.keys.space.pressed;

    // 最新の状態に戻づいてキャラクターの状態を更新する
    spineBoy.update();
  });
})();
