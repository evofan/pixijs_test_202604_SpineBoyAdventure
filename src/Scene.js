import { Container, Sprite, Texture, TilingSprite } from "pixi.js";

// 環境を操作するクラス
export class Scene {
  constructor(width, height) {
    // 全てのレイヤーを保持するメインのviewを作成する
    this.view = new Container();

    // 画面全体を覆う静止した空をスプライトで作成
    this.sky = Sprite.from("sky");
    this.sky.anchor.set(0, 1);
    this.sky.width = width;
    this.sky.height = height;

    // 視差用の背景・中景・プラットフォームをテクスチャーで作成
    const backgroundTexture = Texture.from("background");
    const midgroundTexture = Texture.from("midground");
    const platformTexture = Texture.from("platform");

    // 画面の高さに基づいてプラットフォームの高さを設定
    const maxPlatformHeight = platformTexture.height;
    const platformHeight = Math.min(maxPlatformHeight, height * 0.4);

    // 一貫性を保つために全てのタイチングテクスチャに適用するスケールを計算
    const scale = (this.scale = platformHeight / maxPlatformHeight);
    const baseOptions = {
      tileScale: { x: scale, y: scale },
      anchor: { x: 0, y: 1 },
      applyAnchorToTexture: true,
    };

    // タイリングスプライト（背景）を作成する
    this.background = new TilingSprite({
      texture: backgroundTexture,
      width,
      height: backgroundTexture.height * scale,
      ...baseOptions,
    });

    // タイリングスプライト（中景）を作成する
    this.midground = new TilingSprite({
      texture: midgroundTexture,
      width,
      height: midgroundTexture.height * scale,
      ...baseOptions,
    });

    // タイリングスプライト（プラットフォーム）を作成する
    this.platform = new TilingSprite({
      texture: platformTexture,
      width,
      height: platformHeight,
      ...baseOptions,
    });

    this.floorHeight = platformHeight * 0.43; // 外部参照用の床の高さを計算する
    this.background.y = this.midground.y = -this.floorHeight; // 背景・中景レイヤーの位置を指定

    // 全てのレイヤーをメインのviewに追加
    this.view.addChild(
      this.sky,
      this.background,
      this.midground,
      this.platform,
    );
  }

  // プラットフォームの水平位置をシーン移動のキー位置として指定する
  get positionX() {
    return this.platform.tilePosition.x;
  }

  // 背景レイヤーに視差スクロールを適用しながらプラットフォームの水平位置を設定する
  set positionX(value) {
    this.background.tilePosition.x = value * 0.1;
    this.midground.tilePosition.x = value * 0.25;
    this.platform.tilePosition.x = value;
  }
}
