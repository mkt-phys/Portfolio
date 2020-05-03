/*
概要：管理画面の「申請者情報」タブの表のデータを受け取る
参考：
API URL:https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/listApplicantInfo
*/
export default function() {
  let request = {};
  $.ajax({
    url:
      "https://o8z5a5xqm5.execute-api.ap-northeast-1.amazonaws.com/deploy/listApplicantInfo",
    type: "POST",
    data: JSON.stringify(request),
    dataType: "json",
    timeout: 10000
  })
    .done(function(json) {
      for (let i = 0; i < json.applicants.length; i++) {
        let instance =
          json.applicants[i].Instance === "0"
            ? "JupyterNotebook"
            : "Linuxサーバ";
        let processor = json.applicants[i].Processor === "0" ? "CPU" : "GPU";
        $(`tbody.js-admin_apply_info`).append(`
          <tr>             
            <th style="transform: scale(1.5);">            
               <input type="checkbox" value="${json.applicants[i].Sys_Name}" name='apply-user'>
            </th>
            <label>
            </label>
            <td>${json.applicants[i].Name}</td>
            <td>${instance}</td>
            <td>${processor}</td>
            <td>${json.applicants[i].Spec}</td>
            <td>${json.applicants[i].Request_Date}</td>
          </tr>
          `);
      }
    })

    .fail(function(json) {
      let stringData = JSON.stringify(json);
      let parseData = JSON.parse(stringData);
      $(".js-admin_apply_info_test_return_api").text(
        "申請者情報をクリックした！"
      ); //parseData. の後に取得したいJSONの項目を入力。
    })
    .always(function() {});
}
