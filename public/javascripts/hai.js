/*
牌の種類
    SUUPAI: 萬子、筒子、索子
    JIHAI: 四風牌、三元牌
*/
const KINDS = {
  SUUPAI: ["manzu", "pinzu", "souzu"],
  JIHAI: ["sufonpai", "sangenpai"]
};

/*
牌の値
    SUUPAI_VALUE: 数字牌
    SUFONPAI_VALUE: 四風牌
        東 = 1
        南 = 2
        西 = 3
        北 = 4
    ANGENPAI_VALUE: 三元牌
        白 = 1
        發 = 2
        中 = 3
*/
const SUUPAI_VALUE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SUFONPAI_VALUE = [1, 2, 3, 4];
const SANGENPAI_VALUE = [1, 2, 3];

/*
面子の種類
    ENTSU_KINDS: 順子、刻子
*/
const MENTSU_KINDS = ["順子", "刻子"];

//麻雀牌クラス
class Hai {
  //コンストラクタ
  constructor(kind, value) {
    this.kind = kind; //麻雀牌の種類（萬子・筒子・索子・四風牌・三元牌）
    this.value = value; //麻雀牌の値（1~9 東南西北白発中）
    this.pic = this.kind + "_" + String(this.value) + ".gif"; //画像ファイル名
  }

  //ソートキーを返却
  getSortKey() {
    switch (this.kind) {
      //萬子の場合
      case KINDS.SUUPAI[0]:
        return Number("1" + String(this.value)); //1萬なら11 3萬なら13
      //筒子の場合
      case KINDS.SUUPAI[1]:
        return Number("2" + String(this.value));
      //索子の場合
      case KINDS.SUUPAI[2]:
        return Number("3" + String(this.value));
      //四風牌の場合
      case KINDS.JIHAI[0]:
        return Number("4" + String(this.value));
      //三元牌の場合
      case KINDS.JIHAI[1]:
        return Number("5" + String(this.value));
      //上記以外の場合
      default:
        throw new TypeError("Hai.kind is not undefined");
    }
  }

  //牌
  equals(hai) {
    return hai.kind === this.kind && hai.value === this.value;
  }
}

//山牌作成
function createYamahai() {
  let shuffleArray = (arr) => {
    //配列ランダムソート(シャッフル)関数
    let n = arr.length; //変数n＝配列の個数
    let temp = 0,
      i = 0; //変数temp,i＝初期値0
    while (n) {
      //nが0になるまでwhileを繰り返す
      i = Math.floor(Math.random() * n--); // 0～1のランダムな数にnを掛けた数値(小数点切り捨て)つまり0～nの整数　while文が一周するごとにn=n-1
      temp = arr[n];
      arr[n] = arr[i]; //結果としてarr[n]とarr[i]の内容が入れ替わっている
      arr[i] = temp;
    } //つまり下記の136枚の牌の配列を基準に、136回ランダムにシャッフルしている
    return arr;
  };
  //山牌作成ジェネレーター
  let yamahaiGenerator = function* (kinds, values) {
    for (let kind of kinds) {
      for (let value of values) {
        for (let i = 0; i < 4; i++) {
          //一種類四枚
          yield new Hai(kind, value); //牌インスタンス生成
        }
      }
    }
  };
  //山牌返却
  return shuffleArray([
    ...yamahaiGenerator(KINDS.SUUPAI, SUUPAI_VALUE), //上のyamahaiGeneretor()の引数として使われ、結果136枚すべての牌が生成される
    ...yamahaiGenerator([KINDS.JIHAI[0]], SUFONPAI_VALUE), //配列として二つ上のshaffleArray()に参照される
    ...yamahaiGenerator([KINDS.JIHAI[1]], SANGENPAI_VALUE)
  ]);
}

//sortHai追加
//麻雀牌オブジェとのソート用関数
function sortHai(a, b) {
  return a.getSortKey() - b.getSortKey();
}

//haiクラスを外部へ公開
module.exports = Hai;
