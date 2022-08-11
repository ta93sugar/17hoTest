//変数宣言
var playerInfo = [];

//プレイヤークラス
class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  playerInfo = [this.id, this.name];
}

//playerクラスを外部に公開
module.exports = Player;
