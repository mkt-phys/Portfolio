/*
概要：管理画面の「利用情報」で選択された申請者のSys_Nameを取得する。そのデータをajaxを使ってAPIと接続する
参考：
API URL:https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/createInstance
*/

export default function() {
  $(".js-admin_apply-user").click(function() {
    let user_name = [];
    $("input[name='apply-user']:checked").each(function() {
      user_name.push($(this).val());
    });
    let request = {
      users: user_name
    };
    $.ajax({
      url:
        "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/createInstance",
      type: "POST",
      data: JSON.stringify(request),
      dataType: "json", //受け取る形式
      timeout: 10000
    })
      .done(function(json) {
        let stringData = JSON.stringify(json);
        let parseData = JSON.parse(stringData);
        $(".js_test_return_api").text(parseData); //parseData. の後に取得したいJSONの項目を入力。
      })

      .fail(function(json) {
        let stringData = JSON.stringify(json);
        let parseData = JSON.parse(stringData);
        $(".js_test_return_api").html(parseData.responseText);
      })
      .always(function() {});
  });
}
