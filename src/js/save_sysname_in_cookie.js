//参考：https://techacademy.jp/magazine/20783
//cookieを連想配列にする：https://javascript.programmer-reference.com/js-document-cookie-get/
export default function() {
  // ここに処理を書く
  // console.log("save_sysname_in_cookie");

  document.cookie = "Sys_Name=demo2";

  let table_key = "Sys_Name";
  let cookie = new Array();
  if (document.cookie != "") {
    var tmp = document.cookie.split("; ");
    for (var i = 0; i < tmp.length; i++) {
      var data = tmp[i].split("=");
      cookie[data[0]] = decodeURIComponent(data[1]);
    }
  }
  // console.log(table_key, ":", cookie[table_key]);
  $(".login-name").text(cookie[table_key] + "様"); //cookieから取得した名前をヘッダーに表示
}
