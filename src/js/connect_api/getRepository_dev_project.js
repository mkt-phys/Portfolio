/*
概要：dev_top.htmlの「プロジェクト」タブをクリックすると動く
      リポジトリの一覧をDBから取ってくる
参考：
API URL:https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/getRepository
*/
export default function() {
  let cookie = new Array();
  let table_key = "Sys_Name";
  if (document.cookie != "") {
    var tmp = document.cookie.split("; ");
    for (var i = 0; i < tmp.length; i++) {
      var data = tmp[i].split("=");
      cookie[data[0]] = decodeURIComponent(data[1]);
    }
  }
  const request = {
    Sys_Name: cookie[table_key]
  };

  $.ajax({
    url:
      "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/getRepository",
    type: "POST",
    data: JSON.stringify(request),
    dataType: "json",
    timeout: 10000
  })
    .done(function(json) {
      $("ul.project_list").html(`
            <li>
              <a href="${json.Repository}" target="_blanck">${json.Request_Repository}</a> 
            </li>
        `);
    })

    .fail(function(json) {
      var stringData = JSON.stringify(json);
      var parseData = JSON.parse(stringData);
      $(".js-dev_project").text("fail");
      $(".js-dev_project").text(parseData.responseText);
    })
    .always(function() {});
}
