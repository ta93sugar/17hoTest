//変数宣言
var playerList = new Array();

//playerクラスの呼び出し
const PLAYER = require("./player").Player;
const HAI = require("./hai").Hai;

//ルームクラス
class Room {
  constructor(room) {
    this.room = room;
  }
}

//playerListの更新を行う
function updatePlayerList(playerId, playerName) {
  var i = playerList.length;
  playerList[i] = new player.playerInfo();

  return playerList;
}

//roomクラスを外部に公開
module.exports = Room;

//山牌作成(仮)
const CY = new Hai.createYamahai();
