//モジュールの呼び出し
const express = require("express"),
  http = require("http"),
  path = require("path"),
  routes = require("./routes"),
  socketIO = require("socket.io"),
  cookieSession = require("cookie-session"),
  //cookieParser = require("cookie-parser")　cookie-sessionダメならこっち使う

  Room = require("./public/javascripts/room.js"); //将来的に複数部屋立てる時は書く場所と書き方変わる
//サーバ生成
const app = express();
const server = http.Server(app);
const io = socketIO(server);

//app設定、要勉強
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//app.use(express.favicon());　express4では不要
//app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
//app.use(express.logger('dev')); ログは今度勉強する
//app.use(express.bodyParser());　express4では不要
//app.use(express.methodOverride());　express4では不要
//app.use(app.router);　express4では不要
//app.use(cookieParser())　とりあえずcookie-session使ってみる
app.use(
  cookieSession({
    name: "session", //セッションの名前
    secret: "gegegear", //暗号化文字列、なんでもOK
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(express.static(path.join(__dirname, "public")));

//ルーティング
app.get("/", routes.title);
app.post("/lobby", routes.lobby);

server.listen(3000);
//socket.io　クライアントとのやり取り
io.sockets.on("connection", function (socket) {
  socket.on("enterLobby", function (data) {
    var playerId = socket.id; //socket.idをプレイヤIDとして使用
    var name = socket.request.session.name; //セッションに格納されている名前を読み込む
    var playerList = Room.updatePlayerList(playerId, name);
    socket.request.session.playerId = playerId; //セッションにプレイヤIDを格納
    io.sockets.emit("updateLobby", playerList); //クライアントにプレイヤリストを渡す
  });

  socket.on("disconnect");
});
