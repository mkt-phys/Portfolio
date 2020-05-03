/*
概要：dev_top.htmlの「home」タブで動く
      署名付きURLのボタンをクリックすると以下のjsが動く
参考：
*/
export default function() {
  $(".js-createPresignedUrl").click(function() {
    let cookie = new Array();
    let table_key = "Sys_Name";
    if (document.cookie != "") {
      var tmp = document.cookie.split("; ");
      for (var i = 0; i < tmp.length; i++) {
        var data = tmp[i].split("=");
        cookie[data[0]] = decodeURIComponent(data[1]);
      }
    }

    let request = {
      Sys_Name: cookie[table_key]
    };

    $.ajax({
      url:
        " https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/createPresignedUrl",
      type: "POST",
      data: JSON.stringify(request),
      dataType: "json",
      timeout: 10000
    })
      .done(function(json) {
        console.log("json", json);
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        $(".js-presigned_url").html(
          `署名付きURLは<a href="${json.AuthorizedUrl}" target="_blank"> こちら</a>`
        ); //parseData. の後に取得したいJSONの項目を入力。
      })

      .fail(function(json) {
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        $(".js-").text(parseData.responseText);
      })
      .always(function() {});
  });
}
