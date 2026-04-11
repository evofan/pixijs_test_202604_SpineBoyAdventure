// キーボードのキーコードをコントローラーのステータスにマッピングさせる
const keyMap = {
  Space: "space",
  KeyW: "up",
  ArrowUp: "up",
  KeyA: "left",
  ArrowLeft: "left",
  KeyS: "down",
  ArrowDown: "down",
  KeyD: "right",
  ArrowRight: "right",
};

// キーボード入力を処理するためのクラス
export class Controller {
  constructor() {
    // コントローラーのステート
    this.keys = {
      // 押されているか、押されて離した後また押されたか、ダブルタップ判定の間隔
      up: { pressed: false, doubleTap: false, timestamp: 0 },
      left: { pressed: false, doubleTap: false, timestamp: 0 },
      down: { pressed: false, doubleTap: false, timestamp: 0 },
      right: { pressed: false, doubleTap: false, timestamp: 0 },
      space: { pressed: false, doubleTap: false, timestamp: 0 },
    };

    // キーダウンとキーアップをイベントリスナーに登録する
    window.addEventListener("keydown", (event) => this.keydownHandler(event));
    window.addEventListener("keyup", (event) => this.keyupHandler(event));
  }

  // 押された
  keydownHandler(event) {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();

    this.keys[key].pressed = true;
    // ダブルアップ状態で無い場合、300ms秒未満でキーが押されたらダブルタップ状態にする
    this.keys[key].doubleTap =
      this.keys[key].doubleTap || now - this.keys[key].timestamp < 300;

    // キーが押された状態をtrueにする
    this.keys[key].pressed = true;
  }

  // 離された
  keyupHandler(event) {
    const key = keyMap[event.code];

    if (!key) return;

    const now = Date.now();

    this.keys[key].pressed = false;

    // ダブルタップ状態である場合、ダブルタップ状態をリセットする
    if (this.keys[key].doubleTap) this.keys[key].doubleTap = false;
    // そうでなければ次のキーダウンまでの時間差を追跡するためにタイムスタンプを更新する
    else this.keys[key].timestamp = now;
  }
}
