/*
概要：管理画面の「利用者情報」タブの表のデータを受け取る
参考：
API URL:https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/listUserInfo
*/
export default function() {
  let request = {};
  $.ajax({
    url:
      "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/listUserInfo",
    type: "POST",
    data: JSON.stringify(request),
    dataType: "json", //受け取る形式
    timeout: 10000
  })
    .done(function(json) {
      for (let i = 0; i < json.users.length; i++) {
        let instance =
          json.users[i].Instance === "0" ? "JupyterNotebook" : "Linuxサーバ";
        let processor = json.users[i].Processor === "0" ? "CPU" : "GPU";

        $("tbody.js-admin_user_info").append(`
        <tr>
          <td>${json.users[i].Name}</td>
          <td>${instance}</td>
          <td>${processor}</td>
          <td>${json.users[i].Spec}</td>
          <td>${json.users[i].Request_Date}</td>
        </tr>`);
      }
    })

    .fail(function(json) {
      let stringData = JSON.stringify(json);
      let parseData = JSON.parse(stringData);
      console.log("parseData", parseData);
      $(".js-admin_user_info").append(parseData); //parseData. の後に取得したいJSONの項目を入力。
    })
    .always(function() {});
}
