//環境利用申請のページで状況によりボタンの文字を変える。
//3パターン
// １、環境払い出し申請
// ２、取消
// ３、削除
//今回はランダムにjsonから読み取って表示する
export default function() {
  const data = require("../data.json");

  // 乱数発生0~5の乱数発生
  var random_num = Math.floor(Math.random() * 6);
  // console.log("status", data[random_num].status);
  // $('.button.apply').text(data[random_num].status);
  // $('h3.login-name').text(`${data[random_num].name}様`)
  // $("a.apply").css('pointer-events', 'none');
}
