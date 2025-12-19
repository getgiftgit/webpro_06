const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

let station = [
{ id:1, code:"JE01", name:"東京駅"},
{ id:2, code:"JE07", name:"舞浜駅"},
{ id:3, code:"JE12", name:"新習志野駅"},
{ id:4, code:"JE13", name:"幕張豊砂駅"},
{ id:5, code:"JE14", name:"海浜幕張駅"},
{ id:6, code:"JE05", name:"新浦安駅"},
];


let station2 = [
{ id:1, code:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
{ id:2, code:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
{ id:3, code:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
{ id:4, code:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
{ id:5, code:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
{ id:6, code:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
{ id:7, code:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];



app.get("/keiyo2", (req, res) => {
// 本来ならここにDBとのやり取りが入る
res.render('keiyo2', {data: station2} );
});
app.get("/keiyo2/:number", (req, res) => {
// 本来ならここにDBとのやり取りが入る
const number = req.params.number;
const detail = station2[ number ];
res.render('keiyo2_detail', {data: detail} );
});






let stationmono = [
    { id: 1, name: "千葉みなと駅", site: "千葉ポートタワー", access: "徒歩12分", price: "大人420円" },
    { id: 2, name: "市役所前駅", site: "千葉市役所", access: "徒歩1分", price: "無料" },
    { id: 3, name: "千葉駅", site: "ペリエ千葉", access: "直結", price: "ー" },
    { id: 4, name: "千葉公園駅", site: "千葉公園（大賀ハス）", access: "徒歩0分", price: "無料" },
    { id: 5, name: "県庁前駅", site: "千葉城（亥鼻城）", access: "徒歩10分", price: "大人60円" }
];



app.get("/chibamono", (req, res) => {
// 本来ならここにDBとのやり取りが入る
res.render('chibamono', {data: stationmono} );
});
app.get("/chibamono/:number", (req, res) => {
// 本来ならここにDBとのやり取りが入る
const number = req.params.number;
const detail = stationmono[ number ];
res.render('mono_detail', {data: detail} );
});








// 東京観光スポットのデータ（10個版）
let tokyoSpots = [
    { id: 1, name: "東京タワー", type: "タワー", fee: "1,200円", access: "赤羽橋駅 徒歩5分" },
    { id: 2, name: "浅草寺（雷門）", type: "寺院", fee: "無料", access: "浅草駅 徒歩5分" },
    { id: 3, name: "東京スカイツリー", type: "タワー", fee: "2,100円", access: "押上駅 直結" },
    { id: 4, name: "上野動物園", type: "動物園", fee: "600円", access: "上野駅 徒歩5分" },
    { id: 5, name: "明治神宮", type: "神社", fee: "無料", access: "原宿駅 徒歩1分" },
    { id: 6, name: "皇居東御苑", type: "庭園", fee: "無料", access: "大手町駅 徒歩5分" },
    { id: 7, name: "築地場外市場", type: "グルメ", fee: "無料", access: "築地市場駅 徒歩1分" },
    { id: 8, name: "お台場海浜公園", type: "公園", fee: "無料", access: "お台場海浜公園駅 徒歩3分" },
    { id: 9, name: "東京国立博物館", type: "博物館", fee: "1,000円", access: "上野駅 徒歩10分" },
    { id: 10, name: "新宿御苑", type: "庭園", fee: "500円", access: "新宿御苑前駅 徒歩5分" }
];

// ■■■ 東京観光ガイド（CRUD完全版） ■■■

// 1. 一覧表示 (Read)
app.get("/tokyo", (req, res) => {
    res.render('tokyo', { data: tokyoSpots });
});

// 2. 新規登録画面の表示 (Create - 入力フォーム)
app.get("/tokyo/create", (req, res) => {
    res.render('tokyo_create');
});

// 3. 新規登録の処理 (Create - データ追加)
app.post("/tokyo", (req, res) => {
    // IDは現在のデータ数+1にする（簡易的）
    const id = tokyoSpots.length + 1;
    // フォームから送られたデータを受け取る
    const item = {
        id: id,
        name: req.body.name,
        type: req.body.type,
        fee: req.body.fee,
        access: req.body.access
    };
    // 配列に追加
    tokyoSpots.push(item);
    // 一覧画面へ戻る
    res.redirect('/tokyo');
});

// 4. 詳細表示 (Read)
app.get("/tokyo/:number", (req, res) => {
    const number = req.params.number;
    const detail = tokyoSpots[number];
    res.render('tokyo_detail', { data: detail });
});

// 5. 編集画面の表示 (Update - フォーム)
app.get("/tokyo/edit/:number", (req, res) => {
    const number = req.params.number;
    const detail = tokyoSpots[number];
    // 編集画面には、現在のデータ(detail)と、何番目か(number)を渡す
    res.render('tokyo_edit', { data: detail, id: number });
});

// 6. 更新の処理 (Update - データ書き換え)
app.post("/tokyo/update/:number", (req, res) => {
    const number = req.params.number;
    // 配列の該当箇所をフォームの内容で上書き
    tokyoSpots[number].name = req.body.name;
    tokyoSpots[number].type = req.body.type;
    tokyoSpots[number].fee = req.body.fee;
    tokyoSpots[number].access = req.body.access;
    // 一覧画面へ戻る
    res.redirect('/tokyo');
});

// 7. 削除の処理 (Delete)
app.get("/tokyo/delete/:number", (req, res) => {
    const number = req.params.number;
    // 配列から該当する要素を1つ削除
    tokyoSpots.splice(number, 1);
    // 一覧画面へ戻る
    res.redirect('/tokyo');
});



























app.get("/keiyo", (req, res) => {
// 本来ならここにDBとのやり取りが入る
res.render('db1', { data: station });
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
