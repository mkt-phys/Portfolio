//admin_topの申請者情報のチェックされたチェックボックスのvalueを取得する
//ここで得た名前を適当なURLにPOSTで送信する
export default function() {
  $(".js-admin_apply-user").click(function() {
    //すべてのチェック済みvalue値を取得する
    console.log("----------");
    let user_names = [];
    $("input[name=apply-user]:checked").each(function() {
      user_names.push($(this).val());
    });
    console.log(user_names);
    console.log("json", JSON.stringify(user_names));

    var params = {
      fruit: "りんご"
    };
    $.ajax({
      url:
        // "https://ybya49a2e2.execute-api.ap-northeast-1.amazonaws.com/dev-qiita",
        "https://m5y6hk7eu0.execute-api.ap-northeast-1.amazonaws.com/deploy/regist",
      type: "POST",
      data: JSON.stringify(params),
      dataType: "json",
      success: function(json) {
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        $(".check_output").append(parseData.status); //parseData. の後に取得したいJSONの項目を入力。
      },
      error: function() {
        alert("error");
      }
    });
  });
}
