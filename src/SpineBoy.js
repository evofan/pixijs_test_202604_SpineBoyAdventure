import { Container } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

// Spineのキャラクターを操りアニメーションさせるクラス
// export class SpineBoy {
//   constructor() {
//     // 表示用のviewを作成
//     this.view = new Container();

//     // スケルトンとアトラスからSpineのインスタンスを作成
//     this.spine = Spine.from({
//       skeleton: "spineSkeleton",
//       atlas: "spineAtlas",
//     });
//     // 表示用のviewにSpienのキャラクターを追加
//     this.view.addChild(this.spine);
//   }
// }

// キャラクターのSpineマップアニメーションを定義する
// name: アニメーショントラックのキー名
// loop: アニメーションを1回or無限にする
const animationMap = {
  idle: {
    name: "idle", // アイドル
    loop: true,
  },
  walk: {
    name: "walk", // 歩く
    loop: true,
  },
  run: {
    name: "run", // 走る
    loop: true,
  },
  jump: {
    name: "jump", // ジャンプ
    timeScale: 1.5,
  },
  hover: {
    name: "hoverboard", // ホバーボード
    loop: true,
  },
  spawn: {
    name: "portal", // 入り口
  },
};

// Spineのキャラクターとアニメーションを操作するクラス
export class SpineBoy {
  constructor() {
    // キャラクターのstate
    this.state = {
      walk: false,
      run: false,
      hover: false,
      jump: false,
    };

    // メインのviewと方向スケーリングの為のネストされたvewを作成する
    this.view = new Container();
    this.directionalView = new Container();

    // 事前にロードされたSpineアセットエイリアスを使用してSpineインスタンスを作成する
    this.spine = Spine.from({
      skeleton: "spineSkeleton",
      atlas: "spineAtlas",
    });

    // Spineインスタンスを方向viewに追加する
    this.directionalView.addChild(this.spine);

    // 方向viewをメインviewに追加する
    this.view.addChild(this.directionalView);

    // 全てのアニメーションのデフォルトミックスタイムを設定する
    // （今のアニメーションから次のアニメーションへの変化時間）
    this.spine.state.data.defaultMix = 0.2;
  }

  // 入り口から入ってくるアニメーション（出現アニメーション）を再生する
  spawn() {
    this.spine.state.setAnimation(0, animationMap.spawn.name);
  }

  // Spineのアニメーションを再生する
  playAnimation({ name, loop = false, timeScale = 1 }) {
    // もしアニメーションが既に再生されていたらスキップする
    if (this.currentAnimationName === name) return;

    // メイントラックのアニメーションを即座再生生する
    const trackEntry = this.spine.state.setAnimation(0, name, loop);

    // アニメーションのタイムスケール（速度）を適用する
    trackEntry.timeScale = timeScale;
  }

  update() {
    if (this.state.jump) this.playAnimation(animationMap.jump); // jumpならジャンプアニメーションを再生する
    if (this.isAnimationPlaying(animationMap.jump)) return; // jumpアニメーション中は残りのアニメーションをスキップする
    // 最新のステートと優先順位に基づいてアニメーションを再生する
    if (this.state.hover) this.playAnimation(animationMap.hover); // 
    else if (this.state.run) this.playAnimation(animationMap.run);
    else if (this.state.walk) this.playAnimation(animationMap.walk);
    // ステートが上記以外の場合はidleさせる
    else this.playAnimation(animationMap.idle);
  }

  /**
   * 既に生成されているか返す
   * @returns
   */
  isSpawning() {
    return this.isAnimationPlaying(animationMap.spawn);
  }

  /**
   * メイントラックのア現在のアニメーションがクエリーされたものと等しいかどうか、
   * かつアニメーションの再生が進行中かどうかを返す
   * @param { strng } name アニメーション名
   * @returns
   */
  isAnimationPlaying({ name }) {
    return (
      this.currentAnimationName === name &&
      !this.spine.state.getCurrent(0).isComplete()
    );
  }

  /**
   * メイントラック上の現在のアニメーション名を返す
   */
  get currentAnimationName() {
    return this.spine.state.getCurrent(0)?.animation.name;
  }

  /**
   * キャラクターの向きを返す
   */
  get direction() {
    return this.directionalView.scale.x > 0 ? 1 : -1;
  }

  /**
   * キャラクターの向きを設定する
   * @param { number } value
   */
  set direction(value) {
    this.directionalView.scale.x = value;
  }
}
