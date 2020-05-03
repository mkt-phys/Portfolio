/*
概要：管理画面の「利用情報」で選択された申請者のSys_Nameを取得する。そのデータをajaxを使ってAPIと接続する
参考：
API URL:https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/denyCreateInstance
*/

export default function() {
  $(".js-admin_deny_apply-user").click(function() {
    let user_name = [];
    $("input[name=apply-user]:checked").each(function() {
      console.log("user_name", $(this).val);
      user_name.push($(this).val());
    });

    let request = {
      users: user_name
    };
    console.log("request", request);

    $.ajax({
      url:
        "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/denyCreateInstance",
      type: "POST",
      data: JSON.stringify(request),
      dataType: "json", //受け取る形式
      timeout: 10000
    })
      .done(function(json) {
        let stringData = JSON.stringify(json);
        let parseData = JSON.parse(stringData);
        console.log(parseData);
      })

      .fail(function(json) {
        let stringData = JSON.stringify(json);
        let parseData = JSON.parse(stringData);
      })
      .always(function() {});
  });
}
