import { Container } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

// Spineのキャラクターを操りアニメーションさせるクラス
export class SpineBoy {
  constructor() {
    // 表示用のviewを作成
    this.view = new Container();

    // スケルトンとアトラスからSpineのインスタンスを作成
    this.spine = Spine.from({
      skeleton: "spineSkeleton",
      atlas: "spineAtlas",
    });
    // 表示用のviewにSpienのキャラクターを追加
    this.view.addChild(this.spine);
  }
}
