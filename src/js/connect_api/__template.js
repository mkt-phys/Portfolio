/*
概要：
参考：
動作タイミング：
API URL:
*/
export default function() {
  // ここに処理を書く

  //クリックテンプレート
  $("button").click(function() {
    console.log("クリックされました！");
  });

  //cookieからSys_Nameを取り出すテンプレート
  let table_key = "Sys_Name";

  let cookie = new Array();
  if (document.cookie != "") {
    var tmp = document.cookie.split("; ");
    for (var i = 0; i < tmp.length; i++) {
      var data = tmp[i].split("=");
      cookie[data[0]] = decodeURIComponent(data[1]);
    }
  }

  //Ajaxテンプレート
  $.ajax({
    url:
      "https://ybya49a2e2.execute-api.ap-northeast-1.amazonaws.com/dev-qiita",
    type: "POST",
    data: JSON.stringify(user_info),
    dataType: "json",
    timeout: 10000
  })
    .done(function(json) {
      var stringData = JSON.stringify(json);
      var parseData = JSON.parse(stringData);
      $(".js-").text(parseData); //parseData. の後に取得したいJSONの項目を入力。
    })

    .fail(function(json) {
      var stringData = JSON.stringify(json);
      var parseData = JSON.parse(stringData);
      $(".js-").text(parseData.responseText);
    })
    .always(function() {
      console.log("alwaysのブロック");
    });
}
