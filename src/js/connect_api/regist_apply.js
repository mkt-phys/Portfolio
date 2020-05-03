/*
概要：オレンジの利用申請ポータルのデータをDBに登録する
参考：http://www.tohoho-web.com/js/jquery/ajax.htm#ajax
    :https://qiita.com/tomokyu/items/80d304dce854713fa4af
API URL:https://m5y6hk7eu0.execute-api.ap-northeast-1.amazonaws.com/deploy/regist
    */
export default function() {
  $(".js-apply-top").click(function() {
    console.log("regist_apply");

    let apply_project = $("#apply_project").val();
    let apply_repository = $("#apply_repository").val();
    let admin_name = $(".admin_name").val();
    let admin_email = $(".admin_email").val();
    let admin_user_name = $(".admin_user_name").val();
    let dev_name = [];
    $(".dev_name").each(function() {
      dev_name.push($(this).val());
    });

    let dev_email = [];
    $(".dev_email").each(function() {
      dev_email.push($(this).val());
    });

    let dev_user_name = [];
    $(".dev_user_name").each(function() {
      dev_user_name.push($(this).val());
    });
    //name,email,user_nameが格納されている
    let dev_members_info = [];
    for (let i = 0; i < dev_name.length; i++) {
      dev_members_info.push({
        dev_name: dev_name[i],
        dev_email: dev_email[i],
        dev_user_name: dev_user_name[i]
      });
    }

    console.log("dev_memebers_info", dev_members_info[0]);

    let request = {
      Sys_Name: admin_user_name,
      Project: apply_project,
      Request_Repository: apply_repository,
      Name: admin_name,
      Mailaddress: admin_email,
      dev_member: dev_members_info
    };

    $.ajax({
      url:
        "https://m5y6hk7eu0.execute-api.ap-northeast-1.amazonaws.com/deploy/regist",
      type: "POST",
      data: JSON.stringify(request),
      dataType: "text",
      timeout: 10000
    })
      .done(function(json) {
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        console.log(parseData);
        // $(".js_test_return_api").text(parseData.status); //parseData. の後に取得したいJSONの項目を入力。
        $(".js_test_return_api").html(parseData); //parseData. の後に取得したいJSONの項目を入力。
      })

      .fail(function(json) {
        var stringData = JSON.stringify(json);
        var parseData = JSON.parse(stringData);
        $(".js_test_return_api").html(parseData.responseText);
      })
      .always(function() {});
  });
}
